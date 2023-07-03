<template>    
      <div class="container" style="display: flex; justify-content: center; align-items: center; height: 100vh;">
                        <v-row align="center" justify="center">
                          <v-col cols="10" lg="3" md="4" sm="6" xs="6"  max-width="600" >

                                <v-img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
                                      class="imgLogo"></v-img>
                                
                                <br>
                                
                                <v-text-field v-model="username"
                                    clearable
                                    variant="outlined"
                                    label="Username"
                                    placeholder="Enter your username"
                                ></v-text-field>

                                <v-text-field v-model="password"
                                    clearable
                                    variant="outlined"
                                    label="Password"
                                    type="password"
                                    placeholder="Enter your password"
                                ></v-text-field>

                                <!-- <v-checkbox
                                  label="Remember me"
                                  class="mt-n1"
                                  color="#0D1C63"> 
                                </v-checkbox> -->

                                
                                 
                                <!-- <router-link :to="isLogin ? '/home' : ''"> -->
                                  <v-btn 
                                    class="mb-8"
                                    block
                                    color="light-blue-darken-4"
                                    size="large"
                                    type="submit"
                                    @click="login">
                                    Login
                                  </v-btn>
                                <!-- </router-link> -->
                          </v-col>
                        </v-row>  


                        <v-alert v-model="showAlert_success"
                          class="alert-top-center"
                          type="success"
                          variant="tonal"
                          title="LogIn Success"
                          text="">
                        </v-alert>

                        <v-alert v-model="showAlert_fail"
                          class="alert-top-center"
                          type="error"
                          variant="tonal"
                          title="LogIn Fail"
                          :text="errorMessage">
                        </v-alert>

                        <v-progress-circular 
                          class="loading-center"
                          :size="70"
                          :width="8"
                          color="light-blue-darken-1"
                          indeterminate
                          v-show="show_loading"
                        ></v-progress-circular>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  // import { defineComponent } from 'vue';
  import axios, { AxiosResponse } from 'axios';
  import { useRouter } from 'vue-router';

  let empid = '';
  let firstname = '';
  let lastname = '';
  let role = '';
  let token = '';
  let email = '';
  
  let show_loading = false;
  
  const username = ref('');
  const password = ref('');
  const showAlert_success = ref(false);
  const showAlert_fail = ref(false);
  const isLogin = ref(false);
  const router = useRouter();
  const errorMessage = ref('');
  

  const login = async () => {
    try {
        const response: AxiosResponse = await axios.post('http://localhost:5000/api/login', {
        username: username.value,
        password: password.value,
      });

      empid = response.data.data.empid
      firstname = response.data.data.firstname
      lastname = response.data.data.lastname
      email = response.data.data.email
      role = response.data.data.role_id
      token = response.data.data.token

      if(response.data.status == 200){
        isLogin.value = true
        showAlert_success.value = true
        showAlert_fail.value = false


        localStorage.setItem('empid',empid)
        localStorage.setItem('username',username.value)
        localStorage.setItem('firstname',firstname)
        localStorage.setItem('lastname',lastname)
        localStorage.setItem('email',email)
        localStorage.setItem('role',role)
        localStorage.setItem('token',token)

        console.log('response',response.data.data);
        console.log('isLogin',isLogin);
        console.log('empid',empid);

        show_loading = true

        setTimeout(() => {
          showAlert_success.value = false;
          router.push('/employee')
        }, 1000);
        

       
      }
      else{
        isLogin.value = false
        showAlert_fail.value = true
        showAlert_success.value = false
        errorMessage.value = response.data.message

        console.log('response',errorMessage.value);
        console.log('isLogin',isLogin);

        setTimeout(() => {
          showAlert_fail.value = false;
        }, 3000);
      }
    } 
    catch (error) {
      console.error(error);
    }
    console.log('Username:', username.value);
    console.log('Password:', password.value);
  }
  
</script>

<style scoped>
    .imgLogo{
        align-content:center;
        justify-content: center;
        max-width:400px;
    }
    .container {
      position: relative;
      height: 100vh;
      background: rgba(255, 255, 255, 0.726);
    }

    .alert-top-center {
      position: absolute;
      top: 10%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .loading-center{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
</style>