import { Tables } from "./database.types"

type Document = Tables<'documents'>

export type DefaultDocument = Omit<Document, 'content'> & {
  content: string | null;
}

export type DesignDocument = Omit<Document, 'content'> & {
  content: {
    content: string;
    header: {
      coverImage: {
        url: string;
        alt: string;
      } | null;
    } | null;
    sidebar: {
      content: { url: string; type: string }[];
    } | null;
  } | null;
}

export function isDefaultDocument(doc: Document): doc is DefaultDocument {
  if (typeof doc.content === 'string') {
    try {
      // If it parses to an object with 'header' and 'content', it's not a default document
      const parsed = JSON.parse(doc.content);
      if (
        typeof parsed === 'object' &&
        parsed !== null &&
        'header' in parsed &&
        'content' in parsed
      ) {
        return false;
      }
    } catch {
      // Not JSON, so it's a default document
      return true;
    }
    // If it's a string but not valid DesignDocument JSON, it's a default document
    return true;
  }
  return doc.content === null;
}

export function isDesignDocument(doc: Document): doc is DesignDocument {
  if (doc.content === null) return false;
  
  let parsedContent;
  try {
    parsedContent = typeof doc.content === 'string' ? JSON.parse(doc.content) : doc.content;
  } catch {
    return false;
  }

  return typeof parsedContent === 'object' && 
         'header' in parsedContent && 
         'content' in parsedContent;
}

