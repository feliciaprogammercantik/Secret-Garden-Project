<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
        <div class="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
          🌸
        </div>
        <div>
          <p class="text-sm text-gray-500 font-medium">Total Products</p>
          <h3 class="text-2xl font-bold text-gray-800">{{ stats.products }}</h3>
        </div>
      </div>

      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
        <div class="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">
          💵
        </div>
        <div>
          <p class="text-sm text-gray-500 font-medium">Total Income</p>
          <h3 class="text-2xl font-bold text-gray-800">{{ formatPrice(stats.revenue) }}</h3>
        </div>
      </div>

      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
        <div class="w-12 h-12 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center text-xl">
          📦
        </div>
        <div>
          <p class="text-sm text-gray-500 font-medium">Total Orders</p>
          <h3 class="text-2xl font-bold text-gray-800">{{ stats.orders }}</h3>
        </div>
      </div>

      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
        <div class="w-12 h-12 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center text-xl">
          ✉️
        </div>
        <div>
          <p class="text-sm text-gray-500 font-medium">Messages</p>
          <h3 class="text-2xl font-bold text-gray-800">{{ stats.messages }}</h3>
        </div>
      </div>

    </div>

    <div class="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
      <h2 class="text-lg font-bold text-gray-800 mb-4">Welcome to Secret Garden Admin</h2>
      <p class="text-gray-600 mb-6">Here you can manage your floral business efficiently. Use the sidebar to navigate through your store's resources.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div class="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 class="font-semibold text-gray-800 mb-2">🛍️ Manage Orders</h3>
            <p class="text-sm text-gray-600 mb-4">View and track customer orders. Don't forget to update their status from 'Pending' to 'Paid' when you receive the transfer via WhatsApp!</p>
            <router-link to="/admin/orders" class="text-sm font-medium text-emerald-600 hover:text-emerald-700">Go to Orders →</router-link>
        </div>
        <div class="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 class="font-semibold text-gray-800 mb-2">💐 Update Catalog</h3>
            <p class="text-sm text-gray-600 mb-4">Keep your product listings fresh. Add new seasonal arrangements and mark your best-sellers as 'Signature' to show them on the Homepage.</p>
            <router-link to="/admin/products" class="text-sm font-medium text-emerald-600 hover:text-emerald-700">Manage Products →</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'AdminDashboard',
    data() {
        return {
            stats: {
                products: 0,
                revenue: 0,
                orders: 0,
                messages: 0
            }
        }
    },
    async mounted() {
        try {
            const [productsRes, ordersRes, msgsRes] = await Promise.all([
                fetch('/api/products'),
                fetch('/api/orders'),
                fetch('/api/contacts')
            ]);
            
            const products = await productsRes.json();
            const orders = await ordersRes.json();
            const msgs = await msgsRes.json();
            
            this.stats.products = products.length;
            this.stats.orders = orders.length;
            this.stats.messages = Array.isArray(msgs) ? msgs.length : 0;
            
            this.stats.revenue = orders
              .filter(o => ['Paid', 'Processing', 'Delivered'].includes(o.status))
              .reduce((sum, o) => sum + Number(o.total_amount), 0);
              
        } catch (e) {
            console.error('Failed to load stats', e);
        }
    },
    methods: {
        formatPrice(price) {
            return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
        }
    }
}
</script>
