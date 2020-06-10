import React from 'react';
import { StyleSheet, StatusBar, Platform, View } from 'react-native';

const AppStatusBar = ({backgroundColor, ...props}) => {
    return (
        <View style={[styles.statusBar, backgroundColor]}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    );
};

const BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const styles = StyleSheet.create({
    statusBar: {
        height: BAR_HEIGHT
    },
});

export default AppStatusBar;