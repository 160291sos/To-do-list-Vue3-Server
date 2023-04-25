<template>
  <input v-if="taskName" 
    :value="taskName" 
    @input="updateInput"
    class="editInput"
    placeholder="Write your task.." 
    type="text">

    <input v-else :value="modelValue" 
    @input="updateInput"
    placeholder="Write your task.." 
    type="text">
    

</template>

<script>
export default {
  name: 'my-input',
  props: {
    modelValue: [String, Number],
    taskName: {
      type: String
    }
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>
input{
    border: none;
}
.editInput{
  color: green;
}

</style>