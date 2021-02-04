import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import Colors from '../constants/colors';
import NumberBox from '../components/NumberBox';
const StartGameScreen = props => {
    const [value, setValue] = useState("");
    const [confirmed, setConfirmed] = useState(false);
    const [number, setNumber] = useState();

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
            Alert.alert('Invalid Number!', ' Number has to be between 1 and 99', [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}])
            return;
        }
        setConfirmed(true);
        setNumber(chosen);
        setValue("");
        Keyboard.dismiss;
    }

    let confirmedOutput;
    if (confirmed){
        confirmedOutput =  (
            <Card style={styles.summary}>
                <Text>You selected</Text>
                <NumberBox>{number}</NumberBox>
                <Button title="START GAME" />
            </Card> 
        )
    }
    return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
        <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game!</Text>
            <Card style={styles.inputContainer}>
                <Text>Select a Number</Text>
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
                    <View style={styles.button}>
                        <Button title="Reset" onPress={resetInputHandler} color={Colors.accent}/>
                    </View>
                    <View style={styles.button}>
                       <Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary}/> 
                    </View>
                    
                </View>
            </Card>
            {confirmedOutput}
        </View>
        </TouchableWithoutFeedback>
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
        marginVertical: 10,
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: '40%'
    },
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