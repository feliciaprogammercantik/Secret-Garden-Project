<template>
  <div class="min-h-screen bg-gray-50 flex">

    <aside class="w-64 bg-slate-900 text-slate-300 flex flex-col fixed inset-y-0 left-0">
        <div class="h-20 flex items-center px-8 border-b border-slate-800">
            <span class="text-xl font-display font-bold text-white tracking-wide">
                Secret<span class="text-sage italic font-normal">Garden</span> Admin
            </span>
        </div>
        
        <nav class="flex-1 px-4 py-8 space-y-2">
            <router-link 
                v-for="item in navItems" 
                :key="item.path"
                :to="item.path"
                class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
                active-class="bg-slate-800 text-white font-medium"
                :class="$route.path === item.path ? 'bg-slate-800 text-white' : 'hover:bg-slate-800/50 hover:text-white'"
            >
                <span class="text-lg">{{ item.icon }}</span>
                {{ item.name }}
            </router-link>
        </nav>

        <div class="p-4 border-t border-slate-800">
            <a href="/" target="_blank" class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors text-sm">
                <span>🌐</span> View Website
            </a>
            <a href="#" @click.prevent="logout" class="flex items-center gap-3 px-4 py-3 mt-1 rounded-lg hover:bg-slate-800 transition-colors text-sm text-red-400 hover:text-red-300 cursor-pointer">
                <span>🚪</span> Logout
            </a>
        </div>
    </aside>

    <main class="flex-1 ml-64 flex flex-col min-h-screen relative">
        <header class="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
            <h1 class="text-xl font-semibold text-gray-800">{{ currentRouteName }}</h1>
            <div class="flex items-center gap-4">
                <span class="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">{{ adminInitial }}</span>
            </div>
        </header>

        <div class="p-8 flex-1 overflow-auto">
            <router-view></router-view>
        </div>
    </main>

  </div>
</template>

<script>
export default {
    name: 'AdminLayout',
    data() {
        return {
            navItems: [
                { name: 'Dashboard', path: '/admin', icon: '📊' },
                { name: 'Orders', path: '/admin/orders', icon: '🛒' },
                { name: 'Products', path: '/admin/products', icon: '🌸' },
                { name: 'Categories', path: '/admin/categories', icon: '📁' },
                { name: 'Messages', path: '/admin/messages', icon: '✉️' },
                { name: 'Settings', path: '/admin/settings', icon: '⚙️' }
            ]
        }
    },
    computed: {
        currentRouteName() {
            const match = this.navItems.find(item => item.path === this.$route.path);
            if (match) return match.name;
            
            if (this.$route.path.includes('/admin/orders')) return 'Order Details';
            if (this.$route.path.includes('/admin/products')) return 'Manage Product';
            
            return 'Admin Dashboard';
        },
        adminInitial() {
            const username = localStorage.getItem('adminUsername');
            return username ? username.charAt(0).toUpperCase() : 'A';
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUsername');
            this.$router.push('/admin/login');
        }
    }
}
</script>
