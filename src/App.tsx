import { useEffect, useState } from 'react';
import { getImages } from './services/imageService';
import { Image } from './types/data';
import logo from './logo.svg';
import './App.css';

function App() {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const imagesData = await getImages();
        setImages(imagesData);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
