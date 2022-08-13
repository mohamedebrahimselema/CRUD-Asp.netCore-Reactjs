import axios from "axios";

const baseUrl = "http://localhost:5000/api/"

const proxy = require('http-proxy-middleware');
const headers = {
             'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            
            withCredentials: true,
            mode: 'no-cors',
};

export default {

    Customer(url = baseUrl + 'Customer/') {
        return {
            fetchAll: () => axios.get(url,  {headers}),
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id)
        }
    }
}