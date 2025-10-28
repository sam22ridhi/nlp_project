# Gurukul AI - Component Structure

## Application Hierarchy

```
App.tsx (Root)
├── AuthProvider (Context)
│   └── AppContent
│       ├── Navbar
│       │   ├── Logo & Brand
│       │   ├── Navigation Links
│       │   └── User Profile / Logout
│       │
│       └── Page Routing
│           │
│           ├── Home Page (Default)
│           │   ├── Hero
│           │   │   ├── Heading & Description
│           │   │   ├── Get Started Button
│           │   │   └── AI Illustration (SVG)
│           │   └── Features
│           │       └── 6 Feature Cards
│           │           ├── AI Research Assistant
│           │           ├── Smart AI Grader
│           │           ├── Content Creator
│           │           ├── Personalized Learning
│           │           ├── Smart Tutoring
│           │           └── Practice Exercise
│           │
│           ├── Features Page
│           │   └── Features Component (3 main cards)
│           │
│           ├── Research Assistant Page
│           │   ├── Back Button
│           │   ├── Search Input
│           │   ├── Search Button
│           │   └── Results List
│           │       └── Paper Cards
│           │           ├── Title & Authors
│           │           ├── Date
│           │           ├── Summary
│           │           └── External Link
│           │
│           ├── AI Grader Page
│           │   ├── Left Panel
│           │   │   ├── Class Selector
│           │   │   ├── Assignment Input
│           │   │   ├── Rubric Input
│           │   │   ├── Grade Button
│           │   │   └── Results Display
│           │   │       ├── Final Grade
│           │   │       ├── Feedback
│           │   │       └── Approve Button
│           │   └── Right Panel
│           │       └── GenEvalLoop Component
│           │           ├── Policy Badge
│           │           └── Iteration List
│           │               └── Iteration Card (for each)
│           │                   ├── Status Icon
│           │                   ├── Generator Output
│           │                   ├── Rating Badge
│           │                   └── Evaluator Feedback
│           │
│           └── Content Creator Page
│               ├── Left Panel
│               │   ├── Content Type Selector
│               │   ├── Topic Input
│               │   ├── File Upload
│               │   ├── Generate Button
│               │   └── Results Display
│               │       └── Generated Content
│               │           ├── Quiz (if MCQ)
│               │           └── Text (if notes/plan)
│               └── Right Panel
│                   └── GenEvalLoop Component
│
└── AuthModal (Conditional)
    ├── Close Button
    ├── Title
    ├── Sign In / Sign Up Toggle
    └── Form
        ├── Name Input (if Sign Up)
        ├── Email Input
        ├── Password Input
        ├── Error Display
        ├── Submit Button
        └── Toggle Link
```

## Component Files

### Core Application
```typescript
// main.tsx - Entry point
└── Renders App component into DOM

// App.tsx - Main application
├── Wraps everything in AuthProvider
├── Manages page routing state
├── Handles feature navigation
└── Shows AuthModal conditionally
```

### Contexts
```typescript
// contexts/AuthContext.tsx
├── Manages authentication state
├── Provides sign in/up/out functions
├── Loads teacher profile
└── Exposes useAuth hook
```

### Layout Components
```typescript
// components/Navbar.tsx
├── Props: onNavigate, currentPage
├── Shows logo and brand
├── Navigation buttons
└── User profile with logout

// components/Hero.tsx
├── Props: onGetStarted
├── Hero heading and description
├── CTA button
└── AI brain illustration (custom SVG)
```

### Feature Components
```typescript
// components/Features.tsx
├── Props: onFeatureClick
├── Feature grid (6 cards)
└── Calls onFeatureClick with feature ID

// components/ResearchAssistant.tsx
├── Props: onBack
├── Search interface
├── Mock paper results
└── Paper cards with external links

// components/AIGrader.tsx
├── Props: onBack
├── Grading form (left panel)
├── GenEvalLoop visualization (right panel)
├── Shows iterative refinement
└── Approve/send functionality

// components/ContentCreator.tsx
├── Props: onBack
├── Content type selection
├── Topic input and file upload
├── GenEvalLoop visualization
└── Generated content display
```

### Shared Components
```typescript
// components/AuthModal.tsx
├── Props: onClose
├── Sign in/up form
├── Email/password fields
├── Error handling
└── Form submission

// components/GenEvalLoop.tsx
├── Props: iterations, currentStep, policyUsed
├── Visualizes Gen-Eval process
├── Shows each iteration:
│   ├── Status indicator (pending/processing/completed)
│   ├── Generator output
│   ├── Evaluator rating
│   └── Evaluator feedback
└── Progress indicators
```

## Data Flow

### Authentication Flow
```
User Action → AuthModal → useAuth hook → Supabase
                                        ↓
                          AuthContext updates
                                        ↓
                          App re-renders with teacher
```

### Feature Navigation Flow
```
User clicks feature → App checks auth → If authenticated: navigate
                                     → If not: show AuthModal
```

### AI Grading Flow (Frontend Only - Mock)
```
User fills form → Click "Grade" → Simulate Gen-Eval loop
                                 ↓
                          Update iterations array
                                 ↓
                          GenEvalLoop component renders
                                 ↓
                          Show final grade
```

### Backend Integration Flow (When Implemented)
```
Frontend → POST /api/grade-assignment → FastAPI
                                        ↓
                                   Meta-Classifier
                                        ↓
                        Fire-and-Forget or Iterative Refinement
                                        ↓
                                   Gen-Eval Loop
                                        ↓
                                   Return iterations
                                        ↓
                                   Frontend updates UI
```

## State Management

### Global State (Context)
```typescript
AuthContext:
- teacher: Teacher | null
- loading: boolean
- signIn: function
- signUp: function
- signOut: function
```

### Local State (Components)
```typescript
App:
- currentPage: string
- showAuthModal: boolean

ResearchAssistant:
- query: string
- loading: boolean
- papers: Paper[]

AIGrader:
- selectedClass: string
- assignmentText: string
- rubric: string
- loading: boolean
- result: { grade, feedback }
- iterations: Iteration[]
- currentStep: number

ContentCreator:
- contentType: string
- topic: string
- loading: boolean
- result: any
- iterations: Iteration[]
- currentStep: number
- policyUsed: 'fire_and_forget' | 'iterative_refinement'
```

## Styling Approach

### Tailwind Classes Used
```css
/* Colors */
bg-purple-600, bg-indigo-600, bg-blue-600
from-purple-600, via-indigo-600, to-blue-600
text-purple-800, text-indigo-700

/* Layout */
min-h-screen, max-w-7xl, mx-auto
grid, flex, space-x-*, space-y-*

/* Effects */
rounded-lg, rounded-xl, rounded-2xl
shadow-lg, shadow-xl, shadow-2xl
hover:scale-105, transition-all
backdrop-blur-sm

/* Responsive */
md:grid-cols-3, lg:grid-cols-2
sm:px-6, lg:px-8
```

### Custom Styles
```css
/* Gradient backgrounds */
bg-gradient-to-r, bg-gradient-to-br
from-purple-600 to-indigo-600

/* Animations */
animate-spin (loading)
animate-pulse (hero illustration)
```

## Component Props Interface

```typescript
// Navbar
interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

// Hero
interface HeroProps {
  onGetStarted: () => void;
}

// Features
interface FeaturesProps {
  onFeatureClick: (feature: string) => void;
}

// Feature Pages (Research, Grader, Creator)
interface FeaturePageProps {
  onBack: () => void;
}

// AuthModal
interface AuthModalProps {
  onClose: () => void;
}

// GenEvalLoop
interface GenEvalLoopProps {
  iterations: Iteration[];
  currentStep: number;
  policyUsed: 'fire_and_forget' | 'iterative_refinement';
}

interface Iteration {
  step: number;
  generatorOutput: string;
  evaluatorRating: number;
  evaluatorFeedback: string;
  status: 'pending' | 'processing' | 'completed';
}
```

## Key Features of Each Component

### Navbar
- Gradient background (purple → indigo → blue)
- Brand logo with BookOpen icon
- Active page highlighting
- User profile display
- Logout button with hover effects

### Hero
- Large gradient background
- Custom AI brain SVG illustration
- Animated pulsing effect
- CTA button with hover scale
- Responsive grid layout

### Features
- 6 feature cards
- 3 main features (clickable for navigation)
- 3 highlight features (informational)
- Gradient icons
- Hover scale effects

### GenEvalLoop
- Timeline visualization
- Status indicators (pending/processing/completed)
- Generator output boxes
- Evaluator feedback with ratings
- Color-coded by quality (green ≥8, yellow 6-7, red <6)
- Policy badge
- Completion message

### AI Grader
- Two-panel layout (form + visualization)
- Class dropdown
- Multi-line text inputs
- Real-time Gen-Eval visualization
- Final grade approval
- Send to student simulation

### Content Creator
- Content type selection
- File upload (simulated)
- Policy-based generation
- Different outputs (quiz vs notes)
- Gen-Eval visualization for complex tasks

## Responsive Breakpoints

```css
/* Mobile First */
Default: Stack vertically, full width

/* Small (sm: 640px) */
sm:px-6

/* Medium (md: 768px) */
md:grid-cols-2, md:grid-cols-3

/* Large (lg: 1024px) */
lg:grid-cols-2, lg:px-8

/* Extra Large (xl: 1280px) */
max-w-7xl centered
```

## Accessibility

- High contrast text colors
- Keyboard navigation support
- Focus states on interactive elements
- Semantic HTML structure
- ARIA labels where needed
- Loading state indicators
- Error message displays

## Performance Optimizations

- Code splitting via Vite
- Lazy loading (can be added)
- Optimized bundle size (~90KB gzipped)
- CSS purging via Tailwind
- Tree-shaking unused code
- Fast refresh during development

This structure provides a solid foundation that's easy to understand, maintain, and extend!
