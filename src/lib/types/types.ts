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
  return typeof doc.content === 'string' || doc.content === null;
}

export function isDesignDocument(doc: Document): doc is DesignDocument {
  return doc.content !== null &&
         typeof doc.content === 'object' && 
         'header' in doc.content && 
         'content' in doc.content;
}

