import { create } from 'zustand';
import { Memory, CreateMemoryInput, Collection } from '../types/memory';
import { generateMemoryMetadata } from '../utils/aiMock';

interface MemoryState {
  memories: Memory[];
  collections: Collection[];
  isLoading: boolean;
  searchQuery: string;
  selectedType: string;

  // Actions
  addMemory: (input: CreateMemoryInput) => Promise<Memory>;
  updateMemory: (id: string, updates: Partial<Memory>) => void;
  deleteMemory: (id: string) => void;
  toggleFavorite: (id: string) => void;
  getMemoryById: (id: string) => Memory | undefined;
  searchMemories: (query: string) => Memory[];
  setSearchQuery: (query: string) => void;
  setSelectedType: (type: string) => void;
}

export const useMemoryStore = create<MemoryState>((set, get) => ({
  memories: [],
  collections: [],
  isLoading: false,
  searchQuery: '',
  selectedType: 'all',

  addMemory: async (input: CreateMemoryInput) => {
    set({ isLoading: true });

    // Simulate AI processing
    const metadata = await generateMemoryMetadata(input);

    const newMemory: Memory = {
      id: crypto.randomUUID(),
      type: input.type,
      content: input.content,
      originalUrl: input.originalUrl,
      fileUrl: input.fileUrl,
      fileName: input.fileName,
      source: input.source,
      ...metadata,
      collectionIds: [],
      isFavorite: false,
      isArchived: false,
      importance: 50,
      createdAt: new Date(),
      updatedAt: new Date(),
      accessedAt: new Date(),
      accessCount: 0,
    };

    set((state) => ({
      memories: [newMemory, ...state.memories],
      isLoading: false,
    }));

    return newMemory;
  },

  updateMemory: (id: string, updates: Partial<Memory>) => {
    set((state) => ({
      memories: state.memories.map((memory) =>
        memory.id === id
          ? { ...memory, ...updates, updatedAt: new Date() }
          : memory
      ),
    }));
  },

  deleteMemory: (id: string) => {
    set((state) => ({
      memories: state.memories.filter((memory) => memory.id !== id),
    }));
  },

  toggleFavorite: (id: string) => {
    set((state) => ({
      memories: state.memories.map((memory) =>
        memory.id === id
          ? { ...memory, isFavorite: !memory.isFavorite, updatedAt: new Date() }
          : memory
      ),
    }));
  },

  getMemoryById: (id: string) => {
    return get().memories.find((memory) => memory.id === id);
  },

  searchMemories: (query: string) => {
    const { memories, selectedType } = get();
    const lowerQuery = query.toLowerCase();

    return memories.filter((memory) => {
      const matchesType = selectedType === 'all' || memory.type === selectedType;
      const matchesQuery =
        !query ||
        memory.title.toLowerCase().includes(lowerQuery) ||
        memory.content.toLowerCase().includes(lowerQuery) ||
        memory.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
        memory.categories.some((cat) => cat.toLowerCase().includes(lowerQuery));

      return matchesType && matchesQuery && !memory.isArchived;
    });
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  setSelectedType: (type: string) => {
    set({ selectedType: type });
  },
}));
