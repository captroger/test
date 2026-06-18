document.addEventListener('DOMContentLoaded', () => {
  // --- NAVIGATION BAR LOGIC (Applies to ALL pages) ---
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !expanded);
      navLinks.classList.toggle('open');
    });
  }

  // --- THEME SELECT LOGIC (Applies to ALL pages) ---
  const themeSelect = document.getElementById('theme-select');
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  
  document.documentElement.setAttribute('data-theme', currentTheme);
  if (themeSelect) {
    themeSelect.value = currentTheme;
    themeSelect.addEventListener('change', (e) => {
      const selectedTheme = e.target.value;
      document.documentElement.setAttribute('data-theme', selectedTheme);
      localStorage.setItem('theme', selectedTheme);
    });
  }

  // --- TEXT SIZE SELECT LOGIC (Applies to ALL pages) ---
  const fontSizeSelect = document.getElementById('font-size-select');
  const savedFontSize = localStorage.getItem('font-size') || 'medium';
  
  const textInput = document.getElementById('text-input');
  if (textInput) {
    textInput.classList.add(`font-${savedFontSize}`);
  }
  if (fontSizeSelect) {
    fontSizeSelect.value = savedFontSize;
    fontSizeSelect.addEventListener('change', (e) => {
      const selectedSize = e.target.value;
      if (textInput) {
        textInput.classList.remove('font-small', 'font-medium', 'font-large');
        textInput.classList.add(`font-${selectedSize}`);
      }
      localStorage.setItem('font-size', selectedSize);
    });
  }

  // --- INDEX.HTML (WORD COUNTER ENGINE) SPECIFIC LOGIC ---
  if (textInput) {
    const valWords = document.getElementById('val-words');
    const valCharSpaces = document.getElementById('val-char-spaces');
    const valCharNoSpaces = document.getElementById('val-char-no-spaces');
    const valSentences = document.getElementById('val-sentences');
    const valParagraphs = document.getElementById('val-paragraphs');
    const valReadingTime = document.getElementById('val-reading-time');
    const valSpeakingTime = document.getElementById('val-speaking-time');
    
    const clearBtn = document.getElementById('clear-btn');
    const copyStatsBtn = document.getElementById('copy-stats-btn');
    const saveBtn = document.getElementById('save-btn');
    const grammarBtn = document.getElementById('grammar-btn');
    const grammarPanel = document.getElementById('grammar-panel');
    const grammarResults = document.getElementById('grammar-results');
    const closeGrammarBtn = document.getElementById('close-grammar');

    // Load saved text from localStorage if exists
    const savedText = localStorage.getItem('saved_text');
    if (savedText) {
      textInput.value = savedText;
    }

    // Function to calculate and update statistics
    function updateStats() {
      const text = textInput.value;

      // 1. Characters (with spaces)
      const charCountWithSpaces = text.length;

      // 2. Characters (no spaces)
      const charCountNoSpaces = text.replace(/\s/g, '').length;

      // 3. Words
      const wordsArray = text.trim().split(/\s+/).filter(word => word.length > 0);
      const wordCount = wordsArray.length;

      // 4. Sentences
      const sentenceCount = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;

      // 5. Paragraphs
      const paragraphsArray = text.split(/\n+/).filter(p => p.trim().length > 0);
      const paragraphCount = text.trim() === '' ? 0 : paragraphsArray.length;

      // 6. Reading Time (~200 WPM)
      const readingSeconds = Math.round((wordCount / 200) * 60);
      const readingMin = Math.floor(readingSeconds / 60);
      const readingSec = readingSeconds % 60;
      let readingTimeStr = '0 sec';
      if (wordCount > 0) {
        readingTimeStr = readingMin > 0 ? `${readingMin} min ${readingSec} sec` : `${readingSec} sec`;
      }

      // 7. Speaking Time (~130 WPM)
      const speakingSeconds = Math.round((wordCount / 130) * 60);
      const speakingMin = Math.floor(speakingSeconds / 60);
      const speakingSec = speakingSeconds % 60;
      let speakingTimeStr = '0 sec';
      if (wordCount > 0) {
        speakingTimeStr = speakingMin > 0 ? `${speakingMin} min ${speakingSec} sec` : `${speakingSec} sec`;
      }

      // Populate elements
      if (valWords) valWords.textContent = formatNumber(wordCount);
      if (valCharSpaces) valCharSpaces.textContent = formatNumber(charCountWithSpaces);
      if (valCharNoSpaces) valCharNoSpaces.textContent = formatNumber(charCountNoSpaces);
      if (valSentences) valSentences.textContent = formatNumber(sentenceCount);
      if (valParagraphs) valParagraphs.textContent = formatNumber(paragraphCount);
      if (valReadingTime) valReadingTime.textContent = readingTimeStr;
      if (valSpeakingTime) valSpeakingTime.textContent = speakingTimeStr;

      autoResizeTextarea();
    }

    function formatNumber(num) {
      return num.toLocaleString();
    }

    function autoResizeTextarea() {
      textInput.style.height = 'auto';
      const targetHeight = Math.max(180, textInput.scrollHeight);
      textInput.style.height = `${targetHeight}px`;
    }

    function clearText() {
      textInput.value = '';
      updateStats();
      localStorage.setItem('saved_text', '');
      textInput.focus();
      textInput.style.height = '180px';
      if (grammarPanel) {
        grammarPanel.style.display = 'none';
      }
    }

    function copyStats() {
      const statsText = `TextTally Statistics:
-------------------------
Words: ${valWords.textContent}
Characters (with spaces): ${valCharSpaces.textContent}
Characters (no spaces): ${valCharNoSpaces.textContent}
Sentences: ${valSentences.textContent}
Paragraphs: ${valParagraphs.textContent}
Est. Reading Time: ${valReadingTime.textContent}
Est. Speaking Time: ${valSpeakingTime.textContent}
-------------------------
Calculated instantly and privately on TextTally.`;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(statsText)
          .then(() => showSuccessFeedback(copyStatsBtn, "Copied!"))
          .catch(err => fallbackCopy(statsText));
      } else {
        fallbackCopy(statsText);
      }
    }

    function fallbackCopy(text) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand('copy');
        showSuccessFeedback(copyStatsBtn, "Copied!");
      } catch (err) {
        console.error('Fallback copy failed', err);
      }
      document.body.removeChild(textArea);
    }

    function showSuccessFeedback(button, text) {
      const originalText = button.innerHTML;
      button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        ${text}
      `;
      button.classList.add('btn-success');
      button.disabled = true;

      setTimeout(() => {
        button.innerHTML = originalText;
        button.classList.remove('btn-success');
        button.disabled = false;
      }, 2000);
    }

    // Save Text to LocalStorage and Download as .txt Option
    function saveText() {
      const text = textInput.value;
      localStorage.setItem('saved_text', text);

      if (text.trim() === '') {
        alert("Please write or paste some text before saving!");
        return;
      }

      // Generate text file download
      try {
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `texttally-save-${new Date().toISOString().slice(0, 10)}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } catch (err) {
        console.error("Download fail:", err);
      }

      showSuccessFeedback(saveBtn, "Saved!");
    }

    // Grammar & Spell Check Implementation
    async function performGrammarCheck() {
      const text = textInput.value;
      if (text.trim() === '') {
        alert("Enter some text to run a grammar and style check.");
        return;
      }

      // Display results panel
      if (grammarPanel) {
        grammarPanel.style.display = 'block';
        grammarPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      if (grammarResults) {
        grammarResults.innerHTML = `
          <div class="grammar-success-state">
            <svg style="animation: spin 1s linear infinite;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="2" x2="12" y2="6"></line>
              <line x1="12" y1="18" x2="12" y2="22"></line>
              <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
              <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
              <line x1="2" y1="12" x2="6" y2="12"></line>
              <line x1="18" y1="12" x2="22" y2="12"></line>
              <line x1="4.93" y1="19.78" x2="7.76" y2="18.36"></line>
              <line x1="16.24" y1="5.64" x2="19.07" y2="4.22"></line>
            </svg>
            <p>Analyzing text grammar and spelling issues...</p>
          </div>
        `;
      }

      const issues = [];

      // 1. Local Rule-based Checking (Guarantees fully offline support)
      // A. Repeated Words (e.g. "the the")
      const repeatRegex = /\b([a-zA-Z]+)\s+\1\b/gi;
      let match;
      while ((match = repeatRegex.exec(text)) !== null) {
        issues.push({
          message: `Repeated word: "${match[1]}"`,
          shortMessage: "Repeated word",
          offset: match.index,
          length: match[0].length,
          replacements: [{ value: match[1] }],
          category: "Typo"
        });
      }

      // B. Double Spaces
      const spaceRegex = /  +/g;
      while ((match = spaceRegex.exec(text)) !== null) {
        issues.push({
          message: "Consecutive duplicate spaces.",
          shortMessage: "Double spaces",
          offset: match.index,
          length: match[0].length,
          replacements: [{ value: " " }],
          category: "Style/Typo"
        });
      }

      // C. Spacing directly after punctuation (missing space)
      const missingSpaceRegex = /[.,!?;:][A-Za-z]/g;
      while ((match = missingSpaceRegex.exec(text)) !== null) {
        issues.push({
          message: `Missing space after punctuation symbol: "${match[0]}"`,
          shortMessage: "Spacing",
          offset: match.index + 1,
          length: 0,
          replacements: [{ value: " " + match[0].charAt(1) }],
          category: "Punctuation"
        });
      }

      // D. Missing capitalization after sentence ending (. ! ?)
      const sentenceCapRegex = /[.!?]\s+([a-z])/g;
      while ((match = sentenceCapRegex.exec(text)) !== null) {
        issues.push({
          message: `First letter after sentence-ending punctuation should be uppercase: "${match[1]}"`,
          shortMessage: "Capitalization",
          offset: match.index + match[0].length - 1,
          length: 1,
          replacements: [{ value: match[1].toUpperCase() }],
          category: "Capitalization"
        });
      }

      // 2. Public API Grammar Checks (LanguageTool public check API)
      if (navigator.onLine) {
        try {
          const apiResponse = await fetch('https://api.languagetool.org/v2/check', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
              text: text,
              language: 'en-US'
            })
          });

          if (apiResponse.ok) {
            const apiData = await apiResponse.json();
            if (apiData && apiData.matches) {
              apiData.matches.forEach(m => {
                // Deduplicate local checks if LanguageTool finds them
                issues.push({
                  message: m.message,
                  shortMessage: m.shortMessage || m.rule.category.name,
                  offset: m.offset,
                  length: m.length,
                  replacements: m.replacements ? m.replacements.slice(0, 3) : [],
                  category: m.rule.category.name,
                  context: m.context ? m.context.text : null
                });
              });
            }
          }
        } catch (err) {
          console.warn("LanguageTool fetch failed. Running offline fallback.", err);
        }
      }

      // Sort issues chronologically by text offset
      issues.sort((a, b) => a.offset - b.offset);

      // De-duplicate issues which occupy exact same bounds
      const filteredIssues = [];
      const indexTracker = new Set();
      issues.forEach(issue => {
        const key = `${issue.offset}-${issue.length}`;
        if (!indexTracker.has(key)) {
          indexTracker.add(key);
          filteredIssues.push(issue);
        }
      });

      renderGrammarSuggestions(filteredIssues);
    }

    function renderGrammarSuggestions(issueList) {
      if (!grammarResults) return;

      if (issueList.length === 0) {
        grammarResults.innerHTML = `
          <div class="grammar-success-state">
            <svg style="color: var(--success-color);" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <h3>No spelling or grammar errors found!</h3>
            <p>Your writing is exceptionally clean and polished.</p>
          </div>
        `;
        return;
      }

      grammarResults.innerHTML = '';
      issueList.forEach((issue, index) => {
        const card = document.createElement('div');
        card.className = 'grammar-issue-card';

        // Context renderer
        let contextHTML = '';
        if (issue.context) {
          contextHTML = `<div class="grammar-context">"...${issue.context}..."</div>`;
        } else {
          const text = textInput.value;
          const start = Math.max(0, issue.offset - 25);
          const end = Math.min(text.length, issue.offset + issue.length + 25);
          const prefix = text.slice(start, issue.offset);
          const mid = text.slice(issue.offset, issue.offset + issue.length);
          const suffix = text.slice(issue.offset + issue.length, end);
          contextHTML = `<div class="grammar-context">"...${prefix}<strong style="text-decoration: underline wavy var(--warning-border);">${mid || ' '}</strong>${suffix}..."</div>`;
        }

        let actionsHTML = '';
        if (issue.replacements && issue.replacements.length > 0) {
          actionsHTML = issue.replacements.map(rep => {
            const val = rep.value;
            return `<button class="grammar-fix-btn" data-id="${index}" data-val="${encodeURIComponent(val)}">Fix: "${val}"</button>`;
          }).join(' ');
        }

        card.innerHTML = `
          <div>
            <span class="control-label" style="color: var(--warning-text); font-size: 0.72rem; display: block; margin-bottom: 0.15rem;">${issue.category || 'Rule Check'}</span>
            <div class="grammar-desc">${issue.message}</div>
            ${contextHTML}
          </div>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            ${actionsHTML}
          </div>
        `;

        grammarResults.appendChild(card);
      });

      // Bind fix buttons
      const buttons = grammarResults.querySelectorAll('.grammar-fix-btn');
      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          const issueId = parseInt(btn.getAttribute('data-id'));
          const replacement = decodeURIComponent(btn.getAttribute('data-val'));
          const issue = issueList[issueId];

          const fullText = textInput.value;
          const leftText = fullText.slice(0, issue.offset);
          const rightText = fullText.slice(issue.offset + issue.length);

          textInput.value = leftText + replacement + rightText;
          updateStats();
          
          // Recheck to refresh indices
          performGrammarCheck();
        });
      });
    }

    // Connect Engine Elements
    textInput.addEventListener('input', () => {
      updateStats();
      localStorage.setItem('saved_text', textInput.value);
    });

    clearBtn.addEventListener('click', clearText);
    copyStatsBtn.addEventListener('click', copyStats);
    saveBtn.addEventListener('click', saveText);
    grammarBtn.addEventListener('click', performGrammarCheck);

    if (closeGrammarBtn) {
      closeGrammarBtn.addEventListener('click', () => {
        grammarPanel.style.display = 'none';
      });
    }

    // Keyboard Hotkey Integrations
    window.addEventListener('keydown', (e) => {
      // Escape clears input
      if (e.key === 'Escape') {
        if (document.activeElement === textInput) {
          clearText();
        }
      }
      // Ctrl + S triggers text save and file download
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveText();
      }
    });

    window.addEventListener('resize', autoResizeTextarea);

    // Initial render call
    updateStats();
    if (window.innerWidth > 768) {
      textInput.focus();
    }
  }

  // --- CONTACT FORM SUBMISSION LOGIC (contact.html specific) ---
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');
  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Visual Feedback
      formFeedback.innerHTML = `
        <div class="form-success-alert">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <span><strong>Message sent successfully!</strong> Thank you for contacting TextTally. We will respond shortly.</span>
        </div>
      `;
      formFeedback.style.display = 'block';
      contactForm.reset();
      
      // Auto scroll to feedback
      formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }
});
