# Open Hours Management System

A React + TypeScript application for managing business hours and open hours rules. Create, edit, and view weekly schedules with a clean, intuitive interface.

## Features

- ✅ **Add Open Hours** - Create new open hours rules
- ✅ **Edit Rules** - Modify existing open hours
- ✅ **Remove Rules** - Delete unwanted rules
- ✅ **Weekly Schedule** - View effective hours for each day
- ✅ **Priority System** - Later rules override earlier ones
- ✅ **Flexible Payload** - Add custom data to rules
- ✅ **Console Logging** - Debug rules in browser console

## How to Run

### Prerequisites

- **Node.js** (version 18 or higher)
  - Download from: https://nodejs.org/
  - This includes npm (package manager)

### Installation & Setup

1. **Extract the project** (if received as zip file)
2. **Open terminal/command prompt** in the project folder
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Start the development server:**
   ```bash
   npm run dev
   ```
5. **Open your browser** and go to the URL shown in the terminal (usually `http://localhost:5173`)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # React components
│   ├── RuleForm.tsx     # Add/Edit rules form
│   ├── RulesDisplay.tsx # Display current rules
│   └── WeeklySchedule.tsx # Weekly schedule view
├── models/              # Data models and types
│   ├── factory.ts       # Factory pattern interface
│   ├── rule.ts          # Rule type and factory
│   ├── rules.ts         # Rules collection wrapper
│   └── weekdays.ts      # Weekday enum with bit flags
├── App.tsx              # Main application component
└── main.tsx             # React entry point
```

## Usage

1. **Add Open Hours:**

   - Fill out the form on the left
   - Select start/end dates and times
   - Choose which days of the week
   - Add optional payload (description, pricing, etc.)
   - Click "Add"

2. **Edit Rules:**

   - Click "Edit" button on any rule
   - Modify the form fields
   - Click "Update" to save changes
   - Click "Cancel" to discard changes

3. **Remove Rules:**

   - Click "Remove" button on any rule
   - Rule will be deleted immediately

4. **View Schedule:**
   - See the weekly schedule at the bottom
   - Shows effective hours for each day
   - Displays rule priority and conflicts

## Technical Details

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Patterns:** Factory Pattern, Wrapper Pattern
- **State Management:** React useState hooks
- **Styling:** Inline styles (can be converted to CSS modules)

## Development

The project uses modern React patterns and TypeScript for type safety. All components are functional components with hooks, and the code follows React best practices.

For development, the project includes:

- Hot Module Replacement (HMR)
- TypeScript compilation
- ESLint for code quality
- Vite for fast builds
