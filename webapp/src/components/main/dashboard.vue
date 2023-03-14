<template >
    <div class="flex flex-wrap justify-center p-4bg-white">
        <div class="vcb-topbar">
            <div class="vcb-topbar-panel">
                
            </div>
        </div>
        <div class="vcb-card" ></div>
    </div>
</template>
<script >
import { defineComponent, ref } from 'vue'

export default {
    name: 'Dashboard',
    components: {
        
    },
    name: 'dashboard' ,
    setup() {

        return { 
            
        }
    }
}
</script>
<style scoped>
    .vcb-card {
        @apply bg-gray-200 p-4 rounded border border-gray-200 hover:border-gray-400 duration-300 w-1/5 m-4;
    }
    .vcb-topbar {
        @apply relative w-full;
    }
    .vcb-topbar-panel {
        @apply p-2 bg-blue-500 h-14 leading-10;
    }
</style>