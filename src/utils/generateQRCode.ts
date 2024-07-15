import QRCode from 'qrcode';
import { errorSvg } from '../assets/errorSvg';
import { ImageData, ErrorCorrectionLevel } from '../types';

const generateQRCode = async (
  value: string,
  index: number,
  errorCorrectionLevel: ErrorCorrectionLevel,
  foregroundColor: string,
  backgroundColor: string,
  width: number,
  margin: number
): Promise<ImageData> => {
  try {
    const image = await QRCode.toString(value, {
      type: 'svg',
      errorCorrectionLevel: errorCorrectionLevel,
      color: {
        dark: foregroundColor,
        light: backgroundColor,
      },
      width: width,
      margin: margin,
    });
    return { filename: index + 1, image, text: value, canDownload: true };
  } catch (error) {
    alert(`Error generating QR code for number ${index + 1}.\n${error}`);
    return {
      filename: index + 1,
      image: errorSvg,
      text: value,
      canDownload: false,
    };
  }
};

export default generateQRCode;
