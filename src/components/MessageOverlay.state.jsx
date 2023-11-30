import React, { useState, useEffect } from "react";

export function useMessageState() {
  const [messages, setMessages] = useState([]);

  const randomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const generateRandomMessage = () => {
    const texts = ["Meow!", "Purrr!", "Hiss!"];
    const randomIndex = Math.floor(Math.random() * texts.length);
    const selectedText = texts[randomIndex];

    const minWidth = window.innerWidth * 0.03;
    const maxWidth = window.innerWidth * 0.25;
    const minHeight = window.innerHeight * 0.15;
    const maxHeight = window.innerHeight * 0.85;

    const randomTop = Math.random() * (maxHeight - minHeight) + minHeight;
    const randomLeft = Math.random() * (maxWidth - minWidth) + minWidth;
    const randomRight =
      window.innerWidth - Math.random() * (maxWidth - minWidth) - minWidth;

    const isLeft = Math.random() < 0.5;

    const newMessage = {
      text: selectedText,
      color: randomColor(),
      position: { top: randomTop, left: isLeft ? randomLeft : randomRight },
      fontSize: "12px",
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    setTimeout(() => {
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg !== newMessage)
      );
    }, 3000);
  };

  return { messages, generateRandomMessage };
}
