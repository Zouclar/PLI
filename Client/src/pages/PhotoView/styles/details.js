import {
  AppRegistry,
  StyleSheet,
  Dimensions,
} from 'react-native';
    
var sliderItemWidth = Dimensions.get('window').width *0.9;
var sliderItemHeight = Dimensions.get('window').height * 0.27;
var sliderHeight = Dimensions.get('window').height * 0.3;

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    capture: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 5,
        borderColor: '#FFF',
        marginBottom: 15,
    },
    cancel: {
        position: 'absolute',
        right: 20,
        top: 20,
        backgroundColor: 'transparent',
        color: '#FFF',
        fontWeight: '600',
        fontSize: 17,
    }
});
