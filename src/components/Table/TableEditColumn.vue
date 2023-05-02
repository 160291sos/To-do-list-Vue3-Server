<template>
<table-row>
    <table-column>
        <my-input v-focus v-model="newTask.taskName"
        >
        </my-input>
    </table-column>
    <table-column>
        <my-select 
            :listOfPrioritys="listOfPrioritys"
            v-model="newTask.taskPriority"
        ></my-select>
    </table-column>
    <table-column>
        <my-date v-model="newTask.date">
        </my-date>

    </table-column>
    <table-column
        v-model="newTask.user.name">
        {{ userName }}
    </table-column>
    <table-column>
        <button @click="$emit('save', newTask)" class="Btn">
            <slot>&#128190;</slot>
        </button>
        <button @click="$emit('remove')" class="Btn">
            <slot>&#10060;</slot>
        </button>
    </table-column>
</table-row>
</template>

<script>
import TableRow from "@/components/Table/TableRow.vue";
import TableColumn from "@/components/Table/TableColumn.vue";
export default {
        components: {TableRow, TableColumn},
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
            updateInput(){
                console.log(this.newTask.date);
            }
        }
};

</script>

<style scoped>

.Btn{
    padding: 5px;
    border: none;
    background-color: white;
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