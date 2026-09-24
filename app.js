const STORAGE_KEY = "payroll-accounting-exam-progress-v1";
const LETTERS = ["A", "B", "C", "D"];

// Edit or extend this array to maintain the question bank. Do not add current tax rates
// unless the relevant figures are supplied in the question itself.
const QUESTION_BANK = [
  { id: "gross-01", topic: "Gross pay", prompt: "An employee earns an annual salary of €30,000, paid in equal monthly instalments. What is their monthly basic pay before deductions?", options: ["€2,000", "€2,500", "€3,000", "€3,600"], answer: "€2,500", hint: "Divide the annual salary by the number of monthly payments in a year.", explanation: "€30,000 ÷ 12 months = €2,500 per month.", revisionTip: "Basic salary is the agreed pay before overtime, bonuses or deductions.", wrongExplanations: { "€2,000": "This would total €24,000 over a year, not €30,000.", "€3,000": "This would total €36,000 over a year.", "€3,600": "This is more than the annual salary when multiplied across 12 months." } },
  { id: "gross-02", topic: "Hourly pay", prompt: "A worker is paid €14 per hour and works 35 hours in a week. What is their basic weekly pay?", options: ["€350", "€420", "€490", "€560"], answer: "€490", hint: "Multiply the hourly rate by the number of hours worked.", explanation: "€14 × 35 hours = €490 basic weekly pay.", revisionTip: "For hourly workers, basic pay is rate multiplied by ordinary hours.", wrongExplanations: { "€350": "That uses 25 hours at €14, not the 35 hours stated.", "€420": "That uses 30 hours at €14.", "€560": "That uses 40 hours at €14." } },
  { id: "gross-03", topic: "Overtime", prompt: "An employee earns €16 per hour. They work 10 overtime hours paid at 1.5 times the normal rate. How much overtime pay do they receive?", options: ["€160", "€200", "€240", "€260"], answer: "€240", hint: "First calculate the overtime hourly rate, then multiply it by 10 hours.", explanation: "The overtime rate is €16 × 1.5 = €24. For 10 hours, €24 × 10 = €240.", revisionTip: "Apply the overtime multiplier to the hourly rate before multiplying by hours.", wrongExplanations: { "€160": "This is 10 hours at the normal rate, without the overtime premium.", "€200": "This does not use the stated 1.5 multiplier correctly.", "€260": "The correct overtime hourly rate is €24, giving €240 for 10 hours." } },
  { id: "gross-04", topic: "Gross pay", prompt: "An employee has weekly basic pay of €560, overtime pay of €120 and a bonus of €40. What is their gross pay for the week?", options: ["€600", "€680", "€720", "€760"], answer: "€720", hint: "Gross pay includes the earnings listed before deductions are taken away.", explanation: "€560 + €120 + €40 = €720 gross pay.", revisionTip: "Add all relevant earnings before calculating deductions.", wrongExplanations: { "€600": "This leaves out the overtime pay or bonus.", "€680": "This adds the basic pay and overtime but leaves out the €40 bonus.", "€760": "The listed earnings total €720, not €760." } },
  { id: "paye-01", topic: "PAYE", prompt: "What is the main purpose of PAYE in an employee payroll system?", options: ["To calculate company profit", "To collect income tax from employees through payroll", "To record supplier invoices", "To calculate an employee's annual leave balance"], answer: "To collect income tax from employees through payroll", hint: "PAYE is linked to an employee's income tax being deducted as they are paid.", explanation: "PAYE is a payroll collection system through which income tax is deducted from an employee's pay and accounted for to the tax authority.", revisionTip: "PAYE is about collecting income tax at the time pay is made.", wrongExplanations: { "To calculate company profit": "Profit is calculated from revenue and expenses, not PAYE.", "To record supplier invoices": "Supplier invoices are accounting source documents, not PAYE records.", "To calculate an employee's annual leave balance": "Leave records are separate from income tax collection." } },
  { id: "tax-01", topic: "Tax credits", prompt: "In a payroll tax calculation, what does a tax credit generally do?", options: ["Increase gross pay", "Reduce the income tax liability", "Increase the employee's hours", "Replace the employee's payslip"], answer: "Reduce the income tax liability", hint: "A credit is an amount set against the tax that would otherwise be due.", explanation: "A tax credit reduces the amount of income tax payable; it does not increase gross pay or hours worked.", revisionTip: "Think of a tax credit as reducing tax due, rather than adding to wages.", wrongExplanations: { "Increase gross pay": "Gross pay is based on earnings and is calculated separately.", "Increase the employee's hours": "Hours worked are a payroll input, not a tax credit.", "Replace the employee's payslip": "A tax credit is part of a tax calculation, not a payroll document." } },
  { id: "prsi-01", topic: "PRSI", prompt: "Which statement best describes PRSI or a similar social insurance contribution?", options: ["It is a type of employee and/or employer social insurance contribution", "It is a payment made only to suppliers", "It is always a voluntary deduction chosen by the employee", "It is the employee's gross salary"], answer: "It is a type of employee and/or employer social insurance contribution", hint: "The name refers to insurance connected with social welfare protection.", explanation: "PRSI is a social insurance contribution. Depending on the system and category, contributions may be made by the employee, the employer, or both.", revisionTip: "Separate social insurance contributions from income tax and voluntary deductions.", wrongExplanations: { "It is a payment made only to suppliers": "Supplier payments relate to purchases and accounts payable.", "It is always a voluntary deduction chosen by the employee": "Social insurance contributions are generally statutory or category-based, not simply optional.", "It is the employee's gross salary": "Gross salary is earnings before deductions." } },
  { id: "usc-01", topic: "Payroll deductions", prompt: "What is the best description of USC or an equivalent payroll charge?", options: ["A separate charge on income calculated under its own rules", "A bonus paid by the employer", "A deduction that records a supplier's invoice", "A replacement for gross pay"], answer: "A separate charge on income calculated under its own rules", hint: "It is a payroll deduction, but it is not the same thing as basic pay or a bonus.", explanation: "USC or an equivalent charge is a separate income-related payroll deduction calculated under its own rules. The question does not require any current bands or rates.", revisionTip: "Know the difference between the categories of deductions even when rates change.", wrongExplanations: { "A bonus paid by the employer": "A bonus increases earnings; USC is a deduction.", "A deduction that records a supplier's invoice": "Supplier invoices belong to purchase accounting, not employee payroll.", "A replacement for gross pay": "Gross pay is calculated before deductions and is not replaced by USC." } },
  { id: "net-01", topic: "Net pay", prompt: "Which formula correctly describes an employee's net pay?", options: ["Gross pay + deductions", "Gross pay − employee deductions", "Employee deductions − gross pay", "Gross pay ÷ employee deductions"], answer: "Gross pay − employee deductions", hint: "Net pay is the amount that remains after deductions are taken from earnings.", explanation: "Net pay is gross pay less the deductions taken from the employee, such as relevant tax and social insurance deductions.", revisionTip: "Gross is before deductions; net is what reaches the employee after deductions.", wrongExplanations: { "Gross pay + deductions": "Adding deductions would increase pay, which is not how net pay is calculated.", "Employee deductions − gross pay": "This reverses the order and would usually create a negative amount.", "Gross pay ÷ employee deductions": "Net pay is not calculated by dividing these figures." } },
  { id: "deduct-01", topic: "Statutory deductions", prompt: "Which is the clearest example of a statutory payroll deduction?", options: ["An employee's chosen charity donation", "A repayment for a personal loan", "Income tax withheld under the payroll system", "A coffee bought at work"], answer: "Income tax withheld under the payroll system", hint: "Statutory means required under the relevant rules or law.", explanation: "Income tax withheld through payroll is a statutory deduction. A charity donation or loan repayment may be voluntary or separately authorised.", revisionTip: "Statutory deductions are required; voluntary deductions depend on an agreement or employee choice.", wrongExplanations: { "An employee's chosen charity donation": "This is normally a voluntary deduction.", "A repayment for a personal loan": "This may be authorised, but it is not the standard example of a statutory payroll deduction.", "A coffee bought at work": "A purchase is not a payroll deduction category." } },
  { id: "deduct-02", topic: "Voluntary deductions", prompt: "Which is most likely to be a voluntary deduction from an employee's pay?", options: ["An employee pension contribution chosen under an agreed scheme", "A compulsory income tax deduction", "A required social insurance contribution", "The employee's basic pay"], answer: "An employee pension contribution chosen under an agreed scheme", hint: "Voluntary deductions depend on an agreement or choice rather than being imposed on everyone.", explanation: "A pension contribution can be a voluntary deduction when the employee has joined or opted into an agreed scheme. Statutory deductions are different.", revisionTip: "Check whether a deduction is required by rules or authorised by employee choice.", wrongExplanations: { "A compulsory income tax deduction": "The word compulsory makes this statutory rather than voluntary.", "A required social insurance contribution": "A required social insurance contribution is statutory or category-based.", "The employee's basic pay": "Basic pay is earnings, not a deduction." } },
  { id: "employer-01", topic: "Employer contributions", prompt: "How should an employer contribution to a social insurance or pension scheme usually be treated on the employee's payslip calculation?", options: ["As an amount that directly reduces the employee's net pay in every case", "As an employer cost kept separate from employee deductions", "As the employee's gross pay", "As a customer receipt"], answer: "As an employer cost kept separate from employee deductions", hint: "Ask who is responsible for paying the contribution and whether it is taken from the employee's earnings.", explanation: "An employer contribution is normally an employer cost and should be kept separate from deductions taken from the employee's gross pay. Scheme rules can affect presentation.", revisionTip: "Always label a contribution as employee or employer before calculating net pay.", wrongExplanations: { "As an amount that directly reduces the employee's net pay in every case": "An employer contribution is not automatically an employee deduction.", "As the employee's gross pay": "Gross pay is the employee's earnings, not the employer's extra cost.", "As a customer receipt": "A receipt is a source document for a payment, not an employer contribution." } },
  { id: "payslip-01", topic: "Payslips", prompt: "Which group of information would normally be useful on an employee payslip?", options: ["Gross pay, deductions and net pay", "Only the employer's bank balance", "Only the names of company suppliers", "The company's full inventory count"], answer: "Gross pay, deductions and net pay", hint: "A payslip explains how the amount paid to the employee was reached.", explanation: "A payslip normally shows earnings such as gross pay, deductions, and the resulting net pay, along with identifying payroll details.", revisionTip: "Use the payslip to trace gross earnings to take-home pay.", wrongExplanations: { "Only the employer's bank balance": "The employer's bank balance is not the employee's pay calculation.", "Only the names of company suppliers": "Suppliers are not the focus of an employee payslip.", "The company's full inventory count": "Inventory records belong to stock control and accounting." } },
  { id: "records-01", topic: "Payroll records", prompt: "Why should payroll records be kept accurately and securely?", options: ["To support correct pay, reporting and future checks", "To make all employees work the same hours", "To remove the need for payslips", "To turn expenses into assets"], answer: "To support correct pay, reporting and future checks", hint: "Think about the evidence needed to explain how payroll was calculated.", explanation: "Accurate payroll records support correct payments, payroll reporting, queries from employees and appropriate checks or audits.", revisionTip: "Payroll records are evidence: keep inputs, calculations and outputs consistent.", wrongExplanations: { "To make all employees work the same hours": "Records document hours; they do not make schedules identical.", "To remove the need for payslips": "Records and payslips serve different purposes.", "To turn expenses into assets": "The accounting classification of a cost is unrelated to payroll record-keeping." } },
  { id: "holiday-01", topic: "Holiday pay", prompt: "What is the best general approach when calculating holiday pay for an employee?", options: ["Ignore the employee's normal pay information", "Apply the relevant holiday-pay rules to the employee's normal pay and entitlement", "Always pay zero because no work is done", "Treat every holiday as a business expense invoice"], answer: "Apply the relevant holiday-pay rules to the employee's normal pay and entitlement", hint: "Holiday pay is connected to the employee's pay and leave entitlement, subject to the applicable rules.", explanation: "Holiday pay should be calculated using the applicable rules and the employee's pay and entitlement information. Specific legal methods can vary, so no current rate is assumed here.", revisionTip: "Check the applicable policy or rules rather than inventing a flat holiday amount.", wrongExplanations: { "Ignore the employee's normal pay information": "Normal pay information is relevant to a fair and compliant calculation.", "Always pay zero because no work is done": "Paid leave is still paid leave.", "Treat every holiday as a business expense invoice": "A supplier invoice is not how an employee's holiday pay is recorded." } },
  { id: "assets-01", topic: "Assets", prompt: "Which item is an asset of a business?", options: ["Money held in the business bank account", "An amount owed to a supplier", "A bank loan payable", "The owner's drawings"], answer: "Money held in the business bank account", hint: "An asset is a resource controlled by the business.", explanation: "Money in the business bank account is a resource controlled by the business, so it is an asset.", revisionTip: "Assets are resources the business owns or controls; liabilities are amounts it owes.", wrongExplanations: { "An amount owed to a supplier": "This is a trade payable, which is a liability.", "A bank loan payable": "A loan payable is a liability.", "The owner's drawings": "Drawings reduce equity rather than being a business asset." } },
  { id: "liability-01", topic: "Liabilities", prompt: "Which item is a liability?", options: ["Cash in hand", "Goods held for resale", "An unpaid supplier invoice", "The owner's investment"], answer: "An unpaid supplier invoice", hint: "A liability is an obligation that the business will need to settle.", explanation: "An unpaid supplier invoice represents an amount the business owes, so it is a trade payable and a liability.", revisionTip: "Amounts owed to suppliers, lenders or others are liabilities.", wrongExplanations: { "Cash in hand": "Cash is an asset.", "Goods held for resale": "Inventory is an asset.", "The owner's investment": "The owner's investment is part of capital or equity." } },
  { id: "equity-01", topic: "Capital and equity", prompt: "In basic bookkeeping, what does the owner's capital represent?", options: ["The owner's claim or investment in the business", "All money owed to suppliers", "The business's sales for the month", "A payroll deduction"], answer: "The owner's claim or investment in the business", hint: "Capital is linked to the owner's interest after considering business resources and obligations.", explanation: "Owner's capital or equity represents the owner's investment and claim in the business, after liabilities are considered.", revisionTip: "The accounting equation places capital/equity alongside liabilities as the source of assets.", wrongExplanations: { "All money owed to suppliers": "Supplier amounts owed are liabilities.", "The business's sales for the month": "Sales are revenue.", "A payroll deduction": "Payroll deductions are not owner's capital." } },
  { id: "revenue-01", topic: "Revenue", prompt: "Which transaction creates revenue for a business that sells goods?", options: ["Selling goods to a customer", "Paying the electricity bill", "Taking out a bank loan", "Buying a delivery van"], answer: "Selling goods to a customer", hint: "Revenue is income earned from the business's ordinary activities.", explanation: "Selling goods to a customer is an ordinary trading activity that earns revenue. The other options are a cost, financing or an asset purchase.", revisionTip: "Revenue is earned income; it is not every amount of cash received.", wrongExplanations: { "Paying the electricity bill": "This is an expense payment.", "Taking out a bank loan": "A loan creates a liability and cash, not revenue.", "Buying a delivery van": "This is the purchase of an asset." } },
  { id: "expense-01", topic: "Expenses", prompt: "Which is an operating expense for a business?", options: ["Office rent", "Owner's capital introduced", "A bank loan received", "Cash collected from a customer sale"], answer: "Office rent", hint: "An expense is a cost incurred in running the business.", explanation: "Office rent is a cost of operating the business, so it is an expense. The other options are equity, financing or revenue-related cash.", revisionTip: "Expenses are costs of earning revenue and reduce profit.", wrongExplanations: { "Owner's capital introduced": "This increases equity rather than being an expense.", "A bank loan received": "A loan received creates financing and a liability.", "Cash collected from a customer sale": "This is a cash receipt from revenue, not an expense." } },
  { id: "profit-01", topic: "Profit and loss", prompt: "A business has revenue of €8,000 and expenses of €5,500 for a period. What is its profit?", options: ["€2,000", "€2,500", "€3,500", "€13,500"], answer: "€2,500", hint: "Profit is the amount left when expenses are taken from revenue.", explanation: "€8,000 revenue − €5,500 expenses = €2,500 profit.", revisionTip: "Profit = revenue − expenses for the period.", wrongExplanations: { "€2,000": "The subtraction is €8,000 − €5,500 = €2,500.", "€3,500": "This is not the difference between the stated revenue and expenses.", "€13,500": "Adding revenue and expenses does not calculate profit." } },
  { id: "balance-01", topic: "Statement of financial position", prompt: "Which accounting equation is the foundation of a statement of financial position?", options: ["Assets = Capital + Liabilities", "Assets = Revenue − Expenses", "Profit = Assets + Sales", "Liabilities = Assets + Capital"], answer: "Assets = Capital + Liabilities", hint: "Think about where the business's resources come from: owners and lenders.", explanation: "The accounting equation is Assets = Capital (or equity) + Liabilities. It shows that resources are financed by the owner's interest and obligations to others.", revisionTip: "Keep the equation balanced: what the business has equals how it was financed.", wrongExplanations: { "Assets = Revenue − Expenses": "Revenue less expenses calculates profit, not total assets.", "Profit = Assets + Sales": "Profit is not assets plus sales.", "Liabilities = Assets + Capital": "This reverses the relationship; liabilities are one source alongside capital." } },
  { id: "debit-01", topic: "Debits and credits", prompt: "Which entry normally records an increase in a business asset such as cash or equipment?", options: ["A debit", "A credit", "A tax credit only", "A payroll deduction"], answer: "A debit", hint: "In the basic rules, asset increases are recorded on the debit side.", explanation: "Under basic double-entry rules, an increase in an asset is recorded as a debit. The matching credit depends on the transaction.", revisionTip: "A simple memory aid: debit increases assets and expenses; credit increases liabilities, equity and revenue.", wrongExplanations: { "A credit": "A credit normally decreases an asset, although it increases other account types.", "A tax credit only": "A tax credit is a tax concept, not the double-entry label for an asset increase.", "A payroll deduction": "A payroll deduction is not a debit/credit rule." } },
  { id: "bookkeeping-01", topic: "Double-entry", prompt: "A business buys office supplies on credit. Which basic entry is appropriate?", options: ["Debit office supplies expense; credit trade payables", "Debit trade payables; credit office supplies expense", "Debit cash; credit sales", "Debit capital; credit bank loan"], answer: "Debit office supplies expense; credit trade payables", hint: "The business has incurred a cost and now owes the supplier.", explanation: "The office supplies cost is debited as an expense, while the amount owed to the supplier is credited to trade payables.", revisionTip: "For a credit purchase, record what was received and the obligation created.", wrongExplanations: { "Debit trade payables; credit office supplies expense": "This reverses both sides of the usual entry for the credit purchase.", "Debit cash; credit sales": "No cash sale occurred; supplies were bought on credit.", "Debit capital; credit bank loan": "Neither owner's capital nor a bank loan is the transaction described." } },
  { id: "vat-01", topic: "VAT", prompt: "VAT charged by a VAT-registered business on its sales is commonly called what?", options: ["Output VAT", "Input VAT", "Payroll VAT", "Capital VAT"], answer: "Output VAT", hint: "Think of VAT flowing out on the business's sales invoices.", explanation: "VAT charged on sales is output VAT. VAT paid on eligible business purchases is commonly called input VAT.", revisionTip: "Output relates to sales; input relates to purchases.", wrongExplanations: { "Input VAT": "Input VAT is generally VAT paid on purchases, not charged on sales.", "Payroll VAT": "VAT is not a standard payroll deduction category.", "Capital VAT": "Capital is an equity concept, not the usual name for sales VAT." } },
  { id: "invoice-01", topic: "Source documents", prompt: "What is the main purpose of an invoice?", options: ["To request or record payment for goods or services supplied", "To prove that a bank reconciliation is complete", "To record an employee's holiday entitlement", "To replace every accounting entry"], answer: "To request or record payment for goods or services supplied", hint: "An invoice is issued in connection with a sale or purchase.", explanation: "An invoice details goods or services supplied, amounts due and payment information, supporting the related accounting entry.", revisionTip: "Source documents provide evidence for bookkeeping entries.", wrongExplanations: { "To prove that a bank reconciliation is complete": "Bank statements and reconciliation workings support that process.", "To record an employee's holiday entitlement": "Leave records are a payroll or HR matter.", "To replace every accounting entry": "An invoice supports an entry; it does not replace the ledger." } },
  { id: "creditnote-01", topic: "Source documents", prompt: "What is the usual effect of a credit note issued by a supplier?", options: ["It reduces the amount originally invoiced", "It increases the original invoice without explanation", "It records a new employee", "It is the same as a bank statement"], answer: "It reduces the amount originally invoiced", hint: "A credit note is commonly used for returns, overcharges or agreed reductions.", explanation: "A credit note reduces all or part of an earlier invoice, for example when goods are returned or an overcharge is corrected.", revisionTip: "Invoice raises an amount due; credit note reduces an earlier amount due.", wrongExplanations: { "It increases the original invoice without explanation": "A credit note normally reduces the amount due.", "It records a new employee": "Employee records are unrelated to supplier credit notes.", "It is the same as a bank statement": "A bank statement lists bank transactions, not invoice adjustments." } },
  { id: "bankrec-01", topic: "Bank reconciliation", prompt: "What is the purpose of a bank reconciliation?", options: ["To compare the cash book with the bank statement and explain differences", "To calculate an employee's gross pay", "To turn every invoice into cash", "To set the business's tax rates"], answer: "To compare the cash book with the bank statement and explain differences", hint: "The word reconciliation means checking two records agree and investigating differences.", explanation: "A bank reconciliation compares the business's cash book with the bank statement and identifies timing differences, bank charges, errors or missing entries.", revisionTip: "Reconcile records; do not simply change one to hide a difference.", wrongExplanations: { "To calculate an employee's gross pay": "Gross pay belongs to payroll calculations.", "To turn every invoice into cash": "An invoice may remain unpaid after it is recorded.", "To set the business's tax rates": "Tax rates are not set by bank reconciliation." } },
  { id: "trial-01", topic: "Trial balance", prompt: "What does a balanced trial balance generally show?", options: ["Total debit balances equal total credit balances", "The business has made a profit", "There are no accounting errors of any kind", "Every customer has paid on time"], answer: "Total debit balances equal total credit balances", hint: "A trial balance checks the two sides of the ledger totals.", explanation: "A balanced trial balance means total debits equal total credits. It does not prove that every type of accounting error is absent.", revisionTip: "Balance is a useful arithmetic check, not a guarantee that the books are perfect.", wrongExplanations: { "The business has made a profit": "Profit requires an income and expense calculation.", "There are no accounting errors of any kind": "Some errors can still leave debits and credits equal.", "Every customer has paid on time": "Customer payment timing is an accounts receivable issue." } },
  { id: "capital-01", topic: "Accounting calculations", prompt: "A business starts with capital of €10,000, makes a profit of €3,000 and the owner takes drawings of €1,000. What is closing capital?", options: ["€8,000", "€10,000", "€12,000", "€14,000"], answer: "€12,000", hint: "Add profit to capital, then subtract drawings.", explanation: "€10,000 + €3,000 profit − €1,000 drawings = €12,000 closing capital.", revisionTip: "Profit increases equity; drawings reduce the owner's capital.", wrongExplanations: { "€8,000": "This subtracts both profit and drawings rather than adding profit.", "€10,000": "This ignores the effect of both profit and drawings.", "€14,000": "This adds drawings instead of subtracting them." } }
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
