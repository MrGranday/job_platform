# TalentHub - Modern Job Platform

TalentHub is a comprehensive, modern web application designed to connect skilled professionals with top employers. Built with React and Vite, it features a responsive, accessible UI and dedicated dashboards for Job Seekers, Employers, and Administrators.

## 🚀 Features

### 👤 For Job Seekers
*   **Professional Profile**: Create and manage a detailed profile with experience, education, skills, and projects.
*   **Dashboard**: View profile stats, rank, and recent activity (views, messages).
*   **Public Profile**: Share a polished public version of your resume.
*   **Job Search**: Browse and filter opportunities (simulated).

### 🏢 For Employers
*   **Company Profile**: Manage company branding, industry, and size details.
*   **Candidate Search**: Find talent by keywords, location, and roles.
*   **Talent Management**: Save interesting profiles and view candidate insights.
*   **Dashboard**: Track search activity, saved profiles, and candidate pool stats.

### 🛡️ For Administrators
*   **User Management**: Create, edit, deactivate, or delete user accounts.
*   **Analytics**: Visualize platform growth, user engagement, and category distribution.
*   **Category Management**: Manage job categories and associated roles.
*   **System Overview**: Monitor platform health and key metrics.

## 🛠️ Tech Stack

*   **Frontend Framework**: [React.js](https://react.dev/) (v19)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Routing**: [React Router](https://reactrouter.com/) (v6)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI based)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Charts**: [Recharts](https://recharts.org/)
*   **Forms**: React Hook Form + Zod
*   **Theming**: `next-themes` (adapted for Vite) for Dark/Light mode.

## 🏁 Getting Started

### Prerequisites
*   Node.js (v18 or higher recommended)
*   npm or pnpm

### Installation

1.  **Clone the repository** (if applicable) or download the source.

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    pnpm install
    ```

3.  **Start the development server**:
    ```bash
    npm run dev
    ```
    The application will start at `http://localhost:5173`.

### Building for Production

To create an optimized production build:

```bash
npm run build
```

The output will be in the `dist/` directory, ready to be deployed to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

## 📂 Project Structure

```text
src/
├── components/         # Reusable UI components
│   ├── layout/         # Navbar, Footer, Dashboard Layout
│   ├── ui/             # shadcn/ui primitives (Button, Card, etc.)
│   └── landing/        # Landing page sections
├── context/            # Global state (AppProvider)
├── hooks/              # Custom React hooks
├── lib/                # Utilities (cn, etc.)
├── pages/              # Application pages (Routed components)
│   ├── dashboard/      # Role-based dashboard views
│   ├── login/          # Authentication pages
│   ├── profile/        # User profile pages
│   └── search/         # Search functionality
├── App.jsx             # Main Router configuration
└── main.jsx            # Entry point
```

## 🎨 Design System

The project uses a sophisticated design system based on Tailwind CSS variables. It supports:
*   **Dark Mode**: Seamless switching between light and dark themes.
*   **Responsive Design**: Mobile-first approach working on all devices.
*   **Accessibility**: Built on Radix UI primitives for WAI-ARIA compliance.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).