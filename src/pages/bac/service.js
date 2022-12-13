import axios from "axios";
import backUrl from '../../components/config/config'

export const ServiceBac = {
    getAllBac: () => {
        return axios.get(backUrl + `/api/bac`);
    },
}

export default ServiceBac;