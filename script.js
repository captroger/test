document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const textInput = document.getElementById('text-input');
  const valWords = document.getElementById('val-words');
  const valCharSpaces = document.getElementById('val-char-spaces');
  const valCharNoSpaces = document.getElementById('val-char-no-spaces');
  const valSentences = document.getElementById('val-sentences');
  const valParagraphs = document.getElementById('val-paragraphs');
  const valReadingTime = document.getElementById('val-reading-time');
  const valSpeakingTime = document.getElementById('val-speaking-time');
  
  const clearBtn = document.getElementById('clear-btn');
  const copyStatsBtn = document.getElementById('copy-stats-btn');
  const themeToggle = document.getElementById('theme-toggle');

  // Theme Management
  // 1. Check local storage or fallback to system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  let currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', currentTheme);

  // 2. Toggle Theme on click
  themeToggle.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // Calculate Text Statistics
  function updateStats() {
    const text = textInput.value;

    // 1. Characters (with spaces)
    const charCountWithSpaces = text.length;

    // 2. Characters (no spaces)
    const charCountNoSpaces = text.replace(/\s/g, '').length;

    // 3. Words
    // Split by whitespace and filter out any empty strings
    const wordsArray = text.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = wordsArray.length;

    // 4. Sentences
    // Split by . ! or ? while ignoring empty segments
    const sentenceCount = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;

    // 5. Paragraphs
    // Split by single or multiple newlines
    const paragraphsArray = text.split(/\n+/).filter(p => p.trim().length > 0);
    const paragraphCount = text.trim() === '' ? 0 : paragraphsArray.length;

    // 6. Est. Reading Time (~200 words per minute)
    // Formula: Total seconds = (words / 200) * 60
    const readingSeconds = Math.round((wordCount / 200) * 60);
    const readingMin = Math.floor(readingSeconds / 60);
    const readingSec = readingSeconds % 60;
    
    let readingTimeStr = '0 sec';
    if (wordCount > 0) {
      readingTimeStr = readingMin > 0 ? `${readingMin} min ${readingSec} sec` : `${readingSec} sec`;
    }

    // 7. Est. Speaking Time (~130 words per minute)
    // Formula: Total seconds = (words / 130) * 60
    const speakingSeconds = Math.round((wordCount / 130) * 60);
    const speakingMin = Math.floor(speakingSeconds / 60);
    const speakingSec = speakingSeconds % 60;

    let speakingTimeStr = '0 sec';
    if (wordCount > 0) {
      speakingTimeStr = speakingMin > 0 ? `${speakingMin} min ${speakingSec} sec` : `${speakingSec} sec`;
    }

    // Update DOM
    valWords.textContent = formatNumber(wordCount);
    valCharSpaces.textContent = formatNumber(charCountWithSpaces);
    valCharNoSpaces.textContent = formatNumber(charCountNoSpaces);
    valSentences.textContent = formatNumber(sentenceCount);
    valParagraphs.textContent = formatNumber(paragraphCount);
    valReadingTime.textContent = readingTimeStr;
    valSpeakingTime.textContent = speakingTimeStr;

    // Automatically adjust height of textarea to match content
    autoResizeTextarea();
  }

  // Format numbers with commas (e.g. 1,000) for clean UI
  function formatNumber(num) {
    return num.toLocaleString();
  }

  // Auto-resize the textarea
  function autoResizeTextarea() {
    textInput.style.height = 'auto';
    // Add a tiny bit of extra breathing space but clamp to scrollHeight
    const targetHeight = Math.max(180, textInput.scrollHeight);
    textInput.style.height = `${targetHeight}px`;
  }

  // Clear Text and Reset UI
  function clearText() {
    textInput.value = '';
    updateStats();
    textInput.focus();
    
    // Explicit reset to auto-height on clear
    textInput.style.height = '180px';
  }

  // Copy Statistics to Clipboard
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
        .then(() => showCopiedFeedback())
        .catch(err => fallbackCopy(statsText));
    } else {
      fallbackCopy(statsText);
    }
  }

  // Fallback Copy function for old/unsupported browsers
  function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    // Set position to absolute off-screen
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
      showCopiedFeedback();
    } catch (err) {
      console.error('Fallback copy failed', err);
    }
    document.body.removeChild(textArea);
  }

  // Show "Copied!" message on the copy button temporarily
  function showCopiedFeedback() {
    const originalText = copyStatsBtn.innerHTML;
    copyStatsBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      Copied!
    `;
    copyStatsBtn.classList.add('btn-success');
    copyStatsBtn.disabled = true;

    setTimeout(() => {
      copyStatsBtn.innerHTML = originalText;
      copyStatsBtn.classList.remove('btn-success');
      copyStatsBtn.disabled = false;
    }, 2000);
  }

  // Listeners
  textInput.addEventListener('input', updateStats);
  clearBtn.addEventListener('click', clearText);
  copyStatsBtn.addEventListener('click', copyStats);

  // Keyboard Shortcuts: 
  // Escape key anywhere on page clears everything
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      clearText();
    }
  });

  // Handle auto-resizing on window resize
  window.addEventListener('resize', autoResizeTextarea);

  // Initialize
  updateStats();
  // Ensure the textarea is focused initially on desktop
  if (window.innerWidth > 768) {
    textInput.focus();
  }
});
