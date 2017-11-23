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
import APIWrapper from '../../../api/APIWrapper.js';


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

        this.map = props.map;

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
                showsHorizontalScrollIndicator={false}
                containerCustomStyle={styles.slider}
                onSnapToItem={(index) => {
                    this.animateToPostLocation(index);
                }}
            />
        );
    }

    joinEvent(index) {
        console.log("Joining EVENTS")
        APIWrapper.post("/events/join/" + this.apiDatas[index].id, {},
            (responseJson) => {
                if (responseJson.error)
                    this.parent.openErrorNotification("Erreur", "Vous participez déjà");
                else
                    this.parent.openSuccessNotification("Succès", "Participation enregistrée");

            },
            (error) => {
                console.log("ERROR", error);
                this.openErrorNotification("Erreur", "Une erreur réseau est survenue :(" + error);
            }
        );
    }

    animateToPostLocation(index) {
        this.parent.selectedEventIndex = index;
        console.log("HFURJNINZINDEZ")
        console.log(this.map)
        this.map.animateToRegion ( {
            longitude: this.apiDatas[index].coordinates.x,
            latitude: this.apiDatas[index].coordinates.y,
        });
    }

    formatFromDate(date) {
        console.log(date)
        console.log(moment(date, "YYYY-MM-DDTHH:mm:ssZ").fromNow())
        moment.locale('fr');
        return moment(date, "YYYY-MM-DDTHH:mm:ssZ").fromNow()
    }

    formatDate(date) {
        console.log(date)
        console.log(moment(date, "YYYY-MM-DDTHH:mm:ssZ").fromNow())
        moment.locale('fr');
        return moment(date, "YYYY-MM-DDTHH:mm:ssZ").format('llll')
    }

    openDetailPage(index) {
        console.log("details")
        console.log(this.props)
        this.props.parent.openDetailPage(index)
    }

    _renderItem ({item, index}) {
        let hasStarted = moment(item.dateStart , "YYYY-MM-DDTHH:mm:ssZ").isBefore(moment());
        let isOver = moment(item.dateEnd , "YYYY-MM-DDTHH:mm:ssZ").isBefore(moment());
        console.log("DATES TESTS ", hasStarted, isOver)
        console.log("now ", moment())
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
                            <View  >
                                <Text style={styles.socialTexts}>{ this.formatFromDate(item.date_pub)} </Text>
                                <View style={styles.rowContainer}>
                                    <Text style={styles.socialTexts}>du  </Text>
                                    <Text style={styles.description}>{ this.formatDate(item.dateStart)} </Text>
                                </View>
                                <View style={styles.rowContainer}>
                                    <Text style={styles.socialTexts}>au  </Text>
                                    <Text style={styles.description}>{ this.formatDate(item.dateEnd)} </Text>
                                </View>
                                { !hasStarted && !isOver && <Text>Evenement à venir</Text> }
                                { hasStarted && !isOver && <Text>Evenement commencé</Text> }
                                { isOver && <Text>Evenement terminé</Text> }
                            </View >

                            <View style={styles.rowContainer}>
                                <Button style={{marginRight: 10}} onPress={()=>{this.openDetailPage(index)}} rounded small success>
                                    <Text>Details</Text>
                                </Button>

                                <Button  onPress={()=>{this.joinEvent(index)}} rounded small info>
                                    <Text>Participer</Text>
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