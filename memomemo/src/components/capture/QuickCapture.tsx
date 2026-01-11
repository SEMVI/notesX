import { useState } from 'react';
import { Mic, Paperclip, Sparkles } from 'lucide-react';
import { useMemoryStore } from '../../store/memoryStore';
import type { MemoryType } from '../../types/memory';

export function QuickCapture() {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const addMemory = useMemoryStore((state) => state.addMemory);

  const detectType = (content: string): MemoryType => {
    // Simple URL detection
    if (content.match(/^https?:\/\//i)) {
      return 'url';
    }
    return 'text';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsProcessing(true);
    setShowSuggestions(true);

    try {
      const type = detectType(input);
      const memory = await addMemory({
        type,
        content: input.trim(),
        originalUrl: type === 'url' ? input.trim() : undefined,
        source: 'quick-capture',
      });

      // Show AI suggestions
      setSuggestions([...memory.tags, ...memory.categories]);

      // Clear input after a moment
      setTimeout(() => {
        setInput('');
        setShowSuggestions(false);
        setSuggestions([]);
        setIsProcessing(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to add memory:', error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 -mt-8 relative z-10">
      <div className="bg-white rounded-xl shadow-xl p-4 border border-gray-200">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-3 bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-3 transition-all duration-200 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
            <span className="text-2xl">💭</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type anything, paste URL, or drop files... (⌘⇧M)"
              className="flex-1 bg-transparent border-none outline-none text-base placeholder:text-gray-400"
              disabled={isProcessing}
            />
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                title="Voice Record"
              >
                <Mic className="w-5 h-5 text-gray-600" />
              </button>
              <button
                type="button"
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                title="Attach File"
              >
                <Paperclip className="w-5 h-5 text-gray-600" />
              </button>
              <button
                type="submit"
                disabled={!input.trim() || isProcessing}
                className="btn-primary px-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  'Save'
                )}
              </button>
            </div>
          </div>
        </form>

        {/* AI Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-2 text-sm text-primary font-medium mb-2">
              <Sparkles className="w-4 h-4" />
              <span>AI detected:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
