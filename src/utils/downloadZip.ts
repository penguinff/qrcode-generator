import JSZip from 'jszip';
import { saveAs } from 'file-saver';

//To escape double quote so that it can properly shown in .csv file
const escapeCsvValue = (value: string) => {
  const escapedValue = value.replace(/"/g, '""');
  return `"${escapedValue}"`;
};

const downloadZip = async (
  images: { image: string; text: string; canDownload: boolean }[]
): Promise<void> => {
  const zip = new JSZip();
  let csvContent = 'File Name,Content\n';

  images.forEach((image, index) => {
    zip.file(`${index + 1}.svg`, image.image);
    csvContent += `${index + 1}.svg,${escapeCsvValue(image.text)}\n`;
  });

  zip.file('mapping.csv', csvContent);

  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, 'qr_codes.zip');
};

export default downloadZip;
