import infoIcon from '../../assets/info.png';
import './tooltip.scss';

type TooltipProps = {
  tooltipText: string;
};

const Tooltip = ({ tooltipText }: TooltipProps) => {
  return (
    <div className='tooltip'>
      <img src={infoIcon} alt='info' />
      <span className='tooltiptext'>{tooltipText}</span>
    </div>
  );
};

export default Tooltip;
