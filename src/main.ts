import '@/assets/index.less'
import  AppPage from './app'
// window.customElements.define('user-card',UserCard)

let App:any = document.querySelector('#app')
console.log(App);
 App?.appendChild(new AppPage);
// App.innerHTML='<user-card> <abc-des>'