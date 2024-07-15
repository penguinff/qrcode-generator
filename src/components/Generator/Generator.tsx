import { useCallback, useMemo, useReducer } from 'react';
import ConfigSection from '../ConfigSection/ConfigSection';
import QRCodeDisplay from '../QRCodeDisplay/QRCodeDisplay';
import DataSection from '../DataSection/DataSection';
import generateQRCode from '../../utils/generateQRCode';
import downloadZip from '../../utils/downloadZip';
import { ImageData, ErrorCorrectionLevel } from '../../types';
import './generator.scss';

const initialState = {
  input: '',
  separator: '\n',
  foregroundColor: '#000000',
  backgroundColor: '#FFFFFF',
  errorCorrectionLevel: 'M' as ErrorCorrectionLevel,
  width: 200,
  margin: 4,
  images: [] as ImageData[],
  isLoading: false,
};

type State = typeof initialState;

type Action =
  | { type: 'SET_INPUT'; payload: string }
  | { type: 'SET_SEPARATOR'; payload: string }
  | { type: 'SET_FOREGROUND_COLOR'; payload: string }
  | { type: 'SET_BACKGROUND_COLOR'; payload: string }
  | { type: 'SET_ERROR_CORRECTION_LEVEL'; payload: ErrorCorrectionLevel }
  | { type: 'SET_WIDTH'; payload: number }
  | { type: 'SET_MARGIN'; payload: number }
  | {
      type: 'SET_IMAGES';
      payload: ImageData[];
    }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'RESET'; payload: null };

const reducer = (state: State, action: Action): State => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_INPUT':
      return { ...state, input: payload };
    case 'SET_SEPARATOR':
      return { ...state, separator: payload || '\n' };
    case 'SET_FOREGROUND_COLOR':
      return { ...state, foregroundColor: payload };
    case 'SET_BACKGROUND_COLOR':
      return { ...state, backgroundColor: payload };
    case 'SET_ERROR_CORRECTION_LEVEL':
      return { ...state, errorCorrectionLevel: payload };
    case 'SET_WIDTH':
      return { ...state, width: payload };
    case 'SET_MARGIN':
      return { ...state, margin: payload };
    case 'SET_IMAGES':
      return { ...state, images: payload };
    case 'SET_LOADING':
      return { ...state, isLoading: payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const Generator = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const splittedValues = useMemo(() => {
    return state.input.split(state.separator).filter(Boolean);
  }, [state.input, state.separator]);

  const numberOfCodes = splittedValues.length;

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
      if (!state.input) return;

      dispatch({ type: 'SET_LOADING', payload: true });

      try {
        const qrCodePromises = splittedValues.map((value, index) =>
          generateQRCode(
            value,
            index,
            state.errorCorrectionLevel,
            state.foregroundColor,
            state.backgroundColor,
            state.width,
            state.margin
          )
        );

        const images = await Promise.all(qrCodePromises);
        dispatch({ type: 'SET_IMAGES', payload: images });
      } catch (error) {
        alert(`Unexpected error generating QR codes: ${error}`);
      }

      dispatch({ type: 'SET_LOADING', payload: false });
    },
    [
      state.input,
      state.errorCorrectionLevel,
      state.foregroundColor,
      state.backgroundColor,
      state.width,
      state.margin,
      splittedValues,
    ]
  );

  const handleReset = useCallback(() => {
    dispatch({ type: 'RESET', payload: null });
  }, []);

  const handleDownloadZip = useCallback(() => {
    downloadZip(state.images);
  }, [state.images]);

  return (
    <section className='generator'>
      <div className='top-part'>
        <ConfigSection
          errorCorrectionLevel={state.errorCorrectionLevel}
          setErrorCorrectionLevel={(level) =>
            dispatch({ type: 'SET_ERROR_CORRECTION_LEVEL', payload: level })
          }
          width={state.width}
          setWidth={(width) => dispatch({ type: 'SET_WIDTH', payload: width })}
          margin={state.margin}
          setMargin={(margin) =>
            dispatch({ type: 'SET_MARGIN', payload: margin })
          }
          foregroundColor={state.foregroundColor}
          setForegroundColor={(color) =>
            dispatch({ type: 'SET_FOREGROUND_COLOR', payload: color })
          }
          backgroundColor={state.backgroundColor}
          setBackgroundColor={(color) =>
            dispatch({ type: 'SET_BACKGROUND_COLOR', payload: color })
          }
        />

        <DataSection
          input={state.input}
          setInput={(input) => dispatch({ type: 'SET_INPUT', payload: input })}
          separator={state.separator}
          setSeparator={(separator) =>
            dispatch({ type: 'SET_SEPARATOR', payload: separator })
          }
          isLoading={state.isLoading}
          handleSubmit={handleSubmit}
          handleReset={handleReset}
          numberOfCodes={numberOfCodes}
        />
      </div>

      <div className='bottom-part'>
        {state.images.length > 0 && (
          <button onClick={handleDownloadZip}>Download all in .zip file</button>
        )}

        <div className='qr-code-list'>
          {state.images.map((image) => (
            <QRCodeDisplay
              key={image.filename}
              filename={image.filename}
              image={image.image}
              text={image.text}
              canDownload={image.canDownload}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Generator;
