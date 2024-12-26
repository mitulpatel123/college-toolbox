// src/components/ResourceGrid.tsx
import React, { useState, useMemo, useEffect } from 'react';
import { ResourceCard } from './ResourceCard';
import { Tool, Category } from '../types';
import { getStoredCategories } from '../utils/categoryStorage';
import { getStoredTools } from '../utils/storage';
import { Search, Filter } from 'lucide-react';

/**
 * You could remove the "tools: Tool[]" prop entirely if you're fetching from the server.
 * But let's keep it for demonstration. We'll overwrite it once we fetch from the server anyway.
 */
interface ResourceGridProps {
  tools: Tool[];
}

export const ResourceGrid: React.FC<ResourceGridProps> = ({ tools: initialTools }) => {
  const [tools, setTools] = useState<Tool[]>(initialTools);
  const [search, setSearch] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [categories, setCategories] = useState<Category[]>([]);

  // On mount, fetch from backend
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [fetchedTools, fetchedCategories] = await Promise.all([
      getStoredTools(),
      getStoredCategories(),
    ]);
    setTools(fetchedTools);
    setCategories(fetchedCategories);
  };

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(search.toLowerCase()) ||
        tool.description?.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategoryId === 'all' || tool.categoryId === selectedCategoryId;

      return matchesSearch && matchesCategory;
    });
  }, [tools, search, selectedCategoryId]);

  // Utility to find category name from ID
  const getCategoryName = (categoryId: string): string => {
    return categories.find((cat) => cat.id === categoryId)?.name || 'Unknown Category';
  };

  // After a tool is deleted, refresh data from the server
  const handleToolDelete = () => {
    fetchData();
  };

  return (
    <div className="space-y-6">
      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#16213E] border border-[#0F3460] rounded-lg text-white focus:ring-2 focus:ring-[#00B4D8] focus:border-transparent"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <select
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            className="pl-10 pr-4 py-2 bg-[#16213E] border border-[#0F3460] rounded-lg text-white focus:ring-2 focus:ring-[#00B4D8] focus:border-transparent appearance-none"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid of Resource Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <ResourceCard
            key={tool.id}
            tool={tool}
            categoryName={getCategoryName(tool.categoryId)}
            onDelete={handleToolDelete}
          />
        ))}
      </div>
    </div>
  );
};
