<template>
  <div class="profilePage flex flex-col">
    <!-- Menu -->
    <div class="flex w-full h-20 p-2 border-b" >
      <div class="flex-none w-16 rounded-full" >
        <img src="./../../assets/ocmlogo.png" alt="ប្រពន្ធ័គ្រប់គ្រងឯកសារ អេឡិចត្រូនិច" title="ប្រពន្ធ័គ្រប់គ្រងឯកសារ អេឡិចត្រូនិច" class="w-full" >
      </div>
      <div class="flex-grow px-4 text-left text-lg leading-10 py-3">ព័ត៌មានអ្នកប្រើប្រាស់</div>
      <div class="flex-none hidden">
        <div class="border rounded-full w-12 h-12 my-2 leading-10 p-1 bg-red-500 text-white cursor-pointer" alt="ចាកចេញពីប្រព័ន្ធ" title="ចាកចេញពីប្រព័ន្ធ" @click="logout" >
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M10.5 2.5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0v-6zM13.743 4a.5.5 0 1 0-.499.867a6.5 6.5 0 1 1-6.494.004a.5.5 0 1 0-.5-.866A7.5 7.5 0 1 0 13.743 4z" fill="currentColor"></path></g></svg>
        </div>
      </div>
    </div>
    <!-- End Menu -->    
    <div class="profileInformation p-8 sm:w-2/3 md:w-3/5 lg:w-2/5 w-4/5 mx-auto border my-8 relative">
      <div class="profileImage border rounded-full border-gray-200 p-2 w-40 h-40 flex-none mx-auto overflow-hidden" >
        <img :src="localProfile" alt="Profile picture" class="w-40 h-40" >
      </div>
      <div class="uploader absolute right-0 top-0 w-24flex" >
        <input type="file" placeholder="ឯកសារយោង" @change="fileChange" class="hidden " id="referenceDocument" />
        <div class="cursor-pointer hover:border-green-500 flex flex-wrap"  >
          <n-tooltip trigger="hover">
            <template #trigger>
              <div class="changeProfile p-2 m-1 border rounded-full w-10 h-10 border-gray-300" @click="clickUpload"  >
                <n-icon size="22" class="text-gray-600" >
                  <CameraOutline />
                </n-icon>
              </div>
            </template>ប្ដូររូបភាពគណនី
          </n-tooltip>
          <n-tooltip trigger="hover">
            <template #trigger>
              <div class="saveProfile p-2 m-1 border rounded-full w-10 h-10 border-gray-300" @click="uploadFiles" >
                <n-icon size="22" class="text-gray-600" >
                  <CloudUploadOutline />
                </n-icon>
              </div>
            </template>រក្សារទុករូបភាពថ្មី
          </n-tooltip>
        </div>
      </div>
      <div class="my-12">
        <n-form
        ref="formRef"
        label-placement="left"
        :model="user"
        label-width="120"
        >
          <n-form-item-row label="ឈ្មោះគណនី" >
            <n-input placeholder="ឈ្មោះគណនី" class="text-left" v-model:value="user.username" />
          </n-form-item-row>
          <n-form-item-row label="គោត្តនាម" >
            <n-input placeholder="គោត្តនាម" class="text-left" v-model:value="user.lastname" />
          </n-form-item-row>
          <n-form-item-row label="នាម">
            <n-input placeholder="នាម" class="text-left" v-model:value="user.firstname" />
          </n-form-item-row>
          <n-form-item-row label="ទូរស័ព្ទ">
            <n-input placeholder="ទូរស័ព្ទ" class="text-left" v-model:value="user.phone" />
          </n-form-item-row>
          <n-form-item-row label="អ៊ីមែល" >
            <n-input placeholder="អ៊ីមែល" class="text-left" disabled v-model:value="user.email" />
          </n-form-item-row>
        </n-form>
        <n-button type="default" class="mx-8 w-32 my-1" @click="$router.push('/welcome')" >បកក្រោយ</n-button>
        <n-button type="primary" secondary class="mx-8 w-32 my-1" @click="save()" >រក្សារទុក</n-button>
      </div>
    </div>
    <div class="fixed bottom-0 w-full ">
      <footer-component></footer-component>
    </div>
  </div>
</template>
<script >
import { isAuth, getUser , authLogout } from './../../plugins/authentication.js'
import { reactive, ref , computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import FooterComponent from './../../components/footer/copy-right.vue'
import { useMessage, useNotification } from 'naive-ui'
import { Icon } from '@vicons/utils'
import { CameraOutline , CloudUploadOutline} from '@vicons/ionicons5'

  export default {
    name: 'Profile' ,
    components: {
      FooterComponent ,
      Icon ,
      CameraOutline ,
      CloudUploadOutline
    },
    setup(){
      const router = useRouter()
      const store = useStore()
      const user = ref(null)
      const message = useMessage()
      const notify = useNotification()
      const base64Avatar = ref(null)
      const selectedFileType = ref('')

      if( isAuth() ){
        user.value = getUser()
      }else{
        user.value = ref({
          lastname: '' ,
          firstname: '' ,
          phone: '' ,
          username: '' ,
          email: ''
        })
      }
      function save(){
        store.dispatch('user/update',{
          lastname: user.value.lastname ,
          firstname: user.value.firstname ,
          phone: user.value.phone ,
          username: user.value.username
        }).then( res => {
          localStorage.setItem( 'token' , JSON.stringify ( response.data.token ) )
          localStorage.setItem( 'user' , JSON.stringify( response.data.user ) )
          console.log( res )
        }).catch( err => {
          console.log( err )
        })
      }

      function logout(){
        if( isAuth() ){
          authLogout()
        }
        router.push('/welcome')
      }

      const files = ref([])
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
              title: "ដាក់រូបភាពអ្នកប្រើប្រាស់" ,
              description: "សូមបញ្ចូលឯកសារជាប្រភេទរូបភាព JPG និង PNG។" ,
              duration: 3000
            })
            return;
          }

          selectedFileType.value = file.type 

          // Validate file size
          if(file.size > allowed_size_mb*1024*1024) {
            notify.error({
              title: "ដាក់រូបភាពអ្នកប្រើប្រាស់" ,
              description: "ទំហំនៃរូបភាពគឺ៖ " + (file.size/1024/1024).toFixed(2) + " មេកាបៃ (MB) លើលទំហំដែលកំណត់គឺ ៥ មេកាបៃ។" ,
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
          reader.onload = function(e){
            // Ensure that the progress bar displays 100% at the end.
            console.log( 'On load' )
            /**
             * Read binary string from 'e.target.result' and convert to base64
             */
            base64Avatar.value = "data:"+file.type+";base64," + btoa( e.target.result )
          }
          // // // Read in the image file as base64 type
          // // reader.readAsDataURL(file);
          reader.readAsBinaryString(file)
          
          files.value.push( file )

        }
      }
      /**
       * On click file upload
       */
      function clickUpload(){
        document.getElementById('referenceDocument').click()
      }
      function uploadFiles(){
        if( files.value.length >= 0 ) {
          notify.info({
            title: "រក្សារទុករូបភាពគណនី" ,
            content: "សូមជ្រើសរើសរូបភាពជាមុនសិន។" ,
            duration: 3000
          })
          return false
        }
        notify.info({
          title: 'ដាក់រូបភាពអ្នកប្រើប្រាស់' ,
          description: 'កំពុងដាក់រូបភាព។' ,
          duration: 3000
        })

        let formData = new FormData()
        formData.append('id', user.value.id )
        formData.append('files',files.value[0])
        
        store.dispatch('user/upload', formData ).then( res => {
          notify.success({
            title: 'ដាក់រូបភាពអ្នកប្រើប្រាស់' ,
            description: 'កំពុងរក្សាទុករូបភាព។' ,
            duration: 3000
          })
            user.value = res.data.record
            localStorage.setItem( 'user' , JSON.stringify( res.data.record ) )
            base64Avatar.value = user.value.avatar_url
            formData = new FormData()
            files.value = new Array()
        }).catch( err => {
          console.log( err )
          notify.error({
            title: 'ដាក់រូបភាពអ្នកប្រើប្រាស់' ,
            description: 'មានបញ្ហាក្នុងការរក្សារទុករូបភាព។' ,
            duration: 3000
          })
        })
      }
      /**
       * Update local photo
       */
      const localProfile = computed( () => {
        return base64Avatar.value !== "" && base64Avatar.value !== null ? base64Avatar.value : ( user.value.avatar_url !== "" && user.value.avatar_url !== null ? user.value.avatar_url : "/src/assets/ocmlogo.png" )
      })

      return {
        user ,
        logout ,
        save ,
        fileChange ,
        uploadFiles,
        clickUpload ,
        localProfile
      }
    }

  }
</script>