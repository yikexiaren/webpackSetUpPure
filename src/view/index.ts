import css from './index.less'
const htmlStr = '<li>1231231</li>'
// 创建组件
class UserCard extends HTMLElement  {
  // 构造函数
  constructor() {
    // 运行父类中的构造函数
    super();
    // var shadow = this.attachShadow({mode: 'open'});
    var shadow = this.attachShadow({mode: 'closed'});
    
  
    let container = document.createElement('div');
  
    container.innerHTML=htmlStr
  
    shadow.appendChild(container)
    // this.append(container);

  }
}
window.customElements.define('word-count', UserCard);
export default  UserCard


