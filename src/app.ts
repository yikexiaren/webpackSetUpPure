
import UserCard from './view/index'
// 创建组件
class App extends HTMLElement  {
  // 构造函数
  constructor() {
    // 运行父类中的构造函数
    super();
     let shadow = this.attachShadow({mode: 'open'});
    let container = document.createElement('div');
   container.appendChild(new UserCard)

    shadow.appendChild(container)
    // this.appendChild(container);

  }
}
customElements.define('app-page',App);
export default  App


