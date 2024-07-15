import './app.scss';
import Footer from './components/Footer/Footer';
import Generator from './components/Generator/Generator';
import Header from './components/Header/Header';

function App() {
  return (
    <div className='app'>
      <Header />
      <Generator />
      <Footer />
    </div>
  );
}

export default App;
