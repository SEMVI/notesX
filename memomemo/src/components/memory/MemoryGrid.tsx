import type { Memory } from '../../types/memory';
import { MemoryCard } from './MemoryCard';

interface MemoryGridProps {
  memories: Memory[];
  emptyMessage?: string;
}

export function MemoryGrid({ memories, emptyMessage = 'No memories found' }: MemoryGridProps) {
  if (memories.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">💭</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          {emptyMessage}
        </h3>
        <p className="text-gray-500">
          Start capturing your thoughts, ideas, and discoveries
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {memories.map((memory) => (
        <MemoryCard key={memory.id} memory={memory} />
      ))}
    </div>
  );
}
