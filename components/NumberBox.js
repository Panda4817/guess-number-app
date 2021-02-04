import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

const NumberBox = props => {

    return (
        <View style={styles.container}>
            <Text style={styles.number}>{props.children}</Text>
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