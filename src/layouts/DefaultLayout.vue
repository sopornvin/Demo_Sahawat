<template>

    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" style="color: white; background: #01579B;">

            <v-row >
                <v-col align="center" justify="center"> 
                    <v-avatar color="light-blue-accent-4" size="70px" style="margin: 30px 20px 10px 20px;">
                        <span class="text-h5">{{ getNameAvatar }}</span>
                    </v-avatar>
                    
                    <p class="font-weight-bold">
                        {{ fullname }}
                    </p>
                    <p class="font-weight-light" style="margin: 0px 0px 20px 0px;">
                        {{ email }}
                    </p>
                </v-col>
            </v-row>
            

            <v-divider></v-divider>

            <v-list nav>
                <router-link to="/post" class="rountlink"><v-list-item prepend-icon="mdi-storefront" value="products" style="color: white;">ลงขาย</v-list-item></router-link>
                <router-link to="/postlist" class="rountlink"><v-list-item v-show="role == '1'?true:false"  prepend-icon="mdi-format-list-bulleted" value="orders" style="color: white;">จัดการประกาศ</v-list-item></router-link>
                <br/>
                <router-link to="/employee" class="rountlink"><v-list-item v-show="role == '1'?true:false" prepend-icon="mdi-account-details" value="dashboard" style="color: white;">จัดการข้อมูลผู้ใช้</v-list-item></router-link>
                <!-- <v-list-item v-show="role == '1'?true:false" prepend-icon="mdi-chart-areaspline" value="reports" >Reports</v-list-item>
                <v-list-item v-show="role == '1'?true:false" prepend-icon="mdi-cog" value="setting" >Setting</v-list-item> -->
            </v-list>

            <v-divider class="mt-16"></v-divider>

            <v-list nav>
                <v-list-item prepend-icon="mdi-logout-variant" value="logout" @click="logout">Logout</v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar style="color: white; background: #01579B;">
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title></v-toolbar-title>
        </v-app-bar>

        <v-main>
            <router-view />
        </v-main>

    </v-app>
</template>

<script setup lang="ts">
    import { ref ,computed} from 'vue';
    import { useRouter } from 'vue-router';
    const router = useRouter(); 

    const drawer =  ref(true)
    const firstname:any = localStorage.getItem("firstname") 
    const lastname:any = localStorage.getItem("lastname") 
    const email = localStorage.getItem("email")
    const role = localStorage.getItem("role")

    const fullname = firstname + ' ' + lastname; 


    


    const getNameAvatar:any = computed(() => {
        const firstN = firstname[0];
        const lastN= lastname[0];
        return firstN+lastN
    });
    

    const logout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("firstname");
        localStorage.removeItem("lastname");
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        localStorage.removeItem("token");

        router.push('/');
    }

</script>

<style scoped>
    /* * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      .mdi-account-details{
        margin-left: 20px;
        margin-inline-end: 0px;
      }
      .mdi-account-details.v-list-item__content{
        margin-inline-end: 0px;
      } */

      .rountlink{
        text-decoration: none;
      }
</style>