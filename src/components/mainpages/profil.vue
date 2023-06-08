<template>
    <div class="container-fluid">
        <div class="row">
            <div :class="[navbarspace]">

            </div>
            <div :class="[contentspace]">
                <div class="row">
                    <div class="col-md-12">
                        <h1>Profil</h1>
                    </div>
                </div>
            </div>
        
        </div>
    </div>
    
</template>
<script setup>
import { defineProps, ref } from 'vue'
const props = defineProps(["navbar_space", "content_space"]);
let navbarspace = ref(props.navbar_space);
let contentspace = ref(props.content_space)

</script>