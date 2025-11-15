
import React from 'react';

interface ImageDisplayProps {
  title: string;
  children: React.ReactNode;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ title, children }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow-2xl flex flex-col h-[300px] sm:h-[400px] md:h-[500px]">
      <h2 className="text-xl font-bold text-center mb-4 text-gray-300">{title}</h2>
      <div className="flex-grow w-full h-full min-h-0">
        {children}
      </div>
    </div>
  );
};
