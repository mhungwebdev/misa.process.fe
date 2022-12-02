import { DxSelectBox } from 'devextreme-vue';
import { DxPopup } from 'devextreme-vue/popup';
import 'devextreme/dist/css/dx.light.css';
import { createApp } from 'vue';
import App from './App.vue';
import BaseButton from './components/BaseButton.vue';
import BaseDropdown from './components/BaseDropdown.vue';
import BaseInput from "./components/BaseInput.vue";
import BasePopup from "./components/BasePopup.vue";
import "./css/common.css";
import router from './router';
import { store } from './stores';
import BaseCheckbox from "./components/BaseCheckbox.vue";
import BaseOverlay from "./components/BaseOverlay.vue";
import BaseLoading from "./components/BaseLoading.vue";
import BaseTagBox from "./components/BaseTagBox.vue";
import { DxTooltip } from 'devextreme-vue/tooltip';
import { languages } from './languages/languages';

console.log(languages);

const app = createApp(App)
app.component("BaseButton",BaseButton)
app.component("BaseInput",BaseInput)
app.component("DxSelectBox",DxSelectBox)
app.component("BaseDropdown",BaseDropdown)
app.component("DxPopup",DxPopup)
app.component("BasePopup",BasePopup)
app.component("BaseCheckbox",BaseCheckbox)
app.component("BaseOverlay",BaseOverlay)
app.component("BaseLoading",BaseLoading)
app.component("BaseTagBox",BaseTagBox)
app.component("DxTooltip",DxTooltip)

app.use(store)
app.use(router)
app.use(languages)
app.mount('#app')
