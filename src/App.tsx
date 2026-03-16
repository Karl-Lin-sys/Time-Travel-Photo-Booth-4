/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppState, Era } from './types';
import CameraCapture from './components/CameraCapture';
import EraSelector from './components/EraSelector';
import Processing from './components/Processing';
import Result from './components/Result';
import { analyzeFace, generateTimeTravelImage } from './services/geminiService';
import { motion, AnimatePresence } from 'motion/react';
import { Clock } from 'lucide-react';

export default function App() {
  const [appState, setAppState] = useState<AppState>('capture');
  const [photo, setPhoto] = useState<string | null>(null);
  const [selectedEra, setSelectedEra] = useState<Era | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [processingStep, setProcessingStep] = useState<string>('');

  const handlePhotoCapture = (imageSrc: string) => {
    setPhoto(imageSrc);
    setAppState('select-era');
  };

  const handleEraSelect = async (era: Era) => {
    setSelectedEra(era);
    setAppState('processing');
    setError(null);
    
    try {
      if (!photo) throw new Error("No photo found");
      
      // Extract base64 data and mime type
      const match = photo.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
      if (!match) throw new Error("Invalid image format");
      
      const mimeType = match[1];
      const base64Data = match[2];

      setProcessingStep('Analyzing facial features...');
      const faceDescription = await analyzeFace(base64Data, mimeType);
      
      setProcessingStep(`Transporting to ${era.name}...`);
      const generatedImage = await generateTimeTravelImage(base64Data, mimeType, era.prompt, faceDescription);
      
      setResultImage(generatedImage);
      setAppState('result');
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred during time travel.");
      setAppState('select-era');
    }
  };

  const handleReset = () => {
    setPhoto(null);
    setSelectedEra(null);
    setResultImage(null);
    setError(null);
    setAppState('capture');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 font-sans selection:bg-indigo-500/30">
      <header className="absolute top-0 left-0 w-full p-6 z-10 flex items-center justify-between">
        <div className="flex items-center gap-2 text-indigo-400">
          <Clock className="w-6 h-6" />
          <h1 className="text-xl font-medium tracking-tight">ChronoBooth</h1>
        </div>
      </header>

      <main className="relative w-full min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08)_0%,transparent_70%)] pointer-events-none" />
        
        <AnimatePresence mode="wait">
          {appState === 'capture' && (
            <motion.div
              key="capture"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-2xl z-10"
            >
              <CameraCapture onCapture={handlePhotoCapture} />
            </motion.div>
          )}

          {appState === 'select-era' && (
            <motion.div
              key="select-era"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-5xl z-10"
            >
              <EraSelector 
                photo={photo!} 
                onSelect={handleEraSelect} 
                onBack={() => setAppState('capture')} 
                error={error}
              />
            </motion.div>
          )}

          {appState === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="w-full max-w-md z-10"
            >
              <Processing step={processingStep} era={selectedEra!} />
            </motion.div>
          )}

          {appState === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="w-full max-w-4xl z-10"
            >
              <Result 
                originalImage={photo!} 
                resultImage={resultImage!} 
                era={selectedEra!} 
                onReset={handleReset} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
