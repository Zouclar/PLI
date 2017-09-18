import {
  AppRegistry,
  StyleSheet,
  Dimensions,
} from 'react-native';

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
      ...StyleSheet.absoluteFillObject
  },
  slider: {
      margin: 0,
      marginTop: 25,
      flexGrow: 0,
      height: Dimensions.get('window').height * 0.3,
  },
  imageContainer: {
      margin: 8,
      justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
      
      height: Dimensions.get('window').height * 0.21,
      width: Dimensions.get('window').width * 0.20
  },
  infos: {
      borderTopWidth: 1,
          borderColor: '#ddd',
  },
  social: {
      flexDirection: 'row'
  },
  slideItem: {
      marginTop: 10,
      padding: 0,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 1,
    backgroundColor: "white",
    height: Dimensions.get('window').height * 0.27,
    width: Dimensions.get('window').width *0.9
}
});
