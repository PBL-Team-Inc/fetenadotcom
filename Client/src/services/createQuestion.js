import Api from "@/services/Api";
let admin = "";
export default {
  create(questions) {
    return Api().post("createquestion", questions);
  },
};
