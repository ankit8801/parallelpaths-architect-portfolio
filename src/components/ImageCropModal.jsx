import React, { useState, useRef } from 'react';
import { Cropper } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';

const ASPECT_RATIOS = [
  { label: 'Free', value: undefined },
  { label: 'Square (1:1)', value: 1 / 1 },
  { label: 'Portrait (4:5)', value: 4 / 5 },
  { label: 'Widescreen (16:9)', value: 16 / 9 },
];

export default function ImageCropModal({ isOpen, image, onCancel, onCropComplete }) {
  const cropperRef = useRef(null);
  const [aspect, setAspect] = useState(16 / 9);
  const [mode, setMode] = useState('cover'); // 'cover' or 'content'
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApplyCrop = async () => {
    if (!cropperRef.current) return;
    setIsProcessing(true);
    try {
      const canvas = cropperRef.current.getCanvas();
      if (canvas) {
        canvas.toBlob((blob) => {
          if (blob) {
            blob.preserveDimensions = false; // It was cropped, dimensions changed
            onCropComplete(blob);
          }
        }, 'image/webp', 0.95);
      }
    } catch (e) {
      console.error(e);
      alert('Failed to crop image. Please try again.');
      setIsProcessing(false);
    }
  };

  const handleUseOriginal = async () => {
    setIsProcessing(true);
    try {
      // Convert Data URL to Blob
      const response = await fetch(image);
      const blob = await response.blob();
      blob.preserveDimensions = true; // Flag for downstream processor
      onCropComplete(blob);
    } catch (e) {
      console.error(e);
      alert('Failed to process original image.');
      setIsProcessing(false);
    }
  };

  if (!isOpen || !image) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-background/95 backdrop-blur-xl"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-[95vw] md:w-[90vw] max-w-5xl bg-card-bg border border-white/10 rounded-[32px] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.9)] flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex-shrink-0 p-4 md:p-8 border-b border-white/5 flex justify-between items-center bg-card-bg/50 backdrop-blur-md">
            <div>
              <span className="font-label text-[10px] tracking-[0.3em] uppercase text-accent mb-1 block italic">Refining Perspective</span>
              <h2 className="font-headline font-bold text-xl uppercase tracking-wider text-primary-text">Prepare Asset</h2>
            </div>
            <button 
              onClick={onCancel}
              className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-primary-text/40 hover:text-red-400 hover:bg-white/10 transition-all active:scale-90"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
            
            {/* Mode Selector */}
            <div className="flex justify-center p-4 bg-[#0a0a0a]">
              <div className="bg-white/5 rounded-full p-1 flex">
                <button
                  type="button"
                  onClick={() => setMode('cover')}
                  className={`px-6 py-2 rounded-full font-headline text-[10px] uppercase tracking-widest font-bold transition-all ${mode === 'cover' ? 'bg-accent text-on-accent' : 'text-primary-text/40 hover:text-primary-text'}`}
                >
                  Crop Image
                </button>
                <button
                  type="button"
                  onClick={() => setMode('content')}
                  className={`px-6 py-2 rounded-full font-headline text-[10px] uppercase tracking-widest font-bold transition-all ${mode === 'content' ? 'bg-accent text-on-accent' : 'text-primary-text/40 hover:text-primary-text'}`}
                >
                  Preserve Original
                </button>
              </div>
            </div>

            {mode === 'cover' ? (
              <>
                <div className="relative h-[250px] sm:h-[350px] md:h-[450px] flex-shrink-0 bg-[#0a0a0a] border-b border-white/5">
                  <Cropper
                    ref={cropperRef}
                    src={image}
                    className="cropper-container h-full w-full"
                    stencilProps={{
                      aspectRatio: aspect,
                    }}
                    backgroundWrapperProps={{
                      scaleImage: true
                    }}
                  />
                </div>
                {/* Controls Section */}
                <div className="p-4 md:p-6 flex justify-center">
                  <div className="space-y-4 max-w-2xl w-full">
                    <label className="font-label text-[10px] tracking-[0.2em] uppercase text-primary-text/40 block text-center">Aspect Ratio</label>
                    <div className="flex gap-2">
                      {ASPECT_RATIOS.map((arr, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setAspect(arr.value)}
                          className={`flex-1 py-3 px-2 rounded-xl text-[9px] font-headline font-bold uppercase tracking-widest transition-all ${
                            aspect === arr.value 
                            ? 'bg-accent text-on-accent shadow-lg shadow-accent/20' 
                            : 'bg-white/5 text-primary-text/40 hover:bg-white/10 hover:text-primary-text'
                          }`}
                        >
                          {arr.label.split(' ')[0]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 bg-[#0a0a0a] border-b border-white/5 h-[350px] md:h-[450px] gap-6 text-center">
                <span className="material-symbols-outlined text-6xl text-accent/50">aspect_ratio</span>
                <div className="max-w-sm">
                  <h3 className="font-headline text-lg font-bold uppercase tracking-wider text-primary-text mb-2">Original Format</h3>
                  <p className="font-body text-sm text-primary-text/60">
                    Use this mode to bypass cropping and preserve the designer's intended aspect ratio and dimensions for this asset.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer - Fixed Bottom */}
          <div className="flex-shrink-0 p-6 md:p-8 border-t border-white/5 bg-card-bg/50 backdrop-blur-md">
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 sm:gap-6 items-center">
              <button
                type="button"
                onClick={onCancel}
                disabled={isProcessing}
                className="w-full sm:w-auto font-headline text-[11px] font-bold uppercase tracking-widest text-primary-text/40 hover:text-primary-text transition-colors disabled:opacity-30 py-2"
              >
                Discard
              </button>
              
              {mode === 'cover' ? (
                <button
                  type="button"
                  onClick={handleApplyCrop}
                  disabled={isProcessing}
                  className="w-full sm:w-auto bg-accent text-on-accent px-10 py-4 rounded-full font-headline font-bold text-xs uppercase tracking-widest shadow-xl shadow-accent/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-on-accent border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[1.1rem]">crop</span>
                      Crop & Upload
                    </>
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleUseOriginal}
                  disabled={isProcessing}
                  className="w-full sm:w-auto bg-primary-text text-background px-10 py-4 rounded-full font-headline font-bold text-xs uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[1.1rem]">upload</span>
                      Use Original
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
