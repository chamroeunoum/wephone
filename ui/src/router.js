import { createRouter, createWebHashHistory } from 'vue-router'
import { isAdmin, isAuth } from './plugins/authentication'
import LoginComponent from './layouts/login/index.vue'
import DashboardComponent from './layouts/dashboard/index.vue'
import DashboardWidget from './components/main/dashboard.vue'
/**
 * User Components
 */
import UserCrud from './components/user/index.vue'
import UserListCrud from './components/user/list.vue'
import UserCreateCrud from './components/user/create.vue'
import UserUpdateCrud from './components/user/update.vue'
import UserDetail from './components/user/detail.vue'

/**
 * Loan Components
 */
import LoanCrud from './components/loan/index.vue'
import LoanListCrud from './components/loan/list.vue'
import LoanCreateCrud from './components/loan/create.vue'
// import LoanUpdateCrud from './components/loan/update.vue'
// import LoanDetail from './components/loan/detail.vue'

/**
 * Client Components
 */
import ClientCrud from './components/client/index.vue'
import ClientListCrud from './components/client/list.vue'
import ClientCreateCrud from './components/client/create.vue'
import ClientUpdateCrud from './components/client/update.vue'

/**
 * Staff Components
 */
import StaffCrud from './components/staff/index.vue'
/**
 * Error
 */
import Page404 from './components/errors/404.vue'
let routes = [] 
if( !isAdmin() ){
    routes = [{ 
        path: '', 
        redirect: to => {
            return '/login'
        }
    },
    { 
        path: '/', 
        redirect: to => {
            return '/login'
        }
    },
    {
        name: 'Login',
        path: '/login',
        component: LoginComponent ,
        meta: {
            transition: 'slide-left'
        }
    },
    /**
     * Dashboard
     */
    {
        name: "Dashboard" ,
        path: '/dashboard',
        component: DashboardComponent,
        meta: {
            transition: 'slide-left' ,
            requiresAuth: true,
            is_admin : true
        },
        children: [{
            name: 'DashboardWidgets' ,
            path: '',
            component: DashboardWidget ,
            meta : {
                transition: 'slide-left' ,
                requiresAuth: true ,
                is_admin : true
            }
        },
        /**
         * User module
         */
        {
            name: 'User' ,
            path: '/user',
            component: UserCrud ,
            meta: { 
                transition: 'slide-right' ,
                requiresAuth: true,
                is_admin : true
            },
            children: [
                {
                    name: "UserList" ,
                    path: '' ,
                    component: UserListCrud
                },
                {
                    name: "UserDetail" ,
                    path: ':id/detail' ,
                    component: UserDetail
                },
                {
                    name: "UserCreate" ,
                    path: 'create' ,
                    component: UserCreateCrud
                },
                {
                    name: "UserUpdate" ,
                    path: 'update' ,
                    component: UserUpdateCrud
                }
            ]
        },
        /**
         * Loan module
         */
        {
            name: 'Loan' ,
            path: '/loan',
            component: LoanCrud ,
            meta: { 
                transition: 'slide-right' ,
                requiresAuth: true,
                is_admin : true
            },
            children: [
                {
                    name: "LoanList" ,
                    path: '' ,
                    component: LoanListCrud
                },
                // {
                //     name: "UserDetail" ,
                //     path: ':id/detail' ,
                //     component: UserDetail
                // },
                {
                    name: "LoanCreate" ,
                    path: 'create' ,
                    component: LoanCreateCrud
                },
                // {
                //     name: "UserUpdate" ,
                //     path: 'update' ,
                //     component: UserUpdateCrud
                // }
            ]
        },
        /**
         * Client module
         */
        {
            name: 'Client' ,
            path: '/client',
            component: ClientCrud ,
            meta: { 
                transition: 'slide-right' ,
                requiresAuth: true,
                is_admin : true
            },
            children: [
                {
                    name: "ClientList" ,
                    path: '' ,
                    component: ClientListCrud
                },
                // {
                //     name: "ClientDetail" ,
                //     path: ':id/detail' ,
                //     component: ClientDetail
                // },
                {
                    name: "ClientCreate" ,
                    path: 'create' ,
                    component: ClientCreateCrud
                },
                {
                    name: "ClientUpdate" ,
                    path: 'update' ,
                    component: ClientUpdateCrud
                }
            ]
        },
    ],
    }]
}else{
    routes = [{ 
        path: '', 
        redirect: to => {
            return '/login'
        }
    },
    { 
        path: '/', 
        redirect: to => {
            return '/login'
        }
    },
    {
        name: 'Login',
        path: '/login',
        component: LoginComponent ,
        meta: {
            transition: 'slide-left'
        }
    },
    /**
     * Dashboard
     */
    {
        name: "Dashboard" ,
        path: '/dashboard',
        component: DashboardComponent,
        meta: {
            transition: 'slide-left' ,
            requiresAuth: true,
            is_admin : true
        },
        children: [{
            name: 'DashboardWidgets' ,
            path: '',
            component: DashboardWidget ,
            meta : {
                transition: 'slide-left' ,
                requiresAuth: true ,
                is_admin : true
            }
        }]
    }]
}

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// Meta Handling
router.beforeEach((to, from, next) => {
    if (to.path !== '/login' && !isAuth() ){
        if( to.path.includes('/readpackage') ) next()
        else{
            next({ path: '/login' })
        }
    }
    else if (to.path == '/login' && isAuth() ) {
        next({ path: '/dashboard' })
        // if( isAdmin() ){
        //     next({ path: '/dashboard' })
        // }else{
        //     next({ path: '/receive' })
        // }
    }
    else {
        next()
    }
})
// .beforeResolve(async to => {
//     if (to.meta.requiresCamera) {
//         try {
//         await askForCameraPermission()
//         } catch (error) {
//         if (error instanceof NotAllowedError) {
//             // ... handle the error and then cancel the navigation
//             return false
//         } else {
//             // unexpected error, cancel the navigation and pass the error to the global handler
//             throw error
//         }
//         }
//     }
// })

export default router