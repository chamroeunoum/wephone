<template>
  <div class="flex justify-center">
    <div class="w-full mx-8 xs:w-full sm:w-4/5 md:w-2/4 lg:w-2/5 xl:w-2/5 p-8 md:mt-24 sm:mt-12 mb-24">
      <div class="w-40 mx-auto my-4">
        <img src="./../../assets/wephone.png" alt="WePhone Logo" class="w-full" >
      </div>
      <div class="text-center" >
        <div class="my-2 text-2xl font-muol">វីហ្វូនហ្សប</div>
        <div class="my-2 text-lg">WePhone Shop</div>
      </div>
      <div class="w-full mx-auto my-8 text-left text-md">ចូលប្រព័ន្ធ</div>
      <n-space vertical>
        <n-input round 
          placeholder="អ៊ីមែល"
          v-model:value="credentials.email"
          clearable
          @keyup.enter="funcLogin"
        >
          <template #prefix>
            <n-icon size="12" class='text-gray-600 ' >
              <component :is="AlternateEmailOutlined" />
            </n-icon>
          </template>
        </n-input>
        <n-input round 
          placeholder="ពាក្យសំងាត់"
          v-model:value="credentials.password"
          type="password"
          clearable
          @keyup.enter="funcLogin"
        >
          <template #prefix>
            <n-icon size="12" class='text-gray-600 ' >
              <component :is="Key20Regular" />
            </n-icon>
          </template>
        </n-input>
      </n-space>
      <div class="w-full my-12">
        <n-button type="default" class="w-32 mx-1" @click="$router.push('/welcome')"  >
          ទៅ គេហទំព័រ
          <!-- <template #icon>
            <n-icon size="16" class='text-red-500 ' >
              <DocumentPdf />
            </n-icon>
          </template> -->
        </n-button>
        <n-button  type="success" class="w-32 mx-1" :loading="loading" @click="funcLogin"  >
          ចូល
          <template #icon>
            <n-icon size="16" class='text-white ' >
              <login />
            </n-icon>
          </template>
        </n-button>
      </div>
      <div class="w-full mt-8">
        <router-link to="/register" class="w-60 mx-2"  >
          <n-icon size="22" class='text-blue-500 pt-1 mr-2' ><PersonOutlined /></n-icon>ចូលជាសមាជិកថ្មី
        </router-link>
        <router-link to="/password/forgot" class="w-60 mx-2 "  >
          <n-icon size="22" class='text-blue-500 mr-2 pt-1' ><VpnKeyOutlined /></n-icon>ភ្លេចពាក្យសម្ងាត់ ?
        </router-link>
      </div>
      <div class="w-full mt-8">
        <div class="mx-auto underline mb-4" >ទំនាក់ទំនងមកយើងខ្ញុំ</div>
        <a class="w-50 mx-2" target="_blank_" href="https://t.me/edmsocm"  >
          <n-icon size="22" class=' pt-1 mr-2 ' >
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="text-blue-500" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19c-.14.75-.42 1-.68 1.03c-.58.05-1.02-.38-1.58-.75c-.88-.58-1.38-.94-2.23-1.5c-.99-.65-.35-1.01.22-1.59c.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02c-.09.02-1.49.95-4.22 2.79c-.4.27-.76.41-1.08.4c-.36-.01-1.04-.2-1.55-.37c-.63-.2-1.12-.31-1.08-.66c.02-.18.27-.36.74-.55c2.92-1.27 4.86-2.11 5.83-2.51c2.78-1.16 3.35-1.36 3.73-1.36c.08 0 .27.02.39.12c.1.08.13.19.14.27c-.01.06.01.24 0 .38z" fill="currentColor"></path></svg>
          </n-icon>តេលេក្រាម
        </a>
        <a class="w-50 mx-2"  href="mailto:edmsocm@gmail.com" >
          <n-icon size="22" class='text-blue-500 pt-1 mr-2 ' ><EmailOutlined /></n-icon>អ៊ីមែល
        </a>
      </div>
    </div>
    <div class="fixed bottom-0 mx-auto w-full">
      <FooterComponent />
    </div>
  </div>
</template>
<script>
import { getUser } from './../../plugins/authentication'
import FooterComponent from './../../components/footer/copy-right.vue'
import { Key20Regular } from "@vicons/fluent";
import { AlternateEmailOutlined , PersonOutlined, VpnKeyOutlined, EmailOutlined } from '@vicons/material'
import { Login, DocumentPdf } from '@vicons/carbon'
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useNotification } from 'naive-ui'

export default {
  name: 'LoginTemplate' ,
  components: {
    Login ,
    DocumentPdf ,
    FooterComponent,
    PersonOutlined ,
    VpnKeyOutlined ,
    EmailOutlined
  },
  setup(){
    /**
     * Components to use
     */
    const store = useStore()
    const router = useRouter()
    const notification = useNotification()

    if( getUser() !== undefined && getUser() !== null ){
      router.push('/welcome')  
    }
    
    /**
     * Data
     */
    const credentials = reactive({
        email: '' ,
        password: '' ,
      })
    const loading = ref( false )
    /**
     * Login function
     */
    function funcLogin(){
      if( credentials.email == "" || credentials.email == null ){
        notification.warning({
          title: "ព័ត៌មានមិនគ្រប់គ្រាន់" ,
          content: "សូមបញ្ចូលអ៊ីមែលរបស់អ្នក រួចព្យាយាមម្ដងទៀត បាទ។"
        })
        return false
      }
      if( credentials.password == "" || credentials.password == null ){
        notification.warning({
          title: "ព័ត៌មានមិនគ្រប់គ្រាន់" ,
          content: "សូមបញ្ចូលពាក្យសម្ងាត់របស់អ្នក រួចព្យាយាមម្ដងទៀត បាទ។"
        })
        return false
      }
      loading.value = true
      store.dispatch('auth/login',{
        email: credentials.email ,
        password: credentials.password
      }).then( res => {
        if( res.data.ok ){
          /**
           * Store the authenticated user into the store
           */
          store.commit('auth/setAuthentication',{
            user: res.data.record ,
            token: res.data.token ,
          })
          
          notification.success({
            title: "ចូលប្រព័ន្ធ " ,
            content: "សួស្ដី, " + res.data.record.lastname + ' ' + res.data.record.firstname ,
            duration:  1500,
            closable: false
          })
          router.push('/welcome')
          // if( res.data.user.role == 1 ){
          //   this.$router.push('/dashboard')
          // }else{
          //   this.$router.push('/receive')
          // }
        }else{
          notification.warning(res.data.message)
        }
        loading.value = false
      }).catch( err => {
        loading.value = false
        if( err.response !== null ){
          let message = err.response.status + ": " + err.response.statusText + "."
          if( err.response.data !== null ){
            for(var key in err.response.data.errors ){
              message += err.response.data.errors[key]
            }  
          }
          notification.error({
            title: "ចូលប្រើប្រាស់" ,
            meta: message ,
            content: err.response.data.message
          })
        }else{
          console.log( err.response )
        }
      });
    }
    /**
     * End login function
     */
    return {
      /**
       * data
       */
      credentials ,
      loading, 
      /**
       * Functions
       */
      funcLogin ,
      /**
       * Components
       */
      Key20Regular ,
      AlternateEmailOutlined ,
    }
  },
  mounted(){
    // console.log( this.credentials )
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 0.8rem;
}
</style>
