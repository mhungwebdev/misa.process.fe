import { createRouter, createWebHistory } from "vue-router"
import ExecutePage from "../page/execute/ExecutePage.vue"
import DefinitionPage from "../page/definition/DefinitionPage.vue"
import ReportPage from "../page/report/ReportPage.vue"
import SettingPage from "../page/setting/SettingPage.vue"
import UserSettingPage from "../page/setting/views/UserSettingPage.vue"
import PermissionSettingPage from "../page/setting/views/PermissionSettingPage.vue"
import UserGroupSettingPage from "../page/setting/views/UserGroupSettingPage.vue"
import ConnectSettingPage from "../page/setting/views/ConnectSettingPage.vue"


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/process/execute", component: ExecutePage },
        { path: "/process/definition", component: DefinitionPage },
        { path: "/process/report", component: ReportPage },
        { 
            path: "/process/setting", 
            component: SettingPage, 
            redirect:'/process/setting/user',
            children: [
                { path: "/process/setting/user", component: UserSettingPage },
                { path: "/process/setting/permission", component: PermissionSettingPage },
                { path: "/process/setting/user-group", component: UserGroupSettingPage },
                { path: "/process/setting/connect", component: ConnectSettingPage },
            ]
        },
        { path: '/:pathMatch(.*)*', redirect:'/process/setting/user' },
    ],
})

export default router