import React, { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && name) {
      // In a real app, we'd send this to a backend
      console.log('Subscriber:', { name, email });
      setSubmitted(true);
      setEmail('');
      setName('');
    }
  };

  const topPicks = [
    {
      symbol: 'DRAM',
      name: 'Roundhill Memory ETF',
      performance: '~+145%',
      period: 'Since Inception',
      reason: 'Captures the massive early 2026 shift in the AI hardware supercycle, where High-Bandwidth Memory (HBM3e/HBM4) emerged as the primary hardware bottleneck.',
      link: 'https://www.roundhillinvestments.com/etf/dram'
    },
    {
      symbol: 'SOXQ',
      name: 'Invesco PHLX Semiconductor ETF',
      performance: '+96.71%',
      period: 'YTD',
      reason: 'Leads broad semiconductor ETFs in 2026 due to high concentration in networking silicon (Marvell, Broadcom) and memory chips (Micron).',
      link: 'https://www.invesco.com/us/en/financial-products/etfs/invesco-phlx-semiconductor-etf.html'
    },
    {
      symbol: 'SMH',
      name: 'VanEck Semiconductor ETF',
      performance: '+77.10%',
      period: 'YTD',
      reason: 'A pure-play bet on the hardware engines of the AI revolution, with high concentration in NVIDIA and TSMC.',
      link: 'https://www.vaneck.com/us/en/investments/semiconductor-etf-smh/'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">AITrack</span>
              <span className="text-2xl font-bold text-gray-800">Select</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-gray-600 hover:text-blue-600 font-medium">What We Do</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 font-medium">How It Works</a>
              <a href="#picks" className="text-gray-600 hover:text-blue-600 font-medium">Top Picks</a>
              <a href="#newsletter" className="text-gray-600 hover:text-blue-600 font-medium">Newsletter</a>
            </div>
            <div>
              <a href="#newsletter" className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition">
                Subscribe
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-white py-16 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
            AI ETF Intelligence — <br />
            <span className="text-blue-600 italic">Tracked, Ranked, Delivered.</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
            We track AI-focused ETFs, rank them by performance, and deliver actionable picks so you don't have to sift through noisy fund data.
          </p>
          <div className="mt-10 flex justify-center">
            <div className="rounded-md shadow">
              <a href="#newsletter" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition">
                Start Tracking for Free
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* What We Do Section */}
      <section id="about" className="bg-gray-100 py-16 sm:py-24 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">What We Do</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
            The AI sector moves fast. Thousands of funds claim to be "AI-focused," but only a handful truly capture the alpha. We use data-driven analysis to separate the winners from the noise.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </div>
              <p className="text-4xl font-bold text-blue-600">50+</p>
              <p className="mt-2 text-gray-600 uppercase tracking-wide text-sm font-semibold">ETFs Tracked</p>
              <p className="mt-4 text-gray-500 text-sm">Deep coverage of robotics, ML, and chipmakers.</p>
            </div>
            <div className="p-8 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <p className="text-4xl font-bold text-blue-600">Real-time</p>
              <p className="mt-2 text-gray-600 uppercase tracking-wide text-sm font-semibold">Data Monitoring</p>
              <p className="mt-4 text-gray-500 text-sm">Always-on tracking of returns and AUM shifts.</p>
            </div>
            <div className="p-8 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              <p className="text-4xl font-bold text-blue-600">10k+</p>
              <p className="mt-2 text-gray-600 uppercase tracking-wide text-sm font-semibold">Smart Investors</p>
              <p className="mt-4 text-gray-500 text-sm">Join our community of data-driven portfolio managers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600">Simple, data-driven intelligence in three steps.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">1</div>
              <h3 className="text-xl font-bold mb-3">We Track</h3>
              <p className="text-gray-600">Our systems monitor performance, expense ratios, and underlying holdings for over 50 AI-focused ETFs daily.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">2</div>
              <h3 className="text-xl font-bold mb-3">We Rank</h3>
              <p className="text-gray-600">We rank every fund based on a proprietary score that weighs returns, volatility, and sector concentration.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">3</div>
              <h3 className="text-xl font-bold mb-3">You Profit</h3>
              <p className="text-gray-600">Every Monday, we deliver the Top 3 picks with brief, actionable analysis straight to your inbox.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Picks Section */}
      <section id="picks" className="py-16 sm:py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Weekly Top 3 Picks</h2>
            <p className="mt-4 text-lg text-gray-600">Our latest analysis of the best-performing AI ETFs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topPicks.map((pick, idx) => (
              <div key={pick.symbol} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 flex flex-col">
                <div className="bg-blue-600 px-6 py-4 flex justify-between items-center text-white">
                  <span className="font-bold text-xl">{pick.symbol}</span>
                  <span className="bg-blue-500 px-2 py-1 rounded text-xs font-bold uppercase">#{idx + 1} Rank</span>
                </div>
                <div className="p-6 flex-grow">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{pick.name}</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-3xl font-extrabold text-green-600">{pick.performance}</span>
                    <span className="ml-2 text-gray-500 text-sm font-medium">{pick.period} Return</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {pick.reason}
                  </p>
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <a href={pick.link} className="text-blue-600 font-semibold hover:text-blue-800 flex items-center transition">
                    View Analysis 
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-gray-500 italic">Next update: June 30, 2026</p>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="bg-blue-600 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
            Stop guessing. Start tracking.
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Join 10,000+ investors receiving our weekly AI ETF performance rankings and top 3 picks.
          </p>
          
          {submitted ? (
            <div className="bg-green-500 text-white p-8 rounded-lg shadow-xl inline-block max-w-md w-full">
              <h3 className="text-2xl font-bold mb-2">Welcome, {name.split(' ')[0]}!</h3>
              <p>Check your inbox for our latest weekly picks. We're excited to have you on board.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-blue-700 p-8 rounded-xl shadow-2xl">
              <div className="space-y-4">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  className="w-full px-5 py-4 border border-transparent rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  className="w-full px-5 py-4 border border-transparent rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-5 py-4 border border-transparent text-lg font-bold rounded-lg text-blue-600 bg-white hover:bg-blue-50 transition transform hover:scale-105"
                >
                  Get the Newsletter
                </button>
              </div>
              <p className="mt-4 text-blue-200 text-xs">
                Free forever. One-click unsubscribe anytime. We never share your data.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center items-center mb-6">
            <span className="text-xl font-bold text-blue-600">AITrack</span>
            <span className="text-xl font-bold text-gray-800">Select</span>
          </div>
          <div className="flex justify-center space-x-6 mb-6">
            <a href="#about" className="text-gray-500 hover:text-blue-600 text-sm">About</a>
            <a href="#picks" className="text-gray-500 hover:text-blue-600 text-sm">Top Picks</a>
            <a href="#newsletter" className="text-gray-500 hover:text-blue-600 text-sm">Contact</a>
          </div>
          <p className="text-gray-500 text-sm">
            &copy; 2026 AITrack Select. All rights reserved. 
            <span className="mx-2">|</span>
            <a href="#" className="hover:text-blue-600">Privacy Policy</a>
            <span className="mx-2">|</span>
            <a href="#" className="hover:text-blue-600">Terms of Service</a>
          </p>
          <p className="mt-4 text-gray-400 text-xs max-w-lg mx-auto leading-relaxed">
            Disclaimer: AITrack Select is an informational service and does not constitute financial advice. All investments carry risk. Past performance is not indicative of future results.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
