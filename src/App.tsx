import React, { useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import styled from "styled-components";
import valentineMusic from "./valentine-music.mp3";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: rgb(255, 235, 235);
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
`;

const GifImage = styled.img`
  width: 300px;
  height: auto;
  margin-bottom: 20px;
  z-index: 2;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
`;

const Question = styled(motion.h1)`
  font-size: 2vw;
  color: rgb(255, 255, 255);
  font-weight: bold;
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;
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
  background-color: rgb(255, 64, 64);
  color: white;
`;

const NoButton = styled(Button)`
  background-color: #ccc;
  color: black;
`;

const SuccessMessage = styled(motion.h2)`
  font-size: 3vw;
  color: rgb(214, 51, 51);
  margin-top: 20px;
  font-weight: bold;
`;

const MuteButton = styled(Button)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1rem;
  background-color: rgb(255, 0, 0);
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
      <MuteButton onClick={toggleMusic}>{isPlaying ? "🔊 Mute" : "🔇 Play Music"}</MuteButton>
      <ContentWrapper>
        {yesClicked && <Confetti />}
        <GifImage src={yesClicked ? "/dudu.gif" : "/valentine-image.gif"} alt="V GIF" />
        <Question
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          💘 Will You Be My Valentine? 💘<br /><br />
          Just like stars need the night sky,<br />
          And flowers need the sun,<br />
          My days would be so much brighter<br />
          If you'd be my special one!<br /><br />
          
          What do you say?<br />
          P.S. - No pressure🤗
          By: Serius69
        </Question>
        {!yesClicked ? (
          <ButtonContainer>
            <YesButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleYesClick}
            >
              Absolutely Yes!!!
            </YesButton>
            <NoButton
              whileHover={{ x: noPosition.x, y: noPosition.y }}
              onMouseEnter={moveNoButton}
            >
              No :(
            </NoButton>
          </ButtonContainer>
        ) : (
          <SuccessMessage
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            I already knew you would say yes my love ❤️🎉
          </SuccessMessage>
        )}
      </ContentWrapper>
    </Container>
  );
};

export default App;
