<template>
  <table class="examtable" border="1">
    <tr class="examlistth">
      <td class="examName">Name</td>
      <td>Exam <i class="fa-solid fa-key"></i></td>
      <td>Questions</td>
      <td>weight</td>
      <td>Date</td>
      <td>status</td>
      <td>Edit</td>
      <td>Delete</td>
    </tr>
    <tr v-for="exam in slot" :key="exam" class="examlisttr">
      <td class="examName">{{ exam.ExamName }}</td>
      <td class="examKey">{{ exam.ExamKey }}</td>
      <td class="numberOfQuestion">{{ exam.Question.length }}</td>
      <td class="wight">{{ exam.Weight }}%</td>
      <td class="date">12/23/45</td>
      <td v-if="exam.Status"><span class="Active">Active</span></td>
      <td v-if="!exam.Status"><span class="inActive">pending</span></td>

      <td class="edit"><i class="fa-solid fa-pencil"></i></td>
      <td class="delete">
        <i class="fa-solid fa-trash-can"></i>
      </td>
    </tr>
    
  </table>

</template>

<script>
export default {
  props: {
    slot: Array,
  },
};



</script>
<style>

</style>