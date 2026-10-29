import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useGuide } from '../context/GuideContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useLang } from '../i18n/LangContext.jsx';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import CategoryIcon from '../components/CategoryIcon.jsx';
import { QuizBig, RightMark, WrongMark, Retry, ArrowRight, Trophy } from '../components/icons.jsx';
import { readUserData, writeUserData } from '../storage.js';

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/** Seçilmiş mövzulardakı xidmətlərdən avtomatik suallar qurur */
function buildQuestions(categories, topicIds, count) {
  const chosen = categories.filter((c) => topicIds.includes(c.id));
  const pool = chosen.flatMap((c) => c.services.map((s) => ({ ...s, cat: c })));
  const allServices = categories.flatMap((c) => c.services.map((s) => ({ ...s, cat: c })));
  const names = (list) => [...new Set(list.map((s) => s.name))];

  return shuffle(pool).slice(0, count).map((s, i) => {
    const useSection = chosen.length > 1 && i % 3 === 2;
    if (useSection) {
      const wrong = shuffle(categories.filter((c) => c.id !== s.cat.id)).slice(0, 3).map((c) => c.title);
      return {
        type: 'section', prompt: s.name, answer: s.cat.title,
        options: shuffle([s.cat.title, ...wrong]), service: s,
      };
    }
    const sameCat = names(s.cat.services.filter((x) => x.id !== s.id && x.name !== s.name));
    const others = names(allServices.filter((x) => x.cat.id !== s.cat.id && x.name !== s.name));
    const wrong = [...shuffle(sameCat), ...shuffle(others)].filter((n, k, a) => a.indexOf(n) === k).slice(0, 3);
    return {
      type: 'service', prompt: s.brief, answer: s.name,
      options: shuffle([s.name, ...wrong]), service: s,
    };
  });
}

export default function QuizPage() {
  const { categories } = useGuide();
  const { user } = useAuth();
  const { t } = useLang();
  const [params] = useSearchParams();
  const preset = params.get('movzu');

  const [topics, setTopics] = useState(() => (preset ? [preset] : []));
  const [count, setCount] = useState(10);
  const [stage, setStage] = useState('setup'); // setup | run | done
  const [questions, setQuestions] = useState([]);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [picked, setPicked] = useState(null);
  const [warn, setWarn] = useState(false);

  const available = useMemo(
    () => categories.filter((c) => topics.includes(c.id)).reduce((a, c) => a + c.services.length, 0),
    [categories, topics]
  );

  const toggle = (id) => setTopics((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const start = () => {
    if (!topics.length) { setWarn(true); return; }
    setWarn(false);
    setQuestions(buildQuestions(categories, topics, Math.min(count, available)));
    setIdx(0); setAnswers([]); setPicked(null); setStage('run');
    window.scrollTo({ top: 0 });
  };

  const next = () => {
    const all = [...answers, picked];
    setAnswers(all);
    setPicked(null);
    if (idx + 1 < questions.length) {
      setIdx(idx + 1);
    } else {
      const score = all.filter((a, i) => a === questions[i].answer).length;
      const history = readUserData(user, 'quiz', []);
      writeUserData(user, 'quiz', [{ at: Date.now(), topics, score, total: questions.length }, ...history].slice(0, 10));
      setStage('done');
      window.scrollTo({ top: 0 });
    }
  };

  /* ---------------- Mövzu seçimi ---------------- */
  if (stage === 'setup') {
    return (
      <div className="container page-pad">
        <Breadcrumbs items={[{ label: t('quizTitle') }]} />
        <header className="page-head">
          <span className="page-head__icon"><QuizBig size={36} /></span>
          <div>
            <h1>{t('quizTitle')}</h1>
            <p>{t('quizLead')}</p>
          </div>
        </header>

        <section className="panel">
          <h2 className="panel__title">
            <span>{t('chooseTopics')}</span>
            <span className="quiz__links">
              <button className="textlink" onClick={() => setTopics(categories.map((c) => c.id))}>{t('selectAll')}</button>
              <button className="textlink" onClick={() => setTopics([])}>{t('clearAll')}</button>
            </span>
          </h2>
          <div className="topics">
            {categories.map((c) => (
              <label key={c.id} className={`topic ${topics.includes(c.id) ? 'is-on' : ''}`}>
                <input type="checkbox" checked={topics.includes(c.id)} onChange={() => toggle(c.id)} />
                <CategoryIcon name={c.icon} size={24} className="topic__icon" />
                <span>
                  <strong>{c.title}</strong>
                  <small>{c.services.length} {t('servicesIn')}</small>
                </span>
              </label>
            ))}
          </div>

          <div className="quiz__setup">
            <div>
              <span className="field__label">{t('questionsCount')}</span>
              <div className="chips">
                {[5, 10, 15].map((n) => (
                  <button key={n} className={count === n ? 'is-active' : ''} aria-pressed={count === n} onClick={() => setCount(n)}>{n}</button>
                ))}
              </div>
            </div>
            <button className="btn btn--primary btn--lg" onClick={start}>{t('startQuiz')} <ArrowRight size={20} /></button>
          </div>
          {warn && <div className="notice notice--error">{t('needTopic')}</div>}
        </section>
      </div>
    );
  }

  /* ---------------- Nəticə ---------------- */
  if (stage === 'done') {
    const score = answers.filter((a, i) => a === questions[i].answer).length;
    const pct = Math.round((score / questions.length) * 100);
    const msg = pct >= 80 ? t('resultGreat') : pct >= 50 ? t('resultGood') : t('resultLow');
    return (
      <div className="container page-pad">
        <Breadcrumbs items={[{ label: t('quizTitle'), to: '/ozunu-yoxla' }, { label: t('yourResult') }]} />
        <section className="result">
          <Trophy size={56} className="result__icon" />
          <div>
            <p className="eyebrow">{t('yourResult')}</p>
            <h1>{score} / {questions.length} <small>· {pct}%</small></h1>
            <p>{msg}</p>
          </div>
          <div className="result__actions">
            <button className="btn btn--primary" onClick={start}><Retry size={18} /> {t('retry')}</button>
            <button className="btn btn--outline" onClick={() => setStage('setup')}>{t('newQuiz')}</button>
          </div>
        </section>

        <h2 className="quiz__review-title">{t('review')}</h2>
        <ol className="review">
          {questions.map((q, i) => {
            const ok = answers[i] === q.answer;
            return (
              <li key={i} className={ok ? 'is-ok' : 'is-bad'}>
                {ok ? <RightMark size={22} className="review__mark" /> : <WrongMark size={22} className="review__mark" />}
                <div>
                  <p className="review__q">{q.type === 'service' ? t('qWhichService') : t('qWhichSection')} <em>«{q.prompt}»</em></p>
                  {!ok && <p className="review__a review__a--bad">{t('yourAnswer')}: {answers[i]}</p>}
                  <p className="review__a">{t('correctAnswer')}: <strong>{q.answer}</strong></p>
                  <Link to={`/bolmeler/${q.service.cat.id}/${q.service.id}`} className="textlink">{t('readMore')} <ArrowRight size={14} /></Link>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }

  /* ---------------- Sual ---------------- */
  const q = questions[idx];
  return (
    <div className="container page-pad">
      <div className="quiz">
        <div className="quiz__progress">
          <span>{t('question')} {idx + 1} {t('of')} {questions.length}</span>
          <div className="quiz__bar"><i style={{ width: `${((idx) / questions.length) * 100}%` }} /></div>
        </div>
        <p className="quiz__label">{q.type === 'service' ? t('qWhichService') : t('qWhichSection')}</p>
        <h2 className="quiz__prompt">«{q.prompt}»</h2>
        <div className="quiz__options" role="radiogroup">
          {q.options.map((o, k) => (
            <button key={o} role="radio" aria-checked={picked === o}
              className={`opt ${picked === o ? 'is-picked' : ''}`} onClick={() => setPicked(o)}>
              <span className="opt__key">{String.fromCharCode(65 + k)}</span>
              <span>{o}</span>
            </button>
          ))}
        </div>
        <div className="quiz__foot">
          <button className="btn btn--primary btn--lg" disabled={!picked} onClick={next}>
            {idx + 1 < questions.length ? t('nextQ') : t('finish')} <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
