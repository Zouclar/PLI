import React, { AsyncStorage } from 'react-native';

export default class AppConfig {
    static config = [];

    static readStoredToken() {
        AsyncStorage.getItem("Token").then((token) => {
            if (token) {
                console.log("TOKEN FOUND")
                this.put("Token", token);
            }

        })
    }

    static put(key, value) {
        this.config[key] = value;
    }

    static get(key) {
        return this.config[key];
    }

}