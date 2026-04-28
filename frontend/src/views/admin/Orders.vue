<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div>
        <h2 class="text-xl font-bold text-gray-800">Manage Orders</h2>
        <p class="text-sm text-gray-500 mt-1">Track and update customer orders</p>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-left whitespace-nowrap">
                <thead class="bg-gray-50 border-b border-gray-100">
                    <tr>
                        <th class="py-4 px-6 font-semibold text-gray-600 text-sm">Invoice / Date</th>
                        <th class="py-4 px-6 font-semibold text-gray-600 text-sm">Customer</th>
                        <th class="py-4 px-6 font-semibold text-gray-600 text-sm">Total</th>
                        <th class="py-4 px-6 font-semibold text-gray-600 text-sm">Status</th>
                        <th class="py-4 px-6 font-semibold text-gray-600 text-sm text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    <tr v-if="orders.length === 0">
                        <td colspan="5" class="py-8 text-center text-gray-500">No orders found.</td>
                    </tr>
                    <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-50 transition-colors">
                        <td class="py-4 px-6">
                            <div class="font-mono font-medium text-gray-900 border border-gray-200 inline-block px-2 py-1 rounded bg-gray-50 text-xs mb-1">{{ order.invoice_code }}</div>
                            <div class="text-sm text-gray-500">{{ formatDate(order.created_at) }}</div>
                        </td>
                        <td class="py-4 px-6">
                            <div class="font-medium text-gray-800">{{ order.customer_name }}</div>
                            <div class="text-sm text-gray-500">{{ order.customer_phone }}</div>
                        </td>
                        <td class="py-4 px-6 font-medium text-gray-800">
                            {{ formatPrice(order.total_amount) }}
                        </td>
                        <td class="py-4 px-6">
                            <span :class="getStatusBadgeClass(order.status)" class="px-3 py-1 rounded-full text-xs font-semibold border">
                                {{ order.status }}
                            </span>
                        </td>
                        <td class="py-4 px-6 text-right">
                            <button @click="viewOrder(order)" class="text-emerald-600 hover:text-emerald-800 text-sm font-medium mr-4">View Details</button>
                            <select 
                                v-model="order.status" 
                                @change="updateStatus(order.id, order.status)"
                                class="text-sm border border-gray-300 rounded-lg px-2 py-1.5 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                            >
                                <option value="Pending Payment">Pending Payment</option>
                                <option value="Paid">Paid</option>
                                <option value="Processing">Processing</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div v-if="selectedOrder" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <div>
                    <h3 class="font-bold text-gray-800 text-lg">Order Details</h3>
                    <p class="text-sm font-mono text-gray-500">{{ selectedOrder.invoice_code }}</p>
                </div>
                <button @click="selectedOrder = null" class="text-gray-400 hover:text-gray-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            
            <div class="p-6 overflow-y-auto">
                <div class="grid grid-cols-2 gap-6 mb-8">
                    <div>
                        <p class="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Customer Info</p>
                        <p class="font-medium text-gray-800">{{ selectedOrder.customer_name }}</p>
                        <p class="text-sm text-gray-600">{{ selectedOrder.customer_phone }}</p>
                        <a :href="`https://wa.me/${selectedOrder.customer_phone.replace(/[^0-9]/g, '')}`" target="_blank" class="inline-flex items-center gap-1.5 mt-2 text-xs text-emerald-600 hover:text-emerald-700 font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                            Chat via WhatsApp
                        </a>
                    </div>
                    <div>
                        <p class="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Order Status</p>
                        <span :class="getStatusBadgeClass(selectedOrder.status)" class="px-3 py-1 rounded-full text-xs font-semibold border inline-block mb-2">
                            {{ selectedOrder.status }}
                        </span>
                        <p class="text-xs text-gray-500">Ordered on: {{ formatDate(selectedOrder.created_at) }}</p>
                    </div>
                </div>

                <h4 class="font-bold text-gray-800 mb-4 border-b pb-2">Items Ordered</h4>
                <div class="space-y-4">
                    <div v-for="(item, idx) in parsedItems" :key="idx" class="flex gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <img :src="item.image_url" :alt="item.name" class="w-16 h-16 object-cover rounded-lg bg-white" />
                        <div class="flex-1">
                            <h5 class="font-medium text-gray-800 text-sm">{{ item.name }}</h5>
                            <p class="text-xs text-gray-500">{{ item.category_name }}</p>
                        </div>
                        <div class="text-right">
                            <p class="font-medium text-gray-800 text-sm">{{ formatPrice(item.price * item.qty) }}</p>
                            <p class="text-xs text-gray-500">{{ item.qty }} x {{ formatPrice(item.price) }}</p>
                        </div>
                    </div>
                </div>
                
                <div class="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span class="font-bold text-gray-800">Total Amount</span>
                    <span class="font-bold text-xl text-emerald-600">{{ formatPrice(selectedOrder.total_amount) }}</span>
                </div>
            </div>
            
            <div class="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
                <button @click="selectedOrder = null" class="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors">Close</button>
            </div>
        </div>
    </div>

  </div>
</template>

<script>
export default {
    name: 'ManageOrders',
    data() {
        return {
            orders: [],
            selectedOrder: null
        }
    },
    computed: {
        parsedItems() {
            if (!this.selectedOrder || !this.selectedOrder.order_items) return [];
            return typeof this.selectedOrder.order_items === 'string' 
                ? JSON.parse(this.selectedOrder.order_items) 
                : this.selectedOrder.order_items;
        }
    },
    async mounted() {
        await this.fetchOrders();
    },
    methods: {
        async fetchOrders() {
            try {
                const response = await fetch('/api/orders');
                this.orders = await response.json();
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            }
        },
        async updateStatus(id, newStatus) {
            try {
                const response = await fetch(`/api/orders/${id}/status`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: newStatus })
                });
                if (!response.ok) throw new Error('Failed to update');
                
                console.log(`Order ${id} updated to ${newStatus}`);
            } catch (error) {
                console.error(error);
                alert('Failed to update status');
                await this.fetchOrders(); 
            }
        },
        viewOrder(order) {
            this.selectedOrder = order;
        },
        formatPrice(price) {
            return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
        },
        formatDate(dateString) {
            const d = new Date(dateString);
            return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
        },
        getStatusBadgeClass(status) {
            switch(status) {
                case 'Pending Payment': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
                case 'Paid': return 'bg-blue-50 text-blue-700 border-blue-200';
                case 'Processing': return 'bg-purple-50 text-purple-700 border-purple-200';
                case 'Delivered': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
                case 'Cancelled': return 'bg-red-50 text-red-700 border-red-200';
                default: return 'bg-gray-50 text-gray-700 border-gray-200';
            }
        }
    }
}
</script>
