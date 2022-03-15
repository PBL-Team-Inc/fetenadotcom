<template>
  <div class="question-box">
    <div class="examinfo">
      <button class="generate" @click="rand">Generate key</button>
      <input v-model="examkey" id="examkey" type="text" disabled />
      <label for="examname">Exam Name </label>
      <input v-model="examname" id="examname" type="text" />

      <label for="weight">weight </label>
      <input v-model="weight" id="weight" type="number" />
    </div>

    <div class="create-question">
      <h1>
        Question <span class="qnum"> {{ questionId }}</span>
      </h1>
      <textarea
        class="textarea"
        v-model="question"
        name=""
        id=""
        cols="30"
        rows="10"
      ></textarea>
    </div>

    <div class="create-option">
      <div v-show="show" class="numberofoption">
        <span class="numofOp"> Options Number</span>
        <input v-model="optionNumber" type="number" max="6" min="2" />
        <button @click="choiceCreater" class="btn-sami">Add choices</button>
      </div>
      <h2 v-show="!show">choices</h2>
      <p v-for="(option, index) in options" :key="index">
        <span>{{ option }}</span>
        <input v-model="optionsvalue[index]" class="answer-filed" type="text" />
      </p>
      <div v-show="!show" class="answer-cont">
        <span class="answer"> Answer</span>
        <select @change="selectAnswer($event)">
          <option value="">ans</option>
          <option
            v-for="(option, index) in options"
            :key="index"
            :value="option"
          >
            {{ option }}
          </option>
        </select>
        <button @click="add()" class="btn-sami">Add New</button>
        <button @click="submit()" class="btn-sami">Submit All</button
        ><button @click="cancel" to="/" class="btn-sami">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import CreateQuestion from "../services/createQuestion";
import rand from "../services/randkeygen";
export default {
  data() {
    return {
      examkey: "",
      examname: "",
      weight: "",

      questionId: 1,
      question: "",
      optionNumber: 2,
      options: [],
      optionsvalue: [],
      show: true,
      examList: [],
      answer: "",
    };
  },

  methods: {
    rand() {
      console.log(rand.rand());
      this.examkey = rand.rand();
    },
    choiceCreater() {
      this.options = [];
      var char = "A";
      for (let i = 0; i < this.optionNumber; i++) {
        this.optionsvalue.push("");
        this.options.push(String.fromCharCode(char.charCodeAt(0) + i));
      }
      this.show = false;
      // console.log(this.optionsvalue);
    },
    selectAnswer(e) {
      this.answer = e.target.value;
    },
    add() {
      var choices = {};
      console.log(this.options.length);
      console.log(this.optionsvalue.length);
      if (this.optionsvalue.length === 4) {
        var choices = Object.assign({ D: this.optionsvalue[3] }, choices);
        var choices = Object.assign({ C: this.optionsvalue[2] }, choices);
        var choices = Object.assign({ B: this.optionsvalue[1] }, choices);
        var choices = Object.assign({ A: this.optionsvalue[0] }, choices);
      }
      if (this.options.length == 2) {
        var choices = Object.assign({ B: this.optionsvalue[1] }, choices);
        var choices = Object.assign({ A: this.optionsvalue[0] }, choices);
      }
      if (this.options.length == 3) {
        var choices = Object.assign({ C: this.optionsvalue[2] }, choices);
        var choices = Object.assign({ B: this.optionsvalue[1] }, choices);
        var choices = Object.assign({ A: this.optionsvalue[0] }, choices);
      }
      if (this.options.length == 5) {
        var choices = Object.assign({ D: this.optionsvalue[4] }, choices);
        var choices = Object.assign({ E: this.optionsvalue[3] }, choices);
        var choices = Object.assign({ C: this.optionsvalue[2] }, choices);
        var choices = Object.assign({ B: this.optionsvalue[1] }, choices);
        var choices = Object.assign({ A: this.optionsvalue[0] }, choices);
      }
      if (this.options.length == 6) {
        var choices = Object.assign({ F: this.optionsvalue[5] }, choices);
        var choices = Object.assign({ E: this.optionsvalue[4] }, choices);
        var choices = Object.assign({ D: this.optionsvalue[3] }, choices);
        var choices = Object.assign({ C: this.optionsvalue[2] }, choices);
        var choices = Object.assign({ B: this.optionsvalue[1] }, choices);
        var choices = Object.assign({ A: this.optionsvalue[0] }, choices);
      }

      var newID = this.questionId;
      var newquestion = this.question;
      var newanswer = this.answer;
      var creatOneQuestion = function (Id, newchoices, newquestion, newanswer) {
        this.id = Id;
        this.question = newquestion;
        this.options = newchoices;
        this.answer = newanswer;
      };

      var x = new creatOneQuestion(newID, choices, newquestion, newanswer);
      this.question = "";
      this.options = [];
      this.optionsvalue = [];
      this.show = true;
      this.questionId++;
      this.examList.push(x);

      console.log(this.examList);

      if (localStorage.getItem("newexam") != null) {
        let temp = JSON.parse(localStorage.getItem("newexam"));
        temp.body.push(x);
        console.log(temp);

        localStorage.setItem("newexam", JSON.stringify(temp));
      } else {
        let arr = { detail: [], info: [] };
        localStorage.setItem("newexam", JSON.stringify(arr));
        add();
      }
    },

    async submit() {
      // var fullExam = {};
      // function detail(name, key, weight) {
      //   this.examname = name;
      //   this.examkey = key;
      //   this.weight = weight;
      // }

      // var detail = new detail(this.examname, this.examkey, this.weight);
      // var fullExam = Object.assign({ exam: this.examList }, fullExam);
      // var fullExam = Object.assign({ detail: detail }, fullExam);

      // console.log(fullExam);

      let err = [];

      // if (this.examname == "") {
      //   err.push("Exam name missing!\n");
      // }

      if (this.examkey == "") {
        err.push("Exam key Missing!\n");
      }

      if (this.weight == "") {
        err.push("Weight missing!\n");
      }

      if (err.length === 0) {
        let x = JSON.parse(localStorage.getItem("newexam"));

        x.detail.examkey = this.examkey;
        x.detail.examname = this.examname;
        x.detail.weight = this.weight;

        // console.log(x);
        localStorage.setItem("newexam", JSON.stringify(x));

        let y = JSON.parse(localStorage.getItem("newexam"));
        y.detail.examkey = "";
        y.detail.examname = "";
        y.detail.weight = 0;
        y.body = [];

        localStorage.setItem("newexam", JSON.stringify(y));
        let z = localStorage.getItem("AdminID");

        // x.__proto__.CreatedBy = z;
         console.log(x);
        await CreateQuestion.create(x); //send to the server
        // console.log(x);
      } else {
        console.log(err);
        console.log("Invalid");
        alert(err.join(""));
      }
    },
    cancel() {},
  },
};
</script>

<style scoped>
.examinfo {
  align-self: center;
}
.numofOp {
  font-size: 17px;
}
.textarea:focus {
  border: 0, 0, 0, 0;
}
.textarea {
  font-size: 18px;
  font-weight: 600;
  border: #f6921e solid 2px;
  outline: none;
}
.question-box {
  position: relative;
  left: 25%;
}
.generate {
  margin: 10px;
}
textarea {
  width: 500px;
  height: 30px;
  margin-bottom: 10px;
}
h1,
h2,
.answer {
  color: #f6921e;
}
.answer {
  margin-right: 20px;
  font-size: 20px;
}
.btn-sami {
  background-color: #f6921e;
  margin-left: 10px;
  border: solid #f6921e;
  color: white;
}
input[type="number"] {
  width: 40px;
}
input {
  outline: #f6921e;
}

#examkey {
  color: black;
  font-size: 19px;
  font-weight: 400;
}
.examinfo label {
  margin: 10px;
  font-size: 19px;
}
.examinfo input {
  padding: 9px;
  font-size: 19px;
  font-weight: 400;
}
.question-box {
  margin-top: 30px;
}
</style>
