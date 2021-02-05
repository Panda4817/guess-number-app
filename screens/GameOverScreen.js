import React from 'react';
import { View, StyleSheet, Image} from 'react-native';
import NumberBox from '../components/NumberBox';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <TitleText style={styles.title}>The game is Over!</TitleText>
            <View style={styles.imageContainer}>
                <Image 
                    //source={require('../assets/success.png')}
                    source={{uri: 'https://media.giphy.com/media/ReImZejkBnqYU/source.gif'}}
                    style={styles.image}
                    resizeMode='cover'
                    fadeDuration={1000}
                />
            </View>
            <BodyText>Your device needed...</BodyText>
            <NumberBox>{props.rounds} rounds</NumberBox>
            <BodyText>to guess the number</BodyText>
            <NumberBox>{props.number}</NumberBox>
            <MainButton onPress={props.onNewGame}>NEW GAME</MainButton>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'white',
        width: 150,
        height: 150,
        overflow: 'hidden',
        marginVertical: 5
    },
    image: {
        width: '100%',
        height: '100%'

    },
    title :{
        paddingVertical: 10
    }
    
});

export default GameOverScreen;