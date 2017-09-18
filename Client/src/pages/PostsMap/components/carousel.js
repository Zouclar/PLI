import React, { Component } from 'react';

import {
  AppRegistry,
  Animated,
  Dimensions,
  Image,
    TouchableOpacity,
   // Button,
  View,
  //Text
} from 'react-native';

import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

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
            <View onPress={() => { console.log(`You've clicked `); }} style={styles.slideItem}>
                <View style={styles.rowContainer}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image}
                            source={{uri: item.image}}
                        ></Image>
                    </View>
                    <View style={styles.infos}>
                        <Text style={styles.infosTitle}>{ item.title.toUpperCase() }</Text>
                        <Text numberOfLines={5} style={styles.infosDescription}>{ item.description }</Text>
                        <View style={styles.test}>
                        <View style={styles.rowContainer}>
                            <TouchableOpacity style={styles.socialButtons}>
                              <Icon style={styles.socialIcons} active name="thumbs-up" />
                              <Text style={styles.socialTexts}>12</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialButtons}>
                              <Icon style={styles.socialIcons} active name="chatbubbles" />
                              <Text style={styles.socialTexts}>4 </Text>
                            </TouchableOpacity>  
                            <TouchableOpacity style={styles.socialButtons}>
                              <Text style={styles.socialTexts}>Détails </Text>
                              <Icon style={styles.socialIcons} active name="md-arrow-dropright" />
                            </TouchableOpacity> 
                        </View>
                    </View>
                    </View>
                </View>
                
                    
            </View>
        );
    }
}

AppRegistry.registerComponent('PostsList', () => PostsList);
module.exports = PostsList;