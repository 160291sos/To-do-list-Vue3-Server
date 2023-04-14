<template>
    <div class="table-column">
        <slot></slot>
    </div>
</template>


<style scoped>
.table-column {
    padding: 15px 0;
    position: relative;
    grid-template-columns: 3fr 1fr 150px 120px 70px;
}
</style>