import React from 'react';
import { Era } from '../types';
import { Download, RotateCcw } from 'lucide-react';

interface ResultProps {
  originalImage: string;
  resultImage: string;
  era: Era;
  onReset: () => void;
}

export default function Result({ originalImage, resultImage, era, onReset }: ResultProps) {
  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = resultImage;
    a.download = `chronobooth-${era.id}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-semibold tracking-tight mb-3">Arrival Successful</h2>
        <p className="text-neutral-400">You have arrived in {era.name}.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-1 flex flex-col justify-center">
          <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 opacity-60 scale-95">
            <img src={originalImage} alt="Original" className="w-full h-full object-cover grayscale" />
          </div>
          <p className="text-center text-xs text-neutral-500 mt-3 uppercase tracking-widest">Original Timeline</p>
        </div>

        <div className="md:col-span-2">
          <div className="aspect-[3/4] md:aspect-auto md:h-[600px] rounded-2xl overflow-hidden border border-white/20 bg-neutral-900 shadow-2xl shadow-indigo-500/20 relative group">
            <img src={resultImage} alt={`You in ${era.name}`} className="w-full h-full object-cover" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <p className="text-white font-medium">{era.name}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-neutral-200 transition-colors w-full sm:w-auto justify-center"
        >
          <Download className="w-5 h-5" />
          Save Memory
        </button>
        
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-8 py-4 bg-neutral-800 text-white rounded-full font-medium hover:bg-neutral-700 transition-colors border border-white/10 w-full sm:w-auto justify-center"
        >
          <RotateCcw className="w-5 h-5" />
          New Journey
        </button>
      </div>
    </div>
  );
}
