import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/colors';
import BodyText from './BodyText'

const NumberBox = props => {

    return (
        <View style={styles.container}>
            <BodyText style={styles.number}>{props.children}</BodyText>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        borderColor: Colors.accent,
        borderWidth: 2,
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    number: {
        color: Colors.accent,
        fontSize: 22
    }

});

export default NumberBox;