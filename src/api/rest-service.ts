import {AxiosInstance} from "axios";

export class RestService {
    public readonly axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }
}