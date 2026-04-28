import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Products from '../views/Products.vue'
import ProductDetail from '../views/ProductDetail.vue'
import About from '../views/About.vue'
import Contact from '../views/Contact.vue'
import Cart from '../views/Cart.vue'
import TrackOrder from '../views/TrackOrder.vue'

import AdminLayout from '../components/AdminLayout.vue'
import AdminDashboard from '../views/admin/Dashboard.vue'
import ManageOrders from '../views/admin/Orders.vue'
import ManageProducts from '../views/admin/Products.vue'
import ManageCategories from '../views/admin/Categories.vue'
import ManageMessages from '../views/admin/Messages.vue'
import AdminSettings from '../views/admin/Settings.vue'
import AdminLogin from '../views/admin/Login.vue'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/products', name: 'Products', component: Products },
    { path: '/products/:id', name: 'ProductDetail', component: ProductDetail },
    { path: '/about', name: 'About', component: About },
    { path: '/contact', name: 'Contact', component: Contact },
    { path: '/cart', name: 'Cart', component: Cart },
    { path: '/track-order', name: 'TrackOrder', component: TrackOrder },

    { path: '/admin/login', name: 'AdminLogin', component: AdminLogin },

    {
        path: '/admin',
        component: AdminLayout,
        children: [
            { path: '', name: 'AdminDashboard', component: AdminDashboard },
            { path: 'orders', name: 'ManageOrders', component: ManageOrders },
            { path: 'products', name: 'ManageProducts', component: ManageProducts },
            { path: 'categories', name: 'ManageCategories', component: ManageCategories },
            { path: 'messages', name: 'ManageMessages', component: ManageMessages },
            { path: 'settings', name: 'AdminSettings', component: AdminSettings },
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }
    }
})

router.beforeEach(async (to, from, next) => {
    if (to.path.startsWith('/admin') && to.path !== '/admin/login') {
        const token = localStorage.getItem('adminToken')
        if (!token) {
            return next('/admin/login')
        }
        
        try {
            const res = await fetch('/api/auth/me', {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            if (!res.ok) throw new Error('Invalid token')
            next()
        } catch (err) {
            localStorage.removeItem('adminToken')
            localStorage.removeItem('adminUsername')
            next('/admin/login')
        }
    } else if (to.path === '/admin/login') {
        const token = localStorage.getItem('adminToken')
        if (token) {
            return next('/admin')
        }
        next()
    } else {
        next()
    }
})

export default router
