import React from "react";
import { useGalleryState } from "./Gallery.state";

export default function Browser() {
  const { count, setCount, photos, isLoading, isError, refetchData } =
    useGalleryState();

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
