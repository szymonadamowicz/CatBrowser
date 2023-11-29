import { useState, useEffect } from "react";
import axios from "axios";

export function useGalleryState() {
  const [count, setCount] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = async () => {
    try {
      const probabilityCorrect = 0.9;
      const apiUrlCorrect = "https://api.thecatapi.com/v1/images/search";
      const apiUrlIncorrect = "https://api.thecatapi.com/v1/imags/searh";

      function getRandomApiUrl() {
        return Math.random() < probabilityCorrect
          ? apiUrlCorrect
          : apiUrlIncorrect;
      }
      const api = getRandomApiUrl();
      setIsLoading(true);
      const response = await axios.get(api, {
        params: {
          api_key:
            "live_ZG9joCHH6OcHcq79LLLv2cxHEuj6YxcCVjIkBax9eiRWLYPQpKa52mr2iApqK3Ry",
          limit: 50,
        },
      });
      const photosArray = response.data;

      setPhotos(photosArray);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  const refetchData = () => {
    setIsError(false);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    count,
    setCount,
    photos,
    isLoading,
    isError,
    fetchData,
    refetchData,
  };
}
