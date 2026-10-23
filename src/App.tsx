import { useState } from 'react';
import Intro from './components/Intro';
import SurveyForm from './components/SurveyForm';
import { Ineligible, ThankYou } from './components/EndScreens';
import { captureRef, store } from './storage';
import './app-pages.css';

type Stage = 'intro' | 'form' | 'ineligible' | 'done';

export default function App() {
  const [ref] = useState(captureRef);
  const [code, setCode] = useState(() => store.get('mlu_done') ?? '');
  const [stage, setStage] = useState<Stage>(code ? 'done' : 'intro');

  return (
    <div className="app-page">
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
    </div>
  );
}