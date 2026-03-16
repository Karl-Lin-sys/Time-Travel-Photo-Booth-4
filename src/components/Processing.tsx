import React from 'react';
import { Era } from '../types';
import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';

interface ProcessingProps {
  step: string;
  era: Era;
}

export default function Processing({ step, era }: ProcessingProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12 bg-neutral-900/50 border border-white/10 rounded-3xl backdrop-blur-sm">
      <div className="relative mb-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32 rounded-full border-t-2 border-r-2 border-indigo-500 opacity-50"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 rounded-full border-b-2 border-l-2 border-purple-500 opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
      </div>
      
      <h2 className="text-2xl font-semibold tracking-tight mb-2">Temporal Shift Initiated</h2>
      <p className="text-indigo-400 font-medium mb-4">Destination: {era.name}</p>
      
      <div className="h-6 flex items-center justify-center">
        <motion.p 
          key={step}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-neutral-400"
        >
          {step}
        </motion.p>
      </div>
    </div>
  );
}
