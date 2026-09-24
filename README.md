# Payroll & Accounting Exam Simulator

A lightweight, static revision quiz for a Level 5 Payroll and Accounting module. It has no backend, login, database, API calls or build step.

## Run it locally

Open `index.html` in a current browser. For the most reliable localStorage behaviour, serve the folder with any simple static file server.

## Deploy with GitHub Pages

1. Create a new GitHub repository and upload all files in this folder, including `index.html`, `styles.css`, `app.js` and `.openai/hosting.json`.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and the `/ (root)` folder, then select **Save**.
5. GitHub will provide the site URL. Send that URL to the student.

The site is static, so the student does not need to install anything. Progress is saved in the browser using localStorage. The question bank is the `QUESTION_BANK` array near the top of `app.js`, where each question includes its answer, hint, explanation and revision tip.

## Question bank note

The questions test general introductory payroll and accounting concepts. They intentionally avoid current tax rates, PRSI rates, USC bands, thresholds and legislation. Where a calculation is used, every required figure is supplied in the question.
