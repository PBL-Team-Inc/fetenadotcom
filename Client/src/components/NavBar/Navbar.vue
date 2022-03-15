<template>
  <nav>
    <router-link id="logo" to="/Home"><logo /></router-link>
    <div class="">
      <router-link class="sign" to="/signup">Sign Up</router-link>
      <router-link class="sign" to="/signin">Sign In</router-link>
      <router-link class="sign" to="/create"> Create Exam </router-link>
      <router-link class="sign" to="/DashBoard"> DashBoard </router-link>
    </div>
  </nav>
  <router-view />
</template>

<script>
import logo from "../logo.vue";
import createQuestion from "../Createquestions.vue";
export default {
  components: {
    logo,
    createQuestion,
  },
  methods() {
    localize();
    {
      localStorage.setItem("HKJ", "KJK");
    }
  },
};
</script>

<style>
nav {
  display: flex;
  justify-content: space-between;
  margin-bottom: 80px;
  align-items: center;
  padding: 10px;
}

nav .sign {
  text-decoration: none;
  color: #fff;
  margin-left: 3vh;
  border: 1px solid #f6921e;
  padding: 0.5rem 2rem;
  border-radius: 16px;

  width: 8vh;
}

nav a.router-link-exact-active {
  color: #f6921e;
}
</style>
