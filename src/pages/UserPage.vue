
<template>
    <base-table 
        :head="tableHeads">
        <table-row
        v-for="task in tasks"
        :key="task.taskId">
        <table-column>
            {{ task.taskName }}
        </table-column>
        <table-column>
            {{ task.taskPriority }}
        </table-column>
        <table-column>
            {{ task.date }}
        </table-column>
        <table-column>
            {{ task.user.name }}
        </table-column>
        <table-column>
            <button class="userBtn">
                <img src="@/components/icon/pen.svg" width="24" height="24"/>
            </button>
            <button @click="toTrush(task)" class="userBtn">  
                <img src="@/components/icon/trash.svg"/>
            </button>
        </table-column>
    </table-row>
    <table-editColumn 
    v-if="edit" 
    :listOfPrioritys="priorities"
    :userName="tasks[0].user.name"
    @remove="removeEditColumn"
    @save="saveNewTask"
    ></table-editColumn>
    <button @click="addNewTask"
    class="addTask">
        <img src="@/components/icon/plus_icon.svg"/>
    </button>
    </base-table>
  </template>
  
  <script>
  import Main from "@/pages/Main.vue"
  import BaseTable from "@/components/Table/BaseTabel.vue";
  import TableRow from "@/components/Table/TableRow.vue";
  import TableColumn from "@/components/Table/TableColumn.vue";
  import MyButton from "@/components/UI/MyButton.vue";
  import TableEditColumn from "@/components/Table/TableEditColumn.vue"
  import axios from "axios";

    export default {
        components: {BaseTable, TableRow, TableColumn,MyButton, TableEditColumn },
      data (){
        return {
            tableHeads: ['Task Name', 'Priority', 'Date', 'Owner', ''],
            tasks: [],
            priorities: [],
            edit: false,
            id:'',
            postBody: {
                    user: {
                        id:''
                    },
                    taskName: '',
                    taskPriority: 'LOW',
                    date: ''
                },
        }
      },
      props: {
        id: {
            type: String
        }
      },
      methods: {
        addNewTask (){
            this.edit=true;
        },
        removeEditColumn(){
            this.edit=false;
        },
        toTrush(task){
            axios.delete(`http://localhost:8089/api/tasks?taskId=${task.taskId}`)
             .then((response) => {
                    this.tasks = this.tasks.filter(p => p.taskId !== task.taskId);
                })
                .catch((error => {
                    console.log(error);
                }))
            
                
        },
        saveNewTask(newTask){
            this.edit=false;
            
            this.postBody.user.id = this.id;
            this.postBody.taskName = newTask.taskName;
            this.postBody.taskPriority = newTask.taskPriority;
            this.postBody.date=newTask.date;
           
            axios.post('http://localhost:8089/api/tasks', this.postBody)
                .then((response) => {
                    axios.get(`http://localhost:8089/api/tasks?userIds=${this.$route.query.id}`)
                        .then(response => {
                            this.tasks = response.data;
                            
                            })
                        .catch((error => {
                        console.log(error);
                        }))
                })
                .catch((error => {
                    console.log(error);
                }))
        }
      },
      updateData(){
        axios.get(`http://localhost:8089/api/tasks?userIds=${this.$route.query.id}`)
            .then(response => {
                this.tasks = response.data;
                            
                })
            .catch((error => {
                console.log(error);
            }))
      },
       mounted: function (){
        const id = this.$route.query.id;
            this.id=id;

        function getUserData() {
            return axios.get(`http://localhost:8089/api/tasks?userIds=${id}`)
        }
        function getListOfPriorities() {
            return axios.get('http://localhost:8089/api/vocabulary')
        }
        axios.all([getUserData(), getListOfPriorities()])
        .then(axios.spread(function(user, priorities){
            this.tasks = user.data;
            this.priorities = priorities.data.taskPriorities;
            
        }.bind(this)))
      }
    }
  </script>

<style scoped>
.userBtn{
    border: none;
    padding: 0px;
}
.addTask {
    border-radius:100%;
    border-color: gray;
    padding:10px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items:center;
    margin: 10px;
}
</style>