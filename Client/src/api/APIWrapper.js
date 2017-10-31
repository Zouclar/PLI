import AppConfig from '../config.js'
const base64 = require('base-64');

export default class APIWrapper {

    static get(route, success, error) {
        console.log(`GET :  ${AppConfig.get("APIBaseUrl")}${route}`);
        let options = {
            method: 'get',
        };

        if (AppConfig.get("Token")){
            console.log("TOKEN IS SET")
            options.headers = {
                Authorization: `Bearer ${AppConfig.get("Token")}`
            }
        }


        return fetch(`${AppConfig.get("APIBaseUrl")}${route}`, options)
            .then((response) => response.json())
            .then((responseJson) => {
                success(responseJson);
            })
            .catch((theError) => {
                error(theError);
            });
    }

    static postMultiPart(route, datas, success, error) {
        console.log(`POST MP : ${AppConfig.get("APIBaseUrl")}${route}`)
        fetch(`${AppConfig.get("APIBaseUrl")}${route}`,{
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: datas
        }).then(response => {
            success(response)
        }).catch(err => {
            error(err);
        });
    }

    static login(username, password, success, error) {
        console.log(`LOGIN : ${AppConfig.get("APIBaseUrl")}/users/login`)
        let options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'authorization': "Basic " + base64.encode(`${username}:${password}`)
            },
        };

        if (AppConfig.get("Token"))
            options.headers.Authorization = `Bearer ${AppConfig.get("Token")}`;

        fetch(`${AppConfig.get("APIBaseUrl")}/users/login`, options).then(response => {
            success(response)
        }).catch(err => {
            error(err);
        });
    }

    static post(route, datas, success, error) {
        console.log(`POST : ${AppConfig.get("APIBaseUrl")}${route}`)
        let options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datas)
        };

        if (AppConfig.get("Token"))
            options.headers.Authorization = `Bearer ${AppConfig.get("Token")}`;

        fetch(`${AppConfig.get("APIBaseUrl")}${route}`, options).then(response => {
            success(response)
        }).catch(err => {
            error(err);
        });
    }

    static put(route, datas, success, error) {
        console.log(`PUT : ${AppConfig.get("APIBaseUrl")}${route}`)
        fetch(`${AppConfig.get("APIBaseUrl")}${route}`,{
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datas)
        }).then(response => {
            success(response)
        }).catch(err => {
            error(err);
        });
    }

}