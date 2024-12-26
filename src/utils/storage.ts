// src/utils/storage.ts
import { Tool } from '../types';

const BASE_URL = 'http://localhost:5000'; // or your deployed backend URL

/**
 * Fetch all tools from the backend
 */
export async function getStoredTools(): Promise<Tool[]> {
  try {
    const response = await fetch(`${BASE_URL}/api/tools`);
    if (!response.ok) {
      throw new Error('Failed to fetch tools');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching tools:', error);
    return [];
  }
}

/**
 * Send a new tool to the backend
 */
export async function addTool(tool: Omit<Tool, 'id'>): Promise<Tool | null> {
  try {
    const response = await fetch(`${BASE_URL}/api/tools`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tool),
    });
    if (!response.ok) {
      throw new Error('Failed to create tool');
    }
    return response.json();
  } catch (error) {
    console.error('Error creating tool:', error);
    return null;
  }
}

/**
 * Delete a tool by its database-generated _id
 */
export async function deleteTool(toolId: string): Promise<boolean> {
  try {
    const response = await fetch(`${BASE_URL}/api/tools/${toolId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete tool');
    }
    return true;
  } catch (error) {
    console.error('Error deleting tool:', error);
    return false;
  }
}
