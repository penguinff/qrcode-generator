import { useEffect, useRef } from 'react';
import { ImageData } from '../../types';
import './qrcode-display.scss';

const QRCodeDisplay = ({ filename, image, text, canDownload }: ImageData) => {
  const svgContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (svgContainerRef.current) {
      svgContainerRef.current.innerHTML = image;
    }
  }, [image]);

  const handleDownload = (canDownload: boolean) => {
    if (canDownload) {
      const blob = new Blob([image], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      return;
    }
  };

  return (
    <div className='qr-code-display'>
      <div className='qr-code-title'>
        <p className='qr-code-index'>{filename}.</p>
        <p className='qr-code-text'>{text}</p>
      </div>
      <div
        className={`qr-code-image ${
          canDownload ? 'can-download' : 'cannot-download'
        }`}
        ref={svgContainerRef}
        onClick={() => handleDownload(canDownload)}
      ></div>
    </div>
  );
};

export default QRCodeDisplay;
