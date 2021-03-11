import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform, TouchableNativeFeedbackComponent } from 'react-native';
import Colors from '../constants/colors';
import TitleText from './TitleText';

const MainButton = props => {
    let ButtonComponent = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21){
        ButtonComponent = TouchableNativeFeedback;
    }
    return (
        <View style={styles.viewContainer}>
            <ButtonComponent onPress={props.onPress} activeOpacity={0.6}>
                <View style={styles.buttonContainer}>
                    <TitleText style={styles.buttonText}>
                        {props.children}
                    </TitleText>
                </View>
            </ButtonComponent>
        </View>
    );
};


const styles = StyleSheet.create({
    viewContainer: {
        borderRadius: 25,
        overflow: 'hidden'
    },
    buttonContainer: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25
    },
    buttonText: {
        color: 'white',
        fontSize: 18
    }

});

export default MainButton;