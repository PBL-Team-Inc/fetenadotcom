<template>
  <form>
    <input type="text" placeholder="Enter Exam Key" />
    <button>Enter Exam</button>
  </form>
</template>

<script>
export default {};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
input {
  width: 50%;
  height: 2rem;
  border: none;
  padding: 0.7rem 1rem;
  border-radius: 40px;
  position: absolute;
}
button {
  width: 20%;
  height: 2.5rem;
  border: none;
  padding: 0.7rem 1rem;
  border-radius: 40px;
  position: relative;
  right: 0rem;
  left: 16rem;
  background-color: #f6921e;
  color: #fff;
  cursor: pointer;
}
</style>
