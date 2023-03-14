<template>
  <!-- Form edit account -->
    <div class="vcb-pop-create font-ktr">
      <n-modal v-model:show="show" :on-after-leave="onClose" transform-origin="center">
        <n-card class="w-1/2 font-pvh text-xl" :title="'បន្ថែម ' + model.title" :bordered="false" size="small">
          <template #header-extra>
            <n-button type="success" @click="create()" >
              <template #icon>
                <n-icon>
                  <Save20Regular />
                </n-icon>
              </template>
              រក្សារទុក
            </n-button>
          </template>
          <!-- Form edit account -->
          <div class="crud-create-form w-full border-t">
            <div class=" mx-auto p-4 flex-wrap">
              <div class="crud-form-panel w-full flex flex-wrap ">
                <n-form 
                  class="w-full text-left font-btb text-lg flex flex-wrap" 
                  :label-width="80"
                  :model="record"
                  size="large"
                  ref="formRef"
                >
                  <n-form-item label="សមាជិក" path="people_id" class="w-4/5 mr-8" >
                    <n-select v-model:value="record.people_id" :options="options" placeholder="សមាជិក" filterable />
                  </n-form-item>
                  <n-form-item label="សមតុល្យចាប់ផ្ដើម (USD)" path="balance" class="w-4/5 mr-8" >
                    <n-input-number :min="0" :max="1000000" v-model:value="record.balance" clearable placeholder="សមតុល្យចាប់ផ្ដើម (USD)"/>
                  </n-form-item>
                  <n-form-item label="អាត្រាការប្រាក់ (%)" path="rate" class="w-4/5 mr-8" >
                    <n-input-number :min="0.0001" :max="100" :step="0.0001" v-model:value="record.rate" clearable placeholder="អាត្រាការប្រាក់ (%)" />
                  </n-form-item>
                  <n-form-item label="អាយុ (ខែ)" path="duration" class="w-4/5 mr-8" >
                    <n-input-number :min="1" :max="1200" v-model:value="record.duration" clearable placeholder="អាយុ (ខែ)" />
                  </n-form-item>
                  <n-form-item label="ថ្ងៃចាប់ផ្ដើម" path="start_date" class="w-4/5 mr-8" >
                    <n-date-picker v-model:value="record.start_date" type="date" placeholder="ថ្ងៃចាប់ផ្ដើម"/>
                  </n-form-item>
                </n-form>
                <div class="w-1/2 h-8"></div>  
              </div>
            </div>
          </div>
          <!-- End form edit account -->
          <template #footer></template>
        </n-card>
      </n-modal>
    </div>
    <!-- End of edit account -->
</template>
<script>
import { reactive, ref , computed } from 'vue'
import { useStore } from 'vuex'
import { useMessage, useNotification } from 'naive-ui'
import { Save20Regular } from '@vicons/fluent'
import dateFormat, { masks } from "dateformat"

export default {
  components: {
    Save20Regular
  },
  props: {
    model: {
      type: Object ,
      required: true ,
      default: () => {
        return reactive({
          name: 'Undefined' ,
          title: 'No title'
        })
      },
      // validator: (val) => {}
    } , 
    people: {
      type: Array ,
      required: true ,
      default: () => {
        return ref([])
      }
    },
    record: {
      type: Object ,
      required: false ,
      default: () => {
        return reactive({
          id: 0 ,
          people_id: '' ,
          balance: 0.0 ,
          rate: 0.0 ,
          duration: 0 ,
          start_date: new Date()
        })
      },
      // validator: (val) => {
      //   for(var field in ['id','username','firstname','lastname','email','phone','password','active'] ){
      //     if( !val.hasOwnProperty(field) ) return false
      //   }
      //   return true 
      // }
    },
    show: {
      type: Boolean ,
      default: false
    },
    onClose: {
      type: Function
    } ,
    // onShow: {
    //   type: Function
    // }
  },
  setup(props){
    const store = useStore()
    const message = useMessage()
    const notify = useNotification()
    
    /**
     * Variables
     */    
    const rules = {
        balance: {
          required: true,
          message: 'សូមបញ្ចូលសមតុល្យចាប់ផ្ដើម',
          trigger: [ 'blur']
        },
        rate: {
          required: true,
          message: 'សូមបញ្ចូលអត្រាការប្រាក់',
          trigger: [ 'blur']
        },
        people_id: {
          required: true,
          message: 'សូមជ្រើសរើសសមាជិកកម្ចី',
          trigger: [ 'blur']
        },
        start_date: {
          required: true,
          message: 'សូមជ្រើសរើសថ្ងៃចាប់ផ្ដើមកម្ចី',
          trigger: [ 'blur']
        },
        duration: {
          required: true,
          message: 'សូមបញ្ចូលចំនួនអាយុកម្ចី (គិតជាខែ)',
          trigger: [ 'blur']
        },
    }
    const helpers = reactive({
      username: false ,
      email: false ,
      phone: false ,
    })
    /**
     * Functions
     */
    function clearRecord(){
      props.record = {
        id : 0 ,
        people_id: '' ,
        balance: 0.0 ,
        rate: 0.0 ,
        duration: 0 ,
        start_date: new Date()
      }
    }

    function create(){
      if( props.record.people_id <= 0 ){
        notify.warning({
          'title' : 'ពិនិត្យព័ត៌មាន' ,
          'description' : 'សូមបំពេញ សមាជិកកម្ចី' ,
          duration : 3000
        })
        return false
      }
      if( props.record.balance <= 0 ){
        notify.warning({
          'title' : 'ពិនិត្យព័ត៌មាន' ,
          'description' : 'សូមបំពេញ សមតុល្យចាប់ផ្ដើម។' ,
          duration : 3000
        })
        return false
      }
      if( props.record.rate <= 0 ){
        notify.warning({
          'title' : 'ពិនិត្យព័ត៌មាន' ,
          'description' : 'សូមបំពេញ អាត្រាការប្រាក់' ,
          duration : 3000
        })
        return false
      }
      if( props.record.duration <= 0 ){
        notify.warning({
          'title' : 'ពិនិត្យព័ត៌មាន' ,
          'description' : 'សូមបំពេញ ចំនួនអាយុនៃកម្ចី' ,
          duration : 3000
        })
        return false
      }
      if( props.model === undefined || props.model.name == "" ){
        notify.warning({
          'title' : 'ពិនិត្យព័ត៌មាន' ,
          'description' : 'ទម្រង់នៃព័ត៌មានមិនទាន់បានកំណត់។' ,
          duration : 3000
        })
        return false
      }
      store.dispatch( props.model.name+'/create',{
        // id: props.record.id ,
        balance: props.record.balance ,
        rate: props.record.rate ,
        duration: props.record.duration ,
        start_date: dateFormat( props.record.start_date , 'yyyy-mm-dd' ) ,
        people_id: props.record.people_id
      }).then( res => {
        switch( res.status ){
          case 200 : 
            notify.warning({
              'title' : 'រក្សារទុកព័ត៌មាន' ,
              'description' : res.data.message ,
              duration : 3000
            })
            clearRecord()
            props.onClose()
          break;
        }
      }).catch( err => {
        console.log( err )
        notify.error({
          'title' : 'រក្សារទុកព័ត៌មាន' ,
          'description' : 'មានបញ្ហាក្នុងពេលរក្សារទុកព័ត៌មាន។' ,
          duration : 3000
        })
      })
    }
    
    // function checkUsername(){
    //   if( props.record.username != "" ){
    //     store.dispatch('user/checkUsername',{username: props.record.username}).then( res => {
    //       if( res.data.ok ){
    //         notify.info({
    //           title: 'ពិនិត្យឈ្មោះអ្នកប្រើប្រាស់' ,
    //           description : "ឈ្មោះអ្នកប្រើប្រាស់ មានរួចហើយ។" ,
    //           duration : 3000
    //         })
    //       }
    //     }).catch( err => {
    //       console.log( err )
    //       notify.error({
    //         'title' : 'ពិនិត្យឈ្មោះអ្នកប្រើប្រាស់' ,
    //         'description' : 'មានបញ្ហាក្នុងពេលពិនិត្យឈ្មោះអ្នកប្រើប្រាស់។' ,
    //         duration : 3000
    //       })
    //     })
    //   }
    // }
    // function checkPhone(){
    //   if( props.record.phone != "" ){
    //     store.dispatch('user/checkPhone',{phone: props.record.phone}).then( res => {
    //       if( res.data.ok ){
    //         notify.info({
    //           title: 'ពិនិត្យលេខទូរស័ព្ទ' ,
    //           description : "លេខទូរស័ព្ទ មានរួចហើយ។" ,
    //           duration : 3000
    //         })
    //       }
    //     }).catch( err => {
    //       console.log( err )
    //       notify.error({
    //         'title' : 'ពិនិត្យលេខទូរស័ព្ទ' ,
    //         'description' : 'មានបញ្ហាក្នុងពេលពិនិត្យលេខទូរស័ព្ទ។' ,
    //         duration : 3000
    //       })
    //     })
    //   }
    // }
    // function checkEmail(){
    //   if( props.record.email != "" ){
    //     store.dispatch('user/checkEmail',{email: props.record.email}).then( res => {
    //       if( res.data.ok ){
    //         notify.info({
    //           title: 'ពិនិត្យអ៊ីមែល' ,
    //           description : "ពិនិត្យអ៊ីមែល មានរួចហើយ។" ,
    //           duration : 3000
    //         })
    //       }
    //     }).catch( err => {
    //       console.log( err )
    //       notify.error({
    //         'title' : 'រក្សារទុកព័ត៌មាន' ,
    //         'description' : 'មានបញ្ហាក្នុងពេលពិនិត្យអ៊ីមែល។' ,
    //         duration : 3000
    //       })
    //     })
    //   }
    // }

    const options = computed( () => {
      return props.people.length > 0 ? props.people.map( p => { return {label: p.id + ". " +p.lastname + " " + p.firstname + " , " + p.email + " , " + p.mobile_phone, value: p.id } }) : []
    })

    return {
      /**
       * Variables
       */
      rules ,
      options ,
      /**
       * Functions
       */
      create ,
      // checkUsername ,
      // checkPhone ,
      // checkEmail
    }
  }
}
</script>