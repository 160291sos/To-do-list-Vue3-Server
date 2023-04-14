<template>
    <div class="table-row">
        <slot></slot>
    </div>
</template>

<script>

</script>

<style scoped>
.table-row {
    grid-template-columns: 3fr 1fr 150px 120px 70px ;
    border-bottom: 2px solid gray;
    position: relative;
    display: grid;
    column-gap: 10px;
    align-items: center;
    padding: 0 16px;

}
</style>