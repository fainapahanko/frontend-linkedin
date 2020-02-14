import {ajax} from "rxjs/ajax";

class Api {

    //static BASE_URL = "https://linkedin-api-be.herokuapp.com";
    static BASE_URL = "http://localhost:3433";

    static get USER() {
        return localStorage.getItem("username");
    }

    static get PASSWORD() {
        return localStorage.getItem("password");
    }

    static get AUTH() {
        const user = Api.USER;
        const pass = Api.PASSWORD;
        const b = btoa(user + ':' + pass);
        return b
    }

    static get BASE_HEADERS() {
        return {
            Authorization: 'Basic ' + Api.AUTH
        };
    }

    static async ajax(endpoint, method = 'GET', body, contentType = 'application/json') {
        const headers = {...Api.BASE_HEADERS};
        if (contentType) headers["Content-type"] = contentType;
        const res = await ajax({
            url: Api.BASE_URL + endpoint,
            method,
            headers,
            body,
        }).toPromise();
        return JSON.parse(res);
    }

    static async fetch(endpoint, method = 'GET', body, contentType = 'application/json') {
        const headers = {...Api.BASE_HEADERS};
        if (contentType) headers["Content-type"] = contentType;
        try {
            let resp = await fetch(Api.BASE_URL + endpoint, {
                headers: headers,
                method,
                body
            });
            return await resp.json();
        } catch (e) {
            console.error(e);
            return null;
        }

    }

    static async checkAuth(endpoint, method = 'GET', body, contentType = 'application/json') {
        console.log(endpoint);
        if (contentType) Api.BASE_HEADERS["Content-type"] = contentType;
        try {
            let resp = await fetch(Api.BASE_URL + endpoint, {
                headers: Api.BASE_HEADERS,
                method,
                body
            });
            return resp;
        } catch (e) {
            console.error(e);
            return null;
        }

    }

    static request(endpoint, method = 'GET', body) {
        return new Promise((resolve, reject) => {
            var request = new XMLHttpRequest();
            request.open(method, Api.BASE_URL + endpoint, true);
            request.setRequestHeader("Authorization", "basic " + Api.AUTH);
            request.onload = (res) => resolve(JSON.parse(request.response));
            request.onerror = (error) => reject(error);
            request.send(body);
        });
    }
}

export default Api;