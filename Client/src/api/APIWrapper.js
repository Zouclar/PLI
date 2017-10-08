import AppConfig from '../config.js'

export default class APIWrapper {

    static get(route, success, error) {
        console.log(`getting ${AppConfig.get("APIBaseUrl")}${route}`);
        return fetch(`${AppConfig.get("APIBaseUrl")}${route}`)
            .then((response) => response.json())
            .then((responseJson) => {
                success(responseJson);
            })
            .catch((theError) => {
                error(theError);
            });
    }

    static post(route, datas, success, error) {
        console.log(`${AppConfig.get("APIBaseUrl")}${route}`)
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

}