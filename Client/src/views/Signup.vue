<template>
  <div class="form">
    <form action="/api/admin" method="POST">
      <input v-model="fname" type="text" placeholder="Enter First Name" />
      <input v-model="lname" type="text" placeholder="Enter Last Name" />
      <input v-model="email" type="email" placeholder="Enter Email" />
      <input v-model="age" type="date" placeholder="Enter Birth Date" />
      <input v-model="pass" type="password" placeholder="Enter Password" />
      <input v-model="phno" type="phone" placeholder="Enter Phone Number" />
      <div class="custom-select">
        <select v-model="sex" name="sex" id="sex">
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>
      </div>

      <input
        name="dept"
        v-model="dept"
        type="text"
        placeholder="Enter Department"
      />
      <input
        name="inst"
        v-model="inst"
        type="text"
        placeholder="Enter Institution"
      />
      <Button title="register" @click.prevent="register" type="submit"></Button>
    </form>
  </div>
</template>

<script>
import Button from "../components/Button.vue";
import Auth from "../services/Authentication";
// import PostServices from "../Services/Eventservices";
export default {
  components: { Button },
  data() {
    return {
      fname: "",
      lname: "",
      email: "",
      age: "",
      pass: "",
      phno: "",
      sex: "",
      dept: "",
      inst: "",
    };
  },
  methods: {
    async register() {
      await Auth.register({
        fname: this.fname,
        lname: this.lname,
        email: this.email,
        age: this.age,
        pass: this.pass,
        phno: this.phno,
        sex: this.sex,
        dept: this.dept,
        inst: this.inst,
      });
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
input {
  width: 50%;
  padding: 1rem 1.2rem;
  height: 0.5rem;
  border: none;
}
select {
  display: inline-block;
  box-sizing: border-box;
  padding: 0.5em 2em 0.5em 0.5em;
  border: 1px solid #eee;
  font: inherit;
  line-height: inherit;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  background-repeat: no-repeat;
  background-image: linear-gradient(45deg, transparent 50%, currentColor 50%),
    linear-gradient(135deg, currentColor 50%, transparent 50%);
  background-position: right 15px top 1em, right 10px top 1em;
  background-size: 5px 5px, 5px 5px;
}
</style>
