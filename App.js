import React, {useState} from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
}

export default function App() {
  const [selectedNumber, setSelectedNumber] = useState();
  const [rounds, setRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading 
        startAsync={fetchFonts} 
          onFinish={() => setDataLoaded(true)} 
          onError={(err) => console.log(err)}
      />
    );
  }

  const configureNewGame = () => {
    setRounds(0);
    setSelectedNumber();
  }

  const startGameHandler = (number) => {
    setSelectedNumber(number);
  }

  const gameOverHandler = (gameRounds) => {
    setRounds(gameRounds);
  }

  let content = <StartGameScreen onStart={startGameHandler}/>

  if (selectedNumber && rounds <= 0) {
    content = <GameScreen number={selectedNumber} onGameOver={gameOverHandler}/>
  } else if (rounds > 0) {
    content = <GameOverScreen rounds={rounds} number={selectedNumber} onNewGame={configureNewGame}/>
  }

  return (
    <SafeAreaView style={styles.screen}>
        <Header title="Guess the number"/>
        {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
