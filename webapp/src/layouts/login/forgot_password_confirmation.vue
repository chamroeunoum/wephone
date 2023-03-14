<template >
    <div class="flex mx-auto pb-8 mt-8 mb-20 sm:w-12/12 md:w-10/12 lg:w-8/12 xl:w-6/12 2xl:w-6/12">  
        <div class="w-full p-8" >
            <div class="w-28 mx-auto my-4">
                <img src="./../../assets/ocmlogo.png" alt="SASTRA Logo" class="w-full" >
            </div>
            <div class="text-center" >
                <div class="my-2 text-md">ទីស្ដីការគណៈរដ្ឋមន្ត្រី</div>
                <div class="my-2 text-md">អគ្គនាយកដ្ឋានសម្របសម្រួលកិច្ចការទូទៅ</div>
                <div class="my-2 text-md">នាយកដ្ខានឯកសារអេឡិចត្រូនិច និងព័ត៌មានវិទ្យា</div>
            </div>
            <div class="w-full mx-auto my-8 text-lg ">ប្រព័ន្ធឯកសារអេឡិចត្រូនិច</div>
            <div class="w-full mx-auto mt-12 mb-8 border-b pb-2 text-left text-lg">បញ្ជាក់ការប្ដូរពាក្យសម្ងាត់</div>
            <n-form :model="model" :rules="rules" class="mb-24">
                <n-form-item path="code" label="កូតសម្ងាត់">
                    <n-input v-model:value="model.code" @keydown.enter.prevent placeholder="កូតសម្ងាត់" class="text-left " @keyup.enter="confirm()" />
                </n-form-item>
                
                <n-button @click="$router.push({ name: 'PasswordForgot', params: { email: model.email } })"  type="default" class="mx-4 my-1 w-60" size="medium" >បកក្រោយ</n-button>
                <n-button @click="confirm()" secondary type="success" class="mx-4 my-1 w-60" size="medium" >បញ្ជាក់លេខកូដប្ដូរពាក្យសម្ងាត់</n-button>
                
            </n-form>
        </div>
    </div>
    <div class="fixed bottom-0 w-full"><Footer /></div>
</template>
<script>
import Footer from '../../components/footer/copy-right.vue'
import { reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router' 
import { useNotification } from 'naive-ui'
export default {
    name: "register" ,
    components: {
        Footer
    },
    setup(){

        const store = useStore()
        const notify = useNotification()
        const router = useRouter()
        const route = useRoute()


        const model = reactive({
            email: '' ,
            code: ''
        })

        const rules = {
            code: [
                { required: true, message: 'សូមបញ្ចូលកូតសម្ងាត់ដែលអ្នកទទួលបានតាមរយះ អ៊ីមែល ឬ សារទូរសព្ទ !', trigger: 'blur' }
            ]
        }

        function confirm(){
            store.dispatch('user/passwordForgotConfirmation',{
                email: route.params.email ,
                code: model.code
            }).then( res => {
                if( res.data.ok ){
                    notify.success({
                        title: 'បញ្ចាក់កូត' ,
                        content: res.data.message ,
                        duration: 3000
                    })
                    router.push({
                        name: "PasswordUpdate" ,
                        params: {
                            email: route.params.email
                        }
                    })
                }else{
                    notify.warning({
                        title: 'បញ្ចាក់កូត' ,
                        content: res.data.message ,
                        duration: 3000
                    })
                }
            }).catch( err => {
                notify.error({
                    title: 'បញ្ចាក់កូត' ,
                    content: err.response.data.message ,
                    duration: 3000
                })
            })
        }

        return {
            model ,
            rules ,
            confirm
        }
    }
}
</script>
<style >
    
    #app {
        position: absolute;
        width: 100%;
        height: 100%;
    }
    .layout {
        height: 100%;
        width: 100%;
    }
    .ivu-layout {
        height: 100%;
    }
    .ivu-layout-footer {
        background: #f5f7f9;
        padding: 12px 50px;
        color: #515a6e;
        font-size: 14px;
        position: absolute;
        bottom: 0px;
        width: 100%;
    }
    .ivu-form-item {
        margin: auto auto 10px auto;
    }
    .ivu-form-item-error-tip {
        position: relative;
    }
</style>