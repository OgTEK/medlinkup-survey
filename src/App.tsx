import { useEffect, useState } from 'react';
import Admin from './admin/Admin';
import Intro from './components/Intro';
import SurveyForm from './components/SurveyForm';
import { Ineligible, ThankYou } from './components/EndScreens';
import { captureRef, store } from './storage';
import './index.css';

type Stage = 'intro' | 'form' | 'ineligible' | 'done';

export default function App() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const on = () => setPath(window.location.pathname);
    window.addEventListener('popstate', on);
    return () => window.removeEventListener('popstate', on);
  }, []);

  const [ref] = useState(captureRef);
  const [code, setCode] = useState(() => store.get('mlu_done') ?? '');
  const [stage, setStage] = useState<Stage>(code ? 'done' : 'intro');

  if (path.startsWith('/admin')) return <Admin />;

  return (
    <div className="shell">
      <header className="brand">
        <span className="brand-mark" aria-hidden>✚</span>
        <span>Medlinkup <em>Research</em></span>
      </header>
      <main>
        {stage === 'intro' && <Intro referred={Boolean(ref)} onContinue={() => setStage('form')} />}
        {stage === 'form' && (
          <SurveyForm
            refCode={ref}
            onIneligible={() => setStage('ineligible')}
            onDone={(c) => {
              store.set('mlu_done', c);
              setCode(c);
              setStage('done');
            }}
          />
        )}
        {stage === 'ineligible' && <Ineligible />}
        {stage === 'done' && <ThankYou code={code} />}
      </main>
      <footer className="foot">© {new Date().getFullYear()} Medlinkup · Independent research · Your answers are anonymous</footer>
    </div>
  );
}
