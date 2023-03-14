<template >
    <div class="flex mx-auto pb-8 mt-8 mb-20 sm:w-12/12 md:w-10/12 lg:w-8/12 xl:w-6/12 2xl:w-6/12">  
        <div class="w-full p-8" >
            <div class="w-40 mx-auto my-4">
                <img src="./../../assets/wephone.png" alt="SASTRA Logo" class="w-full" >
            </div>
            <div class="text-center" >
                <div class="my-2 text-2xl font-muol">វីហ្វូនហ្សប</div>
                <div class="my-2 text-lg">WePhone Shop</div>
            </div>
            <div class="w-full mx-auto mt-12 mb-8 border-b pb-2 text-left text-lg">សំណើរចូលជាសមាជិក</div>
            <n-form :model="model" :rules="rules" class="mb-24" >
                <n-form-item path="lastname" label="គោត្តនាម">
                    <n-input v-model:value="model.lastname" @keydown.enter.prevent placeholder="គោត្តនាម" class="text-left " />
                </n-form-item>
                <n-form-item path="firstname" label="នាម">
                    <n-input v-model:value="model.firstname" @keydown.enter.prevent placeholder="នាម" class="text-left " />
                </n-form-item>
                <n-form-item path="phone" label="ទូរស័ព្ទ">
                    <n-input v-model:value="model.phone" @keydown.enter.prevent placeholder="ទូរស័ព្ទ" class="text-left " />
                </n-form-item>
                <n-form-item path="email" label="អ៊ីមែល">
                    <n-input v-model:value="model.email" placeholder="អ៊ីមែល" class="text-left " />
                </n-form-item>
                <n-form-item path="password" label="ពាក្យសម្ងាត់">
                    <n-input
                        v-model:value="model.password"
                        type="password"
                        @input="handlePasswordInput"
                        @keydown.enter.prevent
                        placeholder="ពាក្យសម្ងាត់"
                    class="text-left " />
                </n-form-item>
                <n-form-item path="password_confirmation" label="បញ្ជាក់ពាក្យសម្ងាត់" >
                    <n-input
                        v-model:value="model.password_confirmation"
                        type="password"
                        @keydown.enter.prevent 
                        placeholder="បញ្ជាក់ពាក្យសម្ងាត់"
                    class="text-left " />
                </n-form-item>
                
                <n-button @click="$router.push('/login')" type="default" class="mx-4 my-1 w-40" size="medium" >បកក្រោយ</n-button>
                <n-button @click="handleSubmit" secondary type="success" class="mx-4 my-1 w-40" size="medium" >ចុះឈ្មោះជាសមាជិក</n-button>
            </n-form>
        </div>
    </div>
    <div class="fixed bottom-0 w-full"><Footer /></div>
</template>
<script>
import Footer from './../../components/footer/copy-right.vue'
import { reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useNotification } from 'naive-ui'
export default {
    name: "register" ,
    components: {
        Footer
    },
    setup(){

        const store = useStore();
        const router = useRouter();
        const notify = useNotification();

        const model = reactive({
            firstname: '' ,
            lastname: '' ,
            phone: '',
            email: '',
            unit : '' ,
            password: '',
            password_confirmation: ''
        })

        const rules = {
            firstname: [
                { required: true, message: 'សូមបំពេញឈ្មោះរបស់អ្នក !' , trigger: 'blur'}
            ],
            lastname: [
                { required: true, message: 'សូមបំពេញត្រកូលរបស់អ្នក !' , trigger: 'blur'}
            ],
            email: [
                { required: true, message: 'សូមបំពេញអសយដ្ឋានសំបុត្រ !', trigger: 'blur' },
                { type: 'email' , message: 'ទម្រង់នៃ អ៊ីមែល មិនត្រឹមត្រូវ !' }
            ],
            phone: [
                { required: true, message: 'សូមបំពេញលេខទូរស័ព្ទរបស់អ្នក !' , trigger: 'blur'}
            ],
            password: [
                { required: true, message: 'សូមបញ្ចូលពាក្យសម្ងាត់សម្រាប់ប្រើចូលប្រព័ន្ធ !' , trigger: 'blur' }
            ],
            password_confirmation: [
                { required: true, message: 'សូមបញ្ចូលពាក្យសម្ងាត់សម្រាប់ប្រើចូលប្រព័ន្ធ ម្ដងទៀត !' , trigger: 'blur'}
            ]
        }

        function handleSubmit(){
            /**
             * Check email if does exist
             */

            /**
             * Check the phone if does exist
             */

            /**
             * Check if the password and confirmation are matched
             */
            if( model.password != model.password_confirmation ){
                notify.warning({
                    title: "ចុះឈ្មោះសមាជិកថ្មី" ,
                    description: "ពាក្យសម្ងាត់ និង ការបញ្ជាក់ មិនផ្ទៀងផ្ទាត់។ <br/>សូមពិនិត្យអោយបានត្រឹមត្រូវ ។" ,
                    duration: 3000
                })
                return false ;
            }

            /**
             * Register the user
             */
            store.dispatch('auth/signup',{
                firstname: model.firstname ,
                lastname: model.lastname ,
                phone: model.phone ,
                email: model.email ,
                password: model.password ,
                password_confirmation: model.password
            }).then( res => {
                if(res.data.ok){
                    notify.success({
                        title: 'ចុះឈ្មោះសមាជិកថ្មី' ,
                        description: 'ទទួលបានជោគជ័យ សម្រាប់ការចុះឈ្មោះ។ សូមពិនិត្យមើល អ៊ីមែល របស់អ្នក។ យើងបានបញ្ជូនលេខកូត ដើម្បីបញ្ជាក់អំពីការចុះឈ្មោះអ្នក។' ,
                        duration: 4000
                    })
                    router.push('/register/confirmation')
                }else{
                    notify.error({
                        title: 'ចុះឈ្មោះសមាជិកថ្មី' ,
                        description: 'មានកំហុសក្នុងការចុះឈ្មោះសមាជិកថ្មី។ <br/> ' + res.message ,
                        duration: 3000
                    })
                }
            }).catch( err => {
                notify.error({
                    title: 'ចុះឈ្មោះសមាជិកថ្មី' ,
                    description: 'មានកំហុសក្នុងការចុះឈ្មោះសមាជិកថ្មី។' ,
                    content: err.message , 
                    duration: 3000
                })
            })
        }

        return {
            /**
             * Variables
             */
            model ,
            rules ,
            store ,
            router ,
            /**
             * Functions
             */
            handleSubmit
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