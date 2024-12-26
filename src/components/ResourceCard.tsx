// src/components/ResourceCard.tsx
import React, { memo } from 'react';
import { ExternalLink, Trash2 } from 'lucide-react';
import { Tool } from '../types';
import { deleteTool } from '../utils/storage';

interface ResourceCardProps {
  tool: Tool;
  categoryName: string;
  onDelete: () => void; // callback to refresh parent state
}

export const ResourceCard: React.FC<ResourceCardProps> = memo(
  ({ tool, categoryName, onDelete }) => {
    const handleDelete = async () => {
      if (window.confirm('Are you sure you want to delete this tool?')) {
        /**
         * If the backend has the Mongoose-generated "_id",
         * make sure you pass tool._id here.
         * If you used "id" in the DB, pass that. Adjust accordingly.
         */
        const idToDelete = (tool as any)._id || tool.id;

        const success = await deleteTool(idToDelete);
        if (!success) {
          alert('Error deleting tool from server.');
          return;
        }
        onDelete(); // ask parent to re-fetch
      }
    };

    return (
      <div className="group relative bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 hover:transform hover:scale-105 transition-all duration-300 border border-transparent hover:border-[#00B4D8]">
        {/* External Link */}
        <div className="absolute top-4 right-4">
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00B4D8] hover:text-[#E94560] transition-colors"
          >
            <ExternalLink className="h-5 w-5" />
          </a>
        </div>

        {/* Delete Button */}
        <div className="absolute bottom-4 right-4">
          <button
            onClick={handleDelete}
            className="text-[#E94560] hover:text-white transition-colors"
            aria-label="Delete tool"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>

        {/* Category Badge */}
        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#0F3460] text-[#00B4D8] mb-4">
          {categoryName}
        </span>

        {/* Tool Name + Description */}
        <h3 className="text-lg font-semibold text-white mb-2">{tool.name}</h3>
        {tool.description && (
          <p className="text-gray-300 text-sm line-clamp-2 mb-8">{tool.description}</p>
        )}
      </div>
    );
  }
);
