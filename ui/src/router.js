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
 * Product Components
 */
import ProductCrud from './components/product/product/index.vue'
import ProductListCrud from './components/product/product/list.vue'
import ProductThumbnailCrud from './components/product/product/thumbnail.vue'

import ProductCreateCrud from './components/product/product/create.vue'
import ProductUpdateCrud from './components/product/product/update.vue'

/**
 * Attribute Components
 */
import AttributeCrud from './components/product/attribute/index.vue'
import AttributeListCrud from './components/product/attribute/list.vue'
import AttributeCreateCrud from './components/product/attribute/create.vue'
import AttributeUpdateCrud from './components/product/attribute/update.vue'

/**
 * Variant Components
 */
import VariantCrud from './components/product/variant/index.vue'
import VariantListCrud from './components/product/variant/list.vue'
import VariantCreateCrud from './components/product/variant/create.vue'
import VariantUpdateCrud from './components/product/variant/update.vue'

/**
 * Product Attribute Varaint Components
 */
import AttributeVariantCrud from './components/product/attributevariant/index.vue'
import AttributeVariantListCrud from './components/product/attributevariant/list.vue'
import AttributeVariantCreateCrud from './components/product/attributevariant/create.vue'
import AttributeVariantUpdateCrud from './components/product/attributevariant/update.vue'

/**
 * Unit Components
 */
import UnitCrud from './components/product/unit/index.vue'
import UnitListCrud from './components/product/unit/list.vue'
import UnitCreateCrud from './components/product/unit/create.vue'
import UnitUpdateCrud from './components/product/unit/update.vue'

/**
 * Unit Convention Components
 */
import UnitConventionCrud from './components/product/unitconvention/index.vue'
import UnitConventionListCrud from './components/product/unitconvention/list.vue'
import UnitConventionCreateCrud from './components/product/unitconvention/create.vue'
import UnitConventionUpdateCrud from './components/product/unitconvention/update.vue'

/**
 * Stock Components
 */
import StockCrud from './components/product/stock/index.vue'
import StockListCrud from './components/product/stock/list.vue'
import StockCreateCrud from './components/product/stock/create.vue'
import StockUpdateCrud from './components/product/stock/update.vue'

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
        /**
         * Product modules
         */
        /**
         * Product Attribute module
         */
        {
            name: 'Attribute' ,
            path: '/attribute',
            component: AttributeCrud ,
            meta: { 
                transition: 'slide-right' ,
                requiresAuth: true,
                is_admin : true
            },
            children: [
                {
                    name: "AttributeList" ,
                    path: '' ,
                    component: AttributeListCrud
                },
                {
                    name: "AttributeCreate" ,
                    path: 'create' ,
                    component: AttributeCreateCrud
                },
                {
                    name: "AttributeUpdate" ,
                    path: 'update' ,
                    component: AttributeUpdateCrud
                }
            ]
        },
        /**
         * Product Variant module
         */
        {
            name: 'Variant' ,
            path: '/variant',
            component: VariantCrud ,
            meta: { 
                transition: 'slide-right' ,
                requiresAuth: true,
                is_admin : true
            },
            children: [
                {
                    name: "VariantList" ,
                    path: '' ,
                    component: VariantListCrud
                },
                {
                    name: "VariantCreate" ,
                    path: 'create' ,
                    component: VariantCreateCrud
                },
                {
                    name: "VariantUpdate" ,
                    path: 'update' ,
                    component: VariantUpdateCrud
                }
            ]
        },
        /**
         * Product Attribute Variant module
         */
        {
            name: 'AttributeVariant' ,
            path: '/attributevariant',
            component: AttributeVariantCrud ,
            meta: { 
                transition: 'slide-right' ,
                requiresAuth: true,
                is_admin : true
            },
            children: [
                {
                    name: "AttributeVariantList" ,
                    path: '' ,
                    component: VariantListCrud
                },
                {
                    name: "AttributeVariantCreate" ,
                    path: 'create' ,
                    component: AttributeVariantCreateCrud
                },
                {
                    name: "AttributeVariantUpdate" ,
                    path: 'update' ,
                    component: AttributeVariantUpdateCrud
                }
            ]
        },
        /**
         * Product Unit module
         */
        {
            name: 'Unit' ,
            path: '/unit',
            component: UnitCrud ,
            meta: { 
                transition: 'slide-right' ,
                requiresAuth: true,
                is_admin : true
            },
            children: [
                {
                    name: "UnitList" ,
                    path: '' ,
                    component: UnitListCrud
                },
                {
                    name: "UnitCreate" ,
                    path: 'create' ,
                    component: UnitCreateCrud
                },
                {
                    name: "UnitUpdate" ,
                    path: 'update' ,
                    component: UnitUpdateCrud
                }
            ]
        },
        /**
         * Product Unit Convention module
         */
        {
            name: 'UnitConvention' ,
            path: '/unitconvention',
            component: UnitConventionCrud ,
            meta: { 
                transition: 'slide-right' ,
                requiresAuth: true,
                is_admin : true
            },
            children: [
                {
                    name: "UnitConventionList" ,
                    path: '' ,
                    component: UnitConventionListCrud
                },
                {
                    name: "UnitConventionCreate" ,
                    path: 'create' ,
                    component: UnitConventionCreateCrud
                },
                {
                    name: "UnitConventionUpdate" ,
                    path: 'update' ,
                    component: UnitConventionUpdateCrud
                }
            ]
        },
        /**
         * Product module
         */
        {
            name: 'Product' ,
            path: '/product',
            component: ProductCrud ,
            meta: { 
                transition: 'slide-right' ,
                requiresAuth: true,
                is_admin : true
            },
            children: [
                // {
                //     name: "ProductList" ,
                //     path: '' ,
                //     component: ProductListCrud
                // },
                {
                    name: "ProductThumbnail" ,
                    path: '' ,
                    component: ProductThumbnailCrud
                },
                {
                    name: "ProductCreate" ,
                    path: 'create' ,
                    component: ProductCreateCrud
                },
                {
                    name: "ProductUpdate" ,
                    path: 'update' ,
                    component: ProductUpdateCrud
                }
            ]
        },
        /**
         * Product Stock module
         */
        {
            name: 'Stock' ,
            path: '/stock',
            component: ProductCrud ,
            meta: { 
                transition: 'slide-right' ,
                requiresAuth: true,
                is_admin : true
            },
            children: [
                {
                    name: "StockList" ,
                    path: '' ,
                    component: StockListCrud
                },
                {
                    name: "StockCreate" ,
                    path: 'create' ,
                    component: StockCreateCrud
                },
                {
                    name: "StockUpdate" ,
                    path: 'update' ,
                    component: StockUpdateCrud
                }
            ]
        },
        /**
         * End of product module
         */
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