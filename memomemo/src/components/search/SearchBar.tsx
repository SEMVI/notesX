import { Search, SlidersHorizontal } from 'lucide-react';
import { useMemoryStore } from '../../store/memoryStore';
import { getMemoryIcon } from '../../utils/formatters';

const MEMORY_TYPES = [
  { value: 'all', label: 'All Types' },
  { value: 'url', label: 'URLs' },
  { value: 'text', label: 'Notes' },
  { value: 'image', label: 'Images' },
  { value: 'audio', label: 'Audio' },
  { value: 'file', label: 'Files' },
];

export function SearchBar() {
  const { searchQuery, selectedType, setSearchQuery, setSelectedType } = useMemoryStore();

  return (
    <div className="mb-6">
      {/* Search Input */}
      <div className="flex items-center gap-3 bg-white border-2 border-gray-200 rounded-lg px-4 py-3 mb-4 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search your memories..."
          className="flex-1 bg-transparent border-none outline-none text-base"
        />
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <SlidersHorizontal className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Type Filters */}
      <div className="flex flex-wrap gap-2">
        {MEMORY_TYPES.map((type) => (
          <button
            key={type.value}
            onClick={() => setSelectedType(type.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedType === type.value
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {type.value !== 'all' && (
              <span className="mr-1">{getMemoryIcon(type.value)}</span>
            )}
            {type.label}
          </button>
        ))}
      </div>
    </div>
  );
}
