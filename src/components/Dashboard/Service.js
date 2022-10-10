// import http from "./http-common";
import axios from "axios";
// localhost: 8080 / api / auth / signin
const backUrl = 'http://localhost:8080';
export const ProjetService = {

    getProbleme: () => {
        return axios.get(backUrl + `/api/dash/probleme`);
    },

    // getAll: () => {
    //     return axios.get(backUrl + `/api/projet/projets`);
    // }

}
export default ProjetService;