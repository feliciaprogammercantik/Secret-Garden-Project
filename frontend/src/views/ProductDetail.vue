<template>
  <div>
    <section class="bg-gradient-to-r from-cream via-rose/30 to-ivory border-b border-stone/50 pt-24 pb-8">
      <div class="max-w-7xl mx-auto px-6">
        <router-link to="/products" class="text-sm font-medium text-olive hover:text-dark transition-colors duration-200">← Back to Collections</router-link>
      </div>
    </section>

    <section class="py-16 bg-ivory" v-if="product">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
          <div class="relative rounded-2xl overflow-hidden shadow-xl">
            <img :src="product.image_url" :alt="product.name" class="w-full aspect-[4/5] object-cover" />
            <span v-if="product.is_featured" class="absolute top-5 left-5 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold text-olive">⭐ Signature Piece</span>
          </div>

          <div>
            <span class="text-xs text-sage font-semibold uppercase tracking-[2px]">{{ product.category_name }}</span>
            <h1 class="font-display text-3xl md:text-4xl font-semibold mt-3 mb-4">{{ product.name }}</h1>
            <p class="text-2xl font-bold text-olive font-display">{{ formatPrice(product.price) }}</p>
            <div class="w-14 h-[3px] bg-gradient-to-r from-sage to-blush rounded-full my-6"></div>
            <p class="text-base text-body leading-relaxed mb-8">{{ product.description }}</p>

            <div class="flex items-center gap-4 mb-6">
              <div class="flex items-center gap-3 bg-white border border-stone rounded-full px-2 py-1 shadow-sm">
                <button @click="qty = Math.max(1, qty - 1)" class="w-9 h-9 rounded-full flex items-center justify-center text-body hover:bg-cream hover:text-olive transition-all duration-200 text-sm font-bold">−</button>
                <span class="w-8 text-center font-semibold text-sm">{{ qty }}</span>
                <button @click="qty++" class="w-9 h-9 rounded-full flex items-center justify-center text-body hover:bg-cream hover:text-olive transition-all duration-200 text-sm font-bold">+</button>
              </div>
              <button
                @click="handleAddToCart"
                :class="['flex-1 inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 shadow-sm border', added ? 'bg-sage border-sage text-white' : 'bg-olive border-olive text-white hover:bg-cream hover:text-olive hover:border-stone hover:-translate-y-0.5']"
              >
                {{ added ? '✓ Added to Cart!' : '🛒 Add to Cart' }}
              </button>
            </div>

            <div class="flex flex-wrap gap-3.5 mb-8">
              <a :href="whatsAppSingleUrl" target="_blank" class="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#25D366] text-[#25D366] bg-white rounded-full font-medium text-sm hover:bg-[#25D366] hover:text-white hover:-translate-y-0.5 transition-all duration-300 shadow-sm">
                💬 Quick Order via WhatsApp
              </a>
              <router-link to="/cart" class="inline-flex items-center gap-2 px-6 py-3 border border-stone bg-white text-olive rounded-full font-medium text-sm hover:bg-cream hover:text-olive hover:-translate-y-0.5 transition-all duration-300 shadow-sm">
                View Cart ({{ cartCount() }})
              </router-link>
            </div>

            <div class="flex flex-wrap gap-6 p-6 bg-white border border-stone rounded-2xl shadow-sm">
              <div class="flex items-center gap-2">
                <span class="text-xl">🌿</span>
                <p class="text-xs font-medium text-body">Farm-fresh blooms</p>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-xl">🚚</span>
                <p class="text-xs font-medium text-body">Safe delivery</p>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-xl">🎀</span>
                <p class="text-xs font-medium text-body">Premium wrapping</p>
              </div>
            </div>
          </div>
        </div>

        <div v-if="relatedProducts.length" class="mt-20 border-t border-stone/50 pt-10">
          <h2 class="font-display text-2xl font-semibold mb-7 text-dark">You May Also Love</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="rp in relatedProducts" :key="rp.id" class="group bg-white rounded-2xl overflow-hidden border border-stone shadow-sm hover:-translate-y-2 hover:shadow-xl cursor-pointer transition-all duration-500" @click="$router.push('/products/' + rp.id)">
              <div class="h-56 overflow-hidden">
                <img :src="rp.image_url" :alt="rp.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" loading="lazy" />
              </div>
              <div class="p-5">
                <h3 class="font-display text-base font-semibold mb-1 group-hover:text-olive transition-colors">{{ rp.name }}</h3>
                <p class="text-sm font-bold text-olive">{{ formatPrice(rp.price) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section v-else class="py-24 text-center bg-ivory">
      <div class="inline-block p-6 rounded-2xl bg-white border border-stone shadow-sm">
        <p class="text-muted tracking-wide flex items-center gap-2">
          <span class="animate-spin text-xl text-sage">↻</span> 
          Loading arrangement details...
        </p>
      </div>
    </section>

    <AddonsModal 
      :isOpen="showAddonsModal" 
      :selectedAddonIds="selectedAddonIds" 
      @add="addAddon" 
      @skip="skipAddons" 
      @done="skipAddons" 
    />
  </div>
</template>

<script>
import { useCart } from '../composables/useCart'
import AddonsModal from '../components/AddonsModal.vue'

export default {
  name: 'ProductDetail',
  components: {
    AddonsModal
  },
  setup() {
    const { addToCart, cartCount, formatPrice, toggleCart } = useCart()
    return { addToCart, cartCount, formatPrice, toggleCart }
  },
  data() {
    return {
      product: null,
      relatedProducts: [],
      qty: 1,
      added: false,
      showAddonsModal: false,
      selectedAddonIds: []
    }
  },
  computed: {
    whatsAppSingleUrl() {
      if (!this.product) return '#'
      const msg = `Hi Secret Garden! 🌿\n\nI'd like to order:\n\n${this.product.name}\nQty: ${this.qty} × ${this.formatPrice(this.product.price)} = ${this.formatPrice(this.product.price * this.qty)}\n\nPlease let me know about availability and delivery details. Thank you! 🌸`
      return `https://wa.me/6285338001840?text=${encodeURIComponent(msg)}`
    }
  },
  async mounted() {
    await this.loadProduct()
  },
  watch: {
    '$route.params.id'() {
      this.loadProduct()
      this.qty = 1
      this.added = false
    }
  },
  methods: {
    async loadProduct() {
      try {
        const res = await fetch('/api/products/' + this.$route.params.id)
        this.product = await res.json()
        if (this.product.category_id) {
          const relRes = await fetch('/api/products?category_id=' + this.product.category_id)
          const all = await relRes.json()
          this.relatedProducts = all.filter(p => p.id !== this.product.id).slice(0, 3)
        }
      } catch (err) {
        console.error('Failed to fetch product:', err)
      }
    },
    handleAddToCart() {
      this.addToCart(this.product, this.qty)
      this.added = true
      setTimeout(() => { this.added = false }, 2500)
      
      if (this.product.category_name && this.product.category_name.toLowerCase().includes('add-on')) {
        this.toggleCart(true)
      } else {
        this.showAddonsModal = true
        this.selectedAddonIds = [] 
      }
    },
    addAddon(addon) {
      if (!this.selectedAddonIds.includes(addon.id)) {
        this.addToCart(addon, 1)
        this.selectedAddonIds.push(addon.id)
      }
    },
    skipAddons() {
      this.showAddonsModal = false
      this.toggleCart(true)
    }
  }
}
</script>
