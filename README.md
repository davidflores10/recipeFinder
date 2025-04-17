# README.md for Recipe Finder

# Recipe Finder

This project is a simple tool for recipe search developed by David Flores Barbero. The application allows you to:

- Search for recipes by entering ingredients or keywords.
- View a list of matching recipes with basic details (e.g., name, short description,
  and image).
- Click on a recipe to view detailed information, including ingredients,
  instructions, and preparation time.
- Save favorite recipes to a local list for easy access.

## Project Structure

```
recipeFinder
├── src
│   ├── App.vue                # Root component of the application
│   ├── main.ts               # Entry point of the application
│   ├── RecipeFinder/         # Core recipe finder functionality
│   │   ├── components/       # Recipe-specific components
│   │   ├── models/          # Data models
│   │   ├── repository/      # Data access layer
│   │   ├── services/        # Business logic services
│   │   └── Views/           # Main view components
│   ├── shared/              # Shared resources
│   │   ├── assets/          # Static assets (images)
│   │   ├── components/      # Reusable components
│   │   ├── helpers/         # Helper functions
│   │   ├── router/          # Vue router configuration
│   │   ├── styles/          # CSS styles
│   │   └── support/         # Support utilities and constants
│   └── stores/              # State management
├── tests/                   # Test files
│   └── unit/               # Unit tests
├── env.d.ts                # TypeScript declarations
├── index.html              # Main HTML file
├── package.json            # Project configuration
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── tsconfig.node.json     # Node-specific TS config
├── vite.config.ts         # Vite configuration
└── vitest.config.ts       # Vitest configuration
```

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository:

   ```
   git clone <repository-url>
   cd recipeFinder
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:

   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to see your application in action.

## Build

To build the application for production, run:

```
npm run build
```

This will generate the production-ready files in the `dist` directory.

## Technology - Tools

- Vue 3
- Vue Router
- Vite
- Vitest
- Tailwindcss
- Pinia (Store management)
- Fontawesome

## API

The api for obtaining the data is https://www.themealdb.com

## Links

The application is live at: https://recipefinderdf.netlify.app/
