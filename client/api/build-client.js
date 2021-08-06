import axios from "axios";

const buildClient = ({ req }) => {
    if (typeof window === 'undefined') {

        //base url should be
        //http://servicename.namespace.svc.cluster.local

        return axios.create({
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers
        })

    }
    else {

        return axios.create({
            baseURL: '/'
        });

    }
}

export default buildClient;