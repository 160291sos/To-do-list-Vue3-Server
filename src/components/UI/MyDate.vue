<template>
    <input v-if="taskDate"  
        type='date'
        
        min="2023-04-01"
        :value="modelValue"
        @input="updateInput">
     <input v-else type="date"  
        min="2023-04-01"
        :value="modelValue"
        @input="updateInput">
</template>

<script>
export default {
  name: 'my-date',
  props: {
    modelValue: [String, Number],
    taskDate: [String, Number]
  }, 
  methods: {
    updateInput(event) {
        
      this.$emit('update:modelValue', event.target.value)
    }
  }

}


</script>

<style scoped>
input[type="date"]{
    margin-left: -10px;
}

::-webkit-calendar-picker-indicator{
    cursor: pointer;
    padding: 0px;
}
</style>