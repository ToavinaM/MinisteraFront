// import http from "./http-common";
import axios from "axios";
// localhost: 8080 / api / auth / signin
const backUrl = 'http://localhost:8080';
export const AuthService = {
    
    signin: (data) => {
        return axios.post(backUrl + `/api/auth/signin`, data);
    },
    signup: (data) => {
        // console.log(backUrl + `/api/auth/signin`);
        return axios.post(backUrl + `/api/auth/signup`, data);
    },
    logout: () => {
        // return axios.get(`planning/all-detail-planning`)
    },
    getAll:()=>{
        return axios.get(`/getAllUser`);
    }

}
export default AuthService;