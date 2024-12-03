import React from 'react';
import { Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  title: string;
}

export default function Header({ onMenuClick, title }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-md hover:bg-gray-100"
      >
        <Menu className="w-6 h-6 text-gray-600" />
      </button>
      <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
      <div className="w-8" /> {/* Spacer for alignment */}
    </header>
  );
}