import React, { useEffect, useState } from 'react';
import { getImages } from './services/imageService';
import { Image } from './types/data';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const imagesData = await getImages();
        setImages(imagesData);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box padding={2}>
      <h1>Images</h1>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : (
        <Box display="flex" flexWrap="wrap">
          {images.map((image) => (
            <Box key={image.id} margin={1}>
              <img src={image.url} alt={image.title} width={image.width} height={image.height} />
              <h2>{image.title}</h2>
              <p>{image.description}</p>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default App;