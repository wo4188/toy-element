import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import ToyView from 'toy-view'
import 'toy-view/dist/index.css';
import { autoRefresh } from './autoUpdate';

if (process.env.NODE_ENV === 'production') {
  autoRefresh(() => {
    const result = confirm("页面有更新，是否刷新？");
    if (result) {
      location.reload();
    }
  }, 4 * 60 * 1000);
}

createApp(App).use(ToyView).mount('#app')
