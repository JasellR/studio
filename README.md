
# RemoteFlow: Secure Web RDP Client

RemoteFlow is a Next.js application designed to provide a seamless and secure web-based Remote Desktop Protocol (RDP) experience. It allows users to directly connect to remote hosts by specifying their IP address or hostname, bypassing complex authentication flows for quick access.

## ✨ Features

*   **Direct Host Connection**: Enter an IP address or hostname on the main page to initiate a connection.
*   **Simplified Interface**: A clean and modern UI for managing and interacting with remote sessions.
*   **Dashboard Overview**: Access different sections like connection management, session history (mocked), and activity logs (mocked).
*   **Responsive Design**: Adapts to various screen sizes for a consistent experience on desktop and mobile.
*   **Dark Theme**: A visually appealing dark theme is applied by default.

## 🚀 Tech Stack

*   **Framework**: [Next.js](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **AI Integration (Core)**: [Genkit (Firebase)](https://firebase.google.com/docs/genkit) - for potential AI-driven features.
*   **State Management**: React Hooks (`useState`, `useEffect`, `useActionState`)
*   **Forms**: Server Actions with React Hooks
*   **Icons**: [Lucide React](https://lucide.dev/)

## 🏁 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd remoteflow
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    ```

### Running the Development Server

1.  **Start the Next.js development server:**
    ```bash
    npm run dev
    # or
    # yarn dev
    ```
    This will typically start the application on `http://localhost:9002`.

2.  **Start the Genkit development server (if using AI features):**
    Open a new terminal and run:
    ```bash
    npm run genkit:dev
    # or
    # npm run genkit:watch (to automatically restart on file changes)
    ```
    Genkit typically runs on `http://localhost:3100` for its development UI and `http://localhost:4000` for the flow server.

## 📂 Project Structure

```
remoteflow/
├── public/                     # Static assets
├── src/
│   ├── ai/                     # Genkit AI flows and configuration
│   │   ├── flows/              # Genkit flow definitions
│   │   ├── dev.ts              # Genkit development server entry point
│   │   └── genkit.ts           # Genkit initialization
│   ├── app/                    # Next.js App Router (pages, layouts, etc.)
│   │   ├── (dashboard)/        # Dashboard specific routes and layout
│   │   │   ├── connect/
│   │   │   ├── logs/
│   │   │   ├── sessions/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── actions.ts          # Server Actions
│   │   ├── error.tsx           # Global error boundary
│   │   ├── globals.css         # Global styles and Tailwind directives
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Homepage (host input)
│   ├── components/             # React components
│   │   ├── auth/               # (Simplified/Legacy) Auth components
│   │   ├── icons/              # Custom SVG icons
│   │   ├── rdp/                # RDP specific components (ConnectionForm, RdpClientMock)
│   │   └── ui/                 # ShadCN UI components
│   ├── hooks/                  # Custom React hooks (e.g., useToast, useMobile)
│   ├── lib/                    # Utility functions, (simplified) auth logic
│   │   ├── auth-actions.ts     # (Simplified/Legacy) Authentication server actions
│   │   ├── auth.ts             # (Simplified/Legacy) Authentication utilities
│   │   └── utils.ts            # General utility functions (e.g., cn)
├── .env.local                  # Environment variables (create if needed)
├── components.json             # ShadCN UI configuration
├── next.config.js              # Next.js configuration
├── package.json                # Project dependencies and scripts
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## 🤖 Genkit (AI Integration)

This project uses Genkit for integrating AI capabilities.

*   **Flows**: AI logic is organized into "flows" located in `src/ai/flows/`.
*   **Development UI**: When `genkit:dev` is running, you can access the Genkit Developer UI at `http://localhost:3100` to inspect, test, and trace your flows.

## 🎨 Styling and Theme

*   **Tailwind CSS**: Utility-first CSS framework for rapid UI development. Configuration is in `tailwind.config.ts`.
*   **ShadCN UI**: Pre-built, accessible, and customizable React components. The theme (colors, radius, etc.) is primarily defined in `src/app/globals.css` using CSS variables.
*   **Fonts**: `Inter` (sans-serif) and `Roboto Mono` (monospace) are used, configured in `src/app/layout.tsx` and `tailwind.config.ts`.

## 🔧 Key Configuration Files

*   `next.config.ts`: Next.js specific configurations (e.g., image remote patterns).
*   `tailwind.config.ts`: Tailwind CSS theme and plugin configurations.
*   `src/app/globals.css`: Base Tailwind styles, CSS variable definitions for theming (background, foreground, primary, accent colors, etc.).
*   `src/ai/genkit.ts`: Genkit plugin and model configuration.

## 🤝 Contributing

Contributions are welcome! Please follow the standard fork-and-pull-request workflow. Ensure your code adheres to the project's linting and formatting standards.

(Further contribution guidelines can be added here, e.g., running linters, tests.)

## 📄 License

This project is licensed under the [MIT License](LICENSE.md) (assuming MIT, you can change this if needed).
You would need to create a `LICENSE.md` file if you choose a specific license.
```