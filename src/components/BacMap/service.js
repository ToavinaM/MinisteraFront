import axios from "axios";
import backUrl from '../config/config.js'

export const ServiceBac = {
    getAllBac: () => {
        return axios.get(backUrl + `/api/bac`);
    },
}

export default ServiceBac;