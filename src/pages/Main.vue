<template>
    <div>
        <h1>Enter to your to do list</h1>
    </div>
    <div>
        <div v-for="name in userData">
            <my-button   
            @click="$router.push({name: 'userId', query:{id:name.id}}), 
            getUserData(name)" 
            >
            {{name.name}}
            </my-button>
        </div>
        
        <my-button class="btn btn_create" 
        @click="$router.push('/new')"
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
        selectedUserData: ''
    };
 },    
methods: {
    getUserData(data){
        let userId = data.id;
     
        
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
</style>