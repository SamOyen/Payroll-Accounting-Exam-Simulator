const STORAGE_KEY = "payroll-accounting-exam-progress-v1";
const LETTERS = ["A", "B", "C", "D"];

// Edit or extend this array to maintain the question bank. Do not add current tax rates
// unless the relevant figures are supplied in the question itself.
const QUESTION_BANK = [
  { id: "pmod-01", topic: "PAYE Modernisation", prompt: "What is the main feature of PAYE Modernisation (PMOD)?", options: ["Real-time payroll reporting", "Removing all payroll records", "Replacing every payslip with an invoice", "Reporting only once every five years"], answer: "Real-time payroll reporting", hint: "PMOD changed payroll reporting from an older periodic approach to a real-time approach.", explanation: "The supplied notes describe PMOD as enabling real-time payroll tax reporting and submissions, helping reduce discrepancies and improve compliance.", revisionTip: "Remember: PMOD means payroll information is reported as pay is made." },
  { id: "ros-01", topic: "Revenue Online Service", prompt: "What does ROS stand for?", options: ["Revenue Online Service", "Revenue Office Salary", "Registered Online System", "Payroll Reporting Office"], answer: "Revenue Online Service", hint: "ROS is the online service used by business taxpayers to manage Revenue affairs.", explanation: "ROS stands for Revenue Online Service. The notes describe it as a secure online service for business taxpayers and agents.", revisionTip: "ROS is the online channel for many Revenue filings and payments." },
  { id: "ros-02", topic: "Revenue Online Service", prompt: "Which is a feature of ROS described in the supplied notes?", options: ["Submitting payroll files online", "Issuing company shares", "Calculating bank interest for customers", "Replacing every employment contract"], answer: "Submitting payroll files online", hint: "ROS is used for tax returns, payroll submissions and other Revenue services.", explanation: "ROS can be used to file tax returns and submit payroll files online, as well as view payroll reports and other Revenue information.", revisionTip: "ROS supports online Revenue filing, reporting and payment activities." },
  { id: "myaccount-01", topic: "Revenue MyAccount", prompt: "What can a PAYE worker use Revenue MyAccount to do?", options: ["View tax records and payroll details", "Create an employer's bank account", "Submit a supplier's invoice", "Change the employer's accounting equation"], answer: "View tax records and payroll details", hint: "MyAccount is the online service for individuals and their tax affairs.", explanation: "Revenue MyAccount allows PAYE workers to access tax records and payroll details and manage many tax affairs electronically.", revisionTip: "ROS is mainly for business taxpayers; MyAccount is for individuals." },
  { id: "employer-01", topic: "Employer duties", prompt: "Which is an employer duty to Revenue?", options: ["Register as an employer before legally employing staff and deducting payroll taxes", "Ignore all employee records", "Submit payroll only when convenient", "Pay statutory deductions to suppliers"], answer: "Register as an employer before legally employing staff and deducting payroll taxes", hint: "The notes list registration as the first duty in the employer-to-Revenue section.", explanation: "An employer must register with Revenue as an employer in order to legally employ staff and deduct payroll taxes.", revisionTip: "Employer registration is a compliance step, not an optional payroll feature." },
  { id: "rpn-01", topic: "Revenue Payroll Notification", prompt: "What information does an RPN provide to an employer?", options: ["Annual tax credits, annual SRCOP and annual USC cut-off points", "The employee's annual leave dates only", "The employer's inventory balance", "A supplier's bank details"], answer: "Annual tax credits, annual SRCOP and annual USC cut-off points", hint: "An RPN provides the payroll tax information needed for the employee.", explanation: "A Revenue Payroll Notification provides the employee's annual tax credits, annual Standard Rate Cut-Off Point and annual USC cut-off points, together with the tax basis.", revisionTip: "RPN information helps the employer calculate payroll deductions correctly." },
  { id: "rpn-02", topic: "Revenue Payroll Notification", prompt: "For how long is an RPN valid according to the supplied notes?", options: ["For the tax year to which it relates", "Forever", "Only until the next pay day", "For six complete tax years"], answer: "For the tax year to which it relates", hint: "The notes distinguish an RPN from older documents by its tax-year validity.", explanation: "The supplied notes state that an RPN is valid only for the tax year to which it relates and is not automatically valid for later tax years.", revisionTip: "Check the tax year when using an RPN." },
  { id: "rpn-03", topic: "Emergency tax", prompt: "What should the employer do when an RPN cannot be retrieved for an employee?", options: ["Apply the emergency tax basis", "Pay the employee without recording anything", "Use the supplier invoice rate", "Delete the employee record"], answer: "Apply the emergency tax basis", hint: "The notes give a specific payroll response when an RPN is not found.", explanation: "If an RPN is not available because of a missing or invalid PPSN or registration issue, the supplied notes say the appropriate action is to apply the emergency tax basis.", revisionTip: "No RPN does not mean no payroll calculation; it means the emergency basis may apply." },
  { id: "submission-01", topic: "Payroll submissions", prompt: "When should a payroll submission be made?", options: ["On or before the date employees are paid", "Only at the end of the tax year", "Only after an employee leaves", "Whenever the employer has spare time"], answer: "On or before the date employees are paid", hint: "PMOD requires payroll information for each pay period as pay is made.", explanation: "The supplied notes say payroll submissions must be made to Revenue on or before the date employees are paid.", revisionTip: "Every pay date creates a payroll reporting requirement." },
  { id: "submission-02", topic: "Payroll submissions", prompt: "What minimum number of payroll submissions is associated with weekly payroll in the notes?", options: ["12", "24", "52", "365"], answer: "52", hint: "There are 52 weekly pay periods in the course example.", explanation: "The notes state that weekly payroll requires a minimum of 52 payroll submissions, while monthly payroll requires a minimum of 12.", revisionTip: "Match the number of submissions to the pay frequency." },
  { id: "submission-03", topic: "Payroll submissions", prompt: "Which is one of the three payroll reporting methods listed in the PMOD notes?", options: ["Direct payroll integration", "Handing a payslip to a supplier", "Posting the figures on social media", "Submitting only by paper cheque"], answer: "Direct payroll integration", hint: "The three methods are direct integration, upload/download and ROS Online.", explanation: "The notes list direct payroll integration, upload and download, and ROS Online as methods of reporting payroll information.", revisionTip: "Know the three routes: integration, file upload/download and ROS Online." },
  { id: "monthly-01", topic: "Monthly statement", prompt: "When is the monthly statement made available according to the supplied notes?", options: ["By the 5th of the following month", "By the 14th of the same month", "By the 23rd of the same month", "Only at year-end"], answer: "By the 5th of the following month", hint: "The monthly statement follows the payroll submissions for the month.", explanation: "The notes state that Revenue issues the monthly statement by the 5th of the following month.", revisionTip: "The 5th is the issue date; it is not the employer's final acceptance date." },
  { id: "monthly-02", topic: "Monthly return", prompt: "What happens if an employer does not accept or amend the monthly statement by the 14th?", options: ["It is deemed accepted and becomes the statutory return", "It is automatically deleted", "The employee becomes the employer", "A new tax year begins"], answer: "It is deemed accepted and becomes the statutory return", hint: "The notes explain the consequence of taking no action.", explanation: "The supplied notes say the monthly statement is deemed accepted and becomes the statutory monthly return on the 14th if no action is taken.", revisionTip: "Reconcile and correct the statement before the return due date." },
  { id: "monthly-03", topic: "Monthly payment", prompt: "If the return and payment are both made online, what payment date is given in the supplied notes?", options: ["The 5th of the following month", "The 14th of the following month", "The 23rd of the following month", "The 31st of the tax year"], answer: "The 23rd of the following month", hint: "The notes describe an extended payment date where filing and payment are online.", explanation: "The supplied notes state that payment is extended to the 23rd of the following month when the return and payment are both made online.", revisionTip: "Remember the distinction between the return date and the online payment extension." },
  { id: "taxyear-01", topic: "Tax year", prompt: "What period is the income tax or payroll tax year based on in the notes?", options: ["1 January to 31 December", "1 April to 31 March", "1 July to 30 June", "The employee's start date to leaving date"], answer: "1 January to 31 December", hint: "The notes describe the Irish income tax year as a calendar year.", explanation: "The supplied notes state that the income tax year is based on the calendar year, from 1 January to 31 December.", revisionTip: "Cumulative payroll calculations reset when the tax year changes." },
  { id: "credits-01", topic: "Tax credits", prompt: "What do tax credits do in the PAYE calculation?", options: ["Reduce the gross income tax liability", "Increase gross pay", "Reduce the employee's hours", "Replace the RPN"], answer: "Reduce the gross income tax liability", hint: "A tax credit is set against tax, not added to earnings.", explanation: "The notes state that tax credits reduce the amount of tax an employee has to pay. They do not increase gross pay or replace an RPN.", revisionTip: "Tax credits reduce tax due; they are not a refund of wages." },
  { id: "credits-02", topic: "Tax credits", prompt: "Under the cumulative basis, how are unused tax credits treated?", options: ["They can carry to later pay periods within the same tax year", "They are always paid as cash immediately", "They carry into every future tax year", "They increase gross pay"], answer: "They can carry to later pay periods within the same tax year", hint: "The notes say unused credits can move forward, but only within the current tax year.", explanation: "Unused tax credits can be carried forward to later pay periods within the same tax year. Unused amounts are not carried into the next tax year.", revisionTip: "Cumulative means carry forward within the year, not beyond it." },
  { id: "deductions-01", topic: "Taxable pay", prompt: "Which approved deductions reduce taxable pay for income tax purposes in the notes?", options: ["Approved pension, PRSA, PHI or RAC contributions", "Every employer PRSI contribution", "All supplier invoices", "The employee's full gross pay"], answer: "Approved pension, PRSA, PHI or RAC contributions", hint: "Approved pension-related deductions can reduce pay liable for income tax.", explanation: "The notes state that Revenue-approved pension, PRSA, PHI and RAC deductions can reduce taxable pay for income tax purposes.", revisionTip: "Approved deductions affect taxable pay, not necessarily every payroll charge." },
  { id: "deductions-02", topic: "PRSI and USC", prompt: "According to the supplied notes, approved income-tax deductions are not used to reduce which calculations?", options: ["PRSI and USC calculated on gross pay", "The employee's name", "The pay date", "The Employment ID"], answer: "PRSI and USC calculated on gross pay", hint: "The notes specifically say PRSI and USC are calculated on Gross Pay.", explanation: "The notes distinguish income tax from PRSI and USC: approved deductions can reduce taxable pay for income tax, while PRSI and USC are calculated on gross pay.", revisionTip: "Do not subtract approved income-tax deductions before every payroll calculation." },
  { id: "gross-01", topic: "Gross pay", prompt: "What can be included in gross pay according to the course notes?", options: ["Wages, salary, bonuses, overtime, holiday pay, allowances and BIK", "Only basic salary after deductions", "Only the employee's net bank payment", "Only voluntary deductions"], answer: "Wages, salary, bonuses, overtime, holiday pay, allowances and BIK", hint: "Gross pay is employment income before deductions.", explanation: "The notes describe gross pay as employment income before deductions, including wages, salary, bonuses, commission, overtime, holiday pay, sick pay, allowances and benefit-in-kind.", revisionTip: "Gross pay comes before statutory and voluntary deductions." },
  { id: "basis-01", topic: "Tax basis", prompt: "What is the difference between cumulative basis and Week 1/Month 1 basis?", options: ["Cumulative considers earlier pay in the tax year; Week 1/Month 1 does not", "They are exactly the same", "Week 1/Month 1 carries unused credits into later tax years", "Cumulative ignores all earlier pay"], answer: "Cumulative considers earlier pay in the tax year; Week 1/Month 1 does not", hint: "One basis carries information forward within the year; the other calculates period by period.", explanation: "The notes define cumulative basis as considering earnings and tax already paid in the year. Week 1/Month 1 basis calculates each period without carryover from previous periods.", revisionTip: "Identify the tax basis before applying credits, cut-off points or prior pay." },
  { id: "employment-01", topic: "Employment ID", prompt: "What does an Employment ID identify?", options: ["Each employment an employee holds with an employer", "The employer's bank account", "A supplier's invoice", "The employee's annual leave balance"], answer: "Each employment an employee holds with an employer", hint: "The notes use Employment ID to distinguish separate employment periods or roles.", explanation: "An Employment ID uniquely identifies each employment an employee holds with an employer and is used on RPN and payroll submission information.", revisionTip: "Do not confuse Employment ID with PPSN or Employer Reference Number." },
  { id: "reference-01", topic: "Employer Reference Number", prompt: "When is an Employer Reference Number used in payroll submissions?", options: ["When an employee has no PPSN", "Whenever an employee receives holiday pay", "Only for supplier invoices", "Instead of recording the pay date"], answer: "When an employee has no PPSN", hint: "The notes describe it as the identifier used until the employee's PPSN becomes known.", explanation: "Where an employee has no PPSN, the Employer Reference Number links the employee with the relevant employment and must appear on payroll submissions until the PPSN is known.", revisionTip: "PPSN is preferred; the employer reference is used when PPSN is unavailable." },
  { id: "correction-01", topic: "Payroll corrections", prompt: "Which is usually a non-financial correction that can be reported in the current payroll submission?", options: ["An employee's address", "A wrong PPSN", "A wrong pay date", "An incorrect gross pay amount"], answer: "An employee's address", hint: "Non-financial examples include name, address, date of birth and pay frequency.", explanation: "The notes list an employee's address as a non-financial correction that can usually be reported in the current submission. Financial or key identity errors may require amendment of the earlier submission.", revisionTip: "Separate corrections to personal details from corrections to pay or identity data." },
  { id: "correction-02", topic: "Payroll corrections", prompt: "Which error is listed as requiring an amendment to the previous Payroll Submission?", options: ["An incorrect PPSN", "A spelling preference in an internal note", "A new office supplier", "A future holiday request"], answer: "An incorrect PPSN", hint: "Financial and key identity information is corrected in the submission containing the error.", explanation: "The notes list Employee PPSN among the financial-information corrections that require correction and amendment to the previous Payroll Submission.", revisionTip: "Check PPSN, pay date, RPN, gross pay and tax fields carefully before submitting." },
  { id: "records-01", topic: "Record retention", prompt: "How long must statutory deduction records generally be retained according to the supplied notes?", options: ["Six complete tax years", "One week", "Until the next pay day", "Forever in every case"], answer: "Six complete tax years", hint: "The notes give a six-year period and an exception for an ongoing investigation.", explanation: "The supplied notes say employers and pension providers must retain records for six complete tax years, and longer if an investigation is still underway.", revisionTip: "Retention is a compliance control; keep records secure and retrievable." },
  { id: "holiday-01", topic: "Holiday pay", prompt: "What is excluded from holiday pay in the supplied example?", options: ["Overtime, bonuses and commissions", "Normal pay", "A regular allowance", "The employee's ordinary salary"], answer: "Overtime, bonuses and commissions", hint: "The note says holiday pay includes normal pay plus regular allowances only.", explanation: "The supplied notes state that holiday pay includes normal pay and regular allowances, but excludes overtime payments, bonuses and commissions.", revisionTip: "Use the course rule shown in the notes when answering holiday-pay questions." },
  { id: "overtime-01", topic: "Overtime", prompt: "An employee works 40 hours at €10 and 2 overtime hours at time-and-a-half. What is gross pay?", options: ["€400", "€420", "€430", "€450"], answer: "€430", hint: "Calculate €400 basic pay, then add 2 × €10 × 1.5 overtime pay.", explanation: "Basic pay is 40 × €10 = €400. Overtime is 2 × €10 × 1.5 = €30. Gross pay is €430.", revisionTip: "Apply the overtime multiplier only to the overtime hours." },
  { id: "overpay-01", topic: "Payroll corrections", prompt: "Using the supplied follow-the-money example, if Bob is overpaid by €100 in week 2, what is his gross pay in week 3 when normal weekly pay is €500?", options: ["€300", "€400", "€500", "€600"], answer: "€400", hint: "Recover the €100 overpayment from the next week's normal €500 pay.", explanation: "Week 3 gross pay is €500 − €100 = €400 because the follow-the-money approach recovers the week-two overpayment.", revisionTip: "Report the actual gross pay made in each period and correct an overpayment through a later submission." },
  { id: "accounting-01", topic: "Accounting basics", prompt: "Which accounting equation is the foundation of the statement of financial position?", options: ["Assets = Capital + Liabilities", "Assets = Revenue − Expenses", "Profit = Assets + Sales", "Liabilities = Assets + Capital"], answer: "Assets = Capital + Liabilities", hint: "Business resources are financed by the owner's capital and liabilities.", explanation: "The basic accounting equation is Assets = Capital (or equity) + Liabilities.", revisionTip: "Keep the accounting equation balanced: resources equal their sources." },
];

const elements = {
  welcome: document.querySelector("#welcomeView"), quiz: document.querySelector("#quizView"), results: document.querySelector("#resultsView"),
  start: document.querySelector("#startQuizButton"), resume: document.querySelector("#resumeQuizButton"), newQuiz: document.querySelector("#newQuizButton"),
  headerRestart: document.querySelector("#headerRestartButton"), restart: document.querySelector("#restartQuizButton"), practice: document.querySelector("#practiceMistakesButton"),
  resumeMessage: document.querySelector("#resumeMessage"), quizMode: document.querySelector("#quizModeLabel"), topic: document.querySelector("#topicLabel"), counter: document.querySelector("#questionCounter"), scoreChip: document.querySelector("#scoreChip"), progressTrack: document.querySelector(".progress-track"), progress: document.querySelector("#progressBar"),
  attempt: document.querySelector("#attemptLabel"), number: document.querySelector("#questionNumber"), question: document.querySelector("#questionText"), answers: document.querySelector("#answerList"), feedback: document.querySelector("#feedbackPanel"), next: document.querySelector("#nextButton"),
  performance: document.querySelector("#performanceMessage"), score: document.querySelector("#scoreDisplay"), percentage: document.querySelector("#percentageDisplay"), resultProgress: document.querySelector("#resultProgressBar"), first: document.querySelector("#firstTryDisplay"), second: document.querySelector("#secondTryDisplay"), missed: document.querySelector("#missedDisplay"), reviewCount: document.querySelector("#reviewCount"), reviewList: document.querySelector("#reviewList")
};

let quizState = null;

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function questionById(id) { return QUESTION_BANK.find((question) => question.id === id); }

function validateQuestionBank() {
  const ids = new Set();
  QUESTION_BANK.forEach((question) => {
    if (ids.has(question.id) || question.options.length !== 4 || !question.answer || !question.options.includes(question.answer)) throw new Error(`Invalid question: ${question.id}`);
    ids.add(question.id);
  });
}

function saveState() {
  if (!quizState) return;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(quizState)); } catch (error) { console.warn("Progress could not be saved.", error); }
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved?.questionIds?.length && saved?.questionStates && Number.isInteger(saved.currentIndex)) return saved;
  } catch (error) { console.warn("Saved progress could not be read.", error); }
  return null;
}

function showView(view) {
  [elements.welcome, elements.quiz, elements.results].forEach((item) => { item.hidden = item !== view; });
  elements.headerRestart.hidden = view !== elements.quiz;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function createQuiz(questionIds, mode) {
  quizState = { mode, questionIds: shuffle(questionIds), currentIndex: 0, questionStates: {} };
  quizState.questionIds.forEach((id) => {
    const question = questionById(id);
    quizState.questionStates[id] = { optionOrder: shuffle(question.options), attempts: 0, wrongSelections: [], completed: false, outcome: null };
  });
  saveState();
  showView(elements.quiz);
  renderQuestion();
}

function getCurrentQuestion() { return questionById(quizState.questionIds[quizState.currentIndex]); }
function getCurrentQuestionState() { return quizState.questionStates[getCurrentQuestion().id]; }

function scoreTotals() {
  return Object.values(quizState.questionStates).reduce((totals, state) => {
    if (state.outcome === "first") totals.first += 1;
    if (state.outcome === "second") totals.second += 1;
    if (state.outcome === "missed") totals.missed += 1;
    return totals;
  }, { first: 0, second: 0, missed: 0 });
}

function renderQuestion() {
  const question = getCurrentQuestion();
  const state = getCurrentQuestionState();
  const total = quizState.questionIds.length;
  const totals = scoreTotals();
  elements.quizMode.textContent = quizState.mode === "mistakes" ? "Practice mistakes" : "Full revision";
  elements.topic.textContent = question.topic;
  elements.counter.textContent = `Question ${quizState.currentIndex + 1} of ${total}`;
  elements.scoreChip.textContent = `${totals.first + totals.second} correct`;
  elements.progress.style.width = `${((quizState.currentIndex) / total) * 100}%`;
  elements.progressTrack.setAttribute("aria-valuenow", String(quizState.currentIndex));
  elements.progressTrack.setAttribute("aria-valuemax", String(total));
  elements.attempt.textContent = `Attempt ${Math.min(state.attempts + 1, 2)} of 2`;
  elements.number.textContent = String(quizState.currentIndex + 1).padStart(2, "0");
  elements.question.textContent = question.prompt;
  elements.answers.innerHTML = "";
  state.optionOrder.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-choice";
    button.dataset.option = option;
    button.innerHTML = `<span class="choice-letter" aria-hidden="true">${LETTERS[index]}</span><span class="choice-text"></span>`;
    button.querySelector(".choice-text").textContent = option;
    if (state.wrongSelections.includes(option)) { button.classList.add("is-wrong"); button.disabled = true; }
    button.addEventListener("click", () => handleAnswer(option));
    elements.answers.appendChild(button);
  });
  elements.feedback.hidden = true;
  elements.feedback.className = "feedback-panel";
  elements.feedback.innerHTML = "";
  elements.next.hidden = true;
  if (state.completed) {
    elements.attempt.textContent = `Completed in ${state.attempts} attempt${state.attempts === 1 ? "" : "s"}`;
    if (state.outcome === "missed") {
      const lastSelection = state.wrongSelections[state.wrongSelections.length - 1];
      setAnswerState(lastSelection, question, true);
      showFeedback("missed", question, lastSelection);
    } else {
      setAnswerState(question.answer, question, false);
      showFeedback("correct", question, question.answer);
    }
    elements.next.hidden = false;
    elements.next.textContent = quizState.currentIndex === quizState.questionIds.length - 1 ? "See results →" : "Next question →";
  }
}

function setAnswerState(selected, question, revealCorrect) {
  document.querySelectorAll(".answer-choice").forEach((button) => {
    const option = button.dataset.option;
    if (option === selected) button.classList.add(option === question.answer ? "is-correct" : "is-wrong");
    if (revealCorrect && option === question.answer) button.classList.add("is-correct");
    if (revealCorrect && option !== selected && option !== question.answer) button.classList.add("is-muted");
    button.disabled = true;
  });
}

function showFeedback(kind, question, selected) {
  const panel = elements.feedback;
  panel.hidden = false;
  panel.className = `feedback-panel feedback-${kind}`;
  if (kind === "wrong") {
    panel.innerHTML = `<p class="feedback-title">Not quite — try again.</p><p><span class="feedback-label">Hint:</span> ${question.hint}</p><p>You still have one attempt on this question.</p>`;
  } else if (kind === "correct") {
    const attemptText = getCurrentQuestionState().outcome === "first" ? "Correct on your first attempt." : "Correct — you got there on your second attempt.";
    panel.innerHTML = `<p class="feedback-title">${attemptText}</p><p>${question.explanation}</p><p><span class="feedback-label">Revision tip:</span> ${question.revisionTip}</p>`;
  } else {
    const wrongReason = question.wrongExplanations[selected] || "That option does not match the information given in the question.";
    panel.innerHTML = `<p class="feedback-title">The correct answer is: ${question.answer}</p><p>${question.explanation}</p><p><span class="feedback-label">Your answer:</span> ${wrongReason}</p><p><span class="feedback-label">Revision tip:</span> ${question.revisionTip}</p>`;
  }
}

function handleAnswer(selected) {
  const question = getCurrentQuestion();
  const state = getCurrentQuestionState();
  if (state.completed || state.wrongSelections.includes(selected)) return;
  state.attempts += 1;
  if (selected === question.answer) {
    state.completed = true;
    state.outcome = state.attempts === 1 ? "first" : "second";
    setAnswerState(selected, question, false);
    showFeedback("correct", question, selected);
    elements.next.hidden = false;
    elements.next.textContent = quizState.currentIndex === quizState.questionIds.length - 1 ? "See results →" : "Next question →";
  } else {
    state.wrongSelections.push(selected);
    if (state.attempts === 1) {
      const selectedButton = document.querySelector(`[data-option="${CSS.escape(selected)}"]`);
      selectedButton?.classList.add("is-wrong");
      selectedButton?.setAttribute("aria-disabled", "true");
      selectedButton && (selectedButton.disabled = true);
      showFeedback("wrong", question, selected);
    } else {
      state.completed = true;
      state.outcome = "missed";
      setAnswerState(selected, question, true);
      showFeedback("missed", question, selected);
      elements.next.hidden = false;
      elements.next.textContent = quizState.currentIndex === quizState.questionIds.length - 1 ? "See results →" : "Next question →";
    }
  }
  elements.attempt.textContent = state.completed ? `Completed in ${state.attempts} attempt${state.attempts === 1 ? "" : "s"}` : "Attempt 2 of 2";
  saveState();
  updateScoreOnly();
}

function updateScoreOnly() { const totals = scoreTotals(); elements.scoreChip.textContent = `${totals.first + totals.second} correct`; }

function advanceQuestion() {
  if (!getCurrentQuestionState().completed) return;
  if (quizState.currentIndex >= quizState.questionIds.length - 1) { showResults(); return; }
  quizState.currentIndex += 1;
  saveState();
  renderQuestion();
}

function showResults() {
  const totals = scoreTotals();
  const total = quizState.questionIds.length;
  const correct = totals.first + totals.second;
  const percentage = Math.round((correct / total) * 100);
  const reviewIds = quizState.questionIds.filter((id) => quizState.questionStates[id].wrongSelections.length > 0);
  elements.score.textContent = `${correct}/${total}`;
  elements.percentage.textContent = `${percentage}%`;
  elements.resultProgress.style.width = `${percentage}%`;
  elements.first.textContent = String(totals.first);
  elements.second.textContent = String(totals.second);
  elements.missed.textContent = String(totals.missed);
  elements.reviewCount.textContent = String(reviewIds.length);
  elements.performance.textContent = percentage >= 85 ? "Strong work. Review the small set of questions that slowed you down, then keep the momentum." : percentage >= 65 ? "Good progress. Use the review list to turn the questions you missed into your next gains." : "This is useful information, not a verdict. Practise the review list, then run the quiz again.";
  elements.practice.disabled = reviewIds.length === 0;
  elements.practice.setAttribute("aria-disabled", String(reviewIds.length === 0));
  elements.reviewList.innerHTML = "";
  if (!reviewIds.length) {
    elements.reviewList.innerHTML = `<p class="empty-review">No questions to review — you answered everything without needing a retry.</p>`;
  } else {
    reviewIds.forEach((id) => {
      const question = questionById(id);
      const state = quizState.questionStates[id];
      const item = document.createElement("article");
      item.className = "review-item";
      const status = state.outcome === "missed" ? "Missed after two attempts" : "Correct on second try";
      const statusClass = state.outcome === "missed" ? "" : "second";
      item.innerHTML = `<div class="review-item-top"><h3>${question.prompt}</h3><span class="review-status ${statusClass}">${status}</span></div><p class="review-answer">Correct answer: ${question.answer}</p><p>${question.explanation}</p>`;
      elements.reviewList.appendChild(item);
    });
  }
  localStorage.removeItem(STORAGE_KEY);
  showView(elements.results);
}

function prepareWelcome() {
  const saved = loadState();
  if (saved) {
    const completed = Object.values(saved.questionStates).filter((state) => state.completed).length;
    elements.resumeMessage.textContent = `You have a ${saved.mode === "mistakes" ? "mistakes practice" : "full revision"} session in progress — ${completed} of ${saved.questionIds.length} questions completed.`;
    elements.start.hidden = true;
    elements.resume.hidden = false;
    elements.newQuiz.hidden = false;
  }
}

function startFromSaved() { quizState = loadState(); if (quizState) { showView(elements.quiz); renderQuestion(); } }
function startNewFullQuiz() { localStorage.removeItem(STORAGE_KEY); createQuiz(QUESTION_BANK.map((question) => question.id), "full"); }
function practiceMistakes() {
  const ids = quizState.questionIds.filter((id) => quizState.questionStates[id].wrongSelections.length > 0);
  if (ids.length) createQuiz(ids, "mistakes");
}

validateQuestionBank();
prepareWelcome();
elements.start.addEventListener("click", startNewFullQuiz);
elements.resume.addEventListener("click", startFromSaved);
elements.newQuiz.addEventListener("click", startNewFullQuiz);
elements.headerRestart.addEventListener("click", () => { if (confirm("Restart this quiz? Your current progress will be cleared.")) startNewFullQuiz(); });
elements.next.addEventListener("click", advanceQuestion);
elements.restart.addEventListener("click", startNewFullQuiz);
elements.practice.addEventListener("click", practiceMistakes);
