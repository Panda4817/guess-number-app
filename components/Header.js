import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/colors';
import TitleText from './TitleText';

const Header = props => {

    return (
        <View style={styles.header}>
            <TitleText style={styles.headerText}>
                {props.title}
            </TitleText>
        </View>
    );
};


const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '16%',
        paddingTop: 20,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        color: 'black',
    }

});

export default Header;