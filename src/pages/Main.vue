<template>
    <div>
        <h1>Enter to your to do list</h1>
    </div>
    <div>
        <div v-for="name in userData">
            <my-button   
            @click="$router.push({name: 'userId', query:{id:name.id, name:name.name}}), 
            getUserData(name)" 
            >
            {{name.name}}
            </my-button>
        </div>
        <my-button class="btnNewUser" v-if="newUser">
            <input type="text" v-model="newUserData.name">
            <button class="btnNewUser" @click="saveNewUser">&#10003;</button>
            <button class="btnNewUser" @click="deleteNewUser">X</button>
        </my-button>
        <my-button class="btn btn_create" 
        @click="addNewUser"
        >
        +
        </my-button>
    </div>
</template>

<script>
import { assertExpressionStatement } from '@babel/types';
import axios from 'axios';

export default{
data() {
    return {
        userData: [],
        selectedUserData: '',
        newUser: false,
        newUserData: {
            name: '',
            userGroup: 'USER'
        }
    };
 },    
methods: {
    getUserData(data){
        let userId = data.id;
    },
    addNewUser(){
        this.newUser=true;
    },
    deleteNewUser(){
        this.newUser=false;
        this.newUserData.name = '';
    },
    saveNewUser(){
        this.newUser=false;
        axios.post('http://localhost:8089/api/users', this.newUserData)
                .then((response) => {
                    axios.get('http://localhost:8089/api/users')
                    .then((response)=>{
                        this.userData = response.data;
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
async beforeCreate(){
        try {
            const response = await axios.get('http://localhost:8089/api/users')
            this.userData = response.data;
            
        }catch (e) {
            alert('Mistake')
        }
    }
}
</script>

<style scoped>
* {
    text-align: center;
}
input {
    width: 160px;
    border: none;
    color: teal;
}
.btnNewUser {
    display: inline-flex;
    border: none;
    background-color: white;
    color: teal;
}
</style>