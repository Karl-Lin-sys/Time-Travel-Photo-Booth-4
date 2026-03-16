import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, Upload } from 'lucide-react';

interface CameraCaptureProps {
  onCapture: (imageSrc: string) => void;
}

export default function CameraCapture({ onCapture }: CameraCaptureProps) {
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState(false);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      onCapture(imageSrc);
    }
  }, [webcamRef, onCapture]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onCapture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-semibold tracking-tight mb-3">Initialize Sequence</h2>
        <p className="text-neutral-400">Capture your current temporal signature to begin.</p>
      </div>

      <div className="relative w-full aspect-video md:aspect-[4/3] max-w-2xl bg-neutral-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        {!cameraError ? (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: "user" }}
            onUserMedia={() => setIsCameraReady(true)}
            onUserMediaError={() => setCameraError(true)}
            className="w-full h-full object-cover"
            mirrored={true}
            disablePictureInPicture={true}
            forceScreenshotSourceSize={false}
            imageSmoothing={true}
            screenshotQuality={0.92}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-500 p-6 text-center">
            <Camera className="w-12 h-12 mb-4 opacity-50" />
            <p>Camera access denied or unavailable.</p>
            <p className="text-sm mt-2">Please upload a photo instead.</p>
          </div>
        )}

        {/* Camera overlay UI */}
        <div className="absolute inset-0 pointer-events-none border-[8px] border-black/20 rounded-3xl" />
        
        {/* Face guide */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
          <div className="w-48 h-64 border-2 border-dashed border-white rounded-full" />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
        <button
          onClick={capture}
          disabled={!isCameraReady && !cameraError}
          className="flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Camera className="w-5 h-5" />
          Capture Photo
        </button>
        
        <div className="text-neutral-500 text-sm font-medium uppercase tracking-widest">or</div>
        
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-8 py-4 bg-neutral-800 text-white rounded-full font-medium hover:bg-neutral-700 transition-colors border border-white/10"
        >
          <Upload className="w-5 h-5" />
          Upload Image
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  );
}
