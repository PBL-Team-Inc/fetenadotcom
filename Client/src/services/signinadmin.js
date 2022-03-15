import Api from "@/services/Api";

export default {
  signin(credentials) {
    return Api().post("/signin/admin", credentials);
  },
};
