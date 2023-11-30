import { useState, useEffect } from "react";
import axios from "axios";

export function useGalleryState() {
  const [count, setCount] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [shyCatsVisible, setShyCatsVisible] = useState(false);
  const [troublemakerCatsHidden, setTroublemakerCatsHidden] = useState(false);

  function getRandomBoolean(probability) {
    return Math.random() < probability;
  }

  function getRandomApiUrl() {
    const probabilityCorrect = 0.9;
    const apiUrlCorrect = "https://api.thecatapi.com/v1/images/search";
    const apiUrlIncorrect = "https://api.thecatapi.com/v1/imags/searh";
    return Math.random() < probabilityCorrect ? apiUrlCorrect : apiUrlIncorrect;
  }
  const fetchAndSetData = async () => {
    try {
      setIsError(false);
      setIsLoading(true);

      const api = getRandomApiUrl();

      const response = await axios.get(api, {
        params: {
          api_key:
            "live_ZG9joCHH6OcHcq79LLLv2cxHEuj6YxcCVjIkBax9eiRWLYPQpKa52mr2iApqK3Ry",
          limit: 50,
        },
      });

      const photosArray = response.data.map((photo) => {
        const isShy = getRandomBoolean(0.25);
        const isTroublemaker = getRandomBoolean(0.3);

        return {
          ...photo,
          shy: isShy,
          troublemaker: isTroublemaker,
        };
      });

      setPhotos(photosArray);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSetData();
  }, []);

  return {
    count,
    setCount,
    photos,
    isLoading,
    isError,
    shyCatsVisible,
    setShyCatsVisible: () => {
      setCount(0);
      setShyCatsVisible(!shyCatsVisible);
    },
    troublemakerCatsHidden,
    setTroublemakerCatsHidden: () => {
      setCount(0);
      setTroublemakerCatsHidden(!troublemakerCatsHidden);
    },
    fetchAndSetData,
  };
}
