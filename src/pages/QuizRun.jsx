import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CheckCircle2, XCircle, RotateCcw, Trophy, ListChecks } from 'lucide-react';
import { getQuiz } from '../data/quizzes.js';
import { useProgress } from '../hooks/useProgress.js';
import { Breadcrumbs, ProgressBar } from '../components/ui.jsx';
import NotFound from './NotFound.jsx';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

export default function QuizRun() {
  const { id } = useParams();
  const quiz = getQuiz(id);
  const { addResult } = useProgress();
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);
  if (!quiz) return <NotFound />;

  const total = quiz.questions.length;
  const score = quiz.questions.filter((q, i) => answers[i] === q.answer).length;
  const percent = Math.round((score / total) * 100);
  const q = quiz.questions[idx];

  const finish = () => { setFinished(true); addResult({ quizId: quiz.id, title: quiz.title, score, total, percent }); };
  const restart = () => { setAnswers({}); setIdx(0); setFinished(false); };

  const crumbs = <Breadcrumbs items={[{ label: 'Testlər', to: '/testler' }, { label: quiz.title }]} />;

  if (finished) {
    const grade = percent >= 80 ? ['Əla nəticə!', 'text-emerald-600'] : percent >= 50 ? ['Yaxşı nəticə', 'text-unec-600'] : ['Mövzunu təkrarlamaq tövsiyə olunur', 'text-amber-600'];
    return (
      <div className="space-y-6">
        {crumbs}
        <section className="card p-6 text-center sm:p-10">
          <Trophy size={44} className={`mx-auto ${grade[1]}`} />
          <h1 className="mt-3 text-2xl sm:text-3xl">Nəticə: {score} / {total}</h1>
          <p className={`mt-1 text-lg font-semibold ${grade[1]}`}>{percent}% · {grade[0]}</p>
          <ProgressBar value={percent} className="mx-auto mt-5 max-w-md" />
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button onClick={restart} className="btn-primary"><RotateCcw size={17} /> Yenidən keç</button>
            <Link to="/testler" className="btn-outline"><ListChecks size={17} /> Bütün testlər</Link>
          </div>
        </section>
        <section className="card p-5 sm:p-6">
          <h2 className="mb-4 text-lg">Cavabların təhlili</h2>
          <ol className="space-y-4">
            {quiz.questions.map((qq, i) => {
              const ok = answers[i] === qq.answer;
              return (
                <li key={i} className={`rounded-xl border p-4 ${ok ? 'border-emerald-200 bg-emerald-50/60' : 'border-red-200 bg-red-50/60'}`}>
                  <p className="flex gap-2 font-semibold text-slate-800">
                    {ok ? <CheckCircle2 size={20} className="shrink-0 text-emerald-600" /> : <XCircle size={20} className="shrink-0 text-red-600" />}
                    {i + 1}. {qq.q}
                  </p>
                  <p className="mt-2 pl-7 text-sm text-slate-700">Düzgün cavab: <strong>{qq.options[qq.answer]}</strong></p>
                  {!ok && <p className="pl-7 text-sm text-red-700">Sizin cavab: {answers[i] !== undefined ? qq.options[answers[i]] : 'cavab verilməyib'}</p>}
                </li>
              );
            })}
          </ol>
        </section>
      </div>
    );
  }

  const answered = Object.keys(answers).length;
  return (
    <div className="space-y-6">
      {crumbs}
      <section className="card p-5 sm:p-7">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2 text-sm">
          <h1 className="text-xl">{quiz.title}</h1>
          <span className="font-semibold text-slate-500">Sual {idx + 1} / {total}</span>
        </div>
        <ProgressBar value={(answered / total) * 100} className="mb-6" />
        <fieldset>
          <legend className="mb-4 text-lg font-semibold text-unec-900">{q.q}</legend>
          <div className="space-y-2.5">
            {q.options.map((o, i) => {
              const sel = answers[idx] === i;
              return (
                <label key={i} className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${sel ? 'border-unec-600 bg-unec-50 ring-1 ring-unec-600' : 'border-unec-100 hover:border-unec-300'}`}>
                  <input type="radio" name={`q${idx}`} className="sr-only" checked={sel} onChange={() => setAnswers((a) => ({ ...a, [idx]: i }))} />
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold ${sel ? 'bg-unec-800 text-white' : 'bg-unec-100 text-unec-700'}`}>{LETTERS[i]}</span>
                  <span className="text-slate-800">{o}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-unec-100 pt-5">
          <button onClick={() => setIdx((i) => i - 1)} disabled={idx === 0} className="btn-outline"><ChevronLeft size={17} /> Əvvəlki</button>
          {idx < total - 1 ? (
            <button onClick={() => setIdx((i) => i + 1)} disabled={answers[idx] === undefined} className="btn-primary">Növbəti <ChevronRight size={17} /></button>
          ) : (
            <button onClick={finish} disabled={answered < total} className="btn-primary"><CheckCircle2 size={17} /> Testi bitir</button>
          )}
        </div>
      </section>
    </div>
  );
}
