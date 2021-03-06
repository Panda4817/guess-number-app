import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Alert, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../components/Card';
import NumberBox from '../components/NumberBox';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude)
    } else {
        return rndNum;
    }
}

const GameScreen = props => {
    const firstGuess = generateRandomBetween(1, 100, props.number);
    const [guess, setGuess] = useState(firstGuess);
    const [pastRounds, setPastRounds] = useState([{key: Math.random().toString(), round: 1, value: firstGuess}]);
    const [round, setRound] = useState(1);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    const [ width, setWidth ] = useState(Dimensions.get('window').width)
    const [ height, setHeight ] = useState(Dimensions.get('window').height)

    const { number, onGameOver } = props;


    useEffect(() => {
        if (guess === props.number){
            props.onGameOver(round);
        }
    }, [guess, number, onGameOver]);
    
    useEffect(() => {
        const updateLayout = () => {
            setWidth(Dimensions.get('window').width);
            setHeight(Dimensions.get('window').height);
        };
        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });
    
    const nextGuessHandler = (direction) => {
        if ((direction === 'lower' && guess < props.number) || (direction === 'higher' && guess > props.number)){
            Alert.alert("Don't lie!", "You know that is wrong...", [{text:"Sorry", style: 'cancel'}]);
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = guess - 1;

        } else {
            currentLow.current = guess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, guess);
        const nextRound = round + 1
        setGuess(nextNumber);
        setRound((prev) => prev + 1)
        setPastRounds((prev) => [{key: Math.random().toString(), round: nextRound, value: nextNumber}, ...prev])
    }

    if (height < 500) {
        return (
            <View style={styles.screen}>
            <TitleText style={styles.title}>Computer's Guess</TitleText>
            <View style={styles.controls}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
                <NumberBox>{guess}</NumberBox>
                <MainButton onPress={nextGuessHandler.bind(this, 'higher')}>
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </View>
            <TitleText style={styles.title}>Past Guesses</TitleText>
            <ScrollView contentContainerStyle={styles.listContainer}>
                {pastRounds.map((round) => {
                    return (<View style={styles.listItem} key={round.key}>
                        <NumberBox>
                            {"#" + round.round}
                        </NumberBox>
                        <NumberBox>
                            {round.value}
                        </NumberBox>
                    </View>)
                })}
            </ScrollView>
        </View>
        )
    }
    
    return (
        <View style={styles.screen}>
            <TitleText style={styles.title}>Computer's Guess</TitleText>
            <NumberBox>{guess}</NumberBox>
            <Card style={styles.buttonBox}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'higher')}>
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </Card>
            <TitleText style={styles.title}>Past Guesses</TitleText>
            <ScrollView contentContainerStyle={styles.listContainer}>
                {pastRounds.map((round) => {
                    return (<View style={styles.listItem} key={round.key}>
                        <NumberBox>
                            {"#" + round.round}
                        </NumberBox>
                        <NumberBox>
                            {round.value}
                        </NumberBox>
                    </View>)
                })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'

    },
    buttonBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Dimensions.get('window').height > 600 ? 15 : 5,
        width: 300,
        maxWidth: '80%'
    },
    button: {
        width: '40%'
    },
    listItem: {
        flexDirection: 'row',
        marginTop: Dimensions.get('window').height > 600 ? 10 : 2,
        width: Dimensions.get('window').width > 350 ? '100%' : '60%',
        justifyContent: 'space-between',
        
    },
    title: {
        marginTop: Dimensions.get('window').height > 600 ? 15 : 5,
    },
    listContainer: {
        flexGrow: 1,
        justifyContent: 'flex-end',
        width: '100%',
        maxWidth: '50%'
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        alignItems: 'center'
    }
});

export default GameScreen;