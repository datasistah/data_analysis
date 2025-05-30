# Data Analysis Learning Platform

A modern Next.js application for a Data Analysis Learning Platform that guides users through interactive data analysis sessions while building their portfolio. Featuring a robust tech stack with Next.js 14, Tailwind CSS, Shadcn/UI components, Supabase integration, and visualization capabilities.

## Features

- 🎯 **Interactive SQL Playground**: Practice SQL queries with real-time feedback and syntax highlighting
- 📊 **Data Visualization**: Create beautiful charts and graphs with Chart.js or Plotly.js
- 📂 **Project Management**: Create and organize data analysis projects
- 🔐 **User Authentication**: Secure authentication with Supabase
- 🎨 **Modern UI**: Sleek dark mode interface with Tailwind CSS and custom components
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, custom UI components
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Data Visualization**: Chart.js, Plotly.js
- **Code Editing**: React Textarea Code Editor

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Supabase account (for backend services)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/data_analysis_app.git
cd data_analysis_app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```
Then edit `.env.local` with your Supabase credentials.

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Current Status

The platform currently includes:

- ✅ Modern UI components with Tailwind CSS
- ✅ User authentication with Supabase
- ✅ Project management screens
- ✅ SQL Editor with syntax highlighting
- ✅ Data visualization components
- ✅ Dashboard and navigation structure

## Next Steps

- 🔜 Natural language to SQL conversion with RAG-based LLM
- 🔜 Portfolio generation and export
- 🔜 Real-time collaboration features
- 🔜 Offline capabilities via service workers
- 🔜 Advanced data transformation tools

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License.