import React, { useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import styled from "styled-components";
import valentineMusic from "./valentine-music.mp3";
import valentineImage from "./valentine-image.jpg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #ffebef;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.3;
  z-index: -1;
`;

const Question = styled(motion.h1)`
  font-size: 4vw;
  color: #d63384;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

const Button = styled(motion.button)`
  padding: 10px 20px;
  font-size: 1.5vw;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  transition: 0.3s;
  white-space: nowrap;
`;

const YesButton = styled(Button)`
  background-color: #ff4081;
  color: white;
`;

const NoButton = styled(Button)`
  background-color: #ccc;
  color: black;
`;

const SuccessMessage = styled(motion.h2)`
  font-size: 3vw;
  color: #d63384;
  margin-top: 20px;
  font-weight: bold;
`;

const MuteButton = styled(Button)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1rem;
  background-color: #d63384;
  color: white;
`;

const App: React.FC = () => {
  const [yesClicked, setYesClicked] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [audio] = useState(new Audio(valentineMusic));
  const [isPlaying, setIsPlaying] = useState(false);

  const moveNoButton = () => {
    const newX = Math.random() * 200 - 100;
    const newY = Math.random() * 200 - 100;
    setNoPosition({ x: newX, y: newY });
  };

  const handleYesClick = () => {
    setYesClicked(true);
    audio.play();
    setIsPlaying(true);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Container>
      <BackgroundImage src={valentineImage} alt="Valentine" />
      {yesClicked && <Confetti />}
      <MuteButton onClick={toggleMusic}>{isPlaying ? "🔊 Mute" : "🔇 Play Music"}</MuteButton>
      <Question
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Will You Be My Valentine? ❤️
      </Question>
      {!yesClicked ? (
        <ButtonContainer>
          <YesButton
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleYesClick}
          >
            Yes
          </YesButton>
          <NoButton
            whileHover={{ x: noPosition.x, y: noPosition.y }}
            onMouseEnter={moveNoButton}
          >
            No
          </NoButton>
        </ButtonContainer>
      ) : (
        <SuccessMessage
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Yay! Happy Valentine's Day! ❤️🎉
        </SuccessMessage>
      )}
    </Container>
  );
};

export default App;
