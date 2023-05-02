<template>
    <div class="table-wrapper">
        <div class="table">
            <div class="table-head">
                <div 
                    class="table-head__name"
                    v-for="(element, i) of head"
                    :key="i"> 
                    {{element}}
                </div>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        head: {
            type: Array,
            required: false
        }
    }
}
</script>

<style scoped>
.table {
    width: 100%;
    margin-bottom: 40px;
    margin-top: 15px;
}
.table-wrapper {
    display: flex;
    justify-content: center;
}
.table-head {
    grid-template-columns: 3fr 1fr 150px 120px 70px;
    padding: 5px 16px;
    display: grid;
    column-gap: 10px;
    align-items: center;
    border-bottom: 2px solid black;
    background: teal;
    height: 66px;
}
.table-head__name {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: white;
    font-weight: 500;
    font-size: 20px;
    cursor: pointer;
}
</style>