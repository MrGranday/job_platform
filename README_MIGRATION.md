# Migration from Next.js to Vite + React

This project has been successfully migrated from Next.js to a standard React application using Vite.

## Changes Made

- **Framework:** Switched from Next.js to Vite.
- **Routing:** Replaced App Router with `react-router-dom`.
- **Language:** Converted TypeScript to JavaScript (ESModules).
- **Styling:** Maintained Tailwind CSS configuration.
- **Structure:**
  - Source code moved to `src/`.
  - Entry point is now `index.html` and `src/main.jsx`.
  - Routing defined in `src/App.jsx`.

## How to Run

1.  **Install Dependencies:**
    ```bash
    npm install
    # or
    pnpm install
    ```

2.  **Start Development Server:**
    ```bash
    npm run dev
    ```

3.  **Build for Production:**
    ```bash
    npm run build
    ```

## Project Structure

- `src/main.jsx`: Entry point.
- `src/App.jsx`: Main router configuration.
- `src/pages/`: Page components (converted from Next.js App Router).
- `src/components/`: Reusable components (shadcn/ui, layout, etc.).
- `src/context/`: React Context providers.
- `src/lib/`: Utilities.
- `src/hooks/`: Custom hooks.

## Notes

- `next/link` has been replaced with `Link` from `react-router-dom`.
- `useRouter` has been replaced with `useNavigate`.
- `next/image` was not found/used, standard `<img>` tags or other components are used.
- Fonts are now loaded via Google Fonts in `src/pages/globals.css`.
