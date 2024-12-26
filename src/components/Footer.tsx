import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 py-6 bg-[#1A1A2E] border-t border-[#0F3460]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-400">
          © {new Date().getFullYear()} College Toolbox. Built with React and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
};