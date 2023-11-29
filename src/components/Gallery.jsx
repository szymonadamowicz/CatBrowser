import React, { useState, useEffect } from "react";
import axios from "axios";
import { State } from "./State";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function Browser() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserContent />
    </QueryClientProvider>
  );
}

function BrowserContent() {
  const { count, setCount } = State();
  const [error, setError] = useState(false);

  const {
    data: photos,
    isLoading,
    isError,
    refetch,
  } = useQuery("fetchPhotos", fetchData, {
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  async function fetchData() {
    const probabilityCorrect = 0.1;
    const apiUrlCorrect = "https://api.thecatapi.com/v1/images/search";
    const apiUrlIncorrect = "https://api.thecatapi.com/v1/imags/searh";

    function getRandomApiUrl() {
      return Math.random() < probabilityCorrect
        ? apiUrlCorrect
        : apiUrlIncorrect;
    }
    const api = getRandomApiUrl();
    try {
      const response = await axios.get(api, {
        params: {
          api_key:
            "live_ZG9joCHH6OcHcq79LLLv2cxHEuj6YxcCVjIkBax9eiRWLYPQpKa52mr2iApqK3Ry",
          limit: 50,
        },
      });
      return response.data;
    } catch (error) {
      setError(true);
      throw new Error("Error fetching data");
    }
  }

  const refetchData = async () => {
    setError(false);
    await refetch();
  };
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return (
      <div>
        <p>Loading failed</p>
        <div className="refresh">
          <button onClick={refetchData}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="gallery">
        <div className="pictures">
          {photos && photos.length > 0 && (
            <img
              key={photos[count].id}
              src={photos[count].url}
              alt={`Cat ${photos[count].id}`}
            />
          )}
        </div>
      </div>
      <div className="buttons">
        <button
          style={{
            pointerEvents: count === 0 ? "none" : "unset",
            opacity: count === 0 ? "0.3" : "1",
          }}
          onClick={() => setCount(count - 1)}
        >
          {"<"}
        </button>
        <div>
          <p>
            {count + 1}/{photos && photos.length}
          </p>
        </div>
        <button
          style={{
            pointerEvents:
              count === (photos && photos.length - 1) ? "none" : "unset",
            opacity: count === (photos && photos.length - 1) ? "0.3" : "1",
          }}
          onClick={() => setCount(count + 1)}
        >
          {">"}
        </button>
      </div>
      <div className="beginning">
        <button onClick={() => setCount(0)}>Go to the beginning</button>
      </div>
    </div>
  );
}
