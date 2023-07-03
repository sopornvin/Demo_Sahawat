<template>
    <!-- บ้าน -->
    <div style="margin: 70px 20px 20px 20px;">
        <v-row align="start" justify="start" no-gutters>
            <v-col cols="12" sm="5" md="5" no-gutters>
                <p class="text-body-1" :class="isMobile ? 'text-left' : 'text-right'" style="margin: 0px 0px 0px 15px;">
                    หัวข้ออสังหาริมทรัพย์ ที่ต้องการ
                    <span style="color: red;">*</span>
                </p> 
            </v-col>
            <v-col  cols="12" sm="6" md="4" no-gutters>
                <v-text-field v-model="title"
                    style="margin-left: 15px;"
                    density="compact"
                    placeholder="เช่นชื่ออสังหาริมทรัพย์ บ้าน    พร้อมอยู่"
                    variant="outlined">
                </v-text-field>
                <p class="text-left text-body-2"  style="color: #BDBDBD; margin-top: -20px; margin-left: 15px;">
                    ระบุสถานที่ใกล้เคียง การเดินทางเพิ่มเติม
                </p>
            </v-col>
        </v-row>

        <v-row style="margin: 10px 0px 0px 0px;" align="start" justify="start" no-gutters>
            <v-col cols="12" sm="5" md="5" no-gutters>
                <p class="text-body-1" :class="isMobile ? 'text-left' : 'text-right'" style="margin: 0px 0px 0px 15px;">
                    เลือกหมวดหมู่ให้ตรงกับสินค้า
                    <span style="color: red;">*</span>
                </p> 
            </v-col>
            <v-col cols="12" sm="6" md="4"  no-gutters>
                <v-select 
                    style="margin-left: 15px;"
                    density="compact"
                    clearable
                    placeholder="เลือกหมวดหมู่"
                    variant="outlined"
                    v-model="selectedPropertyType"
                    :items="propertytype"
                    item-title="PropertyTypeName" 
                    item-value="PropertyTypeID">
                </v-select>
            </v-col>
        </v-row>

        <v-row style="margin: 10px 0px 0px 0px;" align="start" justify="start" no-gutters>
            <v-col cols="12" sm="5" md="5" no-gutters>
                <p class="text-body-1" :class="isMobile ? 'text-left' : 'text-right'" style="margin: 0px 0px 0px 15px;">
                    เนื้อที่
                    <span style="color: red;">*</span>
                </p> 
            </v-col>
            <v-col cols="5" xl="2" lg="2" md="2" sm="2"  no-gutters>
                <v-text-field v-model="area"
                    style="margin-left: 15px;"
                    density="compact"
                    placeholder="ระบุเนื้อที่"
                    variant="outlined">
                </v-text-field>
            </v-col>
            <v-col cols="7" xl="2" lg="2" md="2" sm="3"  no-gutters>
                <v-select style="margin-left: 15px;"
                    clearable
                    density="compact"
                    placeholder="เลือกหน่วย"
                    variant="outlined"
                    v-model="selectUnit"
                    :items="unit"
                    item-title="UniitName" 
                    item-value="UnitID">
                </v-select>
            </v-col>
        </v-row>

        <v-row style="margin: 10px 0px 0px 0px;" align="start" justify="start" no-gutters>
            <v-col cols="12" sm="5" md="5" no-gutters>
                <p class="text-body-1" :class="isMobile ? 'text-left' : 'text-right'" style="margin: 0px 0px 0px 15px;">
                    ห้องนอน
                    <span style="color: red;">*</span>
                </p> 
            </v-col>
            <v-col cols="5" xl="2" lg="2" md="2" sm="2"  no-gutters>
                <v-text-field v-model="bedroom"
                    style="margin-left: 15px;"
                    clearable
                    density="compact"
                    placeholder="ระบุห้องนอน"
                    variant="outlined">
                </v-text-field>
            </v-col>
            <v-col cols="7" xl="3" lg="2" md="2" sm="3"  no-gutters>
                <p class="text-left text-body-1" align="center" justify="center" style="color: #BDBDBD; margin-left: 15px; margin-top: 8px;">
                    ห้อง
                </p>
            </v-col>
        </v-row>

        <v-row style="margin: 10px 0px 0px 0px;" align="start" justify="start" no-gutters>
            <v-col cols="12" sm="5" md="5" no-gutters>
                <p class="text-body-1" :class="isMobile ? 'text-left' : 'text-right'" style="margin: 0px 0px 0px 15px;">
                    ห้องน้ำ
                    <span style="color: red;">*</span>
                </p> 
            </v-col>
            <v-col cols="5" xl="2" lg="2" md="2" sm="2"  no-gutters>
                <v-text-field v-model="bathroom"
                    style="margin-left: 15px;"
                    density="compact"
                    placeholder="ระบุห้องน้ำ"
                    variant="outlined">
                </v-text-field>
            </v-col>
            <v-col cols="7" xl="3" lg="2" md="2" sm="3"  no-gutters>
                <p class="text-left text-body-1" align="center" justify="center" style="color: #BDBDBD; margin-left: 15px; margin-top: 8px;">
                    ห้อง
                </p>
            </v-col>
        </v-row>

        <v-row style="margin: 10px 0px 0px 0px;" align="start" justify="start" no-gutters>
            <v-col cols="12" sm="5" md="5" no-gutters>
                <p class="text-body-1" :class="isMobile ? 'text-left' : 'text-right'" style="margin: 0px 0px 0px 15px;">
                    ระบุราคาที่เหมาะสม
                    <span style="color: red;">*</span>
                </p> 
            </v-col>
            <v-col  cols="12" sm="6" md="4" no-gutters>
                <v-text-field v-model="price"
                    style="margin-left: 15px;"
                    density="compact"
                    placeholder="ระบุราคาเต็ม ไม่ใช่ราคาดาวน์"
                    variant="outlined">
                </v-text-field>
            </v-col>
        </v-row>

        <v-row style="margin: 10px 0px 0px 0px;" align="start" justify="start" no-gutters>
            <v-col cols="12" sm="5" md="5" no-gutters>
                <p class="text-body-1" :class="isMobile ? 'text-left' : 'text-right'" style="margin: 0px 0px 0px 15px;">
                    รูปอสังหาริมทรัพย์ บ้านของคุณ
                    <span style="color: red;">*</span>
                </p> 
            </v-col>
            <v-col  cols="12" sm="6" md="4" no-gutters>
                <v-alert style="margin-left: 15px;"
                    closable
                    type="info"
                    title=""
                    text="เพื่อประสิทธิภาพที่ดีต่อการซื้อ-ขาย Sahawat ไม่อนุญาตให้มีรายละเอียดช่องทางการติดต่อหรือโปรโมชั่นต่างๆ อยู่ภายในรูป "
                    variant="tonal"
                ></v-alert>
                <v-file-input v-model="partImage"
                    style="margin-left: 15px;"
                    @change="handleFileChange"
                    density="compact"
                    variant="outlined">
                </v-file-input>
                <v-row v-if="selectedImages.length">
                    <v-col cols="4" v-for="(image, index) in selectedImages" :key="index" class="d-flex child-flex">
                        <img :src="image" aspect-ratio="1"  alt="Selected Image" style="max-width: 100%; height: 200px; margin-top: 10px; margin-left: 15px;">
                        <v-btn icon @click="removeImage(index)" color="error" style="max-width: 30px; max-height: 30px;  margin-left: -25px;">
                            <v-icon >mdi-close</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-alert style="margin-left: 15px; margin-top: 10px;"
                    type="info"
                    title=""
                    text="ยิ่งลงรูปเยอะ ยิ่งเพิ่มโอกาสขาย การลงรูปให้เห็นทุกมุม ทั้งภายนอก ภายใน รวมถึงห้องต่างๆ ทุกห้อง จะช่วยให้ผู้ซื้อตัดสินใจได้ง่ายขึ้น "
                    variant="tonal"
                ></v-alert>
            </v-col>
        </v-row>

        <v-row style="margin: 20px 0px 0px 0px;" align="start" justify="start" no-gutters>
            <v-col cols="12" sm="5" md="5" no-gutters>
                <p class="text-body-1" :class="isMobile ? 'text-left' : 'text-right'" style="margin: 0px 0px 0px 15px;">
                    ข้อมูลเกี่ยวกับอสังหาริมทรัพย์ 
                </p> 
            </v-col>
            <v-col  cols="12" sm="6" md="4" no-gutters>
                <v-textarea v-model="detail"
                    style="margin-left: 15px;"
                    density="compact"
                    placeholder="ใส่รายละเอียด เช่น อสังหาริมทรัพย์  บรรยากาศดี มีระบบรักษาความปลอดภัย สระว่ายน้ำ ฟิตเนส"
                    variant="outlined">
                </v-textarea>
                <v-alert style="margin-left: 15px;"
                    type="info"
                    title=""
                    text="ห้ามขายอาคาร/บ้าน/ที่ดิน ที่เป็นที่ราชพัสดุ กรมธนารักษ์ สปก ที่ไม่มีโฉนด ที่วัด เว้นแต่ทำการเช่า หรือขายสิทธิ์ต่อเท่านั้น "
                    variant="tonal"
                    color="amber-lighten-1"
                ></v-alert>
            </v-col>
        </v-row>

        <v-row style="margin: 20px 0px 0px 0px;" align="start" justify="start" no-gutters>
            <v-col cols="12" sm="5" md="5" no-gutters>
                <p class="text-body-1" :class="isMobile ? 'text-left' : 'text-right'" style="margin: 0px 0px 0px 15px;">
                    ระบุที่ตั้งของอสังหาริมทรัพย์ 
                    <span style="color: red;">*</span>
                </p> 
            </v-col>
            <v-col cols="5" xl="2" lg="2" md="2" sm="2"  no-gutters>
                <v-select style="margin-left: 15px;"
                    clearable
                    density="compact"
                    placeholder="เลือกจังหวัด"
                    variant="outlined"
                    v-model="selectedProvince"
                    :items="provinces"
                    item-title="NameInThai" 
                    item-value="ProvincesID"
                    @update:model-value="getDistricts">
                </v-select>
            </v-col>
            <v-col cols="7" xl="2" lg="2" md="2" sm="3"   no-gutters>
                <v-select style="margin-left: 15px;"
                    clearable
                    density="compact"
                    placeholder="เลือกอำเภอ"
                    variant="outlined"
                    v-model="selectedDistrict"
                    :items="districts"
                    item-title="NameInThai" 
                    item-value="DistrictsID">
                </v-select>
            </v-col>
        </v-row>

        <v-row style="margin: 10px 0px 0px 0px;" align="start" justify="start" no-gutters>
            <v-col cols="12" sm="5" md="5" no-gutters>
                <p class="text-body-1" :class="isMobile ? 'text-left' : 'text-right'" style="margin: 0px 0px 0px 15px;">
                    เบอร์โทรศัพท์ติดต่อ 
                    <span style="color: red;">*</span>
                </p> 
            </v-col>
            <v-col  cols="12" sm="6" md="4" no-gutters>
                <v-text-field v-model="mobile"
                    style="margin-left: 15px;"
                    density="compact"
                    placeholder="มือถือ เช่น 08XXXXXXXX"
                    variant="outlined">
                </v-text-field>
                <p class="text-left text-body-2"  style="color: #BDBDBD; margin-top: -20px; margin-left: 15px;">
                    กรุณาใส่เบอร์โทรที่คุณใช้สมัครสมาชิกเพื่อความปลอดภัยในการใช้งาน หากพบปัญหาสามารถติดต่อฝ่ายบริการลูกค้า
                </p>
            </v-col>
        </v-row>

        <v-row style="margin: 20px 0px 0px 0px;" align="start" justify="start" no-gutters>
            <v-col cols="12" sm="5" md="5" no-gutters>
                <p class="text-body-1" :class="isMobile ? 'text-left' : 'text-right'" style="margin: 0px 0px 0px 15px;">
                    สภาพสินค้า 
                    <span style="color: red;">*</span>
                </p> 
            </v-col>
            <v-col  cols="12" xl="6" lg="6" md="6" sm="6" no-gutters>
                <v-radio-group  inline class="radio-group"  
                                density="compact">
                    <v-card height="45px" style="margin-left: 15px;" class="radio-card"
                            @mouseleave="selectedItem = '1'">
                        <v-card-item >
                            <v-radio label="มือหนึ่ง" value="1"></v-radio>
                        </v-card-item>
                    </v-card>
                    <v-card height="45px" class="radio-card ml-5" 
                            @mouseleave="selectedItem = '2'">
                        <v-card-item>
                            <v-radio label="มือสอง" value="2"></v-radio>
                        </v-card-item>
                    </v-card>
                </v-radio-group>
            </v-col>
        </v-row>

        <v-row style="margin: 20px 0px 0px 0px;" align="start" justify="start" no-gutters>
            <v-col cols="12" sm="5" md="5" no-gutters>
                <p class="text-body-1" :class="isMobile ? 'text-left' : 'text-right'" style="margin: 0px 0px 0px 15px;">
                    ประเภทการขาย 
                    <span style="color: red;">*</span>
                </p> 
            </v-col>
            <v-col cols="5" xl="2" lg="2" md="2" sm="3"  no-gutters>
                <v-select style="margin-left: 15px;"
                    clearable
                    density="compact"
                    placeholder="เลือกประเภท"
                    variant="outlined"
                    v-model="selectSaleType"
                    :items="saletype"
                    item-title="SalesTypeName" 
                    item-value="SalesTypeID">
                </v-select>
            </v-col>
        </v-row>

        <v-row style="margin: 20px 0px 0px 0px;" align="start" justify="start" no-gutters>
            <v-col cols="12" sm="5" md="5" no-gutters>
                <p class="text-body-1" :class="isMobile ? 'text-left' : 'text-right'" style="margin: 0px 0px 0px 15px;">
                    สถานะการประกาศ 
                    <span style="color: red;">*</span>
                </p> 
            </v-col>
            <v-col cols="5" xl="2" lg="2" md="2" sm="3"  no-gutters>
                <v-select style="margin-left: 15px;"
                    clearable
                    density="compact"
                    placeholder="เลือกสถานะ"
                    variant="outlined"
                    v-model="selectedStatus"
                    :items="status"
                    item-title="StatusName" 
                    item-value="StatusID">
                </v-select>
            </v-col>
        </v-row>
        
        <v-row style="margin: 20px 0px 0px 0px;" align="start" justify="start" no-gutters>
            <v-col cols="12" sm="5" md="5" no-gutters>
                <!-- <p class="text-body-1" :class="isMobile ? 'text-left' : 'text-right'" style="margin: 0px 0px 0px 15px;">
                    เบอร์โทรศัพท์ติดต่อ 
                    <span style="color: red;">*</span>
                </p>  -->
            </v-col>
            <v-col  cols="12" xl="4" lg="4" sm="4" md="4" no-gutters>
                <p class="text-left text-body-2 mb-2"  style="color: #BDBDBD; margin-top: 50px; margin-left: 15px;">
                    คลิกปุ่ม "ลงประกาศ" เพื่อยอมรับ ข้อกำหนดและเงื่อนไขการลงประกาศ
                </p>
                <v-btn style="margin-left: 15px;" 
                    class="mb-8"
                    block
                    color="light-blue-darken-4"
                    size="large"
                    type="submit"
                    @click="postSave">
                    ลงประกาศ
                </v-btn>
            </v-col>
        </v-row>

       

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
    import { ref, computed, onMounted } from 'vue';
    import axios, { AxiosResponse } from 'axios';
    import Swal from 'sweetalert2'
    import { useRouter } from 'vue-router';


    const router = useRouter();

    const isMobile = ref(false);

    const selectedImages:any = ref([]);
    const selectedItem:any = ref();

    let show_loading = false;

    const partImg = ref<File | null>(null);


    //-----Add--------------
    const employeeID = localStorage.getItem("empid"); 
    let title:any = ref('');
    let area:any = ref('');
    let bedroom:any = ref('');
    let bathroom:any = ref('');
    let price:any = ref('');
    let partImage:any = ref('');
    let detail:any = ref('');
    let mobile:any = ref('');
    // let productCondition:any = ref('');


    //console.log('selectedImages',selectedImages)
    //const selectedImage:any = ref('');

    
    const selectedProvince = ref(null);
    const selectedDistrict = ref(null);
    const selectedPropertyType = ref(null);
    const selectedStatus = ref(null);
    const selectSaleType = ref(null);
    const selectUnit = ref(null);

    const provinces:any = ref([]);
    const districts:any = ref([]);
    const propertytype:any = ref([]);
    const status:any = ref([]);
    const saletype:any = ref([]);
    const unit:any = ref([]);

    const getProvinces = async () => {
        try {
            districts.value = [];
            selectedDistrict.value = null;
            const response: AxiosResponse = await axios.get('http://localhost:5000/api/getProvice');
            for (let i = 0; i < response.data.length; i++) {
                provinces.value.push({ NameInThai: response.data[i].NameInThai, ProvincesID: response.data[i].ProvincesID });
            } 
            //console.log('selectedProvince.value', selectedProvince);
        } catch (error) {
            console.error(error);
        }
    };

    const getDistricts = async () => {
        try {
            if (selectedProvince.value){
                districts.value = []; 
                selectedDistrict.value = null;

                const response: AxiosResponse = await axios.get(`http://localhost:5000/api/getDistrict/${selectedProvince.value}`);
                for (let i = 0; i < response.data.length; i++) {
                    districts.value.push({ NameInThai: response.data[i].NameInThai, DistrictsID: response.data[i].DistrictsID });
                } 
                //console.log('response.data', response.data);

                // if (districts.value.length > 0) {
                //     selectedDistrict.value = districts.value[0];
                // } else {
                //     selectedDistrict.value = null;
                // }
            } 
            else {
                districts.value = []; // Clear the districts array when no province is selected
                selectedDistrict.value = null;
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    const getPropertyType = async () => {
        try {
            const response: AxiosResponse = await axios.get('http://localhost:5000/api/getPropertyType');
            for (let i = 0; i < response.data.length; i++) {
                propertytype.value.push({ PropertyTypeID: response.data[i].PropertyTypeID, PropertyTypeName: response.data[i].PropertyTypeName });
            } 
            //console.log('propertytype.value', response);
        } catch (error) {
            console.error(error);
        }
    };

    const getStatus = async () => {
        try {
            const response: AxiosResponse = await axios.get('http://localhost:5000/api/getStatus');
            for (let i = 0; i < response.data.length; i++) {
                status.value.push({ StatusID: response.data[i].StatusID, StatusName: response.data[i].StatusName });
            } 
            //console.log('Status.value', response);
        } catch (error) {
            console.error(error);
        }
    };

    const getSaleType = async () => {
        try {
            const response: AxiosResponse = await axios.get('http://localhost:5000/api/getSaleType');
            for (let i = 0; i < response.data.length; i++) {
                saletype.value.push({ SalesTypeID: response.data[i].SalesTypeID, SalesTypeName: response.data[i].SalesTypeName });
            } 
            //console.log('saletype.value', response);
        } catch (error) {
            console.error(error);
        }
    };

    const getUnit = async () => {
        try {
            const response: AxiosResponse = await axios.get('http://localhost:5000/api/getUnit');
            for (let i = 0; i < response.data.length; i++) {
                unit.value.push({ UnitID: response.data[i].UnitID, UniitName: response.data[i].UniitName });
            } 
            //console.log('getUnit.value', response);
        } catch (error) {
            console.error(error);
        }
    };

    // const postSave = async () => {
    //     try {
    //         const formData = new FormData();
    //         if (partImage.value) {
    //             formData.append('partImage', partImage.value);
    //         }

    //         const response = await axios.post('http://localhost:5000/api/PostPropertySave', {
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //         },
    //         params: {
    //             EmployeeID: employeeID,
    //             Title: title.value,
    //             PropertyTypeID: selectedPropertyType.value,
    //             Area: area.value,
    //             UnitID: selectUnit.value,
    //             Bedroom: bedroom.value,
    //             Bathroom: bathroom.value,
    //             Price: price.value,
    //             PartImage: partImage.value,
    //             Detail: detail.value,
    //             ProvincesID: selectedProvince.value,
    //             DistrictsID: selectedDistrict.value,
    //             Mobile: mobile.value,
    //             ProductCondition: selectedItem.value,
    //             SalesTypeID: selectSaleType.value,
    //             StatusID: selectedStatus.value,
    //         },
    //         });

    //         console.log('response', response.data);

    //         if (response.status === 200) {
    //         Swal.fire({
    //             position: 'top',
    //             icon: 'success',
    //             title: 'บันทึกเรียบร้อย!',
    //             text: 'รายการของคุณถูกบันทึกแล้ว',
    //             showConfirmButton: false,
    //             timer: 1500,
    //         });
    //         router.push('/postlist');
    //         } else {
    //         Swal.fire({
    //             position: 'top',
    //             icon: 'error',
    //             title: 'save error!',
    //             text: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล',
    //             showConfirmButton: false,
    //             timer: 5000,
    //         });
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };



    const postSave = async () => {
        try{
            // สร้างไฟล์จากข้อมูลที่เป็นอาร์กิวเมนต์แรกให้ว่างเปล่า
            const formData = new FormData();
            if (partImage.value) {
                formData.append('partImage', partImage.value);
            }
            console.log('formData',formData)
            
            

            const response: AxiosResponse = await axios.post(`http://localhost:5000/api/PostPropertySave`, {
                EmployeeID: employeeID,
                Title: title.value,
                PropertyTypeID:selectedPropertyType.value,
                Area: area.value,
                UnitID: selectUnit.value,
                Bedroom: bedroom.value,
                Bathroom: bathroom.value,
                Price: price.value,
                PartImage: partImage.value,
                Detail: detail.value,
                ProvincesID: selectedProvince.value,
                DistrictsID : selectedDistrict.value,
                Mobile: mobile.value,
                ProductCondition:selectedItem.value,
                SalesTypeID: selectSaleType.value,
                StatusID: selectedStatus.value
            })
            console.log('response',response.data)

            if(response.status == 200){
                Swal.fire({
                        position: 'top',
                        icon: 'success',
                        title: 'บันทึกเรียบร้อย!',
                        text: 'รายการของคุณถูกบันทึกแล้ว',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    router.push('/postlist')
            }
            else{
                Swal.fire({
                        position: 'top',
                        icon: 'error',
                        title: 'save error!',
                        text: "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
                        showConfirmButton: false,
                        timer: 5000
                })
            }
        }
        catch(error){
            console.error(error);
        }
    }
    

    const setHoveredItem = (value: string) => {
        selectedItem.value = value;
    };


    const handleFileChanges = (event) => {
        const file = event.target.files[0];
        partImage.value = file;
    };
    

    const handleFileChange = (event:any) => {
        const files = event.target.files;
        const reader = new FileReader();
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            reader.onload = () => {
                selectedImages.value.push(reader.result);
            };
        reader.readAsDataURL(file);
    }
    };

    const removeImage = (index: number) => {
        selectedImages.value.splice(index, 1);
    };

    onMounted(() => {
        updateIsMobile();
        window.addEventListener('resize', updateIsMobile);

        getProvinces();
        getPropertyType();
        getStatus();
        getSaleType();
        getUnit();
    });

    
    const updateIsMobile = () => {
        isMobile.value = window.innerWidth <= 600; // Adjust the breakpoint as needed
    };
</script>

<style scoped>
    .radio-card:hover {
        background-color: #86d5ff;
        cursor: pointer;
    }
    .loading-center{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
</style>