// Category related types
export interface Category {
  id: string;
  name: string;
  description?: string;
}

// Tool related types
export interface Tool {
  id: string;
  name: string;
  categoryId: string;
  url: string;
  description?: string;
}