export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export type ImageData = {
  filename: number;
  image: string;
  text: string;
  canDownload: boolean;
};
