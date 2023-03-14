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
                  <n-form-item label="ទឹកប្រាក់បង់ កម្ចី (USD)" path="amount" class="w-4/5 mr-8" >
                    <n-input-number :min="0" :max="1000000" v-model:value="amount" clearable placeholder="ទឹកប្រាក់បង កម្ចី (USD)"/>
                  </n-form-item>
                  <div class="w-full my-2 text-sm text-blue-500" >
                    + ប្រាក់ដើមដែលនៅសល់សរុបគឺ ៖ <span class="font-bold text-md" >{{ record.current_balance }} $</span>
                  </div>
                  <div class="w-full my-2 text-sm text-blue-500" >
                    + ប្រាក់ការដែលត្រូវបង់គឺ ៖ <span class="font-bold text-md" >{{ record.monthly_interest_tobepaid }} $</span>
                  </div>
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
    const amount = ref(0)
    const repaymentDate = ref(new Date())
    
    /**
     * Variables
     */    
    const rules = {
        amount: {
          required: true,
          message: 'សូមបញ្ចូលសមតុល្យចាប់ផ្ដើម',
          trigger: [ 'blur']
        }
    }
    /**
     * Functions
     */
    function clearRecord(){
      amount.value = 0.0
    }

    function create(){
      if( amount.value <= 0 ){
        notify.warning({
          'title' : 'ពិនិត្យព័ត៌មាន' ,
          'description' : 'សូមបំពេញ ចំនួនទឹកប្រាក់បង់កម្ចី' ,
          duration : 3000
        })
        return false
      }
      if( props.record.id <= 0 ){
        notify.warning({
          'title' : 'ពិនិត្យព័ត៌មាន' ,
          'description' : 'សូមបញ្ចាក់កម្ចីដែលត្រូវបង់។' ,
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
      store.dispatch( props.model.name+'/repayback',{
        loan_id: props.record.id ,
        amount: amount.value ,
        repayment_date : dateFormat( repaymentDate.value , 'yyyy-mm-dd' ) ,
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

    return {
      /**
       * Variables
       */
      rules ,
      amount ,
      /**
       * Functions
       */
      create
    }
  }
}
</script>