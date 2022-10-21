// import http from "./http-common";
import axios from "axios";
// localhost: 8080 / api / auth / signin
const backUrl = 'http://localhost:8080';
export const ProjetService = {
    getDept: () => {
        return axios.get(backUrl + `/api/departement`);
    },
    getRole: () => {
        return axios.get(backUrl + `/api/roles`);
    }
}

export default ProjetService;