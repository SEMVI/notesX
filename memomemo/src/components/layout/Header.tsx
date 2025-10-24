import { Bell, Settings, Plus } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-primary to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-2xl">
              💭
            </div>
            <span className="text-2xl font-bold">MemoMemo</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors">
              <Plus className="w-5 h-5" />
              <span className="font-medium">New</span>
            </button>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-semibold">
              JD
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
