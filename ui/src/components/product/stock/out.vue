<template>
  <!-- Form edit account -->
    <div class="vcb-pop-create font-ktr">
      <n-modal v-model:show="show" :on-after-leave="onClose" transform-origin="center">
        <n-card class="w-1/2 font-pvh text-xl" title="ដកផលិតផលចេញពីឃ្លាំង" :bordered="false" size="small">
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
                  <n-form-item class="w-4/5 mr-8">
                    <div class="" >{{ record.product !== null ? record.id + " - " + record.product.description + " - " + record.product.origin : ''  }}</div>
                  </n-form-item>
                  <n-form-item label="ចំនួនផលិតផល" path="quantity" class="w-4/5 mr-8" >
                    <n-input-number :min="1" :max="1000000" v-model:value="quantity" clearable placeholder="បញ្ចូលបរិមាណផលិតផលបន្ថែម" @keyup="handleQuantityKeyup" />
                  </n-form-item>
                  <div class="w-full my-2 text-sm text-blue-500" >
                    + បរិមាណបច្ចុប្បន្ន ៖ <span class="font-bold text-md" >{{ record.quantity }} $</span>
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
          product_id: 0 ,
          unit_id: 0 ,
          attribute_variant_id : 0 ,
          quantity : 0 ,
          product : null
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
    const quantity = ref(0)
    
    /**
     * Variables
     */    
    const rules = {
        quantity: {
          required: true,
          message: 'សូមបញ្ចូលបរិមាណផលិតផល',
          trigger: [ 'blur']
        }
    }
    /**
     * Functions
     */
    function clearRecord(){
      quantity.value = 0.0
    }

    function create(){
      if( quantity.value <= 0 ){
        notify.warning({
          'title' : 'ពិនិត្យព័ត៌មាន' ,
          'description' : 'បរិមាណផលិតផលយ៉ាងហោច 1 ។' ,
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
      store.dispatch( props.model.name+'/out',{
        stock_id: props.record.id ,
        quantity: quantity.value
      }).then( res => {
        switch( res.status ){
          case 200 : 
            notify.success({
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
    
    function handleQuantityKeyup(e){
      if( e.keyCode == 13 ){
        create()
      }
    }

    return {
      /**
       * Variables
       */
      rules ,
      quantity ,
      /**
       * Functions
       */
      create ,
      handleQuantityKeyup
    }
  }
}
</script>