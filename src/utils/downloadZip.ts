import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { ImageData } from '../types';

//To escape double quote so that it can properly shown in .csv file
const escapeCsvValue = (value: string) => {
  const escapedValue = value.replace(/"/g, '""');
  return `"${escapedValue}"`;
};

const downloadZip = async (images: ImageData[]): Promise<void> => {
  const zip = new JSZip();
  let csvContent = 'File Name,Content\n';

  images.forEach((image) => {
    zip.file(`${image.filename}.svg`, image.image);
    csvContent += `${image.filename}.svg,${escapeCsvValue(image.text)}\n`;
  });

  zip.file('mapping.csv', csvContent);

  const zipFile = await zip.generateAsync({ type: 'blob' });
  saveAs(zipFile, 'qr_codes.zip');
};

export default downloadZip;
