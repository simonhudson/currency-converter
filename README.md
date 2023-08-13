# Currency Converter

https://currency-converter-simonhudson.vercel.app

## Running locally

1. Run `npm run dev`
2. Navigate to http://localhost:3000

## Running tests
1. Run `npm run test`

### Tests with coverage
1. Run `npm run test:coverage`
2. Open coverage report at `/coverage/lcov-report/index.html`

## Architecture

- Used [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app) to quickly scaffold app

## Methodology

- Countries data is static. Fetch on initial load and pass in as props
- Use `type="number"` on input field for correct mobile experience

## Developer experience

- `.vscode/settings.json`: runs ESLint and Prettier rules on save (ensures consistency between developers)

## Testing
- Jest / React Testing Library for testing
- Mock data
- Coverage report

## Challenges

- Codes and names used for currency don't map 1:1 with flags JSON