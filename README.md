# Exercise: UK COVID-19 API

The purpose of this README is guide reviewers rather than on-board new developers.

# Specification

The UK government provides APIs allowing open access to COVID-19 data as described here: https://coronavirus.data.gov.uk/details/developers-guide

Using these APIs, create a web page that satisfies the following user story:

> As a UK citizen, I would like to know how cases of COVID-19 have been changing over time in my region.

# Review Guide

This project was developed to demonstrate three things:

1. [converting user needs into functionality](#converting-user-needs-into-functionality)
2. [code structure](#code-structure)
3. [testing approach](#testing)

## Converting user needs into functionality

From the user story above we can make several assumptions:

- Users are more interested in historical COVID-19 information (as opposed to current and predicted information) since they want to see how cases have been changing over time.
  - Information will most likely be presented in time series plots since they are so good at showing these types of changes.
- The user story explicitly mentions "cases" but not deaths, testing, etc. Although, we will assume cases means more than just raw cases since this would only tell a small part of the story.
  - If the user is interested in seeing how COVID-19 cases have changed over time, they would likely be interested in information such as testing positivity, death rate, spread rate, seasonal patterns, etc.
- We will assume the user only wants to view this app and nothing else, therefore there is no need to export data or plots into other software.
- "As a UK citizen" will not be take literally, we will assume the user is anyone interested in UK COVID-19 information. Therefore, there is no need to authenticate before accessing the app.
- Users are only interested in their specific region and not interested in national information, therefore we not provide a national view.

From these assumptions the following features will be built:

- A selectable region dropdown.
- Time series plot of new cases.
- Time series plot of variant type by percentage.

**Note**

- I have also added headline figures despite the user story not requiring it. This was added as an extra feature since it can be useful to provide features to stakeholders before they ask.

## Code Structure

The tech stack for this app is:

- [React](https://react.dev/)
- [Next.js](https://nextjs.org/) (React framework)
- [Tailwind CSS](https://tailwindcss.com/) (for styling)
- [Typescript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/) (Unit testing)
- [Playwright](https://playwright.dev/) (End-to-end testing)
- [Devcontainers](https://containers.dev/) (Dev environment)
- [Visual Studio Code](https://code.visualstudio.com/) (Code editor)

### Project Structure

```
├── .devcontainer              <- Devcontainer configuration.
├── .vscode                    <- VS Code configuration.
├── app                        <- Contains all the routes, components, and logic for the application
│   ├── layout.tsx             <- Root layout, shared UI styling that applies to all routes.
│   ├── page.tsx               <- Unique UI of home route, i.e. home page.
│   ├── lib                    <- Contains functions used in the application, such as reusable utility functions and data fetching functions.
│   │   └── __tests__          <- Jest tests for app/lib functions.
│   ├── [region]               <- Dynamic route for regions.
│   │   ├── layout.tsx         <- Shared UI for the region page and its children.
│   │   └── page.tsx           <- Unique UI for the region route, i.e. all region pages.
│   ├── types                  <- TypeScript types and interfaces.
│   └── ui                     <- Contains all the UI components for the application, such as headline cards and plots.
│       ├── dashboard          <- Dashboard components such as header, navigation, icons, etc.
│       ├── headline           <- Headline components for new cases, deaths, etc.
│       ├── plots              <- Plot components such as new cases and new cases by variant.
│       ├── fonts.ts           <- All fonts used throughout the application.
│       └── globals.css        <- CSS rules for all routes in application.
├── public                     <- Contains all the static assets for the application, such as images.
├── scripts                    <- Contains all scripts such as setting up dependencies.
├── tests                      <- End-to-end tests.
├── jest.config.ts             <- Configuration for Jest testing.
├── next.config.js             <- Next.js framework configuration.
├── package.json               <- Project dependencies and scripts.
├── playwright.config.ts       <- Playwright end-to-end testing configuration.
├── postcss.config.js          <- PostCSS config used by tailwind css.
├── README.md                  <- Top level README for this project.
├── tailwind.config.ts         <- Tailwind CSS styling configuration.
└── tsconfig.json              <- TypeScript configuration.
```

### Notes

- This structure is very similar to recommended best practices for a Next.js app.
- The main code to review is in the `app/` directory.
- Note that the testing is split up into two areas.
  - Unit tests (Jest tests) are close to the units they are testing.
  - E2E tests (Playwright tests) are in a separate `tests/` folder in the root directory.

## Testing

Testing is done using two tools

- [Jest](https://jestjs.io/) for unit testing.
- [Playwright](https://playwright.dev/) for end-to-end testing.

### Unit Tests

To run unit tests:

```sh
npm run test
```

### End-to-End Tests

To run end-to-end tests:

```sh
npm run build # will build prod version of the app.
npm run e2e-test # will launch the prod version of the app locally then run e2e tests.
```

**Note**

- E2E testing requires an internet connection since it fetches live data.

### API Tests

Ideally there would be tests for API dependency on rather than blindly trusting a data source we don't own.

- These tests should be built from scripts used during exploration of the API.
- Unfortunately, exploration was very ad-hoc and no scripts were saved. (This is noted as a [lesson for next time](#lessons-for-next-time))

### Going Further

#### Offline Testing

- The ability to test this application offline is a must, right now an internet connection is required to perform end-to-end testing. If the API was to go down, it would disable testing and impact development and deployments.
- To address this, testing data should be created and saved (not in this repo unless the data is very small).
- `getData` should be able to easily return this test data. This could be done by allowing the `endpoint` to be passed into the function.

#### Expanding Testing

- Currently, there are not too many tests, and much of the application is not being properly tested.
- Lack of testing early on can cause technical debt to get out of control which may never be recovered. Therefore testing should be built either before the functions are written (test-driven-development) or at the same time they are written.
- My testing strategy moving forward with this project would be:
  - Start by ensuring all functions are unit tested. This means all functions are small and easily testable.
  - If refactoring is required, build tests before refactoring to ensure integrity.
  - Then move onto end-to-end tests.
  - When the app gets very large, start building "controllers" that make e2e testing easier.

#### Adding Test Coverage

- Test coverage is a useful metric, but should be taken with a grain of salt. Good coverage does not necessarily mean good tests. Therefore, I use test coverage as a guide rather than a goal.

# Running the App

## Locally

To run the app locally I suggest opening in the devcontainer then running the commands below.

If not running in a devcontainer you will likely have to run `scripts/install-dependencies.sh` to install dependencies via [NPM](https://www.npmjs.com/).

This will be a bit slow on first load, but then things will be cached and it will run a lot smoother.

### Dev Version

```sh
npm run dev
```

### Prod Version

```sh
npm run build
npm start
```

# Next Steps

While this app is small, even with it's current feature set it's far from finished. These are the next steps I would take (roughly in order of importance).

- Enable offline testing.
- CI pipeline to trigger testing (github actions).
- Add tests for API and document API quirks.
- Expand testing to a point of "reasonable" coverage.
- Add minimum UX features such as:
  - Add loading skeletons for components since it's not clear when loading is happening.
  - Add an error page for missing routes.
- Improve styling to make it look a lot nicer.
- Improve landing page look.
- Change plotting library (move away from plotly, move to visx, chartjs or tremor since they seem to work nicely with NextJS).
- Design more features and keep building!

# Lessons for Next Time

1. Reproducible API exploration - Did some in R and Postman, but should have saved the working so they could be used for automated API tests.
2. Plotly was initially throwing some warnings in the console due to not playing nicely with server side rendering. Will try a different library when working in NextJS.
