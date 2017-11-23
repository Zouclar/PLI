import React, { Component } from 'react';

import {
  AppRegistry,
  Animated,
  Dimensions,
  Image,
  TouchableOpacity,
  View
} from 'react-native';

import {  Text, Icon, Button } from 'native-base';

import moment from 'moment';

import 'moment/locale/fr';

import { Navigation } from 'react-native-navigation';

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
        this.parent = props.parent;
        this.map = props.map;

        this.state = {
            apiDatas: props.apiDatas
        }

        this.openDetailPage = this.openDetailPage.bind(this);
        this._renderItem = this._renderItem.bind(this);
    }
    
    uptadeProps(apiDatas) {
        console.log("UPDATING POSTLIST APIDATAS ====")
        console.log(apiDatas)
        this.setState({apiDatas})
        console.log(this.state.apiDatas)
        console.log("=======")
    }

    render () {
        return (
            <Carousel
                ref={(c) => { this._carousel = c; }}
                data={this.state.apiDatas}
                renderItem={this._renderItem}
                sliderWidth={this.sliderWidth}
                itemWidth={this.itemWidth}
                sliderHeight={this.sliderHeight}
                containerCustomStyle={styles.slider}
                onSnapToItem={(index) => {
                    this.animateToPostLocation(index);
                }}
            />
        );
    }

    animateToPostLocation(index) {
        this.parent.selectedPostIndex = index;
        this.map.animateToRegion ( {
            longitude: this.state.apiDatas[index].coordinate.x,
            latitude: this.state.apiDatas[index].coordinate.y,
        });
    }

    formatDate(date) {
        console.log(date)
        console.log(moment(date, "YYYY-MM-DDTHH:mm:ssZ").fromNow())
        moment.locale('fr');
        return moment(date, "YYYY-MM-DDTHH:mm:ssZ").fromNow()
    }

    openDetailPage(index) {
        console.log("details")
        console.log(this.props)
        this.props.parent.openDetailPage(index)
        //this.parent.openDetailPage(index);
    }
    
     _renderItem ({item, index}) {
        return (
            <View onPress={() => { console.log(`You've clicked `); }} style={styles.slideItem}>
                <View style={styles.rowContainer}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image}
                            source={{uri: AppConfig.get("AssetsBaseUrl") + "/" + item.picture.replace("/var/www/html", "")}}
                        ></Image>
                    </View>
                    <View style={styles.infos}>
                        <Text style={styles.infosTitle}>{ item.title.toUpperCase() }</Text>
                        <Text numberOfLines={5} style={styles.infosDescription}>{ item.description }</Text>
                        <View >
                        <View style={styles.rowContainer}>
                            <TouchableOpacity style={styles.socialButtons}>
                              <Icon style={styles.socialIcons} active name="thumbs-up" />
                              <Text style={styles.socialTexts}>{item.likes.length} </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialButtons}>
                              <Icon style={styles.socialIcons} active name="chatbubbles" />
                              <Text style={styles.socialTexts}>{item.comments.length} </Text>
                            </TouchableOpacity>
                            <Text style={styles.socialTexts}>{ this.formatDate(item.date_pub)} </Text>
                        </View >

                            <View style={{justifyContent: 'space-between'}}>
                                <Button  onPress={()=>{this.openDetailPage(index)}} rounded small success>
                                    <Text>Details</Text>
                                </Button>
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