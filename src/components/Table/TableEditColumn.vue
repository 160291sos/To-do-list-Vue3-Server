<template>
<table-row>
    <table-column>
        <input
        v-model="newTask.taskName"
        @input="updateInput"
        placeholder="Write your task..">
    </table-column>
    <table-column>
        <my-select 
        :listOfPrioritys="listOfPrioritys"
        v-model="newTask.taskPriority"
        ></my-select>
    </table-column>
    <table-column>
        <input type="text"  
        placeholder="Date... "
        onfocus="(this.type='date')"
        onblur="(this.type='text')"
        min="2023-04-01"
        v-model="newTask.date">

    </table-column>
    <table-column
        v-model="newTask.user.name">
        {{ userName }}
    </table-column>
    <table-column>
        <button class="Btn">
                <img @click="$emit('save',newTask)" src="@/components/icon/savedisk.svg" width="20" height="20"/>
        </button>
        <button @click="$emit('remove')" class="Btn">
                <img src="@/components/icon/cancel_circle.svg" width="26" height="26"/>
            </button>
    </table-column>
</table-row>
</template>

<script>
import TableRow from "@/components/Table/TableRow.vue";
import TableColumn from "@/components/Table/TableColumn.vue";
import MySelect from "@/components/UI/MySelect.vue"

export default {
        components: {TableRow, TableColumn, MySelect },
        props: ['listOfPrioritys', 'userName'],
        data(){
            return {
                newTask: {
                    taskId: '',
                    user: {
                        id:'',
                        name: this.userName,
                        userGriup: ''
                    },
                    taskName: '',
                    taskPriority: 'LOW',
                    date: ''
                }
            }
        },
        methods: {
            updateInput(priorities){
            }
        }
};

</script>

<style scoped>
.userBtn{
    border: none;
    display: flex;
}
.Btn{
    padding: 0px;
    margin: 0px;
    border: none;
    padding-right: 5px;
}
input{
    border: none;
}
input::placeholder {
    color:grey;
    font-style: italic;
}
input[type="date"]{
    margin-left: -10px;
}
::-webkit-calendar-picker-indicator{
    cursor: pointer;
    padding: 0px;
}
</style>