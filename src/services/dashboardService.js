import Service from "./Service";
const baseurl = '/api/dashboard'

export default ({

    index() {
        return Service.get(`${baseurl}`);
    } 
});