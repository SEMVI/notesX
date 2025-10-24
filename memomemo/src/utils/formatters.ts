import { formatDistanceToNow } from 'date-fns';

export function formatDate(date: Date): string {
  return formatDistanceToNow(date, { addSuffix: true });
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

export function getMemoryIcon(type: string): string {
  const icons: Record<string, string> = {
    url: '🔗',
    text: '📝',
    image: '🖼️',
    audio: '🎤',
    file: '📄',
  };
  return icons[type] || '📄';
}

export function getMemoryTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    url: 'URL',
    text: 'Text',
    image: 'Image',
    audio: 'Audio',
    file: 'File',
  };
  return labels[type] || type;
}
