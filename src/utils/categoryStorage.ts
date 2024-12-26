// src/utils/categoryStorage.ts
import { Category } from '../types';

const BASE_URL = 'http://localhost:5000'; // or your deployed backend URL

/**
 * Fetch all categories from the backend
 */
export async function getStoredCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${BASE_URL}/api/categories`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Create a new category
 */
export async function addCategory(category: Category): Promise<Category | null> {
  try {
    const response = await fetch(`${BASE_URL}/api/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category),
    });
    if (!response.ok) {
      throw new Error('Failed to create category');
    }
    return response.json();
  } catch (error) {
    console.error('Error creating category:', error);
    return null;
  }
}

/**
 * Delete a category by its custom 'id' field
 */
export async function deleteCategory(categoryId: string): Promise<boolean> {
  try {
    const response = await fetch(`${BASE_URL}/api/categories/${categoryId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete category');
    }
    return true;
  } catch (error) {
    console.error('Error deleting category:', error);
    return false;
  }
}
