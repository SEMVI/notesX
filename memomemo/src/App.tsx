import { Header } from './components/layout/Header';
import { QuickCapture } from './components/capture/QuickCapture';
import { StatsBar } from './components/layout/StatsBar';
import { SearchBar } from './components/search/SearchBar';
import { MemoryGrid } from './components/memory/MemoryGrid';
import { useMemoryStore } from './store/memoryStore';
import { useEffect } from 'react';

function App() {
  const { searchQuery, searchMemories } = useMemoryStore();
  const filteredMemories = searchMemories(searchQuery);

  // Load sample data on first run
  useEffect(() => {
    const loadSampleData = async () => {
      const { addMemory } = useMemoryStore.getState();
      const memories = useMemoryStore.getState().memories;

      // Only load if no memories exist
      if (memories.length === 0) {
        await addMemory({
          type: 'url',
          content: 'A comprehensive guide to React performance optimization techniques including memoization, lazy loading, and code splitting best practices.',
          originalUrl: 'https://example.com/react-performance',
          source: 'sample',
        });

        await addMemory({
          type: 'text',
          content: 'Meeting notes from Q4 product strategy session. Discussed roadmap priorities, user feedback integration, and timeline for new AI features. Action items: review user research, schedule design review, update documentation.',
          source: 'sample',
        });

        await addMemory({
          type: 'url',
          content: 'Beautiful dashboard UI design inspiration with clean layout, excellent use of white space and color contrast. Great example of modern web design principles.',
          originalUrl: 'https://example.com/design-inspiration',
          source: 'sample',
        });
      }
    };

    loadSampleData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <QuickCapture />

        <div className="mt-16">
          <StatsBar />
          <SearchBar />

          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {searchQuery ? 'Search Results' : 'Recent Memories'}
            </h2>
            {searchQuery && (
              <p className="text-gray-600 mt-1">
                Found {filteredMemories.length} memories matching "{searchQuery}"
              </p>
            )}
          </div>

          <MemoryGrid memories={filteredMemories} />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 text-center text-gray-500 text-sm">
        <p>MemoMemo MVP • Built with React + TypeScript + Tailwind CSS</p>
      </footer>
    </div>
  );
}

export default App;
