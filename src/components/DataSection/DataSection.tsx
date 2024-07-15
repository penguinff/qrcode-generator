import './data-section.scss';

type DataSectionProps = {
  input: string;
  setInput: (input: string) => void;
  separator: string;
  setSeparator: (separator: string) => void;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleReset: () => void;
  numberOfCodes: number;
};

const DataSection = ({
  input,
  setInput,
  separator,
  setSeparator,
  isLoading,
  handleSubmit,
  handleReset,
  numberOfCodes,
}: DataSectionProps) => {
  //TODO: 不要寫死
  const canGenerate = numberOfCodes <= 200;

  return (
    <div className='data-section'>
      <h3>
        QR Code(s){' '}
        <span className={!canGenerate ? 'span-warn' : ''}>
          (Maximum 200 QR Codes)
        </span>
      </h3>

      <form onSubmit={handleSubmit} className='data-form'>
        <textarea
          className={!canGenerate ? 'textarea-warn' : ''}
          rows={10}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter each QR Code on a new line (or specify a separator character below)'
        />
        <input
          type='text'
          placeholder='Separator Character (e.g. , | ;)'
          value={separator}
          onChange={(e) => setSeparator(e.target.value)}
        />
        <button
          type='submit'
          disabled={isLoading || numberOfCodes === 0 || !canGenerate}
        >
          Generate {numberOfCodes} QR {numberOfCodes > 1 ? 'Codes' : 'Code'}
        </button>
        <button type='button' onClick={handleReset}>
          Reset
        </button>
      </form>
    </div>
  );
};

export default DataSection;
