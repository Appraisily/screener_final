import React, { useCallback } from 'react';
import { Upload, Image as ImageIcon, Loader2 } from 'lucide-react';

interface ImageUploaderProps {
  onUpload: (file: File) => void;
  isUploading: boolean;
  customerImage: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload, isUploading, customerImage }) => {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        console.log('Dropped file:', file.name, 'Size:', file.size, 'Type:', file.type);
        onUpload(file);
      } else {
        console.warn('Invalid file type:', file?.type);
      }
    },
    [onUpload]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        console.log('Selected file:', file.name, 'Size:', file.size, 'Type:', file.type);
        onUpload(file);
      }
    },
    [onUpload]
  );

  const handleClick = () => {
    if (!isUploading) {
      console.log('Upload button clicked, opening file selector');
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div
        className={`rounded-2xl bg-white p-8 shadow-lg ring-1 transition-all duration-200 ${
          isUploading
            ? 'ring-[rgb(0,123,255)]'
            : 'ring-gray-200 hover:ring-[rgb(0,123,255)]'
        }`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          {customerImage ? (
            <div className="relative w-full">
              <img
                src={customerImage}
                alt="Uploaded artwork"
                className="w-full h-auto rounded-lg shadow-lg transition-transform duration-200 hover:-translate-y-1"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&h=500&fit=crop';
                }}
              />
              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-lg">
                  <div className="text-center space-y-3">
                    <Loader2 className="w-8 h-8 text-[rgb(0,123,255)] animate-spin mx-auto" />
                    <div className="bg-white/90 px-4 py-2 rounded-full shadow-sm">
                      <p className="text-sm font-medium text-gray-700">Processing image...</p>
                      <p className="text-xs text-gray-500">Getting AI analysis results</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="rounded-lg bg-[rgb(0,123,255)]/10 p-3">
                {isUploading ? (
                  <Loader2 className="w-6 h-6 text-[rgb(0,123,255)] animate-spin" />
                ) : (
                  <Upload className="w-6 h-6 text-[rgb(0,123,255)]" />
                )}
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  {isUploading ? 'Uploading artwork...' : 'Drop your artwork here'}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {isUploading ? 'Please wait while we process your image' : 'or click to select a file'}
                </p>
              </div>
            </>
          )}
          
          <input
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
            id="file-upload"
            disabled={isUploading}
          />
          <label
            htmlFor="file-upload"
            className={`rounded-md px-6 py-3 text-lg font-semibold shadow-sm 
                     transition-all duration-200 cursor-pointer flex items-center gap-2
                     ${isUploading 
                       ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                       : 'bg-[rgb(0,123,255)] text-white hover:bg-[rgb(0,123,255)]/90'}`}
            onClick={handleClick}
          >
            <ImageIcon className="w-4 h-4" />
            {customerImage ? 'Upload Another Image' : 'Select Image'}
          </label>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;