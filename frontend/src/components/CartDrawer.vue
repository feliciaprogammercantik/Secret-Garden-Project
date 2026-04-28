<template>
  <div>
    <transition name="slide-right">
      <div 
        v-if="isCartOpen" 
        class="fixed top-[76px] right-0 w-full md:w-[400px] h-[calc(100vh-76px)] bg-ivory shadow-[-5px_0_30px_rgba(0,0,0,0.08)] z-[900] flex flex-col border-l border-stone/50"
      >
        <div class="px-6 py-5 border-b border-stone/50 bg-white flex justify-between items-center shadow-sm">
          <div class="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-olive" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
            <h2 class="font-display text-2xl font-semibold text-dark tracking-tight">Your Cart</h2>
            <span class="ml-2 bg-sage/20 text-olive text-xs font-bold px-2.5 py-1 rounded-full border border-sage/30">{{ cartCount() }} items</span>
          </div>
          <button @click="closeCart" class="w-10 h-10 rounded-full flex items-center justify-center bg-cream hover:bg-rose/20 text-dark hover:text-rose transition-colors" aria-label="Close cart">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-6 scrollbar-hide bg-ivory/50">
          <div v-if="cart.items.length === 0" class="h-full flex flex-col items-center justify-center text-center opacity-70">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 text-stone mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            <p class="font-display text-xl font-medium text-dark mb-2">It's empty here</p>
            <p class="text-sm text-muted">Let's find some beautiful flowers!</p>
            <button @click="closeCart" class="mt-6 px-6 py-2.5 bg-olive text-white rounded-full text-sm font-medium hover:bg-olive/90 transition-colors">Start Shopping</button>
          </div>

          <div v-else class="space-y-4">
            <div v-for="item in cart.items" :key="item.id" class="flex gap-4 p-4 bg-white rounded-2xl border border-stone shadow-sm hover:border-sage transition-colors relative group">
              <img :src="item.image_url" :alt="item.name" class="w-20 h-20 object-cover rounded-xl shadow-sm border border-stone/30" />
              
              <div class="flex-1 flex flex-col justify-between">
                <div class="pr-6">
                  <h3 class="font-display text-sm font-semibold text-dark leading-tight">{{ item.name }}</h3>
                  <p class="text-olive font-bold text-sm mt-1">{{ formatPrice(item.price) }}</p>
                </div>

                <div class="flex justify-between items-center mt-3">
                  <div class="flex items-center gap-2 bg-cream rounded-full px-1.5 py-1 border border-stone/50">
                    <button @click="updateQty(item.id, item.qty - 1)" class="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white text-body font-bold text-xs" aria-label="Decrease quantity">−</button>
                    <span class="w-5 text-center font-semibold text-xs text-dark">{{ item.qty }}</span>
                    <button @click="updateQty(item.id, item.qty + 1)" class="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white text-body font-bold text-xs" aria-label="Increase quantity">+</button>
                  </div>
                </div>
              </div>

              <button @click="removeFromCart(item.id)" class="absolute top-4 right-4 text-muted hover:text-rose opacity-0 group-hover:opacity-100 transition-opacity bg-white w-7 h-7 rounded-full flex items-center justify-center shadow-sm border border-stone" aria-label="Remove item">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </button>
            </div>
          </div>
        </div>

        <div v-if="cart.items.length > 0" class="p-6 bg-white border-t border-stone/50 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
          <div class="flex justify-between items-end mb-5">
            <div>
              <p class="text-sm font-medium text-muted mb-1">Subtotal</p>
              <p class="text-xs text-muted w-[200px] leading-tight">Shipping and taxes calculated at checkout.</p>
            </div>
            <p class="font-display text-2xl font-bold text-olive">{{ formatPrice(cartTotal()) }}</p>
          </div>
          
          <div class="flex flex-col gap-3">
            <button @click="goToCheckout" class="w-full px-4 py-3.5 bg-olive text-white rounded-xl font-semibold tracking-wide text-sm hover:bg-olive/90 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 shadow-sm text-center">
              Checkout Now
            </button>
            <button @click="goToCart" class="w-full px-4 py-3 border border-stone rounded-xl text-dark font-medium text-sm hover:bg-cream hover:border-olive transition-colors text-center">
              View Cart Details
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { useCart } from '../composables/useCart'
import { useRouter } from 'vue-router'

export default {
  name: 'CartDrawer',
  setup() {
    const { isCartOpen, toggleCart, cart, cartCount, cartTotal, formatPrice, updateQty, removeFromCart } = useCart()
    const router = useRouter()

    const closeCart = () => {
      toggleCart(false)
    }

    const goToCart = () => {
      closeCart()
      router.push('/cart')
    }

    const goToCheckout = () => {
      closeCart()
      router.push('/cart')
    }

    return {
      isCartOpen,
      closeCart,
      cart,
      cartCount,
      cartTotal,
      formatPrice,
      updateQty,
      removeFromCart,
      goToCart,
      goToCheckout
    }
  }
}
</script>

<style scoped>
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}


.scrollbar-hide::-webkit-scrollbar {
    display: none;
}


.scrollbar-hide {
    -ms-overflow-style: none;  
    scrollbar-width: none; 
}
</style>
