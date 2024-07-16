import { useCallback, useEffect, useRef } from 'react';
import { saveAs } from 'file-saver';
import { ImageData } from '../../types';
import './qrcode-display.scss';

const QRCodeDisplay = ({ filename, image, text, canDownload }: ImageData) => {
  const svgContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (svgContainerRef.current) {
      svgContainerRef.current.innerHTML = image;
    }
  }, [image]);

  const handleDownload = useCallback(() => {
    if (canDownload) {
      const svgFile = new Blob([image], { type: 'image/svg+xml' });
      saveAs(svgFile, `${filename}.svg`);
    }
  }, [canDownload, image, filename]);

  return (
    <div className='qr-code-display'>
      <div className='qr-code-title'>
        <p className='qr-code-index'>{filename}.</p>
        <p className='qr-code-text'>{text}</p>
      </div>
      <div
        className={`qr-code-image ${canDownload ? 'can-download' : ''}`}
        ref={svgContainerRef}
        onClick={handleDownload}
      ></div>
    </div>
  );
};

export default QRCodeDisplay;
