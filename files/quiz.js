/* ============================================================
   js/quiz.js — Quiz de identidad cultural "¿Cuál eres tú?"
   Seres del Ecuador v1.0

   RN-06: El quiz es lúdico y cultural, sin implicación
          clínica, étnica ni diagnóstica.
   ============================================================ */

const quiz = (() => {

  let answers    = [];
  let currentQ   = 0;
  let questions  = [];
  let container  = null;

  /* ── Cargar preguntas desde i18n ── */
  function loadQuestions() {
    const count = 6;
    questions = [];
    for (let i = 0; i < count; i++) {
      questions.push({
        q: i18n.t(`quiz.questions.${i}.q`),
        a: i18n.t(`quiz.questions.${i}.a`), /* opción A → DH */
        b: i18n.t(`quiz.questions.${i}.b`), /* opción B → CU */
      });
    }
  }

  /* ── Calcular resultado ── */
  function getResult() {
    const dhVotes = answers.filter(a => a === 'dh').length;
    return dhVotes >= answers.length / 2 ? 'dh' : 'cu';
  }

  /* ── Render: barra de progreso ── */
  function renderProgress() {
    return `
      <div class="quiz-progress" aria-label="Pregunta ${currentQ + 1} de ${questions.length}">
        ${questions.map((_, i) => `
          <span class="quiz-progress-dot ${
            i < currentQ  ? 'is-done'   :
            i === currentQ ? 'is-active' : ''
          }"></span>
        `).join('')}
      </div>
    `;
  }

  /* ── Render: pregunta activa ── */
  function renderQuestion() {
    const q = questions[currentQ];
    if (!q) return '';

    return `
      ${renderProgress()}
      <p class="quiz-question">${q.q}</p>
      <div class="quiz-options">
        <button class="quiz-option" data-choice="dh">${q.a}</button>
        <button class="quiz-option" data-choice="cu">${q.b}</button>
      </div>
    `;
  }

  /* ── Render: resultado final ── */
  function renderResult() {
    const result = getResult();
    const name = i18n.t(`quiz.result.${result}.title`);
    const body = i18n.t(`quiz.result.${result}.body`);

    return `
      <div class="quiz-result">
        <div class="quiz-result__name">${name}</div>
        <p class="quiz-result__body">${body}</p>
        <button class="quiz-btn" id="quiz-restart">${i18n.t('quiz.restart')}</button>
      </div>
    `;
  }

  /* ── Montar la pregunta en el DOM ── */
  function mount() {
    if (!container) return;
    container.innerHTML = renderQuestion();

    /* Listeners de opciones */
    container.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => selectOption(btn.dataset.choice));
    });
  }

  /* ── Seleccionar opción ── */
  function selectOption(choice) {
    /* Feedback visual breve */
    container.querySelectorAll('.quiz-option').forEach(btn => {
      btn.classList.toggle('is-selected', btn.dataset.choice === choice);
      btn.disabled = true;
    });

    answers.push(choice);

    /* Siguiente pregunta o resultado */
    setTimeout(() => {
      currentQ++;
      if (currentQ < questions.length) {
        mount();
      } else {
        showResult();
        /* Cambiar el tema del sitio al resultado */
        theme.apply(getResult());
      }
    }, 500);
  }

  /* ── Mostrar resultado ── */
  function showResult() {
    if (!container) return;
    container.innerHTML = renderResult();

    document.getElementById('quiz-restart')?.addEventListener('click', restart);
  }

  /* ── Reiniciar ── */
  function restart() {
    answers   = [];
    currentQ  = 0;
    loadQuestions();
    mount();
  }

  /* ── Mostrar pantalla de inicio ── */
  function renderStart() {
    return `
      <button class="quiz-btn" id="quiz-start">${i18n.t('quiz.start')}</button>
    `;
  }

  /* ── Init ── */
  function init() {
    container = document.getElementById('quiz-container');
    if (!container) return;

    loadQuestions();
    container.innerHTML = renderStart();

    document.getElementById('quiz-start')?.addEventListener('click', () => {
      mount();
    });

    /* Recargar preguntas cuando cambia el idioma */
    document.addEventListener('langchange', () => {
      loadQuestions();
      if (currentQ === 0 && answers.length === 0) {
        container.innerHTML = renderStart();
        document.getElementById('quiz-start')?.addEventListener('click', () => mount());
      }
    });
  }

  return { init, restart };
})();
