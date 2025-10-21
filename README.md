# 🎭 Playwright TypeScript Banking Project 
![Playwright Tests](https://github.com/CorneaLevente/Playwright_TypeScript_Banking_Project/actions/workflows/ci.yml/badge.svg)

This project automates end-to-end functional testing of the **GlobalSQA Banking Project** web application (https://www.globalsqa.com/angularJs-protractor/BankingProject/) using **Playwright with TypeScript**. It validates both customer and manager workflows, including login, customer creation, deposit, withdrawal, and transaction history verification.    

Tools: TypeScript, Playwright, Node.js, Visual Studio Code, Git & GitHub.  

Automated test cases focus on user login/logout, account operations, and data validation within different sections of the web application. Tests are organized with Page Object Model and executed using `npx playwright test`.

## ⚙️ CI/CD Integration

This project includes a **GitHub Actions workflow** that automatically runs Playwright tests on every push or pull request.  
The workflow file is located at:
.github/workflows/ci.yml

The pipeline:
- Sets up Node.js (v18).  
- Installs project dependencies and required browsers.  
- Executes all Playwright tests.  
- Displays the test results directly in the **Actions** tab on GitHub.

  
**Author:** Levente Cornea
