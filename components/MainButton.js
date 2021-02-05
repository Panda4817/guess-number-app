import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/colors';
import TitleText from './TitleText';

const MainButton = props => {

    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.buttonContainer}>
                <TitleText style={styles.buttonText}>
                    {props.children}
                </TitleText>
            </View>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
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