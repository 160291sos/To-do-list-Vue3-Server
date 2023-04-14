<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'my-button'
}
</script>

<style scoped>
.btn {
  margin: 0 auto;
  display: block;
  margin-top: 15px;
  padding: 10px 15px;
  width: 250px;
  background: none;
  color: teal;
  border: 1px solid teal;
  border-radius: 25px;
}
.btn:hover {
    background-color: teal;
    color: white;
}
.btn_create {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    margin-top: 15px;
}
</style>