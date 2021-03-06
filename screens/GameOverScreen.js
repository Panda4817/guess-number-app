import React from 'react';
import { View, StyleSheet, Image, Dimensions, ScrollView} from 'react-native';
import NumberBox from '../components/NumberBox';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
    return (
            <ScrollView>
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
            </ScrollView>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    imageContainer: {
        borderRadius: Dimensions.get('window').width * 0.5 / 2,
        borderWidth: 3,
        borderColor: 'white',
        width: Dimensions.get('window').width * 0.5,
        height: Dimensions.get('window').width * 0.5,
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 50
    },
    image: {
        width: '100%',
        height: '100%'

    },
    title :{
        paddingVertical: Dimensions.get('window').height / 60
    }
    
});

export default GameOverScreen;