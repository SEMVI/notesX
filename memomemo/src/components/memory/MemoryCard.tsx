import { Star, MoreVertical } from 'lucide-react';
import type { Memory } from '../../types/memory';
import { useMemoryStore } from '../../store/memoryStore';
import { formatDate, getMemoryIcon } from '../../utils/formatters';

interface MemoryCardProps {
  memory: Memory;
}

export function MemoryCard({ memory }: MemoryCardProps) {
  const toggleFavorite = useMemoryStore((state) => state.toggleFavorite);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(memory.id);
  };

  return (
    <div className="card p-4 cursor-pointer hover:-translate-y-1 relative group">
      {/* Type Badge */}
      <span className="absolute top-3 right-3 text-2xl">
        {getMemoryIcon(memory.type)}
      </span>

      {/* Title */}
      <h3 className="font-semibold text-gray-900 mb-2 pr-8 line-clamp-2">
        {memory.title}
      </h3>

      {/* Summary */}
      {memory.summary && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {memory.summary}
        </p>
      )}

      {/* Tags */}
      {memory.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {memory.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className={`px-2 py-1 text-xs font-medium rounded ${
                index === 0
                  ? 'bg-primary/10 text-primary'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {tag}
            </span>
          ))}
          {memory.tags.length > 3 && (
            <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-600">
              +{memory.tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Meta */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span className="flex items-center gap-1">
          📅 {formatDate(memory.createdAt)}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={handleFavoriteClick}
            className={`p-1.5 rounded hover:bg-gray-100 transition-colors ${
              memory.isFavorite ? 'text-yellow-500' : 'text-gray-400'
            }`}
            title={memory.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Star className="w-4 h-4" fill={memory.isFavorite ? 'currentColor' : 'none'} />
          </button>
          <button
            className="p-1.5 rounded hover:bg-gray-100 transition-colors text-gray-400 opacity-0 group-hover:opacity-100"
            title="More options"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
