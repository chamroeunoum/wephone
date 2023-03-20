<template>
  <!-- Form edit account -->
    <div class="vcb-pop-create font-ktr">
      <n-modal v-model:show="show" :on-after-leave="onClose" transform-origin="center" :on-after-enter="initialData" >
        <n-card class="w-1/2 font-pvh text-xl" :title="productTitle" :bordered="false" size="small">
          <template #header-extra>
            
          </template>
          <!-- Form edit account -->
          <div class="crud-create-form w-full border-t">
            <div class=" mx-auto p-4 flex-wrap">
              <div class="crud-form-panel w-full flex flex-wrap border-gray-200 border p-2 hidden">
                <!-- <div class="w-1/2 px-1 border-gray-200 border-b py-2">ឈ្មោះអតិថិជន ៖ <span class="font-bold text-blue-500" >{{  repayback.loan.people.lastname + " " + repayback.loan.people.firstname }}</span></div>
                <div class="w-1/2 px-1 border-gray-200 border-b py-2">លេខកូដ ៖ <span class="font-bold text-gray-700"  >{{ repayback.loan.code }}</span></div>

                <div class="w-1/3 px-1 border-gray-200 border-b py-2">សមតុល្យគ្រាដើម ៖ <span class="font-bold text-blue-500" >{{  parseFloat( repayback.loan.balance ).toFixed(2) }} USD</span></div>
                <div class="w-1/3 px-1 border-gray-200 border-b py-2">អាត្រាការប្រាក់ ៖ <span class="font-bold text-blue-500" >{{  parseFloat( repayback.loan.rate ).toFixed(2) }} %</span></div>
                <div class="w-1/3 px-1 border-gray-200 border-b py-2">ថ្ងៃចាប់ផ្ដើម ៖ <span class="font-bold text-blue-500" >{{  repayback.loan.start_date }}</span></div>
                
                
                <div class="w-1/2 px-1 border-gray-200 border-b py-2">សរុបការប្រាក់បានបង់ ៖ <span class="font-bold text-yellow-500" >{{  parseFloat( repayback.totalInterestPaid ).toFixed(2) }} USD</span></div>
                <div class="w-1/2 px-1 border-gray-200 border-b py-2">ប្រាក់ការដែលជំពាក់ ៖ <span class="font-bold text-blue-500" >{{  parseFloat( repayback.totalInterestOwned ).toFixed(2) }} USD</span></div>

                <div class="w-1/2 px-1 py-2">សរុបប្រាក់ដើមដែលបានបង់ ៖ <span class="font-bold text-green-500" >{{  parseFloat( repayback.totalRepayback ).toFixed(2) }} USD</span></div>
                <div class="w-1/2 px-1 py-2">សរុបប្រាក់ដើមដែលនៅសល់ ៖ <span class="font-bold text-green-500" >{{  parseFloat( repayback.currentBalance ).toFixed(2) }} USD</span></div> -->
              </div>
              <div class="crud-form-panel w-full flex flex-wrap my-8">
                <div class="w-full h-12 p-2 text-center fold-bold font-muol border-b border-gray-100 mb-8 hidden" >ប្រតិបត្តិការក្នុងឃ្លាំង</div>
                <div class="w-full mb-2 border-b border-gray-100 flex flex-row">
                  <div class="font-bold w-20" >ល.រ</div>
                  <div class="font-bold w-48" >ចំនួន</div>
                  <div class="font-bold w-40" >ប្រភេទប្រតិបត្តិការ</div>
                  <div class="font-bold w-60" >អ្នកធ្វើប្រតិបត្តិការ</div>
                  <div class="font-bold w-60" >កាលបរិច្ឆែទ</div>
                </div>
                <div v-for="(transaction, index) in transactions" class="w-full mb-2 flex flex-row">
                  <div class="font-bold w-20" >{{ transaction.id }}</div>
                  <div class="text-yellow-500 w-48" >{{ transaction.quantity }}</div>
                  <div class="text-green-500 w-40" >{{ transaction.type.name }}</div>
                  <div class="text-green-500 w-60" >{{ transaction.user.lastname + " " + transaction.user.firstname }}</div>
                  <div class="text-blue-500 w-60" >{{ dateFormat( transaction.created_at , 'yyyy-mm-dd H:MM' ) }}</div>
                </div>
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
import dateFormat, { masks } from "dateformat";

export default {
  components: {
    
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
    const transactions = ref([])

    const productTitle = computed( () => {
      return props.record.product !== undefined && props.record.product !== null ? "ប្រតិបត្តិការរបស់ផលិតផល ៖ " + props.record.product.description : "ប្រតិបត្តិការរបស់ផលិតផល"
    })

    /**
     * Functions
     */
    function getTransactions(){
      /**
       * Clear time interval after calling
       */
      store.dispatch('stock/transactions',{
        search: '' ,
        perPage: 100 ,
        page: 1 ,
        stock_id : props.record.id
      }).then(res => {
        if( res.data.ok ){
          transactions.value = res.data.records
        }else{
          transactions.value = []
          console.log( "There is problem retriving transactions." )
        }
      }).catch( err => {
        console.log( err )
      })
    }


    function initialData(){
      getTransactions()
    }

    return {
      /**
       * Variables
       */
      transactions ,
      productTitle ,
      /**
       * Functions
       */
      initialData ,
      dateFormat 
    }
  }
}
</script>