// src/components/CategoryManagement.tsx
import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Category } from '../types';
import {
  getStoredCategories,
  addCategory,
  deleteCategory,
} from '../utils/categoryStorage';

export const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });

  // Fetch categories on mount
  useEffect(() => {
    refreshCategories();
  }, []);

  // Helper to re-fetch categories from backend
  const refreshCategories = async () => {
    const fetched = await getStoredCategories();
    setCategories(fetched);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.name.trim()) return;

    // Create a new category object with a slug-like 'id'
    const category: Category = {
      id: newCategory.name.toLowerCase().replace(/\s+/g, '-'), 
      name: newCategory.name,
      description: newCategory.description,
    };

    // POST to backend
    const created = await addCategory(category);
    if (!created) {
      alert('Error creating category on server.');
      return;
    }

    // Re-fetch categories
    await refreshCategories();
    setNewCategory({ name: '', description: '' });
  };

  const handleDelete = async (categoryId: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      const success = await deleteCategory(categoryId);
      if (!success) {
        alert('Error deleting category on server.');
      } else {
        await refreshCategories();
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Add Category Section */}
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Add New Category</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Category Name
            </label>
            <input
              type="text"
              id="name"
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full px-4 py-2 bg-[#16213E] border border-[#0F3460] rounded-lg text-white focus:ring-2 focus:ring-[#00B4D8] focus:border-transparent"
              required
            />
          </div>
          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Description (optional)
            </label>
            <textarea
              id="description"
              value={newCategory.description}
              onChange={(e) =>
                setNewCategory((prev) => ({ ...prev, description: e.target.value }))
              }
              className="w-full px-4 py-2 bg-[#16213E] border border-[#0F3460] rounded-lg text-white focus:ring-2 focus:ring-[#00B4D8] focus:border-transparent"
              rows={3}
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="flex items-center space-x-2 px-4 py-2 bg-[#00B4D8] hover:bg-[#E94560] text-white rounded-lg transition-colors duration-300"
          >
            <Plus className="h-5 w-5" />
            <span>Add Category</span>
          </button>
        </form>
      </div>

      {/* Existing Categories Section */}
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Existing Categories</h2>
        <div className="space-y-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between p-4 bg-[#16213E] rounded-lg"
            >
              <div>
                <h3 className="font-medium">{category.name}</h3>
                {category.description && (
                  <p className="text-sm text-gray-400">{category.description}</p>
                )}
              </div>
              <button
                onClick={() => handleDelete(category.id)}
                className="p-2 text-[#E94560] hover:bg-[#E94560] hover:text-white rounded-lg transition-colors duration-300"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
