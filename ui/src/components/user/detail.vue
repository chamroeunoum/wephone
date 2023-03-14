<template>
  <div>
  <!-- Top action panel of crud -->
    <div class="flex title-bar border-b border-gray-200">
      <!-- Title of crud -->
      <div class="flex w-64 h-10 py-1 title " >
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M258.9 48C141.92 46.42 46.42 141.92 48 258.9c1.56 112.19 92.91 203.54 205.1 205.1c117 1.6 212.48-93.9 210.88-210.88C462.44 140.91 371.09 49.56 258.9 48zm126.42 327.25a4 4 0 0 1-6.14-.32a124.27 124.27 0 0 0-32.35-29.59C321.37 329 289.11 320 256 320s-65.37 9-90.83 25.34a124.24 124.24 0 0 0-32.35 29.58a4 4 0 0 1-6.14.32A175.32 175.32 0 0 1 80 259c-1.63-97.31 78.22-178.76 175.57-179S432 158.81 432 256a175.32 175.32 0 0 1-46.68 119.25z" fill="currentColor"></path><path d="M256 144c-19.72 0-37.55 7.39-50.22 20.82s-19 32-17.57 51.93C191.11 256 221.52 288 256 288s64.83-32 67.79-71.24c1.48-19.74-4.8-38.14-17.68-51.82C293.39 151.44 275.59 144 256 144z" fill="currentColor"></path></svg>
        <div class="font-muol ml-2 leading-9" v-html="model.title" ></div>
      </div>
      <!-- Actions button of the crud -->
      <div class="flex-grow action-buttons flex-row-reverse flex">
        <!-- New Button -->
        <div class="mt-1 ml-2">
          <n-button type="default" @click="$router.push('/'+model.name)" >
            <template #icon>
              <n-icon>
                <ArrowBackCircleOutline />
              </n-icon>
            </template>
            បញ្ជីគណនី
          </n-button>
        </div>
        <div class="w-2/5 relative " ></div>
      </div>
      <!-- Filter panel of crud -->
      <!-- <div class="filters-bar"></div> -->
    </div>
    <!-- Table of crud -->
    <div class="vcb-table-panel relative m-8 p-8">
      <div class="pk-account-info w-full">
        <div class="flex-none w-60 h-60 border rounded-full m-auto">
          <img :src="profilePicture!==false?profilePicture:'/src/assets/wephone.png'" class="w-full rounded-full bg-white p-2" :alt="name" :title="name" />
        </div>
      </div>
      <div class="pk-account-panel m-auto w-3/5 p-8 text-left text-md" >
        <div class="mb-4 border-b border-gray-200 py-4 " >ឈ្មោះប្រើក្នុងប្រព័ន្ធ ៖ {{ record.username }}</div>
        <div class="mb-4 border-b border-gray-200 py-4 " >គោត្តនាម ៖ {{ record.lastname }}</div>
        <div class="mb-4 border-b border-gray-200 py-4 ">នាម ៖ {{ record.firstname }}</div>
        <div class="mb-4 border-b border-gray-200 py-4 ">ទូរស័ព្ទ ៖ {{ record.phone }}</div>
        <div class="mb-4 border-b border-gray-200 py-4 ">អ៊ីមែល ៖ {{ record.email }}</div>
        <div class="mb-4 border-b border-gray-200 py-4 ">ងារ ៖ {{ record.contesty_id > 0 ? "មានងារ" : "មិនមានងារ" }}</div>
        <div class="mb-4 border-b border-gray-200 py-4 ">ភេទ ៖ ប្រុស</div>
        <div class="mb-4 border-b border-gray-200 py-4 ">ថ្ងៃខែឆ្នាំកំណើត ៖ ១៨ មីនា ១៩៨៤</div>
      </div>
      <!-- <div class="pk-owner-information" ></div> -->
    </div>
  </div>
</template>
<script>
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import QrcodeVue from 'qrcode.vue'
import Vue3Barcode from 'vue3-barcode'
import { Switcher } from '@vicons/carbon'
import { Icon } from '@vicons/utils'
import { IosCheckmarkCircleOutline, IosRefresh } from '@vicons/ionicons4'
import { TrashOutline, CloseCircleOutline, ArrowBackCircleOutline } from '@vicons/ionicons5'
import { useDialog, useMessage, useNotification } from 'naive-ui'
import { Edit20Regular, Key16Regular, Save20Regular, Add20Regular, Search20Regular , ContactCard28Regular } from '@vicons/fluent'
/**
 * CRUD component form
 */
import CreateForm from './create.vue'
import UpdateForm from './update.vue'
export default {
  name: "User" ,
  components: {
    QrcodeVue ,
    Vue3Barcode,
    Switcher,
    Add20Regular ,
    Icon,
    IosCheckmarkCircleOutline,
    CreateForm,
    IosRefresh ,
    CloseCircleOutline ,
    UpdateForm,
    Search20Regular ,
    Edit20Regular,
    Key16Regular,
    Save20Regular ,
    TrashOutline ,
    ContactCard28Regular,
    ArrowBackCircleOutline
  },
  setup(){
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const dialog = useDialog()
    const message = useMessage()
    const notify = useNotification()
    
    /**
     * Variables
     */    
    var model = reactive( {
      name: "user" ,
      title: "គណនី និង ព័ត៌មានលម្អិត"
    })
    var record = reactive({
      active: 0 ,
      avatar_url : null ,
      email : "" ,
      firstname : "" ,
      id : 0 ,
      lastname : "" ,
      people_id : 0 ,
      person : {
        id: 0, 
        countesy_id: null, 
        firstname: "", 
        lastname: "", 
        gender: null, 
        dob: null
      },
      phone : "" ,
      role : 0 ,
      username : "" 
    })

    const profilePicture = computed( () => {
      return record.avatar_url !== null ? record.avatar_url : false
    })
    /**
     * Functions
     */
    function getRecord(){
      /**
       * Clear time interval after calling
       */
      store.dispatch(model.name+'/read',{
        id: route.params.id
      }).then(res => {
        if( res.data.ok ){
          var rec = res.data.record
          record.active = rec.active
          record.avatar_url = rec.avatar_url
          record.email = rec.email
          record.firstname = rec.firstname
          record.id = rec.id
          record.lastname = rec.lastname
          record.people_id = rec.people_id
          record.phone = rec.phone
          record.role = rec.role
          record.username = rec.username
          record.person.countesy_id = rec.person.countesy_id
          record.person.firstname = rec.person.firstname
          record.person.lastname = rec.person.lastname
          record.person.gender = rec.person.gender
          record.person.dob = rec.person.dob
          console.log( record )
        }else{
          notify.error({
            title: '' ,
            description: '' ,
            duration: 3000
          })
        }
      }).catch( err => {
        console.log( err )
      })
    }

    const name = computed(() => {
      return record !== null && record.name !== null && record.name !== undefined ? record.name : "" 
    })

    /**
     * Initial the data
     */
    getRecord()


    return {
      /**
       * Variables
       */
      model ,
      record ,
      profilePicture ,
      name
      /**
       * Functions
       */
    }
  }
}

</script>

<style scoped>
  .vcb-table-panel {
    @apply absolute right-4 left-4 mt-4 mb-16 top-12 bottom-0 overflow-auto;
  }
  .vcb-table {
    @apply w-full ;
  }
  .vcb-table tr.vcb-table-row {
    @apply border-b border-gray-100 text-left ;
  }
  .vcb-table tr.vcb-table-row td {
    @apply p-2;
  }
  .vcb-table-actions-panel {
    @apply flex flex-row-reverse ;
  }
  .vcb-table-actions-panel .vcb-action-button {
    @apply  rounded-full border border-gray-200 w-8 h-8 mx-2 text-center cursor-pointer hover:border-blue-500 hover:text-blue-500  duration-300;
  }
  .vcb-table-headers {
    @apply border-b border-gray-200;
  }
  .vcb-table-headers .vcb-table-header {
    @apply px-2 py-4 text-left ;
  }
  .vcb-table-pagination {
    @apply flex flex-row absolute bg-white right-0 bottom-0 border border-l p-3 ;
  }
  .vcb-pagination-page {
    @apply  rounded-full border border-gray-200 mx-1 leading-7 w-8 h-8 font-bold cursor-pointer hover:text-blue-500 hover:border-blue-500 duration-300;
  }
</style>