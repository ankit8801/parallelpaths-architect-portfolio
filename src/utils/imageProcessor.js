/**
 * Client-Side Image Processing Utility
 * Handles cropping output, resizing, WebP conversion, and watermarking.
 */

export const processImageForWeb = async (blob, options = {}) => {
  const {
    maxWidth = 1920,
    quality = 0.95,
    preserveDimensions = false,
    watermark = { enabled: false, text: '' }
  } = options;

  // Fast path: if WebP, preserveDimensions, and no watermark needed, just return the blob
  if (blob.type === 'image/webp' && preserveDimensions && !watermark.enabled) {
    return blob;
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(blob);
    
    img.onload = () => {
      URL.revokeObjectURL(url);
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Calculate dimensions
      let width = img.width;
      let height = img.height;
      
      if (!preserveDimensions && width > maxWidth) {
        height = (maxWidth / width) * height;
        width = maxWidth;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw image
      ctx.drawImage(img, 0, 0, width, height);
      
      // Apply Watermark
      if (watermark.enabled && watermark.text) {
        const fontSize = Math.max(12, Math.floor(width * 0.02)); // dynamic font size based on image width
        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'bottom';
        
        // Add drop shadow for readability on light/dark backgrounds
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        
        const padding = Math.max(10, Math.floor(width * 0.02));
        ctx.fillText(watermark.text, width - padding, height - padding);
        
        // Reset shadow for other operations if necessary
        ctx.shadowColor = 'transparent';
      }
      
      // Export as WebP
      canvas.toBlob(
        (webpBlob) => {
          if (webpBlob) {
            resolve(webpBlob);
          } else {
            reject(new Error('Canvas to Blob conversion failed'));
          }
        },
        'image/webp',
        quality
      );
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Image processing load error'));
    };
    
    img.src = url;
  });
};
