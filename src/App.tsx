import React, { useEffect, useState } from "react";
import { getImages } from "./services/imageService";
import { Image } from "./types/data";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    h1: {
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#333",
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      marginTop: "10px",
      color: "#555",
    },
    body1: {
      fontSize: "1rem",
      color: "#777",
    },
  },
  palette: {
    background: {
      default: "#f5f5f5",
    },
    primary: {
      main: "#1976d2",
    },
  },
});

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
    <ThemeProvider theme={theme}>
      <Container>
        <Box padding={4} textAlign="center">
          <Typography variant="h1">Faker Images</Typography>
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="60vh"
            >
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={4}>
              {images.map((image) => (
                <Grid item key={image.id} xs={12} sm={6} md={4}>
                  <Card sx={{ height: "100%" }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={image.url}
                      alt={image.title}
                    />
                    <CardContent>
                      <Typography
                        variant="h2"
                        gutterBottom
                      >
                        {image.title}
                      </Typography>
                      <Typography variant="body1">
                        {image.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;
