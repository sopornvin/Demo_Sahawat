<template>
    <div class="container">

        <!-- text search and add buuton -->
        <v-row align="center" justify="start" style="margin: 30px 20px 0px 20px;">
            <v-col  xl="4" lg="4" md="5" sm="7" xs="4">
                <v-text-field v-model="searchKeyword" clearable
                    density="compact"
                    variant="outlined"
                    label="ค้นหา"
                    append-inner-icon="mdi-magnify"
                    hide-details>
                </v-text-field>
            </v-col>
            <v-col style="display: flex; justify-content: end; align-items: end;">
                <v-btn @click="show_empModel"
                    prepend-icon="mdi-plus"
                    color="teal-lighten-1">
                    <template v-slot:prepend>
                        <v-icon color="white"></v-icon>
                    </template>
                    เพิ่มข้อมูลผู้ใช้
                </v-btn>
            </v-col>
        </v-row>

        <!-- table data -->
        <v-table style="margin: 20px;" fixed-header height="auto">
            <thead>
                <tr>
                    <th class="text-left" style="background-color: #01579B; color: white;">#</th>
                    <th class="text-left" style="background-color: #01579B; color: white;">ชื่อ-นามสกุล</th>
                    <th class="text-left" style="background-color: #01579B; color: white;">เบอร์โทร</th>
                    <th class="text-left" style="background-color: #01579B; color: white;">อีเมล</th>
                    <th class="text-left" style="background-color: #01579B; color: white;">ตำแหน่ง</th>
                    <th class="text-left" style="background-color: #01579B; color: white;">สถานะ</th>
                    <th class="text-left" style="background-color: #01579B; color: white;"> </th>
                </tr>
            </thead>
            <tbody >
                <tr v-for="(item, index) in filteredData" :key="index" class="table-row">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.FirstName + ' ' + item.LastName }}</td>
                    <td>{{ item.Mobile }}</td>
                    <td>{{ item.Email }}</td>
                    <td>{{ getRoleName(item.RoleID) }}</td>
                    <td>
                        <v-chip  :color="getColor(item.StatusID ===1 ?'active':'inactive')" variant="elevated">
                            {{ item.StatusID === 1 ? 'Active':'Inactive' }}
                        </v-chip>
                    </td>
                    <td>
                        <div style="display: flex; justify-content: center; align-items: center">
                            <v-btn @click="show_empViewModel(item.EmployeeID)"
                                icon="mdi-eye"
                                width="35px"
                                height="35px"
                                color="green-accent-2">
                            </v-btn>
                            <v-btn @click="show_empUpdateModel(item.EmployeeID)"
                                icon="mdi-archive-edit-outline"
                                width="35px"
                                height="35px"
                                color="amber-accent-2"
                                class="mr-2 ml-2">
                            </v-btn>
                            <v-btn @click="showDeleteDialog(item.EmployeeID)"
                                icon="mdi-delete-outline"
                                width="35px"
                                height="35px"
                                color="deep-orange-accent-4">
                            </v-btn>
                        </div>
                    </td>
                </tr>
            
            </tbody>
        </v-table>

        <!-- pagination -->
        <!-- <div style="display: flex; justify-content: end; align-items: center;">
            <v-pagination 
                v-model="page"
                :length="2">
            </v-pagination>
        </div> -->


        <!-- model add employee -->
        <v-dialog
            v-model="empModel"
            persistent
            width="900px">
            <v-card>
                <v-card-title>
                    <span class="text-h5">เพิ่มข้อมูลผู้ใช้งาน</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row no-gutters>
                            <v-col cols="12" sm="6" md="6" class="pa-2">
                                <v-text-field v-model="add_firstname" 
                                    label="ชื่อ"
                                    variant="outlined">
                                </v-text-field>
                                <p class="text-left" style="color: red; margin-top: -20px;" v-show="validate_fname">
                                    กรุณาใส่ชื่อ
                                </p>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-2">
                                <v-text-field v-model="add_lastname"
                                    label="นามสกุล"
                                    variant="outlined">
                                </v-text-field>
                                <p class="text-left" style="color: red; margin-top: -20px;" v-show="validate_lname">
                                    กรุณาใส่นามสกุล
                                </p>
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols="12" sm="6" md="6" class="pa-2">
                                <v-text-field v-model="add_email"
                                    label="อีเมล"
                                    type="email"
                                    variant="outlined">
                                </v-text-field>
                                <p class="text-left" style="color: red; margin-top: -20px;" v-show="validate_email">
                                    กรุณาใส่อีเมล
                                </p>
                                <p class="text-left" style="color: red; margin-top: -20px;" v-show="isValidEmail">
                                    กรุณาใส่ email ให้ถูกต้อง
                                </p>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-2">
                                <v-text-field v-model="add_mobile"
                                    label="เบอร์โทร"
                                    variant="outlined">
                                </v-text-field>
                                <p class="text-left" style="color: red; margin-top: -20px;" v-show="validate_mobile">
                                    กรุณาใส่เบอร์โทร
                                </p>
                                <p class="text-left" style="color: red; margin-top: -20px;" v-show="isValidPhoneNumber">
                                    เบอร์โทรไม่ถูกต้อง
                                </p>
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols="12" sm="6" md="6" class="pa-2">
                                <v-text-field v-model="add_username"
                                    label="username"
                                    variant="outlined">
                                </v-text-field>
                                <p class="text-left" style="color: red; margin-top: -20px;" v-show="validate_username">
                                    กรุณาใส่ Username
                                </p>
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols="12" sm="6" md="6" class="pa-2">
                                <v-text-field v-model="add_password"
                                    label="password"
                                    variant="outlined"
                                    type="password">
                                </v-text-field>
                                <p class="text-left" style="color: red; margin-top: -20px;" v-show="validate_password">
                                    กรุณาใส่ Password
                                </p>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-2">
                                <v-text-field  v-model="add_confirmpassword"
                                    label="confirm password"
                                    variant="outlined"
                                    type="password">
                                </v-text-field>
                                <p class="text-left" style="color: red; margin-top: -20px;" v-show="validate_confirmpassword">
                                    กรุณาใส่ Confirm Password
                                </p>
                                <p class="text-left" style="color: red; margin-top: -20px;" v-show="validate_passwordMatch">
                                    Password and Confirm Password ไม่เหมือนกัน
                                </p>
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols="12" sm="6" md="6" class="pa-2">
                                <v-select v-model="add_role"
                                    label="ตำแหน่ง"
                                    :items="roleOptions"
                                    variant="outlined">
                                </v-select>
                                <p class="text-left" style="color: red; margin-top: -20px;" v-show="validate_role">
                                    กรุณาเลือกตำแหน่ง
                                </p>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-2">
                                <v-select v-model="add_status"
                                    label="สถานะ"
                                    :items="statusOptions"
                                    variant="outlined"
                                ></v-select>
                                <p class="text-left" style="color: red; margin-top: -20px;" v-show="validate_status">
                                    กรุณาเลือกสถานะ
                                </p>
                            </v-col>                 
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-row>
                        <v-col  style="display: flex; justify-content: end; align-items: end; margin: 0px 50px 50px 0px;">
                            <v-btn
                                color="blue-darken-1"
                                variant="elevated"
                                @click="saveData">
                                บันทึก
                            </v-btn>
                            <v-btn
                                color="deep-orange-accent-4"
                                variant="elevated"
                                @click="empModel = false,
                                        add_firstname =  ref('');
                                        add_lastname = ref('');
                                        add_email = ref('');
                                        add_mobile = ref('');
                                        add_username = ref('');
                                        add_password = ref('');
                                        add_role = ref('');
                                        add_status = ref('');">
                                ยกเลิก
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-dialog>



        <!-- model view and update employee -->
        <v-dialog 
            v-model="empViewModel"
            persistent
            width="900px">
            <v-card>
                <v-card-title>
                    <span class="text-h5" v-if="viewStatus">ข้อมูลผู้ใช้งาน</span>
                    <span class="text-h5" v-if="updateStatus">อัพเดทผู้ใช้งาน</span>
                </v-card-title>
                <v-card-text>
                    <v-container v-if="viewStatus">
                        <v-row no-gutters>
                            <v-col cols="12" sm="6" md="6" class="pa-2">
                                <v-text-field  disabled
                                    v-model="firstname"
                                    label="ชื่อ"
                                    variant="outlined">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-2">
                                <v-text-field v-model="lastname" 
                                    label="นามสกุล"
                                    variant="outlined"
                                    disabled>
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols="12" sm="6" md="6" class="pa-2">
                                <v-text-field v-model="email" disabled
                                    label="อีเมล"
                                    type="email"
                                    variant="outlined">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-2">
                                <v-text-field v-model="mobile" disabled
                                    label="เบอร์โทร"
                                    variant="outlined">
                                </v-text-field>
                            </v-col>
                        </v-row>
                        
                        <v-row no-gutters>
                            <v-col cols="12" sm="6" md="6" class="pa-2">
                                <v-select v-model="role" disabled
                                    label="ตำแหน่ง"
                                    variant="outlined"
                                    :items="roleOptions">
                                </v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-2">
                                <v-select v-model="status"  disabled
                                    label="สถานะ"
                                    :items="statusOptions"
                                    variant="outlined"
                                ></v-select>
                            </v-col>                 
                        </v-row>
                    </v-container>

                    <v-container v-if="updateStatus">
                        <v-row no-gutters>
                            <v-col cols="12" sm="6" md="6" class="pa-2">
                                <v-text-field  
                                    v-model="firstname"
                                    label="ชื่อ"
                                    variant="outlined">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-2">
                                <v-text-field v-model="lastname" 
                                    label="นามสกุล"
                                    variant="outlined">
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols="12" sm="6" md="6" class="pa-2">
                                <v-text-field v-model="email" 
                                    label="อีเมล"
                                    type="email"
                                    variant="outlined">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-2">
                                <v-text-field v-model="mobile" 
                                    label="เบอร์โทร"
                                    variant="outlined">
                                </v-text-field>
                            </v-col>
                        </v-row>
                        
                        <v-row no-gutters>
                            <v-col cols="12" sm="6" md="6" class="pa-2">
                                <v-select v-model="role" 
                                    label="ตำแหน่ง"
                                    variant="outlined"
                                    :items="roleOptions">
                                </v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-2">
                                <v-select v-model="status"  
                                    label="สถานะ"
                                    :items="statusOptions"
                                    variant="outlined"
                                ></v-select>
                            </v-col>                 
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-row>
                        <v-col  style="display: flex; justify-content: end; align-items: end; margin: 0px 50px 50px 0px;">
                            <v-btn v-if="viewStatus"
                                color="deep-orange-accent-4"
                                variant="elevated"
                                @click="empViewModel = false">
                                ปิด
                            </v-btn>
                        </v-col>
                        <v-col v-if="updateStatus"  style="display: flex; justify-content: end; align-items: end; margin: 0px 50px 50px 0px;">
                            <v-btn 
                                color="blue-darken-1"
                                variant="elevated"
                                @click="updateData(_EmpDataById.EmployeeID)">
                                อัพเดท
                            </v-btn>
                            <v-btn 
                                color="deep-orange-accent-4"
                                variant="elevated"
                                @click="empViewModel = false">
                                ยกเลิก
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
    
 
  </template>
  
  <script setup lang="ts">
    import { ref, computed,onMounted} from 'vue'
    import axios, { AxiosResponse } from 'axios';
    import Swal from 'sweetalert2'

    const viewStatus = ref(false);          //ใช้ check ว่า กด view model
    const updateStatus = ref(false);        //ใช้ check ว่า กด update model

    const validate_fname = ref(false);
    const validate_lname = ref(false);
    const validate_email = ref(false);
    const validate_mobile = ref(false);
    const validate_username = ref(false);
    const validate_password = ref(false);
    const validate_confirmpassword = ref(false);
    const validate_status = ref(false);
    const validate_role = ref(false);
    const validate_passwordMatch = ref(false);
    const isValidPhoneNumber = ref(false);
    const isValidEmail = ref(false);

    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    const page = ref(1)

    const showAlert_warning = ref(false);
    const errors: Record<string, string> = {};


    //const searchKeyword = ref('');
    
    const selectedItem = ref();

    const selectedStatus = ref(''); 

    const empModel = ref(false);
    const empUpdateModel = ref(false);
    const empViewModel = ref(false);

    const statusOptions = [ 'Active','Inactive'];
    const roleOptions = ['Administration', 'Authorizer', 'Checker', 'Maker', 'User'];


    interface EmployeeModel {
        EmployeeID: number;
        FirstName: string;
        LastName: string;
        Mobile: string;
        Email: string;
        RoleID: number;
        StatusID: number;
    }

    const EmpData = ref<EmployeeModel[]>([]);
    const EmpDataById:any = <EmployeeModel[]>([]);


    const searchKeyword = ref('');


    //----view and update-------
    let firstname:any  = ref('');
    let lastname:any = ref('');
    let email:any = ref('');
    let mobile:any = ref('');
    let username:any = ref('');
    let password:any = ref('');
    let role:any = ref('');
    let status:any = ref('');


    //----add-------------------
    let add_firstname:any =  ref('');
    let add_lastname:any = ref('');
    let add_email:any = ref('');
    let add_mobile:any = ref('');
    let add_username:any = ref('');
    let add_password:any = ref('');
    let add_confirmpassword:any = ref('');
    let add_role:any = ref('');
    let add_status:any = ref('');

    //let itemsPerPage = 0; // Number of items to display per page

    let _EmpDataById:any = [];

    const _token = localStorage.getItem("token"); 
    //console.log('_token',_token);
    
    


    const fetchData = async () => {
        try {
            const response: AxiosResponse = await axios.get('http://localhost:5000/api/getEmployee', {
                headers: {
                    Authorization: `${_token}`,
                },
            });
            EmpData.value = response.data.data;
            //itemsPerPage = response.data.data.length
            //console.log('response.data',itemsPerPage);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchData_getEmployeeByID = async (employeeId: number) => {
        try {
            const response: AxiosResponse = await axios.get(`http://localhost:5000/api/getEmployee/${employeeId}`, {
                headers: {
                    Authorization: `${_token}`,
                },
            });
            // console.log('employeeId',employeeId)
            EmpDataById.value = response.data.data;
            // fname = EmpDataById.value[0].FirstName
            // lname = EmpDataById.value[0].LastName
            // email = EmpDataById.value[0].Email
            // mobile = EmpDataById.value[0].Mobile
            // username = EmpDataById.value[0].Username
            // password = EmpDataById.value[0].Password
            // role = EmpDataById.value[0].RoleID
            // status = EmpDataById.value[0].StatusID
            _EmpDataById = EmpDataById.value[0]

            firstname.value =  _EmpDataById.FirstName
            lastname.value  = _EmpDataById.LastName
            email.value = _EmpDataById.Email
            mobile.value = _EmpDataById.Mobile
            role.value = _EmpDataById.RoleID === 1 ? 'Administration' :
                         _EmpDataById.RoleID === 2 ? 'Authorizer' :
                         _EmpDataById.RoleID === 3 ? 'Checker' :
                         _EmpDataById.RoleID === 4 ? 'Maker' :  'User';

            status.value = _EmpDataById.StatusID == 1? 'Active':'Inactive' 

            console.log('role.value.StatusID22222',role.value);

            // console.log('_EmpDataById', _EmpDataById);
        } catch (error) {
            console.error(error);
        }
    };

    // const paginatedData = computed(() => {
    //     const startIndex = (page.value - 1) * itemsPerPage/2;
    //     const endIndex = startIndex + itemsPerPage/2;
    //     return filteredData.value.slice(startIndex, endIndex);
    // });

    const filteredData = computed(() => {
        if (!searchKeyword.value) {
            return EmpData.value;
        } else {
            const keyword = searchKeyword.value.toLowerCase();
            return EmpData.value.filter(
            (data) =>
                data.FirstName.toLowerCase().includes(keyword) ||
                data.LastName.toLowerCase().includes(keyword) ||
                data.Mobile.includes(keyword) ||
                data.Email.toLowerCase().includes(keyword)
            );
        }
    });

    
    onMounted(() => {
        fetchData();
    });



    // Function to open delete confirmation dialog
    const showDeleteDialog = (employeeId: number) => {
        selectedItem.value = employeeId;
        
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ใช่ ฉันต้องการลบ!!',
            cancelButtonText: 'ยกเลิก'
            }).then((result) => {
                if (result.isConfirmed) { 
                        deleteItem(employeeId),
                        Swal.fire({
                            position:'top',
                            icon:'success',
                            title: 'Deleted!',
                            text: 'Your item has been delete',
                            showConfirmButton: false,
                            timer: 1500
                        })
                }else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    Swal.fire( 
                        'Cancelled',
                        'Your item has not been delete',
                        'error'
                    )
                     }})
    };

    const saveData = async() => {

        validate_fname.value = false
        validate_lname.value = false
        validate_username.value = false
        validate_password.value = false
        validate_confirmpassword.value = false
        validate_email.value = false
        validate_mobile.value = false
        validate_status.value = false
        validate_role.value = false
        validate_passwordMatch.value = false
        isValidPhoneNumber.value = false
        isValidEmail.value = false
                

                
            if (!add_firstname.value) {
                validate_fname.value = true
            }
            else if (!add_lastname.value) {
                validate_lname.value = true
            }
            else if (!add_email.value) {
                validate_email.value = true
            } 
            else if (!add_mobile.value) {
                validate_mobile.value = true
            }
            else if (!add_username.value) {
                validate_username.value = true
            }
            else if (!add_password.value) {
                validate_password.value = true
            }
            else if (!add_confirmpassword.value) {
                validate_confirmpassword.value = true
            }
            else if (!add_role.value) {
                validate_role.value = true
            }
            else if  (!add_status.value) {
                validate_status.value = true
            }
            else if(add_password.value !== add_confirmpassword.value){
                validate_passwordMatch.value = true
            }
            else if(emailRegex.test(add_email.value) === false){
                isValidEmail.value = true
                console.log('phoneRegex.test(add_mobile)', emailRegex.test(add_email.value))
                console.log('add_email', add_email.value)
            }
            else if(phoneRegex.test(add_mobile.value) === false){
                isValidPhoneNumber.value = true
                console.log('phoneRegex.test(add_mobile)', phoneRegex.test(add_mobile.value))
                console.log('add_mobile', add_mobile.value)
            }
            else{
                try{    
                    const response = await axios.post(`http://localhost:5000/api/register/`, {
                // Pass the updated data in the request body
                    first_name: add_firstname.value,
                    last_name: add_lastname.value,
                    mobile: add_mobile.value,
                    email: add_email.value,
                    username: add_username.value,
                    password: add_password.value,
                    role_id: add_role.value === 'Administration' ? 1 :
                            add_role.value === 'Authorizer' ? 2:
                            add_role.value === 'Checker' ? 3 :
                            add_role.value === 'Maker' ? 4 :  
                            add_role.value === 'User' ? 5 : '',
                    status_id: add_status.value === "Active"? 1 : 2
                }, 
                {
                    headers: {
                        Authorization: _token, // Assuming _token holds the access token
                    },
                });

            //validateValues()
            console.log('response',response.data.message)
          
            
                empModel.value = false
                if(response.data.status == 200){
                    
                    Swal.fire({
                        position: 'top',
                        icon: 'success',
                        title: 'Saved!',
                        text: 'Your data was saved',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    fetchData();

                    add_firstname =  ref('');
                    add_lastname = ref('');
                    add_email = ref('');
                    add_mobile = ref('');
                    add_username = ref('');
                    add_password = ref('');
                    add_role = ref('');
                    add_status = ref('');

                }
                else{
                        Swal.fire({
                            position: 'top',
                            icon: 'error',
                            title: 'save error!',
                            text: response.data.message,
                            showConfirmButton: false,
                            timer: 5000
                        })
                }
                
        }
        catch(error){
            console.error(error);
        }
    }
                    
    }

    const updateData = async(employeeId: number) => {
        empViewModel.value = false

        try{    
            const response = await axios.put(`http://localhost:5000/api/updateEmployee/${employeeId}`, {
            // Pass the updated data in the request body
                first_name: firstname.value,
                last_name: lastname.value,
                mobile: mobile.value,
                email: email.value,
                // username: _EmpDataById.Username,
                // password: _EmpDataById.Password,
                role_id: role.value === 'Administration' ? 1 :
                        role.value === 'Authorizer' ? 2:
                        role.value === 'Checker' ? 3 :
                        role.value === 'Maker' ? 4 :  
                        role.value === 'User' ? 5 : '',
                status_id: status.value === "Active"? 1 : 2
            }, 
            {
                headers: {
                    Authorization: _token, // Assuming _token holds the access token
                },
            });
            //  console.log('status', firstname.value);
            //  console.log("response",response.data)

            if(response.status == 200){
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: 'Updated!',
                    text: 'Your data was updated',
                    showConfirmButton: false,
                    timer: 1500
                })
                fetchData();
            }
            else{
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: 'Updated!',
                    text: "เกิดข้อผิดพลาดในการอัพเดทข้อมูล",
                    showConfirmButton: false,
                    timer: 1500
                    })
                }
            }
        catch(error){
            console.error(error);
        }
    }
    

    const deleteItem = async(employeeId: number) => {
        try{    console.log('employeeId',employeeId)
            const response = await axios.delete(`http://localhost:5000/api/deleteEmployee/${employeeId}`,
            {
                headers: {
                    Authorization: _token, // Assuming _token holds the access token
                },
            });
            console.log('employeeId',employeeId)
            console.log('response',response)
            if(response.status == 200){
                fetchData();
                // const index = selectedItem.value;
                // console.log('index',index)
                //     if (index !== -1) {
                //         EmpData.value.splice(index, 1);
                //     }
            }
        }
        catch(error){
            console.error(error);
        }   
    }

    const show_empModel = () => {
        empModel.value = true;
    }
    const show_empUpdateModel = async(id:number) => {
        viewStatus.value = false
        updateStatus.value = true
        await fetchData_getEmployeeByID(id)
        empViewModel.value = true
    }
    const show_empViewModel = async(id:number) => {
        viewStatus.value = true
        updateStatus.value = false
        await fetchData_getEmployeeByID(id)
        empViewModel.value = true
    }


    const getStatusName = (statusID: any) => {
        if(statusID == 1){
            return 'Active'
        }
        else{
            return 'Inactive'
        }
    }

    const getRoleName = (role_id:any) => {
      if (role_id === 1) {
        return 'Administration';
      } else if (role_id === 2) {
        return 'Authorizer';
      } else if (role_id === 3) {
        return 'Checker';
      } else if (role_id === 4) {
        return 'Maker';
      } else {
        return 'User';
      }
    };

    const getColor = (status: string): string => {
        if (status === 'active') return 'light-green-accent-3';
        else if (status === 'inactive') return 'orange-darken-4';
        else return 'blue';
    };


    const validateValues = (): Record<string, string> => {
        const errors: Record<string, string> = {};

        if (!add_firstname.value) {
            errors.firstname = 'First name is required';
        }
        if (!add_lastname.value) {
            errors.lastname = 'Last name is required';
        }
        if (!add_email.value) {
            errors.email = 'Email is required';
        } 
        if (!add_mobile.value) {
            errors.mobile = 'mobile is required';
        }
        if (!add_username.value) {
            errors.username = 'username is required';
        }
        if (!add_password.value) {
            errors.password = 'password is required';
        }
        if (!add_role.value) {
            errors.role = 'role is required';
        }
        if (!add_status.value) {
            errors.status = 'status is required';
        }

        Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: 'save error!',
                    text: errors.firstname,
                    showConfirmButton: false,
                    timer: 1500
        })
        // Implement additional validation logic for other fields
        console.log('errors',errors)
        return errors;
    };

   


   
    // let filteredEmpdatatoTable = computed(() => {
    //         const keyword = searchKeyword.value.toLowerCase().trim();
    //         return empdata.value.filter((item) => {
    //             return item.fullname.toLowerCase().includes(keyword);
    //         });
    // });
 
  </script>


  
  <style scoped>
    .loading-center{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .toggle.v-input--is-disabled.v-text-field--outline .v-input__slot {
        border-color: #00000061;
    }

    .table-row:hover {
        background-color: #E1F5FE; /* Change this to your desired hover background color */
        cursor: pointer;
    }
  </style>