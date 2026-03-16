import React from 'react';
import { Era } from '../types';
import { ERAS } from '../constants';
import { ArrowLeft, AlertCircle } from 'lucide-react';

interface EraSelectorProps {
  photo: string;
  onSelect: (era: Era) => void;
  onBack: () => void;
  error: string | null;
}

export default function EraSelector({ photo, onSelect, onBack, error }: EraSelectorProps) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight mb-2">Select Destination</h2>
          <p className="text-neutral-400">Choose a historical era for your journey.</p>
        </div>
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retake Photo
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-400">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="sticky top-6">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 shadow-xl">
              <img src={photo} alt="Your capture" className="w-full h-full object-cover" />
            </div>
            <p className="text-center text-sm text-neutral-500 mt-4 uppercase tracking-widest font-medium">Subject Acquired</p>
          </div>
        </div>

        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ERAS.map((era) => (
            <button
              key={era.id}
              onClick={() => onSelect(era)}
              className="group relative flex flex-col items-start p-6 text-left bg-neutral-900/50 border border-white/5 hover:border-indigo-500/50 hover:bg-neutral-800/80 rounded-2xl transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-indigo-500/0 group-hover:from-indigo-500/10 group-hover:to-purple-500/10 transition-colors" />
              <h3 className="text-lg font-medium text-white mb-1 relative z-10">{era.name}</h3>
              <p className="text-sm text-neutral-400 line-clamp-2 relative z-10">{era.prompt}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
