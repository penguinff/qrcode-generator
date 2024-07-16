import './footer.scss';

const Footer = () => {
  return (
    <footer className='footer'>
      <span>
        Developed by : Chirstine Fong |{' '}
        <a
          href='https://github.com/penguinff/qrcode-generator'
          target='_blank'
          rel='noreferrer noopener'
        >
          Github
        </a>
      </span>
    </footer>
  );
};

export default Footer;
