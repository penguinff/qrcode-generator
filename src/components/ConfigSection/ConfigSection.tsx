import { ErrorCorrectionLevel } from '../../types';
import ColorPicker from '../ColorPicker/ColorPicker';
import Tooltip from '../Tooltip/Tooltip';
import './config-section.scss';

type ConfigSectionProps = {
  errorCorrectionLevel: ErrorCorrectionLevel;
  setErrorCorrectionLevel: (level: ErrorCorrectionLevel) => void;
  width: number;
  setWidth: (width: number) => void;
  margin: number;
  setMargin: (margin: number) => void;
  foregroundColor: string;
  setForegroundColor: (color: string) => void;
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
};

const ConfigSection = ({
  errorCorrectionLevel,
  setErrorCorrectionLevel,
  width,
  setWidth,
  margin,
  setMargin,
  foregroundColor,
  setForegroundColor,
  backgroundColor,
  setBackgroundColor,
}: ConfigSectionProps) => {
  return (
    <div className='config-section'>
      <h3>Configuration</h3>
      <label htmlFor='error-correction-level'>
        <span>Error Correction Level</span>
        <Tooltip tooltipText='Higher = larger in size, more robust code.' />
      </label>
      <select
        name='error-correction-level'
        id='error-correction-level'
        value={errorCorrectionLevel}
        onChange={(e) =>
          setErrorCorrectionLevel(e.target.value as ErrorCorrectionLevel)
        }
      >
        <option value='L'>Low</option>
        <option value='M'>Medium</option>
        <option value='Q'>Quartile</option>
        <option value='H'>High</option>
      </select>

      <label htmlFor='width'>
        <span>Width</span>
        <Tooltip tooltipText='Define the width (px) for the output image. If width is too small to contain the QR code, this option will be ignored.' />
      </label>
      <input
        type='number'
        id='width'
        name='width'
        value={width}
        min={0}
        onChange={(e) => setWidth(parseInt(e.target.value))}
      />

      <label htmlFor='margin'>
        <span>Margin</span>
        <Tooltip tooltipText='Define how much wide the quiet zone should be.' />
      </label>
      <input
        type='number'
        id='margin'
        name='margin'
        value={margin}
        min={0}
        onChange={(e) => setMargin(parseInt(e.target.value))}
      />

      <div className='color-pickers'>
        <ColorPicker
          title='Foreground Color'
          color={foregroundColor}
          setColor={setForegroundColor}
        />
        <ColorPicker
          title='Background Color'
          color={backgroundColor}
          setColor={setBackgroundColor}
        />
      </div>
    </div>
  );
};

export default ConfigSection;
