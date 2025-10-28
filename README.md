# Gurukul AI - Adaptive Agentic RAG System for Education

Transform education with cutting-edge AI. Gurukul AI is a multi-agent educational platform featuring a Meta-Classifier that intelligently routes tasks between simple and complex processing pipelines.

## Overview

Gurukul AI implements a novel dual-policy agentic system:
- **Fire-and-Forget (F&F)**: Fast, single-pass generation for simple tasks
- **Iterative Refinement (IR)**: Quality-focused Gen-Eval loop for complex tasks
- **Meta-Classifier**: Intelligent routing based on task complexity

## Key Features

### 1. AI Research Assistant
- Search and summarize ArXiv papers using RAG
- Identify research gaps and trends
- Instant access to cutting-edge research

### 2. Smart AI Grader
- Automated assignment grading with Gen-Eval loop
- Iterative refinement for quality assurance
- MS Teams/Outlook integration (simulated)
- Rubric-aware evaluation

### 3. Content Creator
- Generate quizzes, MCQs, notes, and lesson plans
- RAG-powered content from source documents
- Adaptive quality control

## Architecture

```
┌─────────────────┐
│  User Request   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Meta-Classifier │ ◄─── Analyzes task complexity
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌─────┐   ┌─────────────┐
│ F&F │   │     IR      │
└──┬──┘   │ (Gen-Eval)  │
   │      └──────┬──────┘
   │             │
   │      ┌──────┴──────┐
   │      │  Generator  │
   │      │      ↕      │
   │      │  Evaluator  │
   │      └──────┬──────┘
   │             │
   └─────┬───────┘
         │
         ▼
    ┌─────────┐
    │ Output  │
    └─────────┘
```

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vite** for build tooling

### Backend (Integration Required)
- **FastAPI** for API endpoints
- **LangChain/LlamaIndex** for RAG
- **OpenAI GPT-4** or **HuggingFace models**
- **FAISS/Pinecone** for vector storage

### Database
- **Supabase** (PostgreSQL)
- Row Level Security (RLS) enabled
- Real-time subscriptions

## Database Schema

### Tables
- `teachers` - Educator profiles
- `classes` - Course information
- `students` - Student enrollment
- `assignments` - Assignment definitions
- `submissions` - Student work
- `grades` - AI-generated grades with feedback
- `research_queries` - Research assistant history
- `generated_content` - Created educational materials

## Getting Started

### Prerequisites
```bash
Node.js 18+ and npm
Supabase account
OpenAI API key (for backend)
```

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/gurukul-ai.git
cd gurukul-ai
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
The `.env` file already contains Supabase configuration.

4. Run the development server
```bash
npm run dev
```

5. Build for production
```bash
npm run build
```

## Backend Setup

See `API_INTEGRATION.md` for detailed FastAPI backend implementation.

### Quick Start Backend

```python
# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/research-assistant")
async def research_assistant(query: str):
    # Implement RAG with ArXiv
    pass

@app.post("/api/grade-assignment")
async def grade_assignment(assignment: dict):
    # Implement Gen-Eval loop
    pass

@app.post("/api/create-content")
async def create_content(content_request: dict):
    # Implement content generation
    pass
```

## Features Implementation Status

### Completed
- ✅ Frontend UI with lavender theme
- ✅ Authentication system (Supabase)
- ✅ Database schema with RLS
- ✅ Gen-Eval loop visualization
- ✅ Research Assistant UI
- ✅ AI Grader UI
- ✅ Content Creator UI
- ✅ Responsive design

### Pending (Backend Integration)
- ⏳ FastAPI endpoints
- ⏳ RAG implementation
- ⏳ Meta-Classifier logic
- ⏳ LLM integration (OpenAI/HuggingFace)
- ⏳ MS Teams/Outlook integration
- ⏳ File upload and processing

## Research Paper

This project is designed for academic publication. See `RESEARCH_PAPER_OUTLINE.md` for:
- Paper structure and outline
- Novel contributions
- Evaluation methodology
- Expected results
- Target conferences

### Key Novelty
1. **Meta-Classifier**: Dynamic policy selection based on task complexity
2. **Dual-Policy Framework**: Optimizes quality vs computational cost
3. **Gen-Eval Loop**: LLM-as-Judge for quality assurance
4. **Educational RAG**: Domain-specific retrieval and generation

## Usage

### For Teachers

1. **Sign Up/Login**
   - Create account with email/password
   - MS Teams integration (simulated)

2. **Research Assistant**
   - Enter research topic
   - Get ArXiv paper summaries
   - Identify research gaps

3. **Grade Assignments**
   - Select class
   - Paste student submission
   - Provide rubric
   - Review AI-generated grade and feedback
   - Approve and send to student

4. **Create Content**
   - Choose content type (Quiz/Notes/Lesson Plan)
   - Enter topic
   - Upload source materials (optional)
   - Generate with AI
   - Review Gen-Eval process

## Design Philosophy

### Color Palette
- **Primary**: Lavender, Purple, Indigo
- **Accents**: Teal, Blue, Green
- **Neutrals**: Gray scale with high contrast

### UI Principles
- Clean, modern, and calming
- Ample whitespace
- Rounded corners and subtle shadows
- Smooth transitions and hover effects
- Accessible color contrast

## Development

### Project Structure
```
src/
├── components/        # React components
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── AuthModal.tsx
│   ├── GenEvalLoop.tsx
│   ├── ResearchAssistant.tsx
│   ├── AIGrader.tsx
│   └── ContentCreator.tsx
├── contexts/          # React contexts
│   └── AuthContext.tsx
├── lib/              # Utilities
│   └── supabase.ts
├── App.tsx           # Main app component
└── main.tsx          # Entry point
```

### Key Components

**GenEvalLoop**: Visualizes the iterative refinement process
- Shows generator output
- Displays evaluator feedback and ratings
- Tracks iteration progress
- Indicates policy used (F&F vs IR)

**AuthContext**: Manages authentication state
- Supabase integration
- Session management
- Teacher profile loading

## API Endpoints

See `API_INTEGRATION.md` for complete documentation.

### Main Endpoints
- `POST /api/research-assistant` - Search ArXiv papers
- `POST /api/grade-assignment` - Grade with Gen-Eval
- `POST /api/create-content` - Generate educational content
- `POST /api/send-grade` - Send grade to student

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

MIT License - see LICENSE file for details

## Citation

If you use this work in your research, please cite:

```bibtex
@software{gurukulai2025,
  title={Gurukul AI: Adaptive Agentic RAG System for Educational Tasks},
  author={Your Name},
  year={2025},
  url={https://github.com/your-username/gurukul-ai}
}
```

## Acknowledgments

- Supabase for database infrastructure
- OpenAI for LLM capabilities
- ArXiv for research paper dataset
- React and Tailwind CSS communities

## Contact

For questions or collaboration:
- Email: your.email@example.com
- GitHub: [@your-username](https://github.com/your-username)

---

**Gurukul AI** - Transforming Education with Intelligent Agentic Systems
