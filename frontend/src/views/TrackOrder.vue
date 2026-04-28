<template>
  <div>
    <section class="bg-gradient-to-r from-cream via-rose/30 to-ivory border-b border-stone/50 pt-28 pb-14 text-center">
      <div class="max-w-7xl mx-auto px-6">
        <h1 class="font-display text-4xl md:text-5xl font-semibold mb-3 text-dark">Track Your Order</h1>
        <p class="text-muted text-lg tracking-wide">Enter your invoice code to see the current status</p>
      </div>
    </section>

    <section class="py-16 min-h-[50vh] bg-ivory">
      <div class="max-w-2xl mx-auto px-6">
        
        <form @submit.prevent="trackOrder" class="mb-10 relative">
            <div class="flex gap-3">
                <input 
                    type="text" 
                    v-model="searchCode" 
                    placeholder="e.g., INV-SG-0324-X8YZ" 
                    class="flex-1 px-6 py-4 rounded-xl border border-stone bg-white focus:border-olive focus:ring-4 focus:ring-olive/10 outline-none transition-all uppercase placeholder:normal-case font-mono shadow-sm"
                    required
                />
                <button type="submit" :disabled="isLoading" class="px-8 py-4 bg-olive text-white rounded-xl font-semibold tracking-wide hover:bg-olive/90 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 disabled:opacity-50 disabled:hover:translate-y-0">
                    {{ isLoading ? 'Searching...' : 'Track' }}
                </button>
            </div>
            <p v-if="errorMsg" class="text-red-500 text-sm mt-3 ml-2">{{ errorMsg }}</p>
        </form>
        <div v-if="isLoading && !order" class="text-center py-10">
            <div class="w-10 h-10 border-4 border-cream border-t-olive rounded-full animate-spin mx-auto mb-4"></div>
            <p class="text-muted">Fetching your order details...</p>
        </div>

        <div v-if="order" class="bg-white rounded-3xl p-8 shadow-xl shadow-stone/30 border border-stone animate-fade-in-up">
            
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone/50">
                <div>
                    <span class="text-xs text-sage font-bold uppercase tracking-widest mb-1.5 block">Invoice Code</span>
                    <h2 class="font-mono text-xl font-bold text-olive">{{ order.invoice_code }}</h2>
                </div>
                <div class="text-left md:text-right">
                    <span class="text-xs text-sage font-bold uppercase tracking-widest mb-1.5 block">Date</span>
                    <p class="text-sm font-medium text-dark">{{ formatDate(order.created_at) }}</p>
                </div>
            </div>

            <div class="mb-8 p-8 rounded-2xl bg-gradient-to-br from-cream/50 to-ivory border border-stone shadow-sm">
                <span class="text-xs text-sage font-bold uppercase tracking-widest mb-3 block text-center">Current Status</span>
                <div class="text-center">
                    <span :class="getStatusBadgeClass(order.status)" class="inline-flex items-center justify-center px-8 py-3 rounded-full text-sm font-bold border shadow-sm tracking-wide gap-2">
                        <span class="flex items-center justify-center shrink-0" v-html="getStatusIcon(order.status)"></span>
                        {{ order.status }}
                    </span>
                </div>
                <p class="text-center text-sm text-body leading-relaxed mt-5 max-w-sm mx-auto">
                    {{ getStatusDescription(order.status) }}
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-stone/50">
                <div>
                    <h3 class="font-display text-lg font-semibold mb-3 text-dark">Customer Info</h3>
                    <p class="text-sm text-body bg-ivory p-4 text-center rounded-xl border border-stone shadow-inner font-medium">{{ order.customer_name }}</p>
                </div>
                <div>
                    <h3 class="font-display text-lg font-semibold mb-3 text-dark text-right">Total Amount</h3>
                    <div class="bg-olive p-4 rounded-xl shadow-md text-right">
                        <p class="text-xl font-bold text-white">{{ formatPrice(order.total_amount) }}</p>
                    </div>
                </div>
            </div>

            <div>
                <h3 class="font-display text-lg font-semibold mb-4 text-dark">Items Ordered</h3>
                <div class="space-y-3">
                    <div v-for="(item, idx) in parsedItems" :key="idx" class="flex justify-between items-center text-sm p-4 bg-white border border-stone rounded-xl shadow-sm hover:border-sage transition-colors">
                        <div class="flex items-center gap-4">
                            <span class="w-8 h-8 rounded-full bg-cream text-olive flex items-center justify-center font-bold text-xs">{{ item.qty }}x</span>
                            <span class="font-semibold text-dark">{{ item.name }}</span>
                        </div>
                        <span class="text-olive font-bold">{{ formatPrice(item.price * item.qty) }}</span>
                    </div>
                </div>
            </div>

        </div>

      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'TrackOrder',
  data() {
    return {
      searchCode: '',
      order: null,
      isLoading: false,
      errorMsg: ''
    }
  },
  computed: {
      parsedItems() {
          if (!this.order || !this.order.order_items) return [];
          return typeof this.order.order_items === 'string' 
            ? JSON.parse(this.order.order_items) 
            : this.order.order_items;
      }
  },
  mounted() {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      if (code) {
          this.searchCode = code;
          this.trackOrder();
      }
  },
  methods: {
    async trackOrder() {
        if (!this.searchCode.trim()) return;
        
        this.isLoading = true;
        this.errorMsg = '';
        this.order = null;

        try {
            const cleanCode = this.searchCode.split('track-order/').pop().split('?code=').pop().trim().toUpperCase();
            
            const response = await fetch(`/api/orders/track/${cleanCode}`);
            if (!response.ok) {
                if (response.status === 404) throw new Error("Order not found. Please check your invoice code.");
                throw new Error("Failed to fetch order details.");
            }
            
            this.order = await response.json();
        } catch (error) {
            this.errorMsg = error.message;
        } finally {
            this.isLoading = false;
        }
    },
    formatPrice(price) {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
    },
    formatDate(dateString) {
        const d = new Date(dateString);
        return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    },
    getStatusBadgeClass(status) {
        switch(status) {
            case 'Pending Payment': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Paid': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Processing': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
            case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    },
    getStatusIcon(status) {
        switch(status) {
            case 'Pending Payment': return '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>';
            case 'Paid': return '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>';
            case 'Processing': return '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 1 8.3C19.2 14.9 14 20 11 20Z"/><line x1="11" y1="20" x2="16.5" y2="14.5"/></svg>';
            case 'Delivered': return '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';
            case 'Cancelled': return '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';
            default: return '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';
        }
    },
    getStatusDescription(status) {
        switch(status) {
            case 'Pending Payment': return "We're waiting for your payment confirmation via WhatsApp. Please send your transfer receipt to complete the order.";
            case 'Paid': return "Your payment has been verified! We will begin preparing your beautiful arrangement soon.";
            case 'Processing': return "Our expert florists are currently crafting your arrangement with fresh blooms.";
            case 'Delivered': return "Your order has been successfully delivered. We hope it brought joy! Thank you for choosing Secret Garden.";
            case 'Cancelled': return "This order has been cancelled.";
            default: return "";
        }
    }
  }
}
</script>
