import React from "react";
import { useGalleryState } from "./Gallery.state";
import { useMessageState } from "./MessageOverlay.state";

export default function Browser() {
  const {
    count,
    setCount,
    photos,
    isLoading,
    isError,
    shyCatsVisible,
    setShyCatsVisible,
    troublemakerCatsHidden,
    setTroublemakerCatsHidden,
    fetchAndSetData,
  } = useGalleryState();
  const { messages, generateRandomMessage } = useMessageState();

  const handlePrevClick = () => {
    setCount(count - 1);
    generateRandomMessage();
  };

  const handleNextClick = () => {
    setCount(count + 1);
    generateRandomMessage();
    console.log(photos, troublemakerCatsHidden);
  };

  const filteredPhotos = photos.filter(
    (photo) =>
      (shyCatsVisible || (!shyCatsVisible && photo.shy !== true)) &&
      (!troublemakerCatsHidden ||
        (troublemakerCatsHidden && photo.troublemaker !== true))
  );

  if (isLoading) {
    return <p>Loading...</p>;
  } else if (isError) {
    return (
      <div>
        <p>Loading failed</p>
        <div className="refresh">
          <button onClick={fetchAndSetData}>Retry</button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="checkboxes">
          <label>
            <input
              type="checkbox"
              checked={shyCatsVisible}
              onChange={() => setShyCatsVisible(!shyCatsVisible)}
            />
            Show shy cats
          </label>
          <label>
            <input
              type="checkbox"
              checked={troublemakerCatsHidden}
              onChange={() =>
                setTroublemakerCatsHidden(!troublemakerCatsHidden)
              }
            />
            Hide troublemaking cats
          </label>
        </div>
        <div className="gallery">
          <div className="pictures">
            {filteredPhotos.length > 0 && (
              <img
                key={filteredPhotos[count].id}
                src={filteredPhotos[count].url}
                alt={`Cat ${filteredPhotos[count].id}`}
              />
            )}
          </div>
        </div>

        <div className="buttons">
          <button
            className={count === 0 ? "button-disabled" : "button-enabled"}
            onClick={handlePrevClick}
          >
            {"<"}
          </button>
          <div>
            <p>
              {count + 1}/{filteredPhotos.length}
            </p>
          </div>
          <button
            className={
              count === filteredPhotos.length - 1
                ? "button-disabled"
                : "button-enabled"
            }
            onClick={handleNextClick}
          >
            {">"}
          </button>
        </div>
        <div className="beginning">
          <button onClick={() => setCount(0)}>Go to the beginning</button>
        </div>
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: `${message.position.top}px`,
              left: `${message.position.left}px`,
              color: message.color,
              fontSize: message.fontSize,
            }}
          >
            {message.text}
          </div>
        ))}
      </div>
    );
  }
}
