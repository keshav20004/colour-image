
import React, { useRef } from 'react';

interface ImageUploaderProps {
  onImageUpload: (imageDataUrl: string) => void;
  currentImage: string | null;
}

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);


export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, currentImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className="w-full h-full flex justify-center items-center border-2 border-dashed border-gray-600 rounded-lg p-4 transition-colors duration-300 hover:border-purple-500 bg-gray-800/50 cursor-pointer"
      onClick={handleUploadClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
      />
      {currentImage ? (
        <img src={currentImage} alt="Original upload" className="max-w-full max-h-full object-contain rounded-md" />
      ) : (
        <div className="text-center">
            <UploadIcon/>
            <p className="text-gray-400">
            <span className="font-semibold text-purple-400">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP</p>
        </div>
      )}
    </div>
  );
};
