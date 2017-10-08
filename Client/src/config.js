export default class AppConfig {
    static config = [];

    static put(key, value) {
        this.config[key] = value;
    }

    static get(key) {
        return this.config[key];
    }

}