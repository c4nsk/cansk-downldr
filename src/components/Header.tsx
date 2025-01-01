import React from 'react';
import { Music } from 'lucide-react';

export function Header() {
  return (
    <div className="flex items-center justify-center mb-8">
      <Music className="w-12 h-12 text-purple-600" />
      <h1 className="text-2xl font-bold ml-3 text-gray-800">
        YouTube MP3 İndirici
      </h1>
    </div>
  );
}