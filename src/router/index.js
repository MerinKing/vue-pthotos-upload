import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import MainPage from '@/components/MainPage'
import MainPageOneDay from '@/components/MainPageOneDay'
import MainpageThree from '@/components/MainPage3'
import navigation from '@/components/navigation'
import importDataToDB from "@/components/data2DB"
import photosupload from "@/components/photosUpload"


import freeWorkersMsg from "@/components/freedWorkersQuery"

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/mainPage4',
            name: 'MainPage4',
            component: importDataToDB
        }, {
            path: '/mainPage3',
            name: 'MainPage3',
            component: MainpageThree
        },
        {
            path: '/mainPage2',
            name: 'MainPageOne',
            component: MainPageOneDay
        },
        {
            path: '/mainPage1',
            name: 'MainPage',
            component: MainPage
        },
        {
            path: '/',
            name: 'index',
            component: photosupload
        }
    ]
})