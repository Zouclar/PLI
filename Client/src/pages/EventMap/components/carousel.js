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
import styles from '../styles/eventmap.js';


class EventsList extends Component {
    constructor(props){
        super(props);
        this.sliderWidth = Dimensions.get('window').width;
        this.sliderHeight = Dimensions.get('window').height * 0.3;
        this.itemWidth = this.sliderWidth *0.9;
        console.log("cccc")
        console.log(this.props);
        this.apiDatas = props.apiDatas;
        this.parent = props.parent;

        this.openDetailPage = this.openDetailPage.bind(this);
        this._renderItem = this._renderItem.bind(this);
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
                sliderHeight={this.itemHeight}
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
        console.log("rALLAH AKBAR !!! ");
        console.log(this);
        console.log( AppConfig.get("AssetsBaseUrl") + "/" + item.picture.replace("/var/www/html/", ""))
        return (
            <View onPress={() => { console.log(`You've clicked `); }} style={styles.slideItem}>
                <View style={styles.rowContainer}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image}
                               source={{uri: AppConfig.get("AssetsBaseUrl") + "/" + item.picture.replace("/var/www/html/", "")}}
                        ></Image>
                    </View>
                    <View style={styles.infos}>
                        <Text style={styles.infosTitle}>{ item.title.toUpperCase() }</Text>
                        <Text numberOfLines={5} style={styles.infosDescription}>{ item.description }</Text>
                        <View >
                            <View style={styles.rowContainer}>
                                <Text style={styles.socialTexts}>{ this.formatDate(item.date_pub)} </Text>
                                <Text style={styles.socialTexts}>FROM ET TO </Text>
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

AppRegistry.registerComponent('page.EventsList', () => EventsList);
module.exports = EventsList;