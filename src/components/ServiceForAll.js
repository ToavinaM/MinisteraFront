import axios from "axios";
import backUrl from './config/config'

export const ServiceForAll = {
    getDept: () => {
        return axios.get(backUrl + `/api/departement`);
    },
    getRole: () => {
        return axios.get(backUrl + `/api/roles`);
    }
}

export default ServiceForAll;