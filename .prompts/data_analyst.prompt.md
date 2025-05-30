# Data Analysis Learning Platform - Technical Requirements

## Core Functionality
Create a Next.js application that guides users through interactive data analysis sessions while building their portfolio.

## Technical Stack
- Frontend: Next.js 14 with App Router
- UI: Tailwind CSS + Shadcn/UI components
- Theme: Dark mode with modern, accessible design
- Database: Supabase (PostgreSQL)
- LLM Integration: Hugging Face Inference API
- Visualization: Plotly.js or Chart.js
- Authentication: Supabase Auth

## Key Features

### 1. Session Management
- Guided project workflow with step-by-step instructions
- Personal context capture (dataset selection rationale)
- Progress tracking and session persistence

### 2. Data Analysis Pipeline
- Data upload and ingestion interface
- SQL query playground with interactive validation
- Data cleaning and transformation tools
- Pivot table generator
- Interactive visualization builder

### 3. LLM Integration
- Natural language query translation to SQL
- Context-aware assistance using RAG
- Real-time feedback and explanations
- Query validation and error prevention

### 4. Portfolio Generation
- Automated documentation of analysis steps
- Export functionality for visualizations
- Markdown-based report generation
- Custom template system for portfolio presentation

## User Flow
1. Authentication
2. Dataset selection
3. Project context capture
4. Guided analysis steps:
   - Data exploration
   - SQL practice
   - Data cleaning
   - Visualization creation
5. Portfolio document generation

## Technical Requirements
- Implement server-side rendering for performance
- Ensure responsive design for all device sizes
- Include error handling and data validation
- Implement secure data storage and processing
- Add real-time collaboration features
- Enable offline capability using service workers

## Documentation
- User guide for analysis features
- Example portfolios and templates
- Setup and deployment instructions

