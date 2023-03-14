import { createRouter, createWebHashHistory } from 'vue-router'
import { isAdmin, isAuth } from './plugins/authentication'
import LoginComponent from './layouts/login/index.vue'
import ForgotPasswordComponent from './layouts/login/forgot_password.vue'
import ForgotPasswordConfirmationComponent from './layouts/login/forgot_password_confirmation.vue'
import PasswordUpdateComponent from './layouts/login/password_update.vue'
import PasswordChangeComponent from './components/user/password_change.vue'
import RegisterComponent from './layouts/login/register.vue'
import RegisterConfirmationComponent from './layouts/login/register_confirmation.vue'
import WelcomeComponent from './layouts/welcome/index.vue'
import ProfileComponent from './components/user/profile.vue'
import DashboardComponent from './layouts/dashboard/index.vue'

/**
 * Error
 */
import Page404 from './components/errors/404.vue'
let routes = [] 
routes = [{ 
        path: '', 
        redirect: to => {
            return '/welcome'
        }
    },
    { 
        path: '/', 
        redirect: to => {
            return '/welcome'
        }
    },
    {
        name: 'Welcome',
        path: '/welcome',
        component: WelcomeComponent ,
        meta: {
            // transition: 'fade'
        }
    },
    {
        name: 'Login',
        path: '/login',
        component: LoginComponent ,
        meta: {
            // transition: 'fade'
        }
    },
    {
        name: 'PasswordForgot',
        path: '/password/forgot',
        component: ForgotPasswordComponent ,
        meta: {
            // transition: 'fade'
        }
    },
    {
        name: 'PasswordForgotConfirmation',
        path: '/password/forgot/confirmation',
        component: ForgotPasswordConfirmationComponent ,
        meta: {
            // transition: 'fade'
        }
    },
    {
        name: 'PasswordUpdate',
        path: '/password/reset',
        component: PasswordUpdateComponent ,
        meta: {
            // transition: 'fade'
        }
    },
    {
        name: 'Register',
        path: '/register',
        component: RegisterComponent ,
        meta: {
            // transition: 'fade'
        }
    },
    {
        name: 'RegisterConfirmation',
        path: '/register/confirmation',
        component: RegisterConfirmationComponent ,
        meta: {
            // transition: 'fade'
        }
    },
    /**
     * Authenticated routes
     */
     {
        name: 'Dashboard',
        path: '/dashboard',
        component: DashboardComponent ,
        meta: {
            // transition: 'fade'
        }
    },
    {
        name: 'Profile',
        path: '/profile',
        component: ProfileComponent ,
        meta: {
            // transition: 'fade'
        }
    },
    {
        name: 'PasswordChange',
        path: '/password/change',
        component: PasswordChangeComponent ,
        meta: {
            // transition: 'fade'
        }
    },
    ]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// Meta Handling
// router.beforeEach((to, from, next) => {})
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