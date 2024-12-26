// src/components/AddToolForm.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tool, Category } from '../types';
import { isValidUrl, isValidDescription } from '../utils/validation';
import { addTool } from '../utils/storage'; // <-- Updated import
import { getStoredCategories } from '../utils/categoryStorage'; // We still fetch from backend
import { Save } from 'lucide-react';

export const AddToolForm: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<Omit<Tool, 'id'>>({
    name: '',
    categoryId: '',
    url: '',
    description: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Fetch categories from backend
    getStoredCategories().then((fetchedCategories) => {
      setCategories(fetchedCategories);
      if (fetchedCategories.length > 0) {
        setFormData((prev) => ({ ...prev, categoryId: fetchedCategories[0].id }));
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.categoryId) {
      newErrors.categoryId = 'Category is required';
    }
    if (!isValidUrl(formData.url)) {
      newErrors.url = 'Please enter a valid URL';
    }
    if (!isValidDescription(formData.description)) {
      newErrors.description = 'Description must be 120 characters or less';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit to backend
    const createdTool = await addTool(formData);
    if (!createdTool) {
      alert('Error creating tool on the server.');
      return;
    }

    // Navigate back to the resource grid
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6 bg-[#16213E] p-6 rounded-lg">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
          Tool Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          className="w-full px-4 py-2 bg-[#1A1A2E] border border-[#0F3460] rounded-lg text-white focus:ring-2 focus:ring-[#00B4D8] focus:border-transparent"
        />
        {errors.name && <p className="mt-1 text-[#E94560] text-sm">{errors.name}</p>}
      </div>

      {/* Category */}
      <div>
        <label htmlFor="categoryId" className="block text-sm font-medium text-white mb-2">
          Category
        </label>
        <select
          id="categoryId"
          value={formData.categoryId}
          onChange={(e) => setFormData((prev) => ({ ...prev, categoryId: e.target.value }))}
          className="w-full px-4 py-2 bg-[#1A1A2E] border border-[#0F3460] rounded-lg text-white focus:ring-2 focus:ring-[#00B4D8] focus:border-transparent"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
        {errors.categoryId && <p className="mt-1 text-[#E94560] text-sm">{errors.categoryId}</p>}
      </div>

      {/* URL */}
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-white mb-2">
          URL
        </label>
        <input
          type="url"
          id="url"
          value={formData.url}
          onChange={(e) => setFormData((prev) => ({ ...prev, url: e.target.value }))}
          className="w-full px-4 py-2 bg-[#1A1A2E] border border-[#0F3460] rounded-lg text-white focus:ring-2 focus:ring-[#00B4D8] focus:border-transparent"
        />
        {errors.url && <p className="mt-1 text-[#E94560] text-sm">{errors.url}</p>}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-white mb-2">
          Description (max 120 characters)
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          maxLength={120}
          rows={3}
          className="w-full px-4 py-2 bg-[#1A1A2E] border border-[#0F3460] rounded-lg text-white focus:ring-2 focus:ring-[#00B4D8] focus:border-transparent"
        />
        {errors.description && <p className="mt-1 text-[#E94560] text-sm">{errors.description}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-[#00B4D8] hover:bg-[#E94560] text-white rounded-lg transition-colors duration-300"
      >
        <Save className="h-5 w-5" />
        <span>Save Tool</span>
      </button>
    </form>
  );
};
