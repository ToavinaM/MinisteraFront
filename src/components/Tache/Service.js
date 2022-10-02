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
        return axios.put(backUrl + `/api/tache/update`, data)
    },
    delete: (data) => {
        console.log('==', data);
        return axios.post(backUrl + `/api/tache/delete`, data)
    },
    ///================Commentaire
    saveCommentaire: (data) => {
        console.log('HAHAHA', data)
        return axios.post(backUrl + `/api/commentaire/save`, data)
    },

    getCommentaireBytache: (TacheId) => {
        console.log('hhhhhhhhhhhhhhhhhhhhhhhhhuhuhu', { TacheId });
        return axios.get(backUrl + `/api/commentaireByTache/${TacheId}`)
    },
    /////////////////sousTache
    getSousTacheByTache: (TacheId) => {
        return axios.get(backUrl + `/api/sousTacheByTache/${TacheId}`)
    },
    saveSousTache: (data) => {
        return axios.get(backUrl + `/api/sousTache/save`, data);
    }

}
export default TacheService;