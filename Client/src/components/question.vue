<template>
  <div class="center">
    <button @click="displayQuestions">display</button>
    <button @click="edit">Edit</button>
    <button @click="save">Save</button>
    <div v-for="(value, index) in arryOfQuestions" :key="index" v-show="show">
      <p>
        {{ index + 1 }}-
        <span class="question" :contenteditable="Editable">
          {{ value.question }}
        </span>
      </p>
      <p v-for="(value, name) in arryOfQuestions[index].choices" :key="name">
        {{ name }}-

        <span class="choice" :contenteditable="Editable"> {{ value }}</span>
      </p>
      <h4>
        Answer-
        <span :contenteditable="Editable" class="answer"
          >{{ arryOfQuestions[index].answer }}
        </span>
      </h4>
    </div>
  </div>
</template>

<script>
import Question from "../services/Questionlist";
import EditQuestions from "../services/EditQuestions";
export default {
  data() {
    return {
      show: false,
      arryOfQuestions: [],
      Editable: false,
    };
  },

  methods: {
    async save() {
      var allqoestions = document.querySelectorAll(".question");
      var allchioces = document.querySelectorAll(".choice");
      var questionLength = this.arryOfQuestions.length;

      for (var i = 0, j = 0; i < questionLength; i++) {
        this.arryOfQuestions[i].question = allqoestions[i].textContent;
        var ch = this.arryOfQuestions[i].choices;
        for (var x in ch) {
          ch[x] = allchioces[j].textContent;
          console.log(ch[x]);
          j++;
        }
      }

      await EditQuestions.edit(this.arryOfQuestions);
    },
    edit() {
      this.Editable = true;
    },
    async displayQuestions() {
      const result = await Question.question();
      this.arryOfQuestions = [];
      for (let obj in result.data) {
        let qs = result.data[obj];
        this.arryOfQuestions.push(qs);
      }
      this.show = true;
    },
  },
};
</script>

<style scoped>
.center {
  margin-left: 30%;
}
span {
  margin-bottom: 3px;
}
.question {
  font-size: 25px;
}
.choice {
  font-size: 20px;
}
</style>