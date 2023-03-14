<template>
  <div>
    <div class="flex w-full h-20 p-2 border-b z-50" >
      <div class="flex-none w-16 rounded-full" >
        <img src="./../../assets/ocmlogo.png" alt="ប្រពន្ធ័គ្រប់គ្រងឯកសារ អេឡិចត្រូនិច" title="ប្រពន្ធ័គ្រប់គ្រងឯកសារ អេឡិចត្រូនិច" class="w-full" >
      </div>
      <div class="flex-grow px-4 py-3">
        <!-- Search box -->
        <div class="relative " >
          <input type="text" @keypress.enter="filterRecords(false)" v-model="table.search" class="bg-gray-100 pl-4 pr-10 h-10 w-full rounded-full border border-gray-200 transition duration-500 focus:border-blue-600 hover:border-blue-600 " placeholder="ស្វែងរក" />
          <Icon size="30" class="absolute right-1 top-1 text-gray-400 cursor-pointer" >
            <n-icon>
              <Search20Regular />
            </n-icon>
          </Icon>
        </div>
        <!-- Search box -->
      </div>
      <div class="flex-none">
        <!-- User profile -->
        <div v-if="isLoggedIn" class="relative w-12 h-12 cursor-pointer "  >
          <!-- <div class="w-12 h-12 rounded-full" >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 mt-2" fill="none" viewBox="0 0 24 24" stroke="#195598">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div> -->
          <div class="w-12 h-12 rounded-full" >
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 550 550" class="pt-2 " @click="subMenuHelper=!subMenuHelper" >
              <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="48" d="M88 152h336"></path>
              <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="48" d="M88 256h336"></path>
              <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="48" d="M88 360h336"></path>
            </svg>
          </div>
          <div v-if="subMenuHelper" class="submenu absolute bg-white shadow-md w-64 right-1 top-14 p-4 flex flex-wrap text-left z-50 ">
            <router-link to="/folders" class="myFolders w-full h-10 my-2 border-b border-gray-100" >
              <div class="submenu-icon h-8 flex">
                <svg class="flex-none mr-2 text-yellow-600" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M7.167 3c.27 0 .535.073.765.21l.135.09l1.6 1.2H15.5a2.5 2.5 0 0 1 2.479 2.174l.016.162L18 7v7.5a2.5 2.5 0 0 1-2.336 2.495L15.5 17h-11a2.5 2.5 0 0 1-2.495-2.336L2 14.5v-9a2.5 2.5 0 0 1 2.336-2.495L4.5 3h2.667zm.99 4.034a1.5 1.5 0 0 1-.933.458l-.153.008L3 7.499V14.5a1.5 1.5 0 0 0 1.356 1.493L4.5 16h11a1.5 1.5 0 0 0 1.493-1.355L17 14.5V7a1.5 1.5 0 0 0-1.355-1.493L15.5 5.5H9.617l-1.46 1.534zM7.168 4H4.5a1.5 1.5 0 0 0-1.493 1.356L3 5.5v.999l4.071.001a.5.5 0 0 0 .302-.101l.06-.054L8.694 5.02L7.467 4.1a.5.5 0 0 0-.22-.093L7.167 4z" fill="currentColor"></path></g></svg>
                <div class="submenu-icon-title flex-grow w-full leading-9" >ថតឯកសារ</div>
              </div>
            </router-link>
            <router-link to="/profile" class="myProfile  w-full h-10 my-2 border-b border-gray-100" >
              <div class="submenu-icon h-8 flex">
                <svg xmlns="http://www.w3.org/2000/svg" class="flex-none mr-2 " fill="none" viewBox="0 0 24 24" stroke="#0066FF">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div class="submenu-icon-title flex-grow w-full leading-9" >ព៌ត័មានខ្ញុំ</div>
              </div>
            </router-link>
            <router-link to="/password/change"  class="changePassword  w-full h-10 my-2 border-b border-gray-100" >
              <div class="submenu-icon h-8 flex">
                <svg xmlns="http://www.w3.org/2000/svg" class="flex-none mr-2 text-blue-500" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M21 2a8.998 8.998 0 0 0-8.612 11.612L2 24v6h6l10.388-10.388A9 9 0 1 0 21 2zm0 16a7.013 7.013 0 0 1-2.032-.302l-1.147-.348l-.847.847l-3.181 3.181L12.414 20L11 21.414l1.379 1.379l-1.586 1.586L9.414 23L8 24.414l1.379 1.379L7.172 28H4v-3.172l9.802-9.802l.848-.847l-.348-1.147A7 7 0 1 1 21 18z" fill="currentColor"></path><circle cx="22" cy="10" r="2" fill="currentColor"></circle></svg>
                <div class="submenu-icon-title flex-grow w-full leading-9" >ប្ដូរពាក្យសម្ងាត់</div>
              </div>
            </router-link>
            <div class="submenu-icon h-10 flex" @click="logout()" >
              <svg xmlns="http://www.w3.org/2000/svg" class="flex-none mr-2 text-red-500"  xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M10.5 2.5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0v-6zM13.743 4a.5.5 0 1 0-.499.867a6.5 6.5 0 1 1-6.494.004a.5.5 0 1 0-.5-.866A7.5 7.5 0 1 0 13.743 4z" fill="currentColor"></path></g></svg>
              <div class="submenu-icon-title flex-grow w-full leading-9" >ចាកចេញ</div>
            </div>
          </div>
        </div>
        <!-- End of user profile-->
        <!-- User profile -->
        <div v-if="!isLoggedIn" class="w-12 h-12 cursor-pointer " @click="$router.push('/login')" >
          <div class=" leading-10 p-1 my-2 mr-2 w-12 h-12 rounded-full bg-blue-500 text-white" >
            ចូល
          </div>
        </div>
        <!-- End of user profile-->
      </div>
    </div>
    <div class="flex flex-wrap z-40">
      <div class="vcb-result-message w-full m-8 mb-0 border-b border-gray-100 pb-4 text-left font-bold">លទ្ធផលនែការស្វែងរកគឺ ៖ <span class="text-lg text-blue-500">{{ table.pagination.totalRecords }}</span></div>
      <!-- Table of crud -->
      <div class="vcb-table-panel flex flex-row w-full m-8 ">
        <div class="vcb-table w-full" >
          <div v-for="(document, index) in table.records.matched" :key='index' class="vcb-table-row text-left relative mb-8" >
            <div class="vcb-table-cell font-bold mb-2 leading-6 text-justify break-words" v-html="applyTagMark(document.objective)" ></div>
            <div  class="vcb-table-cell" >{{ document.fid }} - {{ document.type.name }} - {{ document.document_year.slice(0,10) }}</div>
            <div class="vcb-table-actions-panel h-5 absolute bottom-0 right-0 text-right">
              <n-icon v-if="document.pdf"  size="20" class="cursor-pointer text-red-500 mr-2"  @click="pdfPreview(document)" title="មើលឯកសារ" alt="មើលឯកសារ" >
                <DocumentPdf24Regular />
              </n-icon>
              <n-icon v-if="isLoggedIn"  size="20" class="cursor-pointer text-blue-700 font-bold ml-2" title="ដាក់ឯកសារចូលថត" alt="ដាក់ឯកសារចូលថត" @click="showFolderModalPopup(document)" >
                <Folder20Regular />
              </n-icon>
            </div>
          </div>
        </div>
        <!-- Loading -->
        <div v-if="table.loading" class="table-loading fixed flex h-screen left-0 top-0 right-0 bottom-0 bg-white bg-opacity-80 ">
          <div class="flex mx-auto items-center">
            <div class="spinner text-lg">
              <Icon size="80" class="animate-spin  text-blue-500" >
                <Refresh />
              </Icon><br/><br/>កំពុងអាន...
            </div>
          </div>
          <div class="absolute top-3 right-3 cursor-pointer " @click="closeTableLoading" >
            <Icon size="40" class="text-red-600" >
              <CloseCircleOutline />
            </Icon>
          </div>
        </div>
        <!-- PDF Dialog -->
        <div v-if="pdf.viewer" class="table-loading fixed flex h-screen left-0 top-0 right-0 bottom-0 bg-white ">
          <vue-pdf-embed :source="pdf.url" class="w-full h-screen overflow-y-scroll" />
          <div class="absolute top-3 right-3 cursor-pointer " @click="closePdf" >
            <Icon size="40" class="text-red-600" >
              <CloseCircleOutline />
            </Icon>
          </div>
        </div>
        <!-- End PDF Dialog -->
      </div>
      <!-- Pagination of crud -->
      <div class="vcb-table-pagination flex flex-wrap m-8 mt-0">
        <!-- First -->
        <!-- Previous -->
        <div class="vcb-pagination-page w-8 h-8 text-center align-middle leading-8 font-bold cursor-pointer" v-html='"<"' @click="previous()" ></div>
        <!-- Pages (7) -->
        <div v-for="(page, index) in table.pagination.buttons" :key="index" :class="'vcb-pagination-page pages h-8 mx-2 font-bold' + (table.pagination.page == page ? ' bg-blue-500 text-white  rounded-full' : '' )" @click="table.pagination.page == page ? false : goTo(page) " >
          <div class="page w-8 h-8 text-center align-middle leading-8 cursor-pointer">{{ page }}</div>
        </div>
        <!-- Next -->
        <div class="vcb-pagination-page w-8 h-8 text-center align-middle leading-8 font-bold cursor-pointer" v-html='">"' @click="next()" ></div>
        <!-- Last -->
        <!-- Go to -->
        <!-- Total per page -->
      </div>
    </div>
    <!-- Folder modal selection -->
    <n-modal v-model:show="showFolderModal" @on-after-leave="showFolderModal.value=false" >
      <n-card
        style="width: 600px"
        title="សូមជ្រើសរើសថតឯកសារ"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <!-- <template #header-extra>
          Oops!
        </template> -->
        <!-- Where the available folder of the user -->
        <div v-for="(folder, index) in listFolders.value" :key="index" class="p-2 cursor-pointer hover:bg-gray-100 rounded duration-500 flex" 
        >
          <div class="flex-grow">
            {{ (index +1 ) + '. ' + folder.name }}
          </div>
          <Icon v-if="!folder.exists" size="20" class="text-gray-600 flex-none" @click="addDocumentToFolder(folder)"  >
            <CheckboxChecked20Regular />
          </Icon>
          <Icon v-if="folder.exists" size="20" class="text-green-600 flex-none" @click="removeDocumentFromFolder(folder)"  >
            <CheckboxChecked20Regular />
          </Icon>
        </div>  
        <!-- <template #footer>
          Footer
        </template> -->
      </n-card>
    </n-modal>
    <!-- End folder modal selection -->
    <div class="flex flex-wrap bottom-5 mx-auto w-full">
      <FooterComponent />
    </div>
  </div>
</template>
<script>
import { isAuth, getUser , authLogout } from './../../plugins/authentication'
import FooterComponent from './../../components/footer/copy-right.vue'
import { Key20Regular } from "@vicons/fluent";
import { AlternateEmailOutlined } from '@vicons/material'
import { ref, computed, reactive, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useDialog, useNotification, useMessage } from 'naive-ui'
import { Icon } from '@vicons/utils'
import { Search20Regular , DocumentPdf24Regular, Folder20Regular, CheckboxChecked20Regular } from '@vicons/fluent'
import { IosRefresh } from '@vicons/ionicons4'
import { CloseCircleOutline } from '@vicons/ionicons5'
import { Refresh } from '@vicons/tabler'
import VuePdfEmbed from 'vue-pdf-embed'

export default {
  name: 'WelcomeTemplate' ,
  components: {
    CloseCircleOutline ,
    IosRefresh, 
    Refresh ,
    DocumentPdf24Regular, 
    FooterComponent ,
    Search20Regular ,
    Icon ,
    VuePdfEmbed ,
    Folder20Regular ,
    CheckboxChecked20Regular
  },
  setup(){
    /**
     * Components to use
     */
    const store = useStore()
    const message = useMessage()
    const router = useRouter()
    const notify = useNotification()
    const dialog = useDialog()
    const subMenuHelper = ref(false)
    const showFolderModal = ref(false)
    const listFolders = reactive([])
    const selectedDocumentId = ref(0)
    /**
     * Data
     */
    /**
     * Variables
     */    
    const model = reactive( {
      name: "regulator" ,
      title: "លិខិតបទដ្ឋានគតិយុត្ត"
    })
    const table = reactive( {
      loading: false , 
      search: '' ,
      records: {
        all: [] ,
        matched: []
      },
      columns: {
        searchable: {
          username: '' ,
          firstname: '' ,
          lastname: '' ,
          email: '' ,
          phone: '' ,
          active: ''
        },
        format: {
          username: '' ,
          firstname: '' ,
          lastname: '' ,
          email: '' ,
          phone: '' ,
          active: ''
        }
      } ,
      pagination: {
        perPage: 20 ,
        page: 1 ,
        totalPages: 0 ,
        totalRecords: 0 ,
        start: 0 ,
        end: 0 ,
        buttons: []
      }
    })
    const filterPanel = ref(false)
    /**
     * Login function
     */
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

        var paginationNumberList = 5
        if( ( table.pagination.page - ( paginationNumberList - 1 ) ) < 1 ){
          table.pagination.start = 1
          table.pagination.end = table.pagination.totalPages > 9 ? 9 : table.pagination.totalPages
        }
        else{
          table.pagination.start = table.pagination.page  - ( paginationNumberList - 1 )
          table.pagination.end = table.pagination.page + 4 >= table.pagination.totalPages ? table.pagination.totalPages : table.pagination.page + 4
        }
        /**
         * Create pagination buttons
         */
        table.pagination.buttons = []
        for(var i=table.pagination.start;i<=table.pagination.end;i++){
          table.pagination.buttons.push(i)
        }

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
    const paginationButtons = computed(()=>{
      /**
       * 9 Buttons is recommended
       */
      return table.pagination.totalPages ? table.pagination.totalPages : 0
    })

    function applyTagMark(str){
      // Split the string by whitespace
      if( table.search.trim() != "" ){
        var arrStrSearch = table.search.split(/(\s+)/).filter( e => e.trim().length > 0).map( e => e.replaceAll(" ","") )
        for( var i in arrStrSearch ){
          if( str.includes( arrStrSearch[i] ) ) str = str.replaceAll( arrStrSearch[i] , '<mark>' + arrStrSearch[i] + '</mark>' ) 
        }
      }
      return str
    }

    /**
     * Check the authentication of the user
     */
    const isLoggedIn = computed(()=>{
      return isAuth()
    })
  
    const pdf = reactive({
      viewer: false ,
      filename: '' ,
      url: ''
    })
    function pdfPreview(record){
      if( record.pdf ){
        store.dispatch('regulator/pdf',{id:record.id})
          .then( res => {
            pdf.filename = res.data.filename
            pdf.url = res.data.pdf
            pdf.viewer = true
            notify.success({
              title: "បង្ហាញឯកសារយោង" ,
              content: res.data.message ,
              duration: 3000
            })
          }).catch( err => {
            notify.error({
              title: "បង្ហាញឯកសារយោង" ,
              content: err.response.data.message ,
              duration: 3000
            })
          })
      }else{
        notify.info({
          title: 'ឯកសារយោង' ,
          description: "មិនមានឯកសារយោងសម្រាប់បង្ហាញ" ,
          duration: 3000
        })  
      }
    }
    function closePdf(){
      pdf.url = ""
      pdf.viewer = false
    }

    function logout(){
      if( isAuth() ){
        dialog.warning({
          title : 'ចាកចេញ' ,
          content: () => 'តើអ្នកចង់ចាកចេញពីប្រព័ន្ធមែនទេ?' ,
          positiveText: 'បាទ / ចាស',
          negativeText: 'ទេ',
          onPositiveClick: () => {
            authLogout()
            router.push('/login')
          },
          onNegativeClick: () => {}
        })
      }
    }

    function getFolders(){
      store.dispatch('folder/listDocumentWithValidation',{
        search: '' ,
        page: 1 ,
        perPage: 50 ,
        document_id : selectedDocumentId.value
      }).then( res => {
        listFolders.value = res.data.records
      }).catch( err => {
        console.log( err.response )
      })
    }

    function showFolderModalPopup(document){
      showFolderModal.value = true
      /**
       * Mark the selected document
       */
      selectedDocumentId.value = document.id
      getFolders()
    }

    function closeFolderModalPopup(){
      showFolderModal.value = false
      listFolders.value = []
      selectedDocumentId.value = 0
    }

    function addDocumentToFolder(folder){
      store.dispatch('folder/addRegulator',{
        id: folder.id ,
        document_id : selectedDocumentId.value
      }).then( res => {
        notify.success({
          title: "ដាក់ឯកសារចូលថត" ,
          content: res.data.message ,
          duration: 3000
        })
        getFolders()
      }).catch( err => {
        console.log( err.response.data )
        notify.error({
          title: "ដាក់ឯកសារចូលថត" ,
          content: res.response.data.message ,
          duration: 3000
        })
      })
    }

    function removeDocumentFromFolder(folder){
      store.dispatch('folder/removeRegulator',{
        id: folder.id ,
        document_id : selectedDocumentId.value
      }).then( res => {
        notify.success({
          title: "ដកឯកសារចេញពីថត" ,
          content: res.data.message ,
          duration: 3000
        })
        getFolders( )
      }).catch( err => {
        console.log( err.response.data )
        notify.error({
          title: "ដកឯកសារចេញពីថត" ,
          content: res.response.data.message ,
          duration: 3000
        })
      })
    }

    /**
     * Start fetching records
     */
    // getRecords() 

    return {
      /**
       * Variables
       */
      model ,
      table ,
      filterPanel ,
      pdf ,
      subMenuHelper ,
      showFolderModal ,
      listFolders ,
      /**
       * Table
       */
      filterRecords ,
      pdfPreview ,
      closePdf ,
      /**
       * Pagination functions
       */
      updatePerpage ,
      goTo ,
      previous ,
      next ,
      paginationButtons ,
      isLoggedIn ,
      /**
       * Loading overlay
       */
      closeTableLoading ,
      /**
       * Functions
       */
      logout ,
      addDocumentToFolder ,
      removeDocumentFromFolder ,
      showFolderModalPopup ,
      applyTagMark ,
      /**
       * Components
       */
      Key20Regular ,
      AlternateEmailOutlined ,
    }
  },
  mounted(){
    console.log( isAuth() )
    console.log( getUser() )
  }
}
</script>
<style scoped>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    font-size: 0.8rem;
  }
</style>
