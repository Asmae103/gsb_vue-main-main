import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost/restGSB/'
//  baseURL: 'http://172.16.61.61/restGSB'
});
