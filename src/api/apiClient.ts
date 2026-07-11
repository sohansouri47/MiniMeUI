const API_BASE_URL = (import.meta as any).env.VITE_API_BASE_URL || 'http://localhost:8000';

export interface JournalEntry {
  id: string;
  title: string;
  transcript: string;
  created_at?: string;
}

export interface QueryRequest {
  question: string;
  top_k?: number;
  user_email?: string;
}

export interface QueryResponse {
  answer: string;
  sources?: any[];
}

export const apiClient = {
  // Journal Endpoints
  createJournal: async (data: { title: string; transcript: string; user_email: string }) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/journal`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create journal entry');
    return response.json();
  },

  listJournals: async (limit = 50, offset = 0) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/journal?limit=${limit}&offset=${offset}`);
    if (!response.ok) throw new Error('Failed to list journal entries');
    return response.json();
  },

  getJournal: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/journal/${id}`);
    if (!response.ok) throw new Error('Failed to get journal entry');
    return response.json();
  },

  deleteJournal: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/journal/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete journal entry');
    return response.json();
  },

  // RAG Chat Endpoint
  query: async (data: QueryRequest) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to query RAG');
    return response.json();
  },

  // Reindex Endpoint
  reindex: async (user_email: string) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/reindex`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_email }),
    });
    if (!response.ok) throw new Error('Failed to reindex');
    return response.json();
  }
};