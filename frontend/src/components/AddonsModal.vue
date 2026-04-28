<template>
  <Teleport to="body">
    <transition name="page">
      <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" style="background-color: rgba(58, 58, 46, 0.4); backdrop-filter: blur(4px);">
        <div class="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-fade-in-up">
          
          <div class="p-6 sm:p-8 pb-4 border-b border-stone/50 flex justify-between items-start">
            <div>
              <h2 class="font-display text-2xl font-semibold text-dark">Make it Extra Special ✨</h2>
              <p class="text-body text-sm mt-1">Add a little something extra to your order.</p>
            </div>
            <button @click="$emit('skip')" class="text-muted hover:text-dark transition-colors p-2 rounded-full hover:bg-cream">
              ✕
            </button>
          </div>

          <div class="p-6 sm:p-8 overflow-y-auto min-h-[300px]">
            <div v-if="addons.length === 0" class="text-center py-10">
              <p class="text-muted">No add-ons available at the moment.</p>
            </div>
            
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div v-for="addon in addons" :key="addon.id" class="border border-stone rounded-2xl overflow-hidden flex flex-col bg-ivory/50">
                <div class="h-32 bg-cream overflow-hidden relative">
                  <img v-if="addon.image_url" :src="addon.image_url" :alt="addon.name" class="w-full h-full object-cover" />
                  <div v-else class="w-full h-full flex items-center justify-center text-muted text-4xl">🎁</div>
                </div>
                <div class="p-4 flex flex-col flex-1">
                  <h3 class="font-display font-semibold text-dark text-sm mb-1">{{ addon.name }}</h3>
                  <p class="text-olive font-bold text-sm mb-3 mt-auto">{{ formatPrice(addon.price) }}</p>
                  
                  <button 
                    v-if="!selectedAddonIds.includes(addon.id)"
                    @click="$emit('add', addon)" 
                    class="w-full py-2 bg-white border border-stone text-xs font-semibold rounded-full text-dark hover:bg-olive hover:text-white hover:border-olive transition-colors"
                  >
                    + Add
                  </button>
                  <button 
                    v-else
                    class="w-full py-2 bg-sage border border-sage text-xs font-semibold rounded-full text-white cursor-default"
                  >
                    ✓ Added
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="p-6 sm:p-8 pt-4 border-t border-stone/50 bg-ivory/50 flex justify-end gap-4">
            <button @click="$emit('skip')" class="px-6 py-3 rounded-full text-sm font-semibold text-body hover:bg-cream transition-colors">
              Skip & Go to Cart
            </button>
            <button @click="$emit('done')" class="px-8 py-3 rounded-full text-sm font-semibold bg-olive text-white shadow-sm hover:bg-dark transition-colors">
              Done
            </button>
          </div>

        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script>
export default {
  name: 'AddonsModal',
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    selectedAddonIds: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      addons: []
    }
  },
  async mounted() {
    try {
      const res = await fetch('/api/products')
      const allProducts = await res.json()
      this.addons = allProducts.filter(p => p.category_name && p.category_name.toLowerCase().includes('add-on'))
    } catch (err) {
      console.error('Failed to fetch add-ons:', err)
    }
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
    }
  }
}
</script>
