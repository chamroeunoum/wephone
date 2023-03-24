<template>
  <!-- Form edit account -->
    <div class="vcb-pop-create font-ktr">
      <n-modal v-model:show="show" :on-after-leave="onClose" transform-origin="center">
        <n-card class="w-1/2 font-pvh text-xl" :title="productTitle" :bordered="false" size="small">
          <template #header-extra>
            <!-- <n-button type="success" @click="create()" >
              <template #icon>
                <n-icon>
                  <Save20Regular />
                </n-icon>
              </template>
              រក្សារទុក
            </n-button> -->
          </template>
          <!-- Form edit account -->
          <div class="crud-create-form w-full border-t">
            <div class=" mx-auto p-4 flex-wrap">
              <div class="w-full mb-4 border-b border-gray-200 pb-2">សូចចុចលើរូបភាពណាមួយ ដើម្បីដាក់រូបភាពជា រូបភាពមឋម។</div>
              <div class="crud-form-panel w-full flex items-start ">
                <div v-for="(picture, index) in record.images" :key="index" @click="updateFeaturePicture(index)" class="w-40 p-2 m-2 cursor-pointer border-gray-200 border rounded hover:border-gray-400 hover:shadow-md duration-300" >
                  <img :src="picture" />
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
import { Save20Regular } from '@vicons/fluent'

export default {
  components: {
    Save20Regular
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
    
    const productTitle = computed( () => {
      return props.record !== undefined && props.record !== null ? props.record.description : ""
    })

    /**
     * Functions
     */
    function clearRecord(){
      props.onClose()
    }

    function create(){
      if( props.model === undefined || props.model.name == "" ){
        notify.warning({
          'title' : 'ពិនិត្យព័ត៌មាន' ,
          'description' : 'ទម្រង់នៃព័ត៌មានមិនទាន់បានកំណត់។' ,
          duration : 3000
        })
        return false
      }
      store.dispatch( props.model.name+'/create',{
        description : record.description ,
        origin : record.origin 
      }).then( res => {
        switch( res.status ){
          case 200 : 
            notify.success({
              'title' : 'រក្សារទុកព័ត៌មាន' ,
              'description' : res.data.message ,
              duration : 3000
            })
            record.id = res.data.record.id 
            record.description = res.data.record.description 
            record.origin = res.data.record.origin
            uploadFiles()
            // clearRecord()
          break;
        }
      }).catch( err => {
        console.log( err )
        notify.error({
          'title' : 'រក្សារទុកព័ត៌មាន' ,
          'description' : 'មានបញ្ហាក្នុងពេលរក្សារទុកព័ត៌មាន។' ,
          duration : 3000
        })
      })
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

    return {
      /**
       * Variables
       */
       productTitle ,
      /**
       * Functions
       */
      clearRecord ,
      create ,
      updateFeaturePicture
    }
  }
}
</script>