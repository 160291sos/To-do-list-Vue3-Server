import { createApp } from 'vue';
import App from './App';
import router from '@/router/router';
import components from '@/components/UI';
import directives from '@/components/directives';
import VFocus from './components/directives/VFocus';

const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component)
})
app.directive('focus', VFocus)
// directives.forEach(directive => {
//     app.directive(directive.name, directive)
// })
app
    .use(router)
    .mount('#app');
