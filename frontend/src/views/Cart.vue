<template>
  <div>
    <section class="bg-gradient-to-r from-cream via-rose/30 to-ivory border-b border-stone/50 pt-28 pb-14 text-center">
      <div class="max-w-7xl mx-auto px-6">
        <h1 class="font-display text-4xl md:text-5xl font-semibold mb-3 text-dark">Your Cart</h1>
        <p class="text-muted text-lg tracking-wide">Review your selections before ordering</p>
      </div>
    </section>

    <section class="py-16 bg-ivory min-h-[60vh]">
      <div class="max-w-4xl mx-auto px-6">
        <div class="flex justify-center mb-12">
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <span class="w-8 h-8 rounded-full bg-olive text-white flex items-center justify-center font-bold text-sm">1</span>
              <span class="font-medium text-dark">Cart</span>
            </div>
            <div class="w-12 h-px bg-stone"></div>
            <div class="flex items-center gap-2">
              <span :class="['w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm', orderSuccess ? 'bg-emerald-600 text-white' : 'bg-stone text-muted']">2</span>
              <span :class="['font-medium', orderSuccess ? 'text-emerald-700' : 'text-muted']">Checkout</span>
            </div>
          </div>
        </div>

        <div v-if="cart.items.length === 0" class="text-center py-20 bg-white rounded-3xl border border-dashed border-stone">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 text-stone mx-auto mb-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          <h2 class="font-display text-2xl font-semibold mb-3 text-dark">Your cart is empty</h2>
          <p class="text-muted mb-8 text-sm">Browse our collections and add some beautiful arrangements!</p>
          <router-link to="/products" class="inline-flex items-center gap-2 px-8 py-3.5 bg-olive text-white rounded-full font-medium text-sm hover:bg-olive/90 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
            Explore Collections →
          </router-link>
        </div>

        <div v-else>
          <div class="space-y-4 mb-8">
            <div v-for="item in cart.items" :key="item.id" class="bg-white rounded-2xl p-5 border border-stone shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-5 hover:border-sage transition-colors">
              <img :src="item.image_url" :alt="item.name" class="w-20 h-20 rounded-xl object-cover shrink-0 cursor-pointer shadow-sm" @click="$router.push('/products/' + item.id)" />

              <div class="flex-1 min-w-0">
                <span class="text-[0.65rem] text-sage font-bold uppercase tracking-widest">{{ item.category_name }}</span>
                <h3 class="font-display text-lg font-semibold mt-0.5 cursor-pointer hover:text-olive transition-colors text-dark leading-tight" @click="$router.push('/products/' + item.id)">{{ item.name }}</h3>
                <p class="text-sm text-olive font-semibold mt-1">{{ formatPrice(item.price) }}</p>
              </div>

              <div class="flex items-center gap-3 bg-ivory rounded-full px-2 py-1 border border-stone">
                <button @click="updateQty(item.id, item.qty - 1)" class="w-7 h-7 rounded-full flex items-center justify-center text-body hover:bg-white hover:text-olive transition-all duration-200 text-sm font-bold bg-transparent">−</button>
                <span class="w-6 text-center font-bold text-sm">{{ item.qty }}</span>
                <button @click="updateQty(item.id, item.qty + 1)" class="w-7 h-7 rounded-full flex items-center justify-center text-body hover:bg-white hover:text-olive transition-all duration-200 text-sm font-bold bg-transparent">+</button>
              </div>

              <div class="text-right min-w-[100px]">
                <p class="font-bold text-olive">{{ formatPrice(item.price * item.qty) }}</p>
              </div>

              <button @click="removeFromCart(item.id)" class="w-8 h-8 rounded-full flex items-center justify-center bg-cream text-muted hover:bg-red-50 hover:text-red-500 transition-colors duration-200 shrink-0" title="Remove">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              </button>
            </div>
          </div>

          <div class="bg-white rounded-2xl p-8 border border-stone shadow-sm">
            <h3 class="font-display text-2xl mb-2 text-dark font-semibold">Order Details</h3>
            <p class="text-muted text-sm mb-6">Complete your information to finalize the order process.</p>
            
            <form @submit.prevent="checkout" class="space-y-6 mb-8">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-dark mb-2">Full Name</label>
                  <input type="text" v-model="customer.name" required placeholder="Your Name" class="w-full px-5 py-3.5 rounded-xl border border-stone bg-ivory/50 focus:bg-white focus:border-olive focus:ring-4 focus:ring-sage/20 outline-none transition-all shadow-inner" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-dark mb-2">WhatsApp Number</label>
                  <input type="tel" v-model="customer.phone" required placeholder="Your Number" class="w-full px-5 py-3.5 rounded-xl border border-stone bg-ivory/50 focus:bg-white focus:border-olive focus:ring-4 focus:ring-sage/20 outline-none transition-all shadow-inner" />
                </div>
              </div>

              <div class="flex justify-between items-center pt-8 mt-6 border-t border-stone/50 bg-ivory -mx-8 px-8 pb-4 rounded-b-2xl">
                <span class="text-muted font-medium">Subtotal ({{ cartCount() }} items)</span>
                <span class="font-display text-3xl font-bold text-olive">{{ formatPrice(cartTotal()) }}</span>
              </div>

              <div class="flex flex-col sm:flex-row gap-4 pt-4">
                <button type="submit" :disabled="isProcessing" class="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 bg-olive text-white rounded-xl font-semibold tracking-wide text-sm hover:bg-olive/90 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  {{ isProcessing ? 'Generating Order...' : 'Submit Order' }}
                </button>
                <button type="button" @click="clearCart()" class="px-8 py-4 border border-stone bg-ivory text-muted rounded-xl font-medium text-sm hover:bg-cream hover:text-dark transition-all duration-200">
                  Clear
                </button>
              </div>
            </form>
          </div>

          <div v-if="orderSuccess" class="bg-white rounded-3xl p-10 mb-8 shadow-xl shadow-stone/20 border border-stone text-center animate-fade-in-up">
            <div class="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-100">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <h2 class="font-display text-3xl font-bold text-dark mb-3">Order Prepared!</h2>
            <p class="text-body mb-8 max-w-md mx-auto">Your order details have been securely saved. Please continue to WhatsApp to confirm and complete your payment.</p>
            
            <div class="bg-gradient-to-br from-cream to-ivory p-8 rounded-2xl border border-stone w-full max-w-md mx-auto mb-8 shadow-sm">
              <span class="text-xs text-sage font-bold uppercase tracking-widest mb-2 block">Your Invoice Code</span>
              <div class="font-mono text-2xl font-bold text-olive tracking-wider bg-white py-3 px-6 rounded-xl border border-stone shadow-inner">
                {{ lastInvoiceCode }}
              </div>
              <p class="text-xs text-muted mt-4">Please save this code to track your order later via our website.</p>
            </div>

            <div class="flex flex-col gap-4 max-w-md mx-auto">
                <a :href="waRedirectUrl" target="_blank" class="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white rounded-xl font-semibold text-base hover:bg-[#20bd5a] hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                    <span>Continue to WhatsApp</span>
                </a>
                <router-link :to="`/track-order?code=${lastInvoiceCode}`" class="w-full px-8 py-4 border border-stone bg-ivory text-dark rounded-xl font-medium text-sm hover:bg-cream hover:border-olive transition-all duration-300">
                    Track Order Status
                </router-link>
            </div>
          </div>

          <div v-if="!orderSuccess" class="text-center mt-8">
            <router-link to="/products" class="text-sm text-olive font-medium hover:underline">← Continue Shopping</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { useCart } from '../composables/useCart'
import { ref, reactive } from 'vue'

export default {
  name: 'Cart',
  setup() {
    const { cart, removeFromCart, updateQty, clearCart, cartTotal, cartCount, formatPrice, processOrder } = useCart()
    const isProcessing = ref(false)
    const orderSuccess = ref(false)
    const lastInvoiceCode = ref('')
    const waRedirectUrl = ref('')
    
    const customer = reactive({
        name: '',
        phone: ''
    })

    const checkout = async () => {
        isProcessing.value = true;
        
        try {
            const result = await processOrder(customer.name, customer.phone);
            
            if (result && result.success) {
                lastInvoiceCode.value = result.invoiceCode;
                waRedirectUrl.value = result.waUrl;
                orderSuccess.value = true;
                clearCart();
                
                window.open(result.waUrl, '_blank');
            } else {
                alert('We encountered an issue preparing your order. Please try again.');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to connect to the server.');
        } finally {
            isProcessing.value = false;
        }
    };

    return { 
        cart, removeFromCart, updateQty, clearCart, cartTotal, cartCount, 
        formatPrice, isProcessing, customer, checkout,
        orderSuccess, lastInvoiceCode, waRedirectUrl
    }
  }
}
</script>
