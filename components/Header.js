import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Colors from '../constants/colors';
import TitleText from './TitleText';

const Header = props => {

    return (
        <View style={{...styles.headerBase, ...Platform.select({ios: styles.headerIOS, android: styles.headerAndroid})}}>
            <TitleText style={styles.headerText}>
                {props.title}
            </TitleText>
        </View>
    );
};


const styles = StyleSheet.create({
    headerBase: {
        width: '100%',
        height: '15%',
        paddingTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    headerIOS: {
        borderBottomColor: Colors.primary,
        borderBottomWidth: 1,
        backgroundColor: 'white',
    },
    headerAndroid: {
        borderBottomColor: 'transparent',
        borderBottomWidth: 0,
        backgroundColor: Colors.primary,
    },
    headerText: {
        color: Platform.OS == 'android' ? 'white' : Colors.primary,
    }

});

export default Header;