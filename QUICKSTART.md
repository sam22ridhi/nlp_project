# Gurukul AI - Quick Start Guide

Get your AI-powered educational platform running in minutes!

## Prerequisites

- Node.js 18+ and npm
- Python 3.9+ (for backend)
- Supabase account (already configured)
- OpenAI API key or HuggingFace token (for backend)

## Frontend Setup (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
The `.env` file is already configured with Supabase credentials. No changes needed!

### 3. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:5173` and you'll see Gurukul AI!

### 4. Build for Production
```bash
npm run build
```

## Current Features (Working)

✅ Beautiful lavender-themed UI
✅ User authentication (Sign up/Login)
✅ Database with Row Level Security
✅ Research Assistant interface
✅ AI Grader interface with Gen-Eval visualization
✅ Content Creator interface
✅ Responsive design
✅ Complete navigation flow

## Test the Application

### Create an Account
1. Click "Get Started" on the homepage
2. Sign up with email/password
3. You'll be logged in automatically

### Explore Features
1. Click "Features" in the navbar
2. Click on any feature card:
   - **AI Research Assistant**: Search interface (mock data)
   - **Smart AI Grader**: Assignment grading with Gen-Eval loop
   - **Content Creator**: Quiz and content generation

### Watch the Gen-Eval Loop
When you use the AI Grader or Content Creator:
- See the iterative refinement process
- Watch ratings improve across iterations
- View Generator output and Evaluator feedback
- Observe the Fire-and-Forget vs Iterative Refinement policies

## Backend Setup (Optional - For Full Functionality)

### 1. Create Backend Directory
```bash
mkdir backend
cd backend
```

### 2. Install FastAPI
```bash
pip install fastapi uvicorn python-dotenv supabase openai langchain
```

### 3. Copy Starter Code
Copy `BACKEND_STARTER.py` to `backend/main.py`

### 4. Set Environment Variables
```bash
# backend/.env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_service_role_key
OPENAI_API_KEY=your_openai_key
```

### 5. Run Backend
```bash
cd backend
uvicorn main:app --reload
```

Backend runs on `http://localhost:8000`

### 6. Update Frontend API Calls
Currently, the frontend uses mock data. To connect to the backend:

```typescript
// src/components/AIGrader.tsx (example)
const API_URL = 'http://localhost:8000/api';

const response = await fetch(`${API_URL}/grade-assignment`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    class_id: selectedClass,
    assignment_text: assignmentText,
    rubric: rubric,
    teacher_id: teacher.id
  })
});
```

## Project Structure

```
gurukul-ai/
├── src/
│   ├── components/          # UI components
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── AuthModal.tsx
│   │   ├── GenEvalLoop.tsx
│   │   ├── ResearchAssistant.tsx
│   │   ├── AIGrader.tsx
│   │   └── ContentCreator.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx  # Authentication state
│   ├── lib/
│   │   └── supabase.ts      # Supabase client
│   ├── App.tsx              # Main app with routing
│   └── main.tsx             # Entry point
├── backend/ (create this)
│   ├── main.py              # FastAPI app
│   ├── agents/              # Generator & Evaluator
│   ├── rag/                 # RAG system
│   └── utils/               # Helper functions
├── API_INTEGRATION.md       # Backend API docs
├── BACKEND_STARTER.py       # Starter code
├── RESEARCH_PAPER_OUTLINE.md # Research paper outline
└── README.md                # Full documentation
```

## Database

The database is already set up with these tables:
- `teachers` - Educator profiles
- `classes` - Course information
- `students` - Student enrollment
- `assignments` - Assignment definitions
- `submissions` - Student work
- `grades` - AI-generated grades
- `research_queries` - Research history
- `generated_content` - Created materials

## Key Features Explained

### 1. Meta-Classifier
Determines which policy to use:
- **Simple tasks** → Fire-and-Forget (1 LLM call)
- **Complex tasks** → Iterative Refinement (2-5 LLM calls)

Saves computational resources while maintaining quality!

### 2. Gen-Eval Loop
For complex tasks:
1. **Generator** creates content
2. **Evaluator** rates quality (1-10) and provides feedback
3. **Loop** continues until rating ≥ 8 or max iterations
4. **Result** is high-quality, refined output

### 3. Visual Feedback
The UI shows the entire process:
- Each iteration's output
- Evaluator ratings and feedback
- Progress indicators
- Final approved result

## Common Issues

### Port Already in Use
If port 5173 is busy:
```bash
npm run dev -- --port 3000
```

### Supabase Connection Error
Check that `.env` has correct credentials:
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Build Errors
Clear cache and reinstall:
```bash
rm -rf node_modules dist
npm install
npm run build
```

## Next Steps

1. **Test the frontend** - Sign up and explore all features
2. **Set up backend** - Follow Backend Setup section
3. **Implement RAG** - Add ArXiv dataset integration
4. **Connect APIs** - Link frontend to backend endpoints
5. **Deploy** - Use Vercel (frontend) + Railway (backend)

## Research Paper

This project is designed for publication. See:
- `RESEARCH_PAPER_OUTLINE.md` - Paper structure
- `API_INTEGRATION.md` - Technical details

### Key Contributions
1. Meta-Classifier for adaptive policy selection
2. Dual-policy framework (F&F + IR)
3. Gen-Eval loop with LLM-as-Judge
4. Educational RAG application

## Resources

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: FastAPI + Python
- **Database**: Supabase (PostgreSQL)
- **LLMs**: OpenAI GPT-4 or HuggingFace
- **RAG**: LangChain / LlamaIndex

## Need Help?

1. Check `README.md` for full documentation
2. Review `API_INTEGRATION.md` for backend details
3. See `BACKEND_STARTER.py` for implementation examples
4. Open an issue on GitHub

## Screenshots

The application features:
- Gradient purple/lavender theme
- Clean, modern interface
- Smooth animations
- Responsive design
- Accessible color contrast

## Demo Flow

1. **Homepage** → Beautiful hero with AI illustration
2. **Features** → Three feature cards (Research, Grader, Creator)
3. **Sign Up** → Quick email/password registration
4. **Research** → Search ArXiv papers
5. **Grade** → Watch Gen-Eval loop in action
6. **Create** → Generate educational content

Ready to transform education with AI? Let's get started!

---

**Gurukul AI** - Built with ❤️ for educators and researchers
