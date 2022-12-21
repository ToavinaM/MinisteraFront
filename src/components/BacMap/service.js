import axios from "axios";
import backUrl from '../config/config.js'

export const ServiceBac = {
    getAllBac: (data) => {
        console.log('hahahha', data);
        return axios.post(backUrl + `/api/bac`, data);
    },
}

export default ServiceBac;