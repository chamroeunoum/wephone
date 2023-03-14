<template>
  <div class="profilePage flex flex-col">
    <!-- Menu -->
    <div class="flex w-full h-20 p-2 border-b" >
      <div class="flex-none w-16 rounded-full" >
        <img src="./../../assets/ocmlogo.png" alt="ប្រពន្ធ័គ្រប់គ្រងឯកសារ អេឡិចត្រូនិច" title="ប្រពន្ធ័គ្រប់គ្រងឯកសារ អេឡិចត្រូនិច" class="w-full" >
      </div>
      <div class="flex-grow px-4 text-left text-lg leading-10 py-3">ប្ដូរពាក្យសម្ងាត់ </div>
      <div class="flex-none hidden">
        <div class="border rounded-full w-12 h-12 my-2 leading-10 p-1 bg-red-500 text-white cursor-pointer" alt="ចាកចេញពីប្រព័ន្ធ" title="ចាកចេញពីប្រព័ន្ធ" @click="logout" >
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M10.5 2.5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0v-6zM13.743 4a.5.5 0 1 0-.499.867a6.5 6.5 0 1 1-6.494.004a.5.5 0 1 0-.5-.866A7.5 7.5 0 1 0 13.743 4z" fill="currentColor"></path></g></svg>
        </div>
      </div>
    </div>
    <!-- End Menu -->    
    <div class="profileInformation p-8 sm:w-2/3 md:w-3/5 lg:w-2/5 w-4/5 mx-auto border my-8">
      <div class="profileImage border rounded-full border-gray-200 p-2 w-40 max-h-40 flex-none mx-auto">
        <img src="./../../assets/ocmlogo.png" alt="Profile picture" class="w-full" >
      </div>
      <div class="my-12">
        <n-form
        ref="formRef"
        label-placement="left"
        label-width="120"
        :model="model" 
        :rules="rules"
        >
          <n-form-item-row  path="password"  label="ពាក្យសម្ងាត់" >
            <n-input type="password" placeholder="ពាក្យសម្ងាត់" class="text-left" v-model:value="model.password" />
          </n-form-item-row>
          <n-form-item-row  path="confirmPassword"  label="បញ្ជាក់ពាក្យសម្ងាត់" >
            <n-input type="password" placeholder="បញ្ជាក់ពាក្យសម្ងាត់" class="text-left" v-model:value="model.confirmPassword" />
          </n-form-item-row>
        </n-form>
        <n-button type="default" class="mx-8 w-32 my-1" @click="$router.push('/welcome')" >បកក្រោយ</n-button>
        <n-button type="primary" secondary class="mx-8 w-32 my-1" @click="changePassword()" >ប្ដូរពាក្យសម្ងាត់</n-button>
      </div>
    </div>
    <div class="fixed bottom-0 w-full ">
      <footer-component></footer-component>
    </div>
  </div>
</template>
<script >
import { getUser , authLogout } from '../../plugins/authentication'
import { reactive  } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import FooterComponent from '../footer/copy-right.vue'
import { useNotification } from 'naive-ui'

  export default {
    name: 'Profile' ,
    components: {
      FooterComponent
    },
    setup(){
      const router = useRouter()
      const store = useStore()
      const notify = useNotification()
      
      const model = reactive({
            password: '' ,
            confirmPassword: ''
        })

        const rules = {
            password: [
                { required: true, message: 'សូមបញ្ចូលពាក្យសម្ងាត់!', trigger: 'blur' }
            ],
            confirmPassword: [
                { required: true, message: 'សូមបញ្ចូលពាក្យសម្ងាត់ម្ដងទៀតដើម្បីបញ្ជាក់!', trigger: 'blur' }
            ]
        }

        function changePassword(){
            if( model.password !== model.confirmPassword ) {
                notify.warning({
                    title: 'ពិនិត្យពាក្យសម្ងាត់' ,
                    content: 'សូមប្រាកដថា ពាក្យសម្ងាត់ និង បញ្ជាក់ពាក្យសម្ងាត់ គឺដូចគ្នា។'
                })
                return false
            }
            store.dispatch('user/passwordUpdate',{
                email: getUser().email ,
                password: model.password
            }).then( res => {
                if( res.data.ok ){
                    notify.success({
                        title: 'ប្ដូរពាក្យសម្ងាត់ថ្មី' ,
                        content: res.data.message ,
                        duration: 3000
                    })
                    // authLogout()
                    router.push({
                        name: "Login" ,
                        params: {
                            email: getUser().email
                        }
                    })
                }else{
                    notify.warning({
                        title: 'ប្ដូរពាក្យសម្ងាត់ថ្មី' ,
                        content: res.data.message ,
                        duration: 3000
                    })
                }
            }).catch( err => {
                notify.error({
                    title: 'ប្ដូរពាក្យសម្ងាត់ថ្មី' ,
                    content: err.response.data.message ,
                    duration: 3000
                })
            })
        }

      return {
        model ,
        rules ,
        changePassword
      }
    }

  }
</script>