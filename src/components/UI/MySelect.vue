<template>
    <select  @change="changeOption">
      <option disabled value="">Priority</option>
      <option
        v-for="prior in listOfPrioritys"
        :selected="prior == editPriority"
        :key="prior"
        :value="prior"
      >
        {{ prior }}
      </option>
    </select>
  </template>
  
  <script>
  export default {
    name: 'my-select',
    props: {
      modelValue: {
        type: String
      },
      options: {
        type: Array,
        default: () => []
      },
      listOfPrioritys: {
        type: Array
      },
      editPriority:{
        type: String
      }
    },
    methods: {
      changeOption(event) {
        this.$emit('update:modelValue', event.target.value);
      }
    }
  }
  </script>
  
  <style scoped>
  select {
    border: none;
    margin-left: -10px;
  }
    option {
      margin-left: -10px;
    }
  </style>