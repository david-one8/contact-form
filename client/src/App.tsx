import { useState } from 'react';
import ContactForm from './components/ContactForm';
import SubmissionsList from './components/SubmissionsList';
import ThemeToggle from './components/ThemeToggle';
import { useTheme } from './hooks/useTheme';

type View = 'form' | 'admin';

function App() {
  const [view, setView] = useState<View>('form');
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-300 dark:bg-gray-950">
      {/* Decorative gradient blob */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 right-0 h-125 w-125 rounded-full bg-primary-400/10 blur-3xl dark:bg-primary-600/5" />
        <div className="absolute -bottom-40 left-0 h-125 w-125 rounded-full bg-primary-300/10 blur-3xl dark:bg-primary-500/5" />
      </div>

      {/* Navigation */}
      <header className="relative z-10 border-b border-gray-200/80 bg-white/80 backdrop-blur-lg dark:border-gray-800/80 dark:bg-gray-900/80">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          {/* Logo / brand */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 shadow-md shadow-primary-500/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              ContactHub
            </span>
          </div>

          {/* Nav tabs */}
          <nav className="flex items-center gap-1 rounded-xl bg-gray-100 p-1 dark:bg-gray-800">
            <button
              onClick={() => setView('form')}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200 sm:px-4 sm:py-2 ${
                view === 'form'
                  ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              <span className="hidden sm:inline">Contact </span>Form
            </button>
            <button
              onClick={() => setView('admin')}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200 sm:px-4 sm:py-2 ${
                view === 'admin'
                  ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              <span className="hidden sm:inline">Admin </span>Submissions
            </button>
          </nav>

          {/* Theme toggle */}
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 px-4 py-8 sm:px-6 sm:py-12">
        {view === 'form' ? <ContactForm /> : <SubmissionsList />}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-200/80 py-6 text-center text-sm text-gray-400 dark:border-gray-800/80 dark:text-gray-500">
        &copy; {new Date().getFullYear()} ContactHub. Built with React &amp;
        Express.
      </footer>
    </div>
  );
}

export default App;
