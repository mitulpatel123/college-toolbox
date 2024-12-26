import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-[#1A1A2E] bg-opacity-95 backdrop-blur-sm border-b border-[#0F3460]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 text-white hover:text-[#00B4D8] transition-colors">
            <Wrench className="h-8 w-8" />
            <span className="text-xl font-bold">College Toolbox</span>
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link 
                  to="/categories"
                  className="text-white hover:text-[#00B4D8] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Manage Categories
                </Link>
              </li>
              <li>
                <Link 
                  to="/add" 
                  className="text-white hover:text-[#00B4D8] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Add Tool
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};