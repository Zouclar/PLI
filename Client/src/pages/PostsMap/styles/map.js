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
    ...StyleSheet.absoluteFillObject,
  },
  map: {
      ...StyleSheet.absoluteFillObject
  },
  slider: {
      margin: 0,
      marginTop: 25,
      flexGrow: 0,
      height: sliderHeight,
  },
  imageContainer: {
      margin: 3,

  },
  image: {
      
      height: sliderItemHeight * 0.953,
      width: sliderItemWidth * 0.3
  },
  infos: {
     padding: 3
  },
  infosDescription: {
      width: sliderItemWidth * 0.65
  },
  infosTitle: {
      width: sliderItemWidth * 0.65
  },
  socialButtons: {
      width: (sliderItemWidth * 0.7) / 3.2,
      flexDirection: 'row'
  },
  socialIcons: {
      fontSize: 15, color: '#157efc',
      
  },
  socialTexts: {
      fontSize: 12
  },
  rowContainer: {
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
    height: sliderItemHeight,
    width: sliderItemWidth
}
});
