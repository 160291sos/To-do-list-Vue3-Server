
<template>
    <base-table 
        :head="tableHeads">
        <table-row
        v-for="task in tasks"
        :key="task.taskId">
        <table-column>
            <my-input v-if="editOld && this.idEditTask == task.taskId"
            :taskName="task.taskName"
            v-model="task.taskName"> 
            </my-input>
            <slot v-else >{{ task.taskName }}</slot>
        </table-column>
        <table-column>
            <my-select v-if="editOld && this.idEditTask == task.taskId"
                :listOfPrioritys="priorities"
                :editPriority="task.taskPriority"
                v-model="task.taskPriority"
            ></my-select>
            <slot v-else> {{ task.taskPriority }} </slot>
        </table-column>
        <table-column>
            <my-date v-if="editOld && this.idEditTask == task.taskId"
            :taskDate="task.date"
            v-model="task.date"
            >

            </my-date>
            <slot v-else>{{ task.date }}</slot>
        </table-column>
        <table-column>
            {{ task.user.name }}
        </table-column>
        <table-column>
            <button 
            v-if="editOld && this.idEditTask == task.taskId" 
            class="userBtn"
            @click="saveEditTask(task)">
                <img  src="@/components/icon/savedisk.svg" width="20" height="20"/>
            </button>
            <button 
            v-else @click="editTask(task.taskId)" 
            class="userBtn">
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
  import TableEditColumn from "@/components/Table/TableEditColumn.vue";
  import MySelect from "@/components/UI/MySelect.vue";
  import MyInput from "@/components/UI/MyInput.vue";
  import MyDate from "@/components/UI/MyDate.vue";
  import axios from "axios";

    export default {
        components: {BaseTable, TableRow, TableColumn,MyButton, TableEditColumn, MySelect, MyInput, MyDate },
      data (){
        return {
            tableHeads: ['Task Name', 'Priority', 'Date', 'Owner', ''],
            tasks: [],
            priorities: [],
            edit: false,
            editOld: false,
            id:'',
            idEditTask: '',
            newPostBody: {
                    user: {
                        id:''
                    },
                    taskName: '',
                    taskPriority: 'LOW',
                    date: ''
            },
            editPostBody: {
                taskId:'',
                user: {
                    id:''
                },
                taskName:'',
                taskPriority:'',
                date:''
            }
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
        editTask(taskId){
            this.editOld=true;
            this.idEditTask = taskId;
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
            
            this.newPostBody.user.id = this.id;
            this.newPostBody.taskName = newTask.taskName;
            this.newPostBody.taskPriority = newTask.taskPriority;
            this.newPostBody.date=newTask.date;
            console.log(this.newPostBody)
           
            axios.post('http://localhost:8089/api/tasks', this.newPostBody)
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
        },
        saveEditTask(task){
            this.editOld=false;

            this.editPostBody.taskId=task.taskId;
            this.editPostBody.user.id=this.id;
            this.editPostBody.taskName=task.taskName;
            this.editPostBody.taskPriority=task.taskPriority;
            this.editPostBody.date=task.date;
            console.log(task.taskPriority);

            axios.put('http://localhost:8089/api/tasks', this.editPostBody)
                .then((response) => {
                    this.updateData
                })
                .catch((error => {
                    console.log(error);
                }))

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