
import React from 'react';
import { categories } from '../data/mockData';

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

export function CategoryFilter({ selectedCategory, onCategorySelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-8">
      <button
        onClick={() => onCategorySelect(null)}
        className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
          selectedCategory === null
            ? 'bg-green-500 text-white shadow-lg'
            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
        }`}
      >
        すべて
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategorySelect(category.id)}
          className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
            selectedCategory === category.id
              ? 'bg-green-500 text-white shadow-lg'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          <span>{category.icon}</span>
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
}
