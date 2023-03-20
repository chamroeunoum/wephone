<template>
  <!-- Form edit account -->
    <div class="vcb-pop-create font-ktr">
      <n-modal v-model:show="show" :on-after-leave="clearRecord" transform-origin="center" :on-after-enter="initialData" >
        <n-card class="w-1/2 font-pvh text-xl" :title="'បន្ថែម ' + model.title" :bordered="false" size="small">
          <template #header-extra>
            <n-button type="success" @click="create()" >
              <template #icon>
                <n-icon>
                  <Save20Regular />
                </n-icon>
              </template>
              រក្សារទុក
            </n-button>
          </template>
          <!-- Form edit account -->
          <div class="crud-create-form w-full border-t">
            <div class=" mx-auto p-4 flex-wrap">
              <div class="crud-form-panel w-full flex flex-wrap ">
                <n-form 
                  class="w-full text-left font-btb text-lg flex flex-wrap" 
                  :label-width="80"
                  size="large"
                  ref="formRef"
                >
                  <n-form-item label="ផលិតផល" path="product" class="w-4/5 mr-8" >
                    <n-select v-model:value="product_id" :options="productOptions" placeholder="ផលិតផល" filterable />
                  </n-form-item>
                  <n-form-item label="ឯកតា" path="unit" class="w-4/5 mr-8" >
                    <n-select v-model:value="unit_id" :options="unitOptions" placeholder="ឯកតា" filterable />
                  </n-form-item>
                  <n-form-item label="បរិមាណ" path="quantity" class="w-4/5 mr-8" >
                    <n-input-number v-model:value="quantity" clearable placeholder="បរិមាណ" />
                  </n-form-item>
                  <div class="w-full mr-8 " >
                    <div class="w-full text-sm mb-4 relative" >បន្សំលក្ខណ នៃផលិតផល
                      <div class="w-1/2 absolute right-0 top-0 " >
                        <n-input type="text" placeholder="បន្ថែម លក្ខណនៃផលិតផល" class="pr-8" v-model:value="attribute" />
                        <svg @click="addAttribute" class="w-8 cursor-pointer absolute top-0 right-0 inline-block hover:text-blue-500 duration-300" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M6 10a.5.5 0 0 1 .5-.5h3v-3a.5.5 0 0 1 1 0v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3A.5.5 0 0 1 6 10zm4 8a8 8 0 1 0 0-16a8 8 0 0 0 0 16zm0-1a7 7 0 1 1 0-14a7 7 0 0 1 0 14z" fill="currentColor"></path></g></svg>
                      </div>
                    </div>
                    <!-- record.attribute_variant_id -->
                    <div class="flex flex-wrap" >
                      <div v-for="(attribute , index) in attributes" class="w-1/2 p-4 text-sm">
                        <div class="relative w-full border-b border-gray-300 mb-4" >{{ attribute.name }}</div>
                        <div class="mb-4 relative" >
                          <n-input type="text" placeholder="បន្ថែម អនុលក្ខណនៃ លក្ខណខាងលើ" class="pr-12" v-model:value="attribute.variant" />
                          <svg @click="attribute.variant_id=0" class="w-6 cursor-pointer absolute top-1 right-8 inline-block hover:text-blue-500 duration-300" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M11.197 2.44a1.5 1.5 0 0 1 2.121 0l4.243 4.242a1.5 1.5 0 0 1 0 2.121L9.364 17H14.5a.5.5 0 0 1 0 1H7.82a1.496 1.496 0 0 1-1.14-.437L2.437 13.32a1.5 1.5 0 0 1 0-2.121l8.76-8.76zm1.414.706a.5.5 0 0 0-.707 0L5.538 9.512l4.95 4.95l6.366-6.366a.5.5 0 0 0 0-.707L12.61 3.146zM9.781 15.17l-4.95-4.95l-1.687 1.687a.5.5 0 0 0 0 .707l4.243 4.243a.5.5 0 0 0 .707 0l1.687-1.687z" fill="currentColor"></path></g></svg>
                          <svg @click="addVariant(attribute.id,attribute.variant)" class="w-6 cursor-pointer absolute top-1 right-1 inline-block hover:text-blue-500 duration-300" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M6 10a.5.5 0 0 1 .5-.5h3v-3a.5.5 0 0 1 1 0v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3A.5.5 0 0 1 6 10zm4 8a8 8 0 1 0 0-16a8 8 0 0 0 0 16zm0-1a7 7 0 1 1 0-14a7 7 0 0 1 0 14z" fill="currentColor"></path></g></svg>                          
                        </div>
                        <n-radio-group v-model:value="attribute.variant_id" name="radiogroup">
                          <n-space>
                            <n-radio
                              v-for="(variant , index) in attribute.variants"
                              :key="variant.id"
                              :value="variant.id"
                              :label="variant.name"
                            />
                          </n-space>
                        </n-radio-group>
                      </div>
                    </div>
                  </div>
                  
                </n-form>
                <div class="w-1/2 h-8"></div>  
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
import dateFormat, { masks } from "dateformat"

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
    } , 
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
    const attributes = ref([])
    const attribute = ref('')
    const variant = ref('')
    const product_id = ref(null)
    const unit_id = ref(null)
    const quantity = ref(0)
    const attribute_variant_id = ref(0)
    const attributeModels = ref([])
    
    const products = ref([])
    const productOptions = computed( () => {
      return products.value.length > 0 ? products.value.map( p => { return {label: p.id + ". " +p.description + " - " + p.origin, value: p.id } }) : []
    })

    const units = ref([])
    const unitOptions = computed( () => {
      return units.value.length > 0 ? units.value.map( p => { return {label: p.id + ". " +p.name , value: p.id } }) : []
    })

    /**
     * Variables
     */    
    const rules = {
      description: {
        required: true,
        message: 'សូមបញ្ជាក់ឈ្មោះ',
        trigger: [ 'blur']
      },
      origin: {
        required: true,
        message: 'សូមបញ្ជាក់ប្រភព',
        trigger: [ 'blur']
      }
    }
    /**
     * Functions
     */
    function clearRecord(){
      product_id.value = 0
      unit_id.value = 0
      quantity.value = 0
      props.onClose()
    }

    function create(){
      if( product_id.value <= 0 || product_id.value == null ){
        notify.warning({
          'title' : 'ពិនិត្យព័ត៌មាន' ,
          'description' : 'សូមជ្រើសរើសផលិតផល។' ,
          duration : 3000
        })
        return false
      }
      if( unit_id.value <= 0 || unit_id.value == null ){
        notify.warning({
          'title' : 'ពិនិត្យព័ត៌មាន' ,
          'description' : 'សូមបំពេញ ឯកតា។' ,
          duration : 3000
        })
        return false
      }
      if( quantity.value < 0 ){
        notify.warning({
          'title' : 'ពិនិត្យព័ត៌មាន' ,
          'description' : 'សូមបំពេញ បរិមាណ។' ,
          duration : 3000
        })
        return false
      }
      if( props.model === undefined || props.model.name == "" ){
        notify.warning({
          'title' : 'ពិនិត្យព័ត៌មាន' ,
          'description' : 'ទម្រង់នៃព័ត៌មានមិនទាន់បានកំណត់។' ,
          duration : 3000
        })
        return false
      }
      var variants = attributes.value.map( a => a.variant_id ).filter( v => v > 0 )
      store.dispatch( props.model.name+'/create',{
        product_id: product_id.value ,
        unit_id : unit_id.value ,
        quantity : quantity.value ,
        variants: variants
      }).then( res => {
        switch( res.status ){
          case 200 : 
            notify.success({
              'title' : 'រក្សារទុកព័ត៌មាន' ,
              'description' : res.data.message ,
              duration : 3000
            })
            clearRecord()
          break;
        }
      }).catch( err => {
        console.log( err )
        notify.error({
          'title' : 'រក្សារទុកព័ត៌មាន' ,
          'description' : err.response.data.message  ,
          duration : 3000
        })
      })
    }
    
    function checkName(){
      // if( username != "" ){
      //   store.dispatch('product/checkname',{
      //     description: props.record.description ,
      //     origin : props.record.origin
      //   }).then( res => {
      //     if( res.data.ok ){
      //       notify.info({
      //         title: 'ពិនិត្យឈ្មោះ' ,
      //         description : "ឈ្មោះ មានរួចហើយ។" ,
      //         duration : 3000
      //       })
      //     }
      //   }).catch( err => {
      //     console.log( err )
      //     notify.error({
      //       'title' : 'ពិនិត្យឈ្មោះ' ,
      //       'description' : 'មានបញ្ហាក្នុងពេលពិនិត្យឈ្មោះ។' ,
      //       duration : 3000
      //     })
      //   })
      // }
    }

    function addAttribute(){
      if( attribute.value == "" ){
        notify.info({
          'title' : 'បញ្ចូល លក្ខណនៃផលិតផល' ,
          'description' : 'សូមបំពេញឈ្មោះ' ,
          duration : 3000
        })
        return false
      }
      store.dispatch('attribute/create',{
        name : attribute.value
      }).then( res => {
        switch( res.status ){
          case 200 :
            attribute.value = "" 
            getAttributes()
          break;
        }
      }).catch( err => {
        console.log( err )
        notify.error({
          'title' : 'រក្សារទុកព័ត៌មាន' ,
          'description' : err.response.data.message ,
          duration : 3000
        })
      })
    }
    function getAttributes(){
      store.dispatch('attribute/compact',{}).then( res => {
        switch( res.status ){
          case 200 : 
            attributes.value = res.data.records.map( (r) => { return {
              id : r.id ,
              name : r.name ,
              variants : r.variants , 
              variant : ref('') ,
              variant_id : ref(0)
            }
          })
          break;
        }
      }).catch( err => {
        console.log( err )
        notify.error({
          'title' : 'រក្សារទុកព័ត៌មាន' ,
          'description' : err.response.data.message ,
          duration : 3000
        })
      })
    }

    function addVariant(attributeId,variantName){
      if( variantName == "" ){
        notify.info({
          'title' : 'បញ្ចូល អនុលក្ខណនៃផលិតផល' ,
          'description' : 'សូមបំពេញឈ្មោះ' ,
          duration : 3000
        })
        return false
      }
      store.dispatch('variant/create',{
        attribute_id : attributeId ,
        name : variantName
      }).then( res => {
        switch( res.status ){
          case 200 :
            variantName = ""
            getAttributes()
          break;
        }
      }).catch( err => {
        console.log( err )
        notify.error({
          'title' : 'រក្សារទុកព័ត៌មាន' ,
          'description' : err.response.data.message ,
          duration : 3000
        })
      })
    }

    function getProducts(){
      store.dispatch('product/compact',{}).then( res => {
        switch( res.status ){
          case 200 : 
            products.value = res.data.records
            console.log( products.value )
          break;
        }
      }).catch( err => {
        console.log( err )
        notify.error({
          'title' : 'រក្សារទុកព័ត៌មាន' ,
          'description' : err.response.data.message ,
          duration : 3000
        })
      })
    }

    function getUnits(){
      store.dispatch('unit/compact',{}).then( res => {
        switch( res.status ){
          case 200 : 
            units.value = res.data.records
            console.log( units.value )
          break;
        }
      }).catch( err => {
        console.log( err )
        notify.error({
          'title' : 'រក្សារទុកព័ត៌មាន' ,
          'description' : err.response.data.message ,
          duration : 3000
        })
      })
    }

    function initialData(){
      getUnits()
      getProducts()
      getAttributes()
    }

    return {
      /**
       * Variables
       */
      rules ,
      attributes ,
      attribute ,
      variant ,
      attribute_variant_id ,
      product_id ,
      unit_id ,
      quantity ,
      products ,
      productOptions ,
      units ,
      unitOptions ,
      /**
       * Functions
       */
      clearRecord ,
      create ,
      checkName ,
      addAttribute ,
      addVariant ,
      initialData
    }
  }
}
</script>