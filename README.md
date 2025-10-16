# Frontend Dashboard (React + Redux Toolkit)

This is a small demo project that implements the assignment requirements:
- JSON-driven categories & widgets
- Add / Remove widgets dynamically per category
- Search widgets across categories
- Uses React + Redux Toolkit for local state

## How to run

1. Install dependencies:
```bash
npm install
```

2. Start dev server:
```bash
npm run dev
```

3. Open the local URL printed by Vite (usually http://localhost:5173).

## Notes
- The initial JSON is in `src/data/dashboard.json`.
- Adding/removing widgets updates local Redux store only (no backend).
- The project uses `uuid` to create widget ids.

