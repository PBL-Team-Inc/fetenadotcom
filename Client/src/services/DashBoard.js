import Api from "@/services/Api";

export default {
  getexams() {
    return Api().get("/exams");
  },
  getstudents() {
    return Api().get("/students");
  },
  getactive_exams() {
    return Api().get("/active_exams");
  },
};
