import React, { useState, useEffect } from 'react';
import { 
    View, 
    StyleSheet, 
    Button, 
    TouchableWithoutFeedback, 
    Keyboard, 
    Alert, 
    Dimensions, 
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import Colors from '../constants/colors';
import NumberBox from '../components/NumberBox';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

const StartGameScreen = props => {
    const [value, setValue] = useState("");
    const [confirmed, setConfirmed] = useState(false);
    const [number, setNumber] = useState();
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4)


    
    

    const numberInputHandler = (inputText) => {
        setValue(inputText.replace(/[^0-9]/g, ''));
    }

    const resetInputHandler = () => {
        setValue("");
        setConfirmed(false);
    }

    const confirmInputHandler = () => {
        const chosen = parseInt(value);
        if (isNaN(chosen) || chosen <= 0 || chosen > 99){
            Alert.alert('Invalid Number!', ' Number has to be between 1 and 99', [{BodyText: 'Okay', style: 'destructive', onPress: resetInputHandler}])
            return;
        }
        setConfirmed(true);
        setNumber(chosen);
        setValue("");
        Keyboard.dismiss();
    }

    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4);
        };
        Dimensions.addEventListener('change', updateLayout);
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        }
    });

    let confirmedOutput;
    if (confirmed){
        confirmedOutput =  (
            <Card style={styles.summary}>
                <BodyText>You selected</BodyText>
                <NumberBox>{number}</NumberBox>
                <MainButton onPress={() => props.onStart(number)}>START GAME</MainButton>
            </Card> 
        )
    }
    return (
        <ScrollView>
        <KeyboardAvoidingView behaviour="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
        <View style={styles.screen}>
            <TitleText style={styles.title}>Start a New Game!</TitleText>
            <Card style={styles.inputContainer}>
                <BodyText>Select a Number</BodyText>
                <Input 
                    style={styles.input}
                    blurOnSubmit={true}
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType="number-pad"
                    maxLength={2}
                    onChangeText={numberInputHandler}
                    value={value}
                />
                <View style={styles.buttonContainer}>
                    <View style={{width: buttonWidth}}>
                        <Button title="Reset" onPress={resetInputHandler} color={Colors.accent}/>
                    </View>
                    <View style={{width: buttonWidth}}>
                       <Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary}/> 
                    </View>
                    
                </View>
            </Card>
            {confirmedOutput}
        </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        marginVertical: 10
    },
    inputContainer: {
        width: '80%',
        minWidth: 300,
        maxWidth: '95%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    // button: {
    //     width: buttonWidth
    // },
    input: {
        width: 60,
        textAlign: 'center'
    },
    summary: {
        marginTop: 20,
        alignItems: 'center'
    }

});

export default StartGameScreen;