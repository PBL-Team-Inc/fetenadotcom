<template>
  <div class="row container">
    <!-- Teacher Dashboard  sideBar -->
    <div class="col span-1-of-5 sidebar">
      <i class="fa-solid fa-user userprofile"></i>
      <div class="user-profile">
        <span> username:</span> <span>samuel noah</span>
      </div>
    
      <button @click="getactiveExam(1)" class="exams profileList">Active</button>
      <button @click="getactiveExam(0)" class="student profileList">
        Pending
      </button>
      <button @click="getactiveExam(nulls)" class="active profileList">closed</button>

      <p class="notification"><i class="fa-solid fa-bell"></i></p>
    </div>

    <!-- Teacher Dashboard  main -->
    <div class="col span-4-of-5 main">
      <!-- allExamContainer -->

      <div class="allExamContainer">
        <!-- Dynamic components -->
        <component :is="examtype" :slot="slot"></component>
      </div>
    </div>
  </div>
</template>

<script defer>
import activeExam from "./components/ActiveExam.vue";
import closedExam from "./components/ClosedExam.vue";
import pendingExam from "./components/PendingExam.vue";
import Button from "../components/Button.vue";
import dash from "../services/DashBoard";

// document.getElementById("exam").addEventListener("click", getex);
// import questionDetail from "../components/question.vue";
export default {
  components: {
    Button,
    activeExam: activeExam,
    closedExam: closedExam,
    pendingExam: pendingExam,
    // questionDetail,
  },

  data() {
    return {
      examtype: "pendingExam",
      profileList: ["Exam", "Student", "Active Exams"],
      slot: [],
      show: false,
      status: 1,
      colors: "red",
      active: false,
      nulls:null
    };
  },
  methods: {

 
    async getactiveExam(st) {
          
      const ex = await dash.getexams();
      this.slot = [];
      var j = 0;
      for (let i in ex.data) {
        console.log(ex.data);

        if (ex.data[i].Status === st) {
          this.slot.push(ex.data[i]);
          console.log(this.slot[j]);
          this.slot[j].Answer = JSON.parse(this.slot[j].Answer);
          this.slot[j].Question = JSON.parse(this.slot[j].Question);
          this.slot[j].Option = JSON.parse(this.slot[j].Option);
          j++;
        }
      }
      if(st==1){
          this.examtype = "activeExam";
      }
      else if(st==0){
         this.examtype = "pendingExam";
      }
      else{
        this.examtype="closedExam"
      }
    
      this.show = true;
    },
 
   
  },
};
</script>

<style>
.examtable {
  margin-top:30px;
  width: 100%;
  border-collapse: collapse;
}
.examlistth {
  text-align: left;
  color: #f6921e;
}

td,
table {
  border: 0px;

}

tr {
  font-size: 22px;
  line-height: 60px;
  border-bottom: 2pt solid rgba(114, 111, 111, 0.541);
}
.examdetail {
  display: flex;
  justify-content: space-evenly;
}
.examdetail {
  border: #f6921e solid 3px;
  border-radius: 13px;
  margin: 20px;
}
.Active {
  color: rgb(63, 199, 63);
}
.inActive {
  color: red;
}
.container {
  width: 100%;
}
.edit {
  color: rgb(74, 74, 75);
}
.sidebar {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2c2b2bd0;
  height: 90vh;

  color: white;
}
.main {
  height: 90vh;
  display: flex;
}
.allexams {
  width: 100%;
}
nav {
  margin-bottom: 0px;
}
.sidebar span {
  font-size: 22px;
  letter-spacing: 1px;
}
.userprofile {
  font-size: 50px;
  margin-bottom: 25px;
}
.profileList {
  width: 95%;
  margin: 10px;
  font-size: 22px;
  background-color: #f6921e;
  color: white;
  border: #f6921e solid 1px;
  height: 70px;
}
.notification {
  position: absolute;
  bottom: 40px;
  right: 40px;
  font-size: 40px;
  color: #f6921e;
}
.createNewExam {
  display: inline;
}
.examName {
  text-align: center;
}

.allExamContainer {
  margin: 0 30px 30px 30px;
  width: 100%;
  overflow: scroll;
  scrollbar-width: none;
  border-radius:30px;
  background-color:#fff;
box-shadow: 15px 15px 20px rgba(0, 0, 0, 0.582);
}
.delete {
  color: red;
}
</style>
