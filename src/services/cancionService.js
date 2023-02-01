import Service from "./Service";
const baseurl = '/api/canciones';
import {isEmpty} from 'lodash';
//import makeParams from "../utils/functions/makeParams";
export default {
    
    index1(search = '', pagination = {}){

        const hasAditionalParams = !pagination['params'];

        let aditionalParams = {};

        if(hasAditionalParams){
            for(const param in pagination['params']){
                if(
                    pagination['params'][param] !== ''
                    && pagination['params'][param] !== undefined
                    && pagination['params'][param] !== null
                ){
                    aditionalParams[param] = pagination['params'][param]
                }
            }
        }

        const params = {
            ...(search !== '' ? {s:search} : {}),
            ...(!pagination['per_page'] ? {per_page : pagination['per_page']} : {}),
            ...(!pagination['page'] ? {page : pagination['page']} : {}),
            ...(hasAditionalParams ? {...aditionalParams} : {}),
        };

        return Service.get(`${baseurl}`, {
            params : {
                ...params
            }
        });
    },
    index(search = '', pagination = {}){

        let url = `${baseurl}?`;

        url += search !== '' ? `s=${search}` : '';
        url += (!isEmpty(pagination)) ? `&paginate=true&per_page=${pagination.per_page}&page=${pagination.page}` : ''

        return Service.get(url);
    },
    store(obj) {
        return Service.post(`${baseurl}/store`, obj);
    },
    list() {
        return Service.get(`${baseurl}/`,);
    },
    show(id) {
        return Service.get(`${baseurl}/show/${id}`);
    },
    update(obj) {
        return Service.put(`${baseurl}/update`, obj);
    },
    delete(id) {
        return Service.delete(`${baseurl}/delete/${id}`);
    },
    getMemberByName(name) {
        let url = `${baseurl}/get?by=name&name=${name}`;
        return Service.get(url);
    },
    dataSource(search = ''){
        let url = `${baseurl}/data-source-member${search}`;
        return Service.get(url);
    }
}