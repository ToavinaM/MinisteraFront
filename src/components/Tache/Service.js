// import http from "./http-common";
import axios from "axios";
// localhost: 8080 / api / auth / signin
const backUrl = 'http://localhost:8080';
export const TacheService = {

    save: (data) => {
        return axios.post(backUrl + `/api/tache/add`, data);

    },
    getAll: () => {
        return axios.get(backUrl + `/api/taches`);
    },

    getTacheByIdProjet: (id_Projet) => {
        return axios.get(backUrl + `/api/tache/ByIdProjet/${id_Projet}`)
    },

    update: (data) => {
        return axios.put(backUrl + `/api/tache/updateStatut`, data)
    }

}
export default TacheService;