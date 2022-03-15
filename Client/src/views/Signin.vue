<template>
  <form action="/signin/admin" method="GET">
    <input v-model="email" type="email" placeholder="Enter Email" required />

    <input
      v-model="pass"
      type="password"
      placeholder="Enter Password"
      required
    />
    <Button @click.prevent="sign" type="submit" title="register"></Button>
  </form>
</template>

<script>
import sign from "../services/signinadmin";
import Button from "../components/Button.vue";
export default {
  components: { Button },
  data() {
    return {
      email: "",
      pass: "",
    };
  },

  methods: {
    async sign() {
      try {
        const response = await sign.signin({
          email: this.email,
          pass: this.pass,
        });
        // const data = await response.json();
        console.log(parseInt(response.data));
        localStorage.setItem("AdminID", parseInt(response.data));
        // location.href = "../../public/index.html";
      } catch (err) {
        console.log("there is an error");
        if (err) {
          console.log(err.message);
        }
      }
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
</style>
