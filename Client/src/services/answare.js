import Api from '@/services/Api'

export default {
    answare(credentials) {

        return Api().post('register', credentials);
    }

}
