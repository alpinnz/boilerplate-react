import './home.page.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

type ColorMode = 'access' | 'accounting';
type FoundationMode = 'desktop' | 'mobile';

export function HomePage() {
  const [colorMode, setColorMode] = useState<ColorMode>('access');
  const [foundationMode, setFoundationMode] = useState<FoundationMode>('desktop');

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-color', colorMode);
    root.setAttribute('data-typography', foundationMode);
    root.setAttribute('data-foundation', foundationMode);
  }, [colorMode, foundationMode]);

  return (
    <main className="platform-home-page">
      <h1>GroApp Access Baseline</h1>
      <p>Feature-first baseline app shell is active.</p>
      <p>Theme mode: {colorMode} / {foundationMode}</p>

      <div className="theme-controls" role="group" aria-label="theme-mode-controls">
        <button type="button" onClick={() => setColorMode('access')}>
          Switch to Access mode
        </button>
        <button type="button" onClick={() => setColorMode('accounting')}>
          Switch to Accounting mode
        </button>
        <button
          type="button"
          onClick={() => setFoundationMode((previous) => (previous === 'desktop' ? 'mobile' : 'desktop'))}
        >
          Toggle mobile foundation
        </button>
      </div>

      <p>
        <Link to="/auth/login">Go to login flow</Link>
      </p>
    </main>
  );
}
