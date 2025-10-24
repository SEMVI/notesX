# MemoMemo MVP

**Your intelligent memory capture and retrieval system**

MemoMemo makes it effortless to save and recall anything—from URLs and text snippets to images and audio recordings. Using AI to automatically understand, categorize, and connect memories, MemoMemo becomes your external brain.

![MemoMemo Dashboard](../memomemo-mockup.html)

## Features (MVP)

### ✨ Quick Capture
- **Lightning Fast**: Capture anything in < 3 seconds
- **Smart Input**: Automatically detects URLs, text, images, and more
- **AI Processing**: Auto-generates titles, summaries, tags, and categories
- **Keyboard Shortcut**: `Cmd/Ctrl + Shift + M`

### 🔍 Intelligent Search
- **Semantic Search**: Find memories by meaning, not just keywords
- **Type Filters**: Filter by URLs, Notes, Images, Audio, or Files
- **Real-time Results**: Instant search as you type

### 💾 Memory Management
- **Auto-Organization**: AI categorizes and tags everything automatically
- **Favorites**: Star important memories for quick access
- **Rich Metadata**: AI extracts entities, topics, and sentiment
- **Smart Cards**: Beautiful card layout with summaries

### 📊 Dashboard
- **Stats Overview**: See your memory count, weekly activity, and favorites
- **Recent Memories**: Quick access to latest captures
- **Clean UI**: Modern, responsive interface

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React
- **Date Formatting**: date-fns

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
memomemo/
├── src/
│   ├── components/
│   │   ├── capture/       # Quick capture components
│   │   ├── layout/        # Header, stats, layouts
│   │   ├── memory/        # Memory card and grid
│   │   └── search/        # Search and filters
│   ├── store/             # Zustand state management
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Helper functions
│   ├── App.tsx            # Main app component
│   └── index.css          # Global styles
├── public/                # Static assets
└── package.json           # Dependencies
```

## How It Works

### 1. Capture
Type or paste anything into the quick capture bar. MemoMemo automatically:
- Detects the content type (URL, text, etc.)
- Processes with AI to generate metadata
- Saves to your memory collection

### 2. AI Processing (Mock)
For the MVP, AI processing is mocked with intelligent pattern matching that:
- Generates descriptive titles from content
- Creates summaries (first 2 sentences)
- Extracts relevant tags and categories
- Detects topics (Web Dev, Design, Business, etc.)
- Analyzes sentiment (positive, neutral, negative)
- Identifies entities (dates, names, places)

### 3. Search & Filter
- Real-time search across all memory fields
- Filter by type (all, URL, text, image, audio, file)
- Semantic matching on titles, content, tags, and categories

## Features in Development

### Next Up
- [ ] Real AI integration (OpenAI/Anthropic)
- [ ] Voice recording support
- [ ] Image upload and OCR
- [ ] File attachment handling
- [ ] Collections/folders
- [ ] Memory detail view
- [ ] Edit and delete memories
- [ ] Export memories
- [ ] Dark mode

### Future Enhancements
- [ ] Browser extension
- [ ] Mobile app (React Native)
- [ ] Desktop app (Electron)
- [ ] Offline support
- [ ] Sync across devices
- [ ] Sharing and collaboration
- [ ] Advanced search (filters, date ranges)
- [ ] Memory relationships graph
- [ ] Smart suggestions and rediscovery

## Design Philosophy

### Speed First
Every interaction is optimized for speed. Capturing a memory should feel instant.

### Zero Organization Required
AI handles all the heavy lifting. Just capture, and MemoMemo organizes.

### Beautiful & Functional
Clean, modern UI that's a joy to use while staying functional.

### Privacy Focused
Your data, your control. Everything is designed with privacy in mind.

## Development Roadmap

See [MEMOMEMO_DESIGN.md](../MEMOMEMO_DESIGN.md) for the complete design document and development roadmap.

## Contributing

This is an MVP / demo project. Contributions are welcome!

### Development

```bash
# Run in development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## License

MIT License - See LICENSE file for details

## Credits

Built with:
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Lucide Icons](https://lucide.dev/)

---

**MemoMemo** - Never forget anything again! 💭
