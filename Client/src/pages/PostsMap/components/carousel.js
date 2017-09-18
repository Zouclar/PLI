import React, { Component } from 'react';

import {
  AppRegistry,
  Animated,
  Dimensions,
  Image,
    Button,
  View,
  Text
} from 'react-native';

import Carousel from 'react-native-snap-carousel';
import styles from '../styles/map.js';


class PostsList extends Component {
    constructor(props){
        super(props);
      this.sliderWidth = Dimensions.get('window').width;
      this.sliderHeight = Dimensions.get('window').height * 0.3;
      this.itemWidth = this.sliderWidth *0.9;
        console.log("cccc")
        console.log(this.props);
    this.apiDatas = props.apiDatas;
        this.parent = props.parent;
        this.image = "http://25.media.tumblr.com/59fda1f501985e8b363a0dba4c9f8cb2/tumblr_mq5zud0pEq1qfz84qo1_500.jpg";
    }
    
    uptadeProps(props) {
        this.apiDatas = props;
        this.forceUpdate();
    }
    
    render() {
        console.log('rendering carousel ', this.apiDatas, this.callback)
        
        return (
             <Carousel
              ref={(c) => { this._carousel = c; }}
              data={this.apiDatas}
              renderItem={this._renderItem}
              sliderWidth={this.sliderWidth}
              sliderHeight={this.sliderHeight}
              itemWidth={this.itemWidth}
              showsHorizontalScrollIndicator={true}
              containerCustomStyle={styles.slider}
              contentContainerCustomStyle={styles.sliderContentContainer}
              onSnapToItem={(index) => {
                            this.parent.animateToPostLocation(index);
                           }}  
            />
        );
    }
    
     _renderItem ({item, index}) {
        return (
            <View onPress={() => { alert(`You've clicked `); }} style={styles.slideItem}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image}
                        source={{uri: item.image}}
                    ></Image>
                </View>
                <View style={styles.infos}>
                    <Text>Titre : { item.title }</Text>
                    <View style={styles.social}>
                            
                    </View>
                </View>
            </View>
        );
    }
}

AppRegistry.registerComponent('PostsList', () => PostsList);
module.exports = PostsList;