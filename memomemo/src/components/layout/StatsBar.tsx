import { useMemoryStore } from '../../store/memoryStore';
import { Database, Calendar, FolderOpen, Star } from 'lucide-react';

export function StatsBar() {
  const memories = useMemoryStore((state) => state.memories);

  const totalMemories = memories.length;
  const favoritesCount = memories.filter((m) => m.isFavorite).length;

  // Count memories from this week
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const thisWeekCount = memories.filter((m) => m.createdAt >= oneWeekAgo).length;

  const stats = [
    {
      icon: Database,
      value: totalMemories.toLocaleString(),
      label: 'Total Memories',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Calendar,
      value: thisWeekCount.toString(),
      label: 'This Week',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: FolderOpen,
      value: '0',
      label: 'Collections',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: Star,
      value: favoritesCount.toString(),
      label: 'Favorites',
      color: 'bg-yellow-100 text-yellow-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="card p-4">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
