'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { Content } from '@/lib/content';

const ContentContext = createContext<Content | null>(null);

export function ApiContentProvider({ initialContent, children }: { initialContent: Content; children: React.ReactNode }) {
  const [content, setContent] = useState<Content>(initialContent);

  useEffect(() => {
    fetch('/api/content', { cache: 'no-store' })
      .then(response => response.json())
      .then(data => { if (data?.content) setContent(data.content); })
      .catch(() => {});
  }, []);

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

export function useApiContent() {
  const content = useContext(ContentContext);
  if (!content) throw new Error('useApiContent must be used inside ApiContentProvider');
  return content;
}
