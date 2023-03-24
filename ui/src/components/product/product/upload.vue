<template>
  <!-- Form edit account -->
    <div class="vcb-pop-create font-ktr">
      <n-modal v-model:show="show" :on-after-leave="onClose" transform-origin="center">
        <n-card class="w-1/2 font-pvh text-xl" :title="record.description" :bordered="false" size="small">
          <template #header-extra>
            <n-button type="success" @click="uploadFiles()" >
              <template #icon>
                <n-icon>
                  <Save20Regular />
                </n-icon>
              </template>
              រក្សារទុក
            </n-button>
          </template>
          <!-- Form edit account -->nnnn
          <div class="crud-create-form w-full border-t">
            <div class=" mx-auto p-4 flex-wrap">
              <div class="w-full mb-4 border-b border-gray-200 pb-2">រូបភាពបច្ចុប្បន្ន</div>
              <div class="crud-form-panel w-full flex items-start mb-16">
                <div v-for="(picture, index) in record.images" :key="index" @click="updateFeaturePicture(index)" class="relative w-40 p-2 m-2 cursor-pointer border-gray-200 border rounded hover:border-gray-400 hover:shadow-md duration-300" >
                  <img :src="picture" />
                  <n-icon size="18" class="cursor-pointer text-red-500 -right-3 -top-3 absolute " @click="deletePicture(record)" title="លុបចោល" >
                    <TrashOutline />
                  </n-icon>
                </div>
              </div>
              <div class="w-full mb-4 border-b border-gray-200 pb-2">រូបភាពដែលនិងត្រូវដាក់ចូល</div>
              <div class="crud-form-panel w-full flex items-start mb-8 relative">
                <div class="absolute top-2 right-2 w-8 h-8 text-red-500 cursor-pointer" title="លុបរូបភាពដែលបានជ្រើសរើស" @click="clearFilesUpload()" >
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M320 320L192 192"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M192 320l128-128"></path></svg>
                </div>
                <input type="file" placeholder="រូបភាព" multiple @change="fileChange" class="hidden " id="referencePhotos" />
                <div class="border rounded border-gray-200 w-full text-sm text-center cursor-pointer hover:border-green-500" @click="clickUpload" >
                  <div class="no-files-upload h-full w-full p-4">
                    <n-icon size="40" class="text-gray-500" >
                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 28 28"><g fill="none"><path d="M22.993 6.008A3.243 3.243 0 0 1 24.5 8.75v10.5c0 2.9-2.35 5.25-5.25 5.25H8.75a3.247 3.247 0 0 1-2.744-1.508l.122.006l.122.002h13A3.75 3.75 0 0 0 23 19.25v-13a4.32 4.32 0 0 0-.007-.242zM18.75 3A3.25 3.25 0 0 1 22 6.25v12.5A3.25 3.25 0 0 1 18.75 22H6.25A3.25 3.25 0 0 1 3 18.75V6.25A3.25 3.25 0 0 1 6.25 3h12.5zm.581 17.401l-6.306-6.178a.75.75 0 0 0-.966-.07l-.084.07l-6.307 6.178c.182.064.378.099.582.099h12.5c.204 0 .4-.035.581-.099l-6.306-6.178l6.306 6.178zM18.75 4.5H6.25A1.75 1.75 0 0 0 4.5 6.25v12.5c0 .208.036.408.103.593l6.322-6.191a2.25 2.25 0 0 1 3.02-.117l.13.117l6.322 6.192c.067-.186.103-.386.103-.594V6.25a1.75 1.75 0 0 0-1.75-1.75zM16 7.751a1.25 1.25 0 1 1 0 2.499a1.25 1.25 0 0 1 0-2.499z" fill="currentColor"></path></g></svg>
                    </n-icon>
                    <br/>សូមបញ្ចូលរូបភាពសម្រាប់ផលិតផលនេះ
                  </div>
                  <div class="list-files-upload w-full p-4" >
                    <div class="selectedFiles w-full m-2" v-for="(photo,index) in files.normal" :key="index" v-html="'រូបភាពមានឈ្មោះ ៖ ' + photo.name + ' , ទំហំ៖ ' + (photo.size/1024/1024).toFixed(2) + ' មេកាបៃ (MB)' " ></div>
                  </div>
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
import { TrashOutline } from '@vicons/ionicons5'
import { useMessage, useNotification } from 'naive-ui'
import { Save20Regular } from '@vicons/fluent'

export default {
  components: {
    Save20Regular,
    TrashOutline
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
    },
    record: {
      type : Object ,
      required: true ,
      default: () => {
        return reactive({
          id: 0 ,
          description: '' ,
          origin: '' ,
          images: []
        })
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
    const files = reactive({
      normal : [] ,
      base64: []
    })

    const productTitle = computed( () => {
      return props.record != undefined && props.record != null ? props.record.description : ""
    })

    /**
     * Functions
     */
    function clearRecord(){
      props.onClose()
    }

    /**
     * File upload
     */
    /**
     * On change
     */
     function fileChange(event){
      for(const file of event.target.files ){
        // if( index == 'item' || index == 'length' ) continue;

        // allowed types
        let allowed_mime_types = [ 
          /**
           * Image mime type
           */
          'image/jpeg', 'image/png' 
          /**
           * Application file mime type
           */
          // "application/pdf"
          ];
        
        // allowed max size in MB
        let allowed_size_mb = 5;

        // Validate file type
        if(allowed_mime_types.indexOf(file.type) == -1) {
          notify.error({
            title: "រូបភាព" ,
            description: "ឯកសារនេះជាប្រភេទ៖ "+ file.type +"។ អនុញ្ញាតតែឯកសារដែលមានប្រភេទជា jpeg , png" ,
            duration: 3000
          })
          return;
        }

        // Validate file size
        if(file.size > allowed_size_mb*1024*1024) {
          notify.error({
            title: "រូបភាព" ,
            description: "ទំហំនៃឯកសារគឺ៖ " + (file.size/1024/1024).toFixed(2) + " មេកាបៃ (MB) លើលទំហំដែលកំណត់គឺ ៥ មេកាបៃ។" ,
            duration: 3000
          })
          return;
        }


        let reader = new FileReader();
        reader.onerror = function(e) {
          console.log('On error');
        };
        reader.onprogress = function(e) {
          console.log('On progress');
        };
        reader.onabort = function(e) {
          console.log('On abort');
        };
        reader.onloadstart = function(e) {
          console.log( "On load start" )
        };
        reader.onload = function(e) {
          // Ensure that the progress bar displays 100% at the end.
          console.log( 'On load' )
          /**
           * Read binary string from 'e.target.result' and convert to base64
           */
          files.base64.push( btoa( e.target.result ) );
          // formData.append('files', btoa( e.target.result ) )
        }
        // // // Read in the image file as base64 type
        // // reader.readAsDataURL(file);
        reader.readAsBinaryString(file);

        // // Read in the image file as base64 type
        // record.images.push( window.URL.createObjectURL( file ) )
        files.normal.push( file )
      }
    }
    /**
     * On click file upload
     */
    function clickUpload(){
      document.getElementById('referencePhotos').click()
    }
    function uploadFiles(){
      
      var form = new FormData();
      form.append('id', props.record.id )
      var fileInput = document.getElementById('referencePhotos') ;
      for (var i = 0; i < fileInput.files.length; i++) {
        form.append('files[]', fileInput.files[i] )
      }
      
      notify.info({
        title: 'រក្សារទុកព័ត៌មាន' ,
        description: 'កំពុងបញ្ចូលរូបភាព។' ,
        duration: 3000
      })

      store.dispatch('product/upload', form ).then( res => {
        notify.success({
          title: 'រក្សារទុកព័ត៌មាន' ,
          description: 'បានបញ្ចូលរូបភាពរួចរាល់។' ,
          duration: 3000
        })
        clearFilesUpload()
        props.onClose()
      }).catch( err => {
        console.log( err )
        notify.error({
          title: 'រក្សារទុកព័ត៌មាន' ,
          description: 'មានបញ្ហាពេលបញ្ចូលរូបភាព។' ,
          duration: 3000
        })
      })
      // props.onClose()
    }

    function clearFilesUpload(){
      files.normal = [] 
      files.base64 = []
      document.getElementById('referencePhotos').value = []
    }

    function updateFeaturePicture(pictureIndex){
      // var filteredImages = props.record.images.filter( (m,index) => index != pictureIndex )
      // filteredImages.unshift( props.record.images[ pictureIndex ])
      store.dispatch( props.model.name+'/featurePicture',{
        id : props.record.id ,
        index: pictureIndex
      }).then( res => {
        if( res.data.ok ){
          notify.success({
            title: 'រក្សារទុកព័ត៌មាន' ,
            content: '' ,
            description: res.data.message ,
            duration: 2000
          })
        }else{
          notify.error({
            title: 'រក្សារទុកព័ត៌មាន' ,
            content: '' ,
            description: 'មានបញ្ហាក្នុងពេលរក្សារទុកព័ត៌មាន។' ,
            duration: 2000
          })
        }
        props.onClose()
      }).catch( err => {
        message.error( err )
      })
    }

    function deletePicture(index){
      store.dispatch( props.model.name+'/removePicture',{
        id : props.record.id ,
        index: pictureIndex
      }).then( res => {
        if( res.data.ok ){
          notify.success({
            title: 'រក្សារទុកព័ត៌មាន' ,
            content: '' ,
            description: res.data.message ,
            duration: 2000
          })
        }else{
          notify.error({
            title: 'រក្សារទុកព័ត៌មាន' ,
            content: '' ,
            description: 'មានបញ្ហាក្នុងការដករូបភាព។' ,
            duration: 2000
          })
        }
        props.onClose()
      }).catch( err => {
        message.error( err )
      })
    }

    return {
      /**
       * Variables
       */
      productTitle ,
      files ,
      /**
       * Functions
       */
      clearRecord ,
      uploadFiles ,
      clickUpload ,
      fileChange ,
      clearFilesUpload ,
      updateFeaturePicture ,
      deletePicture

    }
  }
}
</script>