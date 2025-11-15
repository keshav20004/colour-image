
import React, { useState, useCallback } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { ImageDisplay } from './components/ImageDisplay';
import { Spinner } from './components/Spinner';
import { colorizeAndEnhanceImage } from './services/geminiService';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (imageDataUrl: string) => {
    setOriginalImage(imageDataUrl);
    setGeneratedImage(null);
    setError(null);
  };

  const processImage = useCallback(async () => {
    if (!originalImage) return;

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const base64Data = originalImage.split(',')[1];
      const mimeType = originalImage.match(/data:(.*);base64,/)?.[1] || 'image/jpeg';
      
      const newImageBase64 = await colorizeAndEnhanceImage(base64Data, mimeType);
      
      setGeneratedImage(`data:image/jpeg;base64,${newImageBase64}`);
    } catch (err) {
      console.error(err);
      setError('Failed to process the image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4 sm:p-6 md:p-8">
      <header className="w-full max-w-6xl text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          AI Image Colorizer & 4K Enhancer
        </h1>
        <p className="text-gray-400 mt-2 text-lg">
          Transform your black and white photos into vibrant, high-resolution masterpieces.
        </p>
      </header>

      <main className="w-full max-w-6xl flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ImageDisplay title="Original Image">
            <ImageUploader onImageUpload={handleImageUpload} currentImage={originalImage} />
          </ImageDisplay>
          <ImageDisplay title="Colorized & Enhanced 4K">
            {isLoading && (
              <div className="w-full h-full flex flex-col justify-center items-center bg-gray-800/50 rounded-lg">
                <Spinner />
                <p className="mt-4 text-gray-300">AI is working its magic...</p>
              </div>
            )}
            {!isLoading && !generatedImage && (
              <div className="w-full h-full flex justify-center items-center bg-gray-800/50 rounded-lg text-gray-500 p-8 text-center">
                Your enhanced image will appear here.
              </div>
            )}
            {generatedImage && (
              <img src={generatedImage} alt="Generated colorized" className="w-full h-full object-contain rounded-lg" />
            )}
          </ImageDisplay>
        </div>

        {error && (
          <div className="mt-6 text-center text-red-400 bg-red-900/50 p-3 rounded-lg">
            <strong>Error:</strong> {error}
          </div>
        )}

        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={processImage}
            disabled={!originalImage || isLoading}
            className="w-full sm:w-auto px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full shadow-lg hover:scale-105 transform transition-transform duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isLoading ? 'Processing...' : 'Colorize & Enhance'}
          </button>

          {generatedImage && !isLoading && (
             <a
             href={generatedImage}
             download="colorized-enhanced-image.jpg"
             className="w-full sm:w-auto text-center px-8 py-4 text-lg font-bold text-purple-300 bg-gray-800 rounded-full shadow-lg hover:bg-gray-700 transform transition-colors duration-300 ease-in-out"
           >
             Download Image
           </a>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
