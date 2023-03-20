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
          <n-button type="success" @click="showCreateModal()" >
            <template #icon>
              <n-icon>
                <Add20Regular />
              </n-icon>
            </template>
            បន្ថែម
          </n-button>
        </div>
        <div class="w-2/5 relative" >
          <input type="text" @keypress.enter="filterRecords(false)" v-model="table.search" class="bg-gray-100 px-2 h-9 my-1 w-full rounded border border-gray-200 focus:border-blue-600 hover:border-blue-600 " placeholder="ស្វែងរក" />
          <Icon size="27" class="absolute right-1 top-2 text-gray-400 hover:text-blue-700 cursor-pointer" @click="filterRecords(false)" >
            <n-icon>
              <Search20Regular />
            </n-icon>
          </Icon>
        </div>
        
      </div>
      <!-- Filter panel of crud -->
      <div class="filters-bar"></div>
    </div>
    <!-- Table of crud -->
    <div class="vcb-table-panel relative">
      <table class="vcb-table" >
        <tr class="vcb-table-headers" >
          <th class="vcb-table-header" >ល.រ</th>
          <th class="vcb-table-header">ឈ្មោះ</th>
          <th class="vcb-table-header">ប្រភព</th>
          <th class="vcb-table-header">លក្ខណបន្សំ</th>
          <th class="vcb-table-header">ឯកតា</th>
          <th class="vcb-table-header">ចំនួន</th>
          <th class="vcb-table-header text-right w-20" >ប្រតិបត្តិការ</th>
        </tr>
        <tr v-for="(record, index) in table.records.matched" :key='index' class="vcb-table-row" >
          <td class="vcb-table-cell font-bold" >{{ index + 1 }}</td>
          <td class="vcb-table-cell" >{{ record.product.description }}</td>
          <td class="vcb-table-cell" >{{ record.product.origin }}</td>
          <td class="vcb-table-cell" >{{ record.attributeVariant.variants.map( v => v.name ).join(', ') }}</td>
          <td class="vcb-table-cell" >{{ record.unit.name }}</td>
          <td  class="vcb-table-cell" ><!-- <n-input-number :min="0" :max="10000000" type="text" class="inline-input" v-model:value="record.quantity" @blur="inlineUpdate(record)" ></n-input-number> -->{{ record.quantity }}
          </td>
          <td class="vcb-table-actions-panel text-right" >
            <n-icon size="22" class="cursor-pointer text-red-500 mx-1" title="ដកស្ដុក" @click="showStockOutModal(record)" >
              <!-- <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M4.5 2A1.5 1.5 0 0 0 3 3.5v13A1.5 1.5 0 0 0 4.5 18h7a1.5 1.5 0 0 0 1.5-1.5V15a.5.5 0 0 0-.5-.5c-.413 0-.677-.102-.856-.236c-.183-.137-.322-.342-.424-.623c-.214-.588-.22-1.367-.22-2.141a.5.5 0 0 0-.147-.354l-.286-.287l-1.213-1.213c-.467-.467-.604-.78-.63-.955c-.02-.14.022-.234.122-.33c.214-.205.367-.344.54-.386c.103-.026.338-.044.76.378l3 3a.5.5 0 0 0 .708-.707L13 9.793V6.707l2.56 2.56a1.5 1.5 0 0 1 .44 1.061V17.5a.5.5 0 0 0 1 0v-7.172a2.5 2.5 0 0 0-.732-1.767L13 5.293V3.5A1.5 1.5 0 0 0 11.5 2h-7zM12 5.5v3.293l-1.146-1.147c-.579-.578-1.154-.777-1.705-.643a1.517 1.517 0 0 0-.313.115A3.001 3.001 0 0 0 5 10a3 3 0 0 0 5.007 2.23c.017.578.075 1.21.273 1.753c.148.407.384.796.764 1.08l.006.006A1.5 1.5 0 0 0 10 16.5v.5H6v-.5A1.5 1.5 0 0 0 4.5 15H4V5h.5A1.5 1.5 0 0 0 6 3.5V3h4v.5A1.5 1.5 0 0 0 11.5 5h.5v.5zm0 11v.009a.5.5 0 0 1-.5.491H11v-.5a.5.5 0 0 1 .5-.5h.5v.5zM6 10a2 2 0 0 1 1.874-1.996c-.124.23-.187.51-.139.833c.071.482.378.983.911 1.516l.907.907A2 2 0 0 1 6 10zM5 3v.5a.5.5 0 0 1-.5.5H4v-.5a.5.5 0 0 1 .5-.5H5zM4 16h.5a.5.5 0 0 1 .5.5v.5h-.5a.5.5 0 0 1-.5-.5V16zm8-12h-.5a.5.5 0 0 1-.5-.5V3h.5a.5.5 0 0 1 .5.5V4z" fill="currentColor"></path></g></svg> -->
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M11.3 2.48a3.5 3.5 0 0 0-2.6 0L2.943 4.785A1.5 1.5 0 0 0 2 6.176v7.646a1.5 1.5 0 0 0 .943 1.393L8.7 17.518a3.5 3.5 0 0 0 1.375.25a5.5 5.5 0 0 1-.613-1.058a2.51 2.51 0 0 1-.39-.12l-5.758-2.303A.5.5 0 0 1 3 13.822V6.238l6.5 2.6v3.367a5.51 5.51 0 0 1 1-1.48V8.838l6.5-2.6V9.6c.358.183.693.404 1 .657v-4.08a1.5 1.5 0 0 0-.943-1.393L11.3 2.48zm-2.228.93a2.5 2.5 0 0 1 1.857 0l5.225 2.09l-2.279.91l-6.154-2.46l1.35-.54zM6.375 4.487l6.154 2.461L10 7.961L3.846 5.499l2.529-1.011zM19 14.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0zm-2.646-1.146a.5.5 0 0 0-.708-.708L14.5 13.793l-1.146-1.147a.5.5 0 0 0-.708.708l1.147 1.146l-1.147 1.146a.5.5 0 0 0 .708.708l1.146-1.147l1.146 1.147a.5.5 0 0 0 .708-.708L15.207 14.5l1.147-1.146z" fill="currentColor"></path></g></svg>
            </n-icon>
            <n-icon size="22" class="cursor-pointer text-green-500 mx-1" title="បញ្ចូលស្តុក" @click="showStockInModal(record)" >
              <!-- <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M4.5 2A1.5 1.5 0 0 0 3 3.5v13A1.5 1.5 0 0 0 4.5 18h7a1.5 1.5 0 0 0 1.5-1.5V15a.5.5 0 0 0-.5-.5c-.413 0-.677-.102-.856-.236c-.183-.137-.322-.342-.424-.623c-.214-.588-.22-1.367-.22-2.141a.5.5 0 0 0-.147-.354l-.286-.287l-1.213-1.213c-.467-.467-.604-.78-.63-.955c-.02-.14.022-.234.122-.33c.214-.205.367-.344.54-.386c.103-.026.338-.044.76.378l3 3a.5.5 0 0 0 .708-.707L13 9.793V6.707l2.56 2.56a1.5 1.5 0 0 1 .44 1.061V17.5a.5.5 0 0 0 1 0v-7.172a2.5 2.5 0 0 0-.732-1.767L13 5.293V3.5A1.5 1.5 0 0 0 11.5 2h-7zM12 5.5v3.293l-1.146-1.147c-.579-.578-1.154-.777-1.705-.643a1.517 1.517 0 0 0-.313.115A3.001 3.001 0 0 0 5 10a3 3 0 0 0 5.007 2.23c.017.578.075 1.21.273 1.753c.148.407.384.796.764 1.08l.006.006A1.5 1.5 0 0 0 10 16.5v.5H6v-.5A1.5 1.5 0 0 0 4.5 15H4V5h.5A1.5 1.5 0 0 0 6 3.5V3h4v.5A1.5 1.5 0 0 0 11.5 5h.5v.5zm0 11v.009a.5.5 0 0 1-.5.491H11v-.5a.5.5 0 0 1 .5-.5h.5v.5zM6 10a2 2 0 0 1 1.874-1.996c-.124.23-.187.51-.139.833c.071.482.378.983.911 1.516l.907.907A2 2 0 0 1 6 10zM5 3v.5a.5.5 0 0 1-.5.5H4v-.5a.5.5 0 0 1 .5-.5H5zM4 16h.5a.5.5 0 0 1 .5.5v.5h-.5a.5.5 0 0 1-.5-.5V16zm8-12h-.5a.5.5 0 0 1-.5-.5V3h.5a.5.5 0 0 1 .5.5V4z" fill="currentColor"></path></g></svg> -->
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M10.591 2.513a3.75 3.75 0 0 1 2.818 0l7.498 3.04A1.75 1.75 0 0 1 22 7.175v5.635a6.52 6.52 0 0 0-1.5-1.077v-3.96l-7.75 2.992v2.298a6.492 6.492 0 0 0-1.5 2.645v-4.944L3.5 7.75v9.078a.25.25 0 0 0 .156.231l7.499 3.04c.031.013.063.025.095.036l.189.076c.059.024.118.044.179.06c.248.526.565 1.014.94 1.451a3.75 3.75 0 0 1-1.967-.233l-7.498-3.04A1.75 1.75 0 0 1 2 16.827V7.176a1.75 1.75 0 0 1 1.093-1.622l7.498-3.04zm2.254 1.39a2.25 2.25 0 0 0-1.69 0L9.24 4.68l7.527 2.927l2.67-1.03l-6.593-2.673zM4.59 6.564l7.411 2.883l2.69-1.04L7.216 5.5L4.59 6.564zM17.5 23.001a5.5 5.5 0 1 0 0-11a5.5 5.5 0 0 0 0 11zm-1-4.207l3.646-3.647a.5.5 0 0 1 .708.707l-4 4a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.707l1.646 1.647z" fill="currentColor"></path></g></svg>
            </n-icon>
            <!-- <n-icon size="22" class="cursor-pointer text-yellow-500 mx-1" @click="showScheduleModal(record)" title="ប្រតិបត្តិការចេញចូល" >
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M25.7 9.3l-7-7c-.2-.2-.4-.3-.7-.3H8c-1.1 0-2 .9-2 2v24c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V10c0-.3-.1-.5-.3-.7zM18 4.4l5.6 5.6H18V4.4zM24 28H8V4h8v6c0 1.1.9 2 2 2h6v16z" fill="currentColor"></path><path d="M10 22h12v2H10z" fill="currentColor"></path><path d="M10 16h12v2H10z" fill="currentColor"></path></svg>
            </n-icon> -->
            <n-icon size="22" class="cursor-pointer text-blue-500 mx-1" @click="showStockTransactionModal(record)" title="ប្រតិបត្តិការចេញចូល" >
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M6.5 10a.5.5 0 1 0 0 1a.5.5 0 0 0 0-1zM6 12.5a.5.5 0 1 1 1 0a.5.5 0 0 1-1 0zm2-2a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 1.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zM6 2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7.414a1.5 1.5 0 0 0-.44-1.06l-3.914-3.915A1.5 1.5 0 0 0 9.586 2H6zM5 4a1 1 0 0 1 1-1h3v3.5A1.5 1.5 0 0 0 10.5 8H14v6a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4zm5 2.5V3.207L13.793 7H10.5a.5.5 0 0 1-.5-.5zM16 8a1 1 0 0 1 1 1v5.06A3.94 3.94 0 0 1 13.06 18H7a1 1 0 0 1-1-1h7a3 3 0 0 0 3-3V8z" fill="currentColor"></path></g></svg>
            </n-icon>
            <n-icon size="22" class="cursor-pointer text-gray-700 mx-1" @click="showEditModal(record)" title="កែប្រែព័ត៌មាន" >
              <Edit20Regular />
            </n-icon>
            <n-icon size="22" class="cursor-pointer text-red-500 mx-1" @click="deleteRecord(record)" title="លុបចោល" >
              <TrashOutline />
            </n-icon>
          </td>
        </tr>
      </table>
      <!-- Loading -->
      <div v-if="table.loading" class="table-loading absolute left-0 top-0 right-0 bottom-0 bg-white bg-opacity-75 ">
        <div class="spinner mt-24">
          <Icon size="40" class="animate-spin  text-blue-500" >
           <IosRefresh />
          </Icon><br/><br/>
          កំពុងអាន...
        </div>
        <div class="absolute top-3 right-3 " @click="closeTableLoading" >
          <Icon size="40" class="text-red-600" >
           <CloseCircleOutline />
          </Icon>
        </div>
      </div>
    </div>
    <!-- Pagination of crud -->
    <div class="vcb-table-pagination">
      <!-- First -->
      <!-- Previous -->
      <div class="vcb-pagination-page" v-html='"<"' @click="previous()" ></div>
      <!-- Pages (7) -->
      <div v-for='item in table.pagination.totalPages' :key='item' class="vcb-pagination-page" @click="goTo(item)" >{{ item }}</div>
      <!-- Next -->
      <div class="vcb-pagination-page" v-html='">"' @click="next()" ></div>
      <!-- Last -->
      <!-- Go to -->
      <!-- Total per page -->
    </div>
    <!-- Form create -->
    <create-form v-bind:model="model" v-bind:show="createModal.show" :onClose="closeCreateModal" />
    <!-- Form update -->
    <update-form v-bind:model="model" v-bind:record="editRecord" v-bind:show="editModal.show" :onClose="closeEditModal" />
    <!-- Form transaction -->
    <stock-transaction-form v-bind:model="model" v-bind:show="stockTransactionModal.show" :onClose="closeStockTransactionModal" :record="selectedRecord" />
    <!-- Form Stock In -->
    <stock-in-form v-bind:model="model" v-bind:show="stockInModal.show" :onClose="closeStockInModal" :record="selectedRecord" />
    <!-- Form Stock Out -->
    <stock-out-form v-bind:model="model" v-bind:show="stockOutModal.show" :onClose="closeStockOutModal" :record="selectedRecord" />
  </div>
</template>
<script>
import { reactive, ref , computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import QrcodeVue from 'qrcode.vue'
import Vue3Barcode from 'vue3-barcode'
import { Switcher } from '@vicons/carbon'
import { Icon } from '@vicons/utils'
import { IosCheckmarkCircleOutline, IosRefresh } from '@vicons/ionicons4'
import { TrashOutline, CloseCircleOutline } from '@vicons/ionicons5'
import { useDialog, useMessage, useNotification } from 'naive-ui'
import { Edit20Regular, Key16Regular, Save20Regular, Add20Regular, Search20Regular , ContactCard28Regular } from '@vicons/fluent'
/**
 * CRUD component form
 */
import CreateForm from './create.vue'
import UpdateForm from './update.vue'
import StockInForm from './in.vue'
import StockOutForm from './out.vue'
import StockTransactionForm from './transaction.vue'
export default {
  name: "User" ,
  components: {
    QrcodeVue ,
    Vue3Barcode,
    Switcher,
    Add20Regular ,
    Icon,
    IosCheckmarkCircleOutline,
    IosRefresh ,
    CloseCircleOutline ,
    Search20Regular ,
    Edit20Regular,
    Key16Regular,
    Save20Regular ,
    TrashOutline ,
    ContactCard28Regular ,
    // Form
    CreateForm,
    UpdateForm ,
    StockInForm ,
    StockOutForm ,
    StockTransactionForm
  },
  setup(){
    var store = useStore()
    const dialog = useDialog()
    const message = useMessage()
    const notify = useNotification()
    const selectedRecord = reactive({
      id: 0 ,
      product_id : 0 ,
      unit_id : 0 ,
      quantity : 0 ,
      attribute_variant_id : 0 ,
      product: null
    })
    /**
     * Variables
     */    
    var model = reactive( {
      name: "stock" ,
      title: "ឃ្លាំង" 
    })
    var table = reactive( {
      loading: false ,
      search: '' ,
      records: {
        all: [] ,
        matched: []
      },
      columns: {
        searchable: {
        },
        format: {
          id: 0 ,
          product_id: 0 ,
          unit_id : 0 ,
          quantity: 0 ,
          attribute_variant_id: 0 ,
          attributeVariant: Object
        }
      } ,
      pagination: {
        perPage: 20 ,
        page: 1 ,
        totalPages: 0 ,
        totalRecords: 0
      }
    })

    function filterRecords(helper=true){
      if( helper ){
        table.records.matched = []
        if( table.search != "" ) {
          for(var index in table.records.all ){
            for(var field in table.records.all[index] ){
              if( (""+table.records.all[index][field]).includes( table.search ) !== false ) {
                table.records.matched.push( table.records.all[index] )
                break;
              }
            }
          }
        }
        if( table.records.matched.length <= 0 ) {
          table.records.matched = table.records.all
        }
      }else{
        setTimeout( goTo(1) , 500 )
      }
    }

    /**
     * Functions
     */
    function getRecords(){
      /**
       * Clear time interval after calling
       */
      window.clearTimeout()
      table.loading = true
      store.dispatch(model.name+'/list',{
        search: table.search ,
        perPage: table.pagination.perPage ,
        page: table.pagination.page
      }).then(res => {
        table.records.all = table.records.matched = res.data.records
        table.pagination = res.data.pagination
        closeTableLoading()
      }).catch( err => {
        console.log( err )
      })
    }

    function closeTableLoading(){
      table.loading = false
    }
    /**
     * Pagination functions
     */
    function previous(){
      goTo( table.pagination.page <= 1 ? 1 : table.pagination.page - 1 )
    }
    function next(){
      goTo( table.pagination.page >= table.pagination.totalPages ? table.pagination.totalPages : table.pagination.page + 1 )
    }
    function goTo(page){
      table.pagination.page = page > table.pagination.totalPages ? table.pagination.totalPages : ( page < 1 ? 1 : page)
      getRecords()
    }
    function updatePerpage(perPage){
      table.pagination.perPage = perPage < 5 ? 5 : ( perPage > 100 ? 100 : perPgae )
      table.pagination.page = 1
      getRecords()
    }

    /**
     * Create modal handling
     */
    var createModal = reactive({show:false})
    function showCreateModal(){
      createModal.show = true
    }

    function closeCreateModal(){
      createModal.show = false
      getRecords()
    }

    var editModal = reactive({show:false})
    var editRecord = reactive({
      id: 0 ,
      product_id: 0 ,
      unit_id : 0 ,
      quantity: 0 ,
      attribute_variant_id: 0 ,
      attributeVariant : null
    })
    function showEditModal(record){
      console.log( record )
      editRecord.id = record.id
      editRecord.product_id = record.product_id
      editRecord.unit_id = record.unit_id
      editRecord.quantity = record.quantity
      editRecord.attribute_variant_id = record.attribute_variant_id
      editRecord.attributeVariant = record.attributeVariant

      // editRecord.variants = new Date(record.start_date)
      // editRecord.variant_id = record.people_id
      editModal.show = true
    }
    function closeEditModal(record){
      editModal.show = false
      getRecords()
    }

    /**
     * Stock in modal handling
     */
    var stockInModal = reactive({show:false})
    function showStockInModal(record){
      selectedRecord.id = record.id
      selectedRecord.product_id = record.product_id
      selectedRecord.unit_id = record.unit_id
      selectedRecord.attribute_variant_id = record.attribute_variant_id
      selectedRecord.quantity = record.quantity
      selectedRecord.product = record.product
      stockInModal.show = true
    }

    function closeStockInModal(){
      stockInModal.show = false
      selectedRecord.id = 0
      selectedRecord.product_id = 0
      selectedRecord.unit_id = 0
      selectedRecord.attribute_variant_id = 0
      selectedRecord.quantity = 0
      selectedRecord.product = null
      getRecords()
    }
    
    /**
     * Stock Out modal handling
     */
    var stockOutModal = reactive({show:false})
    function showStockOutModal(record){
      selectedRecord.id = record.id
      selectedRecord.product_id = record.product_id
      selectedRecord.unit_id = record.unit_id
      selectedRecord.attribute_variant_id = record.attribute_variant_id
      selectedRecord.quantity = record.quantity
      selectedRecord.product = record.product
      stockOutModal.show = true
    }

    function closeStockOutModal(){
      stockOutModal.show = false
      selectedRecord.id = 0
      selectedRecord.product_id = 0
      selectedRecord.unit_id = 0
      selectedRecord.attribute_variant_id = 0
      selectedRecord.quantity = 0
      selectedRecord.product = null
      getRecords()
    }

    /**
     * transaction modal handling
     */
     var stockTransactionModal = reactive({show:false})
    function showStockTransactionModal(record){
      selectedRecord.id = record.id
      selectedRecord.product_id = record.product_id
      selectedRecord.unit_id = record.unit_id
      selectedRecord.attribute_variant_id = record.attribute_variant_id
      selectedRecord.quantity = record.quantity
      selectedRecord.product = record.product
      stockTransactionModal.show = true
    }

    function closeStockTransactionModal(){
      stockTransactionModal.show = false
      selectedRecord.id = 0
      selectedRecord.product_id = 0
      selectedRecord.unit_id = 0
      selectedRecord.attribute_variant_id = 0
      selectedRecord.quantity = 0
      selectedRecord.product = null
      getRecords()
    }

    function deleteRecord(record){
      dialog.warning({
        title: "លុបគណនី" ,
        content: "តើអ្នកចង់ លុប មែនទេ ?" ,
        positiveText: 'បាទ / ចាស',
        negativeText: 'ទេ',
        onPositiveClick: () => {
          store.dispatch(model.name+'/delete',{id:record.id}).then( res => {
            if( res.data.ok ){
              notify.success({
                title: 'លុបទិន្នន័យ' ,
                description: 'លុបបានរួចរាល់។' ,
                duration: 3000
              })
            }else{
              notify.success({
                title: 'លុបទិន្នន័យ' ,
                description: 'មានបញ្ហាក្នុងពេលលុបទិន្នន័យ។' ,
                duration: 3000
              })
            }
            getRecords()
        }).catch( err => {
          message.error( err )
        })
        },
        onNegativeClick: () => {
        }
      })
    }

    /**
     * Update - inline update
     */
    function inlineUpdate(record){
      store.dispatch( model.name+'/update',{
        id : record.id ,
        quantity : record.quantity
      }).then( res => {
        if( res.data.ok ){
          // notify.success({
          //   title: 'រក្សារទុកព័ត៌មាន' ,
          //   content: '' ,
          //   description: res.data.message ,
          //   duration: 2000
          // })
        }else{
          notify.error({
            title: 'រក្សារទុកព័ត៌មាន' ,
            content: '' ,
            description: 'មានបញ្ហាក្នុងពេលរក្សារទុកព័ត៌មាន។' ,
            duration: 2000
          })
        }
      }).catch( err => {
        message.error( err )
      })
    }

    /**
     * Initial the data
     */
    getRecords()


    return {
      /**
       * Variables
       */
      model ,
      table ,
      selectedRecord ,
      /**
       * Table
       */
      filterRecords ,
      /**
       * Pagination functions
       */
      updatePerpage ,
      goTo ,
      previous ,
      next ,
      /**
       * Loading overlay
       */
      closeTableLoading ,
      /**
       * Creating
       */
      createModal ,
      showCreateModal ,
      closeCreateModal ,     
      /**
       * Editing
       */
      editModal ,
      showEditModal ,
      closeEditModal , 
      editRecord ,
      /**
       * Stock in
       */
      stockInModal ,
      showStockInModal ,
      closeStockInModal ,
      /**
       * Stock out
       */
      stockOutModal ,
      showStockOutModal ,
      closeStockOutModal ,
      /**
       * Stock Transactions
       */
      stockTransactionModal ,
      showStockTransactionModal ,
      closeStockTransactionModal ,
      /**
       * Functions
       */
      deleteRecord ,
      inlineUpdate
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
  .vcb-table-cell .inline-input {
    @apply border-none;
  }
</style>