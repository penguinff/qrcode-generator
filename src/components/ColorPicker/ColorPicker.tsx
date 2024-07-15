import { useEffect, useRef, useState } from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import './color-picker.scss';

type ColorPickerProps = {
  title: string;
  color: string;
  setColor: (color: string) => void;
};

const ColorPicker = ({ title, color, setColor }: ColorPickerProps) => {
  const [isShowPicker, setIsShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      pickerRef.current &&
      !pickerRef.current.contains(event.target as Node)
    ) {
      setIsShowPicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='color-picker'>
      <p>{title}</p>
      <div
        className='chosen-color'
        style={{ backgroundColor: color }}
        onClick={() => setIsShowPicker((prev) => !prev)}
      ></div>
      {isShowPicker && (
        <div ref={pickerRef} className='picker-area'>
          <HexColorPicker color={color} onChange={setColor} />
          <HexColorInput color={color} onChange={setColor} />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
