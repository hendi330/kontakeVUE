import { createApp } from 'vue'
import App from './App.vue'


import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
// import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import './assets/main.css'
// const registerServiceWorker = async () => {
//     if ("serviceWorker" in navigator) {
//       try {
//         const registration = await navigator.serviceWorker.register("/sw.js", {
//           scope: "/",
//         });
//         if (registration.installing) {
//           console.log("Service worker installing");
//         } else if (registration.waiting) {
//           console.log("Service worker installed");
//         } else if (registration.active) {
//           console.log("Service worker active");
//         }
//       } catch (error) {
//         console.error(`Registration failed with ${error}`);
//       }
//     }
//   };
  
//   // …
  
//   registerServiceWorker();
createApp(App).mount('#app')
