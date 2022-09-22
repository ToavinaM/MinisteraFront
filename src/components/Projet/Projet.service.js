// import http from "./http-common";
import axios from "axios";
// localhost: 8080 / api / auth / signin
const backUrl = 'http://localhost:8080';
export const ProjetService = {
    
    save: (data) => {
        return axios.post(backUrl + `/api/projet/AjoutProjet`, data);
    },

    getAll: () => {
        return axios.get(backUrl +`/api/projet/projets`);
    }
    
}
export default ProjetService;