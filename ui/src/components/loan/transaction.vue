<template>
  <!-- Form edit account -->
    <div class="vcb-pop-create font-ktr">
      <n-modal v-model:show="show" :on-after-leave="onClose" transform-origin="center">
        <n-card class="w-1/2 font-pvh text-xl" title="ប្រតិបត្តិការកម្ចី" :bordered="false" size="small">
          <template #header-extra>
            
          </template>
          <!-- Form edit account -->
          <div class="crud-create-form w-full border-t">
            <div class=" mx-auto p-4 flex-wrap">
              <div class="crud-form-panel w-full flex flex-wrap border-gray-200 border p-2">
                <div class="w-1/2 px-1 border-gray-200 border-b py-2">ឈ្មោះអតិថិជន ៖ <span class="font-bold text-blue-500" >{{  repayback.loan.people.lastname + " " + repayback.loan.people.firstname }}</span></div>
                <div class="w-1/2 px-1 border-gray-200 border-b py-2">លេខកូដ ៖ <span class="font-bold text-gray-700"  >{{ repayback.loan.code }}</span></div>

                <div class="w-1/3 px-1 border-gray-200 border-b py-2">សមតុល្យគ្រាដើម ៖ <span class="font-bold text-blue-500" >{{  parseFloat( repayback.loan.balance ).toFixed(2) }} USD</span></div>
                <div class="w-1/3 px-1 border-gray-200 border-b py-2">អាត្រាការប្រាក់ ៖ <span class="font-bold text-blue-500" >{{  parseFloat( repayback.loan.rate ).toFixed(2) }} %</span></div>
                <div class="w-1/3 px-1 border-gray-200 border-b py-2">ថ្ងៃចាប់ផ្ដើម ៖ <span class="font-bold text-blue-500" >{{  repayback.loan.start_date }}</span></div>
                
                
                <div class="w-1/2 px-1 border-gray-200 border-b py-2">សរុបការប្រាក់បានបង់ ៖ <span class="font-bold text-yellow-500" >{{  parseFloat( repayback.totalInterestPaid ).toFixed(2) }} USD</span></div>
                <div class="w-1/2 px-1 border-gray-200 border-b py-2">ប្រាក់ការដែលជំពាក់ ៖ <span class="font-bold text-blue-500" >{{  parseFloat( repayback.totalInterestOwned ).toFixed(2) }} USD</span></div>

                <div class="w-1/2 px-1 py-2">សរុបប្រាក់ដើមដែលបានបង់ ៖ <span class="font-bold text-green-500" >{{  parseFloat( repayback.totalRepayback ).toFixed(2) }} USD</span></div>
                <div class="w-1/2 px-1 py-2">សរុបប្រាក់ដើមដែលនៅសល់ ៖ <span class="font-bold text-green-500" >{{  parseFloat( repayback.currentBalance ).toFixed(2) }} USD</span></div>
              </div>
              <div class="crud-form-panel w-full flex flex-wrap my-8">
                <div class="w-full h-12 p-2 text-center fold-bold font-muol border-b border-gray-100 mb-8 " >ប្រតិបត្តិការសង់ត្រឡប់</div>
                <div class="w-full grid grid-cols-5 gap-2 mb-2 border-b border-gray-100">
                  <div class="font-bold" >ល.រ</div>
                  <div class="font-bold" >សមតុល្យ</div>
                  <div class="font-bold" >ប្រាក់ធ្វើប្រតិបត្តិការ</div>
                  <div class="font-bold" >ប្រភេទប្រតិបត្តិការ</div>
                  <div class="font-bold" >កាលបរិច្ឆែទ</div>
                </div>
                <div v-for="(transaction, index) in repayback.records" class="w-full grid grid-cols-5 gap-2 mb-2">
                  <div class="font-bold" >{{ index + 1 }}</div>
                  <div class="text-blue-500" >{{ transaction.current_balance.toFixed(2) }} USD</div>
                  <div class="text-yellow-500" >{{ transaction.amount.toFixed(2) }} USD</div>
                  <div class="text-green-500" >{{ transaction.type.name }}</div>
                  <div class="text-blue-500" >{{ transaction.repayment_date }}</div>
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
    repayback: {
      required: true ,
      default: () => {
        return ref(null)
      }
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

    console.log( "repayback : " )
    console.log( props.repayback )

    return {
      /**
       * Variables
       */
      
      /**
       * Functions
       */
      
    }
  }
}
</script>