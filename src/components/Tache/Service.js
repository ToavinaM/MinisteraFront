// import http from "./http-common";
import axios from "axios";
// localhost: 8080 / api / auth / signin
import backUrl from '../config/config';
export const TacheService = {
    getTacheByIdProjet: (id_Projet) => {
        return axios.get(backUrl + `/api/tache/ByIdProjet/${id_Projet}`)
    },
    updateRetard: (tacheRetard) => {
        return axios.put(backUrl + `/api/tache/updateRetard`, tacheRetard);
    },
    save: (data) => {
        return axios.post(backUrl + `/api/tache/add`, data);
    },
    update: (data) => {
        return axios.put(backUrl + `/api/tache/update`, data)
    },
    getAll: () => {
        return axios.get(backUrl + `/api/taches`);
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
        return axios.post(backUrl + `/api/sousTache/save`, data);
    },
    setCheck: (data) => {
        return axios.put(backUrl + `/api/sousTache/update`, data);
    },
    getAvancement: (data) => {
        return axios.get(backUrl + `/api/sousTache/avancement/${data}`);
    },

    endAllChecklist: (data) => {
        return axios.put(backUrl + `/api/sousTache/endAllChecklist/${data}`);
    },
    ////////////////////////probleme
    saveProbleme: (data) => {
        return axios.post(backUrl + `/api/problemeTache/save`, data);
    },
    getProbleme: (data) => {
        return axios.get(backUrl + `/api/problemeTache/${data}`);
    },

    getOptionProbleme: () => {
        return axios.get(backUrl + `/api/problemeOption`);
    },
}
export default TacheService;