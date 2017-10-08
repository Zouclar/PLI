import React, { Component } from 'react';

import {
  AppRegistry,
  Animated,
  Dimensions,
  Image,
  TouchableOpacity,
  View
} from 'react-native';

import {  Text, Icon } from 'native-base';

import AppConfig from '../../../config.js'

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
    }
    
    uptadeProps(props) {
        this.apiDatas = props;
        this.forceUpdate();
    }

    render() {
        console.log('rendering carousel ', this.apiDatas, this.parent)
        
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

    static openDetailPage(index) {
        console.log("details")
        //this.parent.openDetailPage(index);
    }
    
     _renderItem ({item, index}) {
        console.log("rendering item, parent is ");
        console.log(this);
    console.log(AppConfig.get("AssetsBaseUrl") + item.picture.replace("/var/www/html", ""))
        return (
            <View onPress={() => { console.log(`You've clicked `); }} style={styles.slideItem}>
                <View style={styles.rowContainer}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image}
                            source={{uri: AppConfig.get("AssetsBaseUrl") + item.picture.replace("/var/www/html", "")}}
                        ></Image>
                    </View>
                    <View style={styles.infos}>
                        <Text style={styles.infosTitle}>{ item.title.toUpperCase() }</Text>
                        <Text numberOfLines={5} style={styles.infosDescription}>{ item.description }</Text>
                        <View >
                        <View style={styles.rowContainer}>
                            <TouchableOpacity style={styles.socialButtons}>
                              <Icon style={styles.socialIcons} active name="thumbs-up" />
                              <Text style={styles.socialTexts}>12</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialButtons}>
                              <Icon style={styles.socialIcons} active name="chatbubbles" />
                              <Text style={styles.socialTexts}>4 </Text>
                            </TouchableOpacity>  
                            <TouchableOpacity onPress={
                                PostsList.openDetailPage(index)
                            } style={styles.socialButtons}>
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