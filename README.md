# Playwright UI & API Automation Framework

A production-quality UI and API automation framework built using **Playwright, TypeScript, and Node.js**.

This project demonstrates a scalable QA automation architecture covering end-to-end UI testing, API automation, reusable Page Objects and API services, test data management, reporting, debugging artifacts, and GitHub Actions CI/CD.

------------------------------------------------------------------------------------

## 📌 Project Overview

This framework is designed to demonstrate real-world automation engineering practices rather than simple test scripting.

The framework provides:

- UI automation using Playwright
- API automation using Playwright APIRequestContext
- Page Object Model (POM)
- Service-based API architecture
- Reusable test data
- Centralized environment configuration
- Reusable API assertions
- API response attachments
- Positive and negative test scenarios
- Cross-browser execution
- Playwright HTML reporting
- Allure reporting
- Screenshots on failure
- Videos on failure
- Traces on retry
- GitHub Actions CI/CD
- TypeScript type checking

------------------------------------------------------------------------------------

## 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| Playwright | UI and API automation |
| TypeScript | Type-safe test development |
| Node.js | Runtime environment |
| Playwright Test Runner | Test execution and assertions |
| Page Object Model | UI abstraction and maintainability |
| API Service Layer | Reusable API operations |
| Allure | Advanced test reporting |
| GitHub Actions | CI/CD automation |
| Git | Version control |
| dotenv | Environment configuration |

------------------------------------------------------------------------------------

## 🏗️ Framework Architecture

The framework follows a layered architecture designed for maintainability and scalability.

### UI Layer

```text
Tests
  ↓
Page Objects
  ↓
Playwright
  ↓
Application Under Test


------------------------------------------------------------------------------------

### API Layer

Tests
  ↓
Service Layer
  ↓
API Client
  ↓
Playwright APIRequestContext
  ↓
Application API


------------------------------------------------------------------------------------

### Suporting Layer

Configuration
     ↓
Environment Variables

Test Data
     ↓
Reusable Test Data Builders

Assertions
     ↓
Reusable API Assertions

Reporting
     ↓
HTML / Allure / Screenshots / Videos / Traces

CI/CD
     ↓
GitHub Actions

------------------------------------------------------------------------------------

## 📁 Project Structure


playwright-ui-api-automation-framework/
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── api/
│   ├── clients/
│   │   └── automation-exercise.client.ts
│   │
│   └── services/
│       ├── brands.service.ts
│       ├── login.service.ts
│       ├── products.service.ts
│       └── user.service.ts
│
│── components/
│   └── header.component.ts
│
│
├── config/
│   └── env.ts
│
├── fixtures/
│   └── api.fixture.ts
│   └── ui.fixture.ts
│
├── pages/
│   ├── base.page.ts
│   ├── cart.page.ts
│   ├── checkout.page.ts
│   ├── login.page.ts
│   ├── product-details.page.ts
│   └── products.page.ts
│
├── test-data/
│   ├── users.ts
│   └── payment.ts
│
├── tests/
│   ├── api/
│   │   ├── brands.spec.ts
│   │   ├── login.spec.ts
│   │   ├── products.spec.ts
│   │   └── user.spec.ts
│   │
│   └── ui/
│       ├── auth/
│       │   └── login.spec.ts
│       │
│       ├── cart/
│       │   └── cart.spec.ts
│       │
│       ├── checkout/
│       │   └── checkout.spec.ts
│       │
│       ├── products/
│       │    └── products.spec.ts
│       │
│       └── home.spec.ts
│
├── utils/
│   ├── api-assertions.ts
│   └── api-attachments.ts
│   └── ad-blocker.ts
│
├── .env.example
├── .gitignore
├── package.json
├── playwright.config.ts
├── README.md
└── tsconfig.json


------------------------------------------------------------------------------------

⚙️ Prerequisites

Make sure the following are installed:

Node.js
npm
Git

Verify the installation:
node --version
npm --version
git --version

------------------------------------------------------------------------------------

🚀 Installation

Clone the repository: git clone <YOUR_GITHUB_REPOSITORY_URL>
Navigate to the project: cd playwright-ui-api-automation-framework
Install dependencies: npm ci
Install Playwright browsers: npx playwright install

------------------------------------------------------------------------------------

🔐 Environment Configuration

The framework uses environment variables for configuration and credentials.
Create a .env file in the project root.

Example:

BASE_URL=https://automationexercise.com
API_BASE_URL=https://automationexercise.com
TEST_USER_EMAIL=your-test-user-email
TEST_USER_PASSWORD=your-test-user-password

------------------------------------------------------------------------------------

🧪 Running Tests

Run the complete test suite: npm test
Run UI Tests : npm run test:ui
Run API Tests : npm run test:api
Run tests in chromium : npm run test:chromium
Run tests in firefox : npm run test:firefox
Run tests in webkit : npm run test:webkit
Run tests in headed mode : npm run test:headed
Run Tests in debug mode : npm run test:debug

TypeScript Type Checking
Run the TypeScript compiler without generating JavaScript: npm run typecheck


------------------------------------------------------------------------------------


📊 Reporting

The framework supports both Playwright HTML Reports and Allure Reports.
Playwright HTML Report

After test execution: npx playwright show-report
The report provides:

Test execution status
Test duration
Failure details
Test steps
Screenshots
Videos
Traces
Attachments


Allure Report

Generate the Allure report: allure generate allure-results --clean -o allure-report
Open the generated report: allure open allure-report

Allure provides a richer visualization of:

Test suites
Test cases
Pass/fail status
Test duration
Attachments
API responses
Execution history


------------------------------------------------------------------------------------


🐞 Debugging & Failure Artifacts

The framework is configured to automatically capture debugging artifacts.
Screenshots
Screenshots are captured when a test fails.
Videos
Videos are retained for failed tests.
Traces

Playwright traces are captured on the first retry.
Trace information can help investigate:

Network activity
DOM state
Test actions
Browser state
Timing issues
API Attachments

API responses are attached to test results to make API failures easier to investigate.


------------------------------------------------------------------------------------


🔌 API Automation

The API automation layer follows a reusable client/service architecture.
API Test
   ↓
Service
   ↓
AutomationExerciseClient
   ↓
Playwright APIRequestContext
   ↓
API Endpoint

The API layer currently demonstrates:

GET requests
POST requests
PUT requests
DELETE requests
Positive scenarios
Negative scenarios
Response validation
Reusable API assertions
API response attachments

The framework intentionally validates the actual behavior of the target API rather than assuming conventional REST status-code behavior.


------------------------------------------------------------------------------------

🌐 UI Automation

UI automation follows the Page Object Model.

The Page Object layer encapsulates:

Locators
Page interactions
Reusable UI actions
Navigation
Page-specific behavior

Tests focus on business scenarios rather than low-level implementation details.

This improves:

Maintainability
Readability
Reusability
Scalability


------------------------------------------------------------------------------------


🔄 CI/CD

GitHub Actions is configured to automatically execute the Playwright test suite.

The CI pipeline performs:

Checkout repository
Setup Node.js
Install dependencies
Install Playwright browsers
Run TypeScript type checking
Execute Playwright tests
Generate reporting data
Upload Playwright HTML report
Upload Allure results
Upload test artifacts

The workflow is triggered on:

Push to main
Pull requests targeting main

Sensitive environment variables are supplied through GitHub Actions Secrets rather than being stored directly in the repository.


------------------------------------------------------------------------------------


📈 Test Coverage

The framework currently contains **35 automated test scenarios** executed across **3 browser projects**, resulting in **105 total test executions**.

| Browser | Test Executions |
|---|---:|
| Chromium | 35 |
| Firefox | 35 |
| WebKit | 35 |
| **Total** | **105** |

### UI Automation

UI tests cover key end-to-end application workflows including:

- Authentication
- Product listing
- Product search
- Product details
- Shopping cart
- Checkout
- Payment workflow
- Positive scenarios
- Negative scenarios

UI tests are organized using the Page Object Model.

### API Automation

API tests cover:

- Products API
- Brands API
- Login API
- User Account API
- Account creation
- Account update
- Account deletion
- User details retrieval
- Duplicate account validation
- Invalid login scenarios
- Missing parameter scenarios
- Positive and negative API scenarios

The API layer supports:

- GET
- POST
- PUT
- DELETE

### Cross-Browser Coverage

The complete suite can be executed against:

- Chromium
- Firefox
- WebKit

This provides cross-browser validation of the UI automation suite while maintaining a reusable API automation layer.


------------------------------------------------------------------------------------

🎯 Automation Engineering Practices

This project demonstrates the following QA automation practices:

Page Object Model
Service Object Model for APIs
Reusable fixtures
Centralized configuration
Environment-based configuration
Reusable test data
Data-driven test preparation
Positive and negative testing
API abstraction
Reusable assertions
Failure diagnostics
Cross-browser testing
TypeScript type safety
CI/CD integration
Test reporting
Artifact management

------------------------------------------------------------------------------------

🔮 Future Improvements

Potential improvements include:

Parallel test execution optimization
Additional API schema validation
JSON schema validation for API responses
Test tagging and selective execution
Retry strategy optimization
Environment-specific configurations
Docker-based test execution
CI test matrix for multiple browsers
Slack/Teams test notifications
Visual regression testing
Accessibility testing
Performance testing integration
API contract testing
Improved test data factories
Test execution dashboards

------------------------------------------------------------------------------------

👨‍💻 Author: Abhishek Saini
QA Automation Engineer

This project was created as a portfolio demonstration of modern UI and API automation engineering practices using Playwright and TypeScript.
