import { CreateMemoryInput } from '../types/memory';

// Mock AI processing - simulates what OpenAI API would do
export async function generateMemoryMetadata(input: CreateMemoryInput) {
  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const content = input.content.toLowerCase();
  const type = input.type;

  // Generate title
  const title = generateTitle(input.content, type);

  // Generate summary
  const summary = generateSummary(input.content);

  // Extract tags and categories
  const { tags, categories } = extractTagsAndCategories(content, type);

  // Detect topics
  const topics = detectTopics(content);

  // Detect sentiment
  const sentiment = detectSentiment(content);

  // Extract entities (simplified)
  const entities = extractEntities(content);

  return {
    title,
    summary,
    tags,
    categories,
    topics,
    sentiment,
    entities,
    language: 'en',
  };
}

function generateTitle(content: string, type: string): string {
  // Simple title generation logic
  const firstLine = content.split('\n')[0];
  let title = firstLine.substring(0, 60);

  if (title.length < firstLine.length) {
    title += '...';
  }

  if (!title) {
    const typeLabels = {
      url: 'Web Link',
      text: 'Text Note',
      image: 'Image',
      audio: 'Voice Recording',
      file: 'Document',
    };
    title = typeLabels[type as keyof typeof typeLabels] || 'Untitled Memory';
  }

  return title;
}

function generateSummary(content: string): string {
  // Generate a brief summary
  const sentences = content.split(/[.!?]+/).filter((s) => s.trim());
  if (sentences.length === 0) return content.substring(0, 150);

  const summary = sentences.slice(0, 2).join('. ');
  return summary.length > 200 ? summary.substring(0, 200) + '...' : summary + '.';
}

function extractTagsAndCategories(content: string, type: string) {
  const tags: string[] = [];
  const categories: string[] = [];

  // Technology keywords
  const techKeywords = [
    'react',
    'javascript',
    'typescript',
    'python',
    'nodejs',
    'api',
    'database',
    'frontend',
    'backend',
    'ai',
    'machine learning',
    'docker',
    'kubernetes',
  ];

  // Design keywords
  const designKeywords = ['ui', 'ux', 'design', 'figma', 'sketch', 'typography', 'color'];

  // Business keywords
  const businessKeywords = [
    'meeting',
    'strategy',
    'product',
    'roadmap',
    'revenue',
    'growth',
  ];

  // Learning keywords
  const learningKeywords = ['tutorial', 'guide', 'learn', 'course', 'documentation'];

  techKeywords.forEach((keyword) => {
    if (content.includes(keyword)) {
      tags.push(keyword.charAt(0).toUpperCase() + keyword.slice(1));
      if (!categories.includes('Technology')) categories.push('Technology');
    }
  });

  designKeywords.forEach((keyword) => {
    if (content.includes(keyword)) {
      tags.push(keyword.toUpperCase());
      if (!categories.includes('Design')) categories.push('Design');
    }
  });

  businessKeywords.forEach((keyword) => {
    if (content.includes(keyword)) {
      tags.push(keyword.charAt(0).toUpperCase() + keyword.slice(1));
      if (!categories.includes('Business')) categories.push('Business');
    }
  });

  learningKeywords.forEach((keyword) => {
    if (content.includes(keyword)) {
      tags.push(keyword.charAt(0).toUpperCase() + keyword.slice(1));
      if (!categories.includes('Learning')) categories.push('Learning');
    }
  });

  // Add type-based tags
  if (type === 'url') tags.push('Article');
  if (type === 'text') tags.push('Note');
  if (type === 'image') tags.push('Visual');
  if (type === 'audio') tags.push('Audio');

  // If no categories found, add a general one
  if (categories.length === 0) {
    categories.push('General');
  }

  return {
    tags: [...new Set(tags)].slice(0, 6),
    categories: [...new Set(categories)],
  };
}

function detectTopics(content: string): string[] {
  const topics: string[] = [];

  const topicPatterns = [
    { pattern: /\b(web|frontend|backend|fullstack)\b/i, topic: 'Web Development' },
    { pattern: /\b(mobile|ios|android|app)\b/i, topic: 'Mobile Development' },
    { pattern: /\b(data|analytics|visualization)\b/i, topic: 'Data Science' },
    { pattern: /\b(ai|ml|neural|deep learning)\b/i, topic: 'Artificial Intelligence' },
    { pattern: /\b(design|ui|ux|user experience)\b/i, topic: 'Design' },
    { pattern: /\b(marketing|seo|content)\b/i, topic: 'Marketing' },
    { pattern: /\b(business|strategy|management)\b/i, topic: 'Business' },
    { pattern: /\b(tutorial|guide|how to)\b/i, topic: 'Tutorial' },
  ];

  topicPatterns.forEach(({ pattern, topic }) => {
    if (pattern.test(content)) {
      topics.push(topic);
    }
  });

  return topics.length > 0 ? topics : ['General'];
}

function detectSentiment(content: string): 'positive' | 'neutral' | 'negative' {
  const positiveWords = ['great', 'excellent', 'awesome', 'love', 'amazing', 'good', 'best'];
  const negativeWords = ['bad', 'terrible', 'hate', 'worst', 'problem', 'issue', 'error'];

  let positiveCount = 0;
  let negativeCount = 0;

  positiveWords.forEach((word) => {
    const regex = new RegExp('\\b' + word + '\\b', 'gi');
    positiveCount += (content.match(regex) || []).length;
  });

  negativeWords.forEach((word) => {
    const regex = new RegExp('\\b' + word + '\\b', 'gi');
    negativeCount += (content.match(regex) || []).length;
  });

  if (positiveCount > negativeCount) return 'positive';
  if (negativeCount > positiveCount) return 'negative';
  return 'neutral';
}

function extractEntities(content: string) {
  // Very simplified entity extraction
  const entities: Array<{
    type: 'person' | 'place' | 'organization' | 'date' | 'other';
    value: string;
    confidence: number;
  }> = [];

  // Extract dates (simple pattern)
  const datePattern = /\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/g;
  const dates = content.match(datePattern) || [];
  dates.forEach((date) => {
    entities.push({ type: 'date', value: date, confidence: 0.9 });
  });

  // Extract capitalized words (potential names/places)
  const capitalizedPattern = /\b[A-Z][a-z]+(?:\s[A-Z][a-z]+)*\b/g;
  const capitalized = content.match(capitalizedPattern) || [];
  capitalized.slice(0, 3).forEach((word) => {
    entities.push({ type: 'other', value: word, confidence: 0.6 });
  });

  return entities.slice(0, 5);
}
