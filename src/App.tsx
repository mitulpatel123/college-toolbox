// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { ResourceGrid } from './components/ResourceGrid';
import { AddToolForm } from './components/AddToolForm';
import { CategoryManagement } from './components/CategoryManagement';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  // Pass an empty array initially. ResourceGrid itself will do the fetching.
  return (
    <Router>
      <div className="min-h-screen bg-[#1A1A2E] text-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<ResourceGrid tools={[]} />} />
            <Route path="/add" element={<AddToolForm />} />
            <Route path="/categories" element={<CategoryManagement />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
