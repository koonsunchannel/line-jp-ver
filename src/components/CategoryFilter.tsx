
import React from 'react';
import { categories } from '../data/updatedCategories';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronDown } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

export function CategoryFilter({ selectedCategory, onCategorySelect }: CategoryFilterProps) {
  const { t } = useLanguage();

  const getCategoryName = (categoryId: string) => {
    return t(`category.${categoryId}`);
  };

  const selectedCategoryInfo = categories.find(c => c.id === selectedCategory);
  const displayText = selectedCategory 
    ? getCategoryName(selectedCategory)
    : t('category.select');

  return (
    <div className="flex justify-center mb-4 sm:mb-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full sm:w-64 justify-between bg-white border border-gray-200 hover:bg-gray-50 text-sm sm:text-base"
          >
            <div className="flex items-center gap-2">
              {selectedCategoryInfo && <span className="text-sm sm:text-base">{selectedCategoryInfo.icon}</span>}
              <span className="truncate">{displayText}</span>
            </div>
            <ChevronDown className="w-4 h-4 flex-shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[calc(100vw-2rem)] sm:w-64 bg-white border border-gray-200 shadow-lg z-50">
          <DropdownMenuItem
            onClick={() => onCategorySelect(null)}
            className={`cursor-pointer hover:bg-gray-50 text-sm sm:text-base ${
              selectedCategory === null ? 'bg-green-50 text-green-700' : ''
            }`}
          >
            {t('category.all')}
          </DropdownMenuItem>
          <ScrollArea className="h-64">
            {categories.map((category) => (
              <DropdownMenuItem
                key={category.id}
                onClick={() => onCategorySelect(category.id)}
                className={`cursor-pointer hover:bg-gray-50 flex items-center gap-2 text-sm sm:text-base ${
                  selectedCategory === category.id ? 'bg-green-50 text-green-700' : ''
                }`}
              >
                <span>{category.icon}</span>
                <span>{getCategoryName(category.id)}</span>
              </DropdownMenuItem>
            ))}
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
