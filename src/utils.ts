export function getAssetUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }

  // Strip starting ./ or / or .
  const cleanPath = path.replace(/^(\.\/|\/|\.)+/, '');
  
  // Use Vite's BASE_URL (which defaults to '/' in dev)
  let baseUrl = import.meta.env.BASE_URL || '/';
  
  if (baseUrl === './' || baseUrl === '.') {
    baseUrl = '/';
  }
  
  // Combine safely
  const combined = baseUrl.endsWith('/') ? `${baseUrl}${cleanPath}` : `${baseUrl}/${cleanPath}`;
  return encodeURI(combined);
}
