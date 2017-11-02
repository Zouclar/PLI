/**
 * Created by sylvainlasjunies on 31/10/17.
 */
import {
    AppRegistry,
    StyleSheet,
    Dimensions,
} from 'react-native';

export default StyleSheet.create({
    errorContainer: {
        height: 65,
        width: Dimensions.get("window").width * 0.9,
        backgroundColor: '#f44242',
        padding: 5,
        margin: 25,
        borderRadius: 2,
        borderWidth: 0.5,
        borderColor: '#261f1f',
    },
    successContainer: {
        height: 65,
        width: Dimensions.get("window").width * 0.9,
        backgroundColor: '#3ab77b',
        padding: 5,
        margin: 25,
        borderRadius: 2,
        borderWidth: 0.5,
        borderColor: '#1a211d',
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
    },
    content: {
        textAlign: 'center',
        marginTop: 10,
    },
});