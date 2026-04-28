<template>
  <div>
    <section
      class="bg-gradient-to-r from-cream via-rose/30 to-ivory border-b border-stone/50 pt-28 pb-16 text-center">
      <div class="max-w-7xl mx-auto px-6">
        <h1
          class="font-display text-4xl md:text-5xl font-semibold mb-3 text-dark">
          Our Collections
        </h1>
        <p class="text-muted text-lg font-light tracking-wide max-w-lg mx-auto">
          Discover the perfect arrangement for every precious moment
        </p>
      </div>
    </section>

    <section class="py-16 bg-ivory">
      <div class="max-w-7xl mx-auto px-6">
        <div
          class="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-x-12 gap-y-10 items-start">
          <aside class="md:sticky md:top-24">
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-stone">
              <h3
                class="font-display text-xl text-dark font-semibold mb-5 pb-3 border-b border-stone">
                Categories
              </h3>
              <ul
                class="space-y-1.5 max-md:flex max-md:flex-wrap max-md:gap-2 max-md:space-y-0">
                <li>
                  <button
                    :class="[
                      'w-full text-left px-5 py-3 rounded-xl text-sm transition-all duration-300 max-md:w-auto max-md:whitespace-nowrap flex items-center justify-between',
                      !selectedCategory
                        ? 'bg-olive text-ivory font-medium shadow-md'
                        : 'text-body bg-transparent hover:bg-cream hover:text-olive',
                    ]"
                    @click="selectedCategory = null">
                    <span>All Products</span>
                    <span v-if="!selectedCategory" class="text-sage text-xs"
                      >●</span
                    >
                  </button>
                </li>
                <li v-for="cat in categories" :key="cat.id">
                  <button
                    :class="[
                      'w-full text-left px-5 py-3 rounded-xl text-sm transition-all duration-300 max-md:w-auto max-md:whitespace-nowrap flex items-center justify-between',
                      selectedCategory === cat.id
                        ? 'bg-olive text-ivory font-medium shadow-md'
                        : 'text-body bg-transparent hover:bg-cream hover:text-olive',
                    ]"
                    @click="selectedCategory = cat.id">
                    <span>{{ cat.name }}</span>
                    <span
                      v-if="selectedCategory === cat.id"
                      class="text-sage text-xs"
                      >●</span
                    >
                  </button>
                </li>
              </ul>
            </div>

            <div
              class="hidden md:block mt-8 bg-gradient-to-br from-sage/20 to-blush/20 rounded-2xl p-6 border border-stone text-center relative overflow-hidden">
              <div
                class="absolute -top-4 -right-4 text-6xl opacity-10 blur-[2px]">
                🌸
              </div>
              <h4 class="font-display text-lg text-olive mb-2">Need advice?</h4>
              <p class="text-xs text-muted mb-4 leading-relaxed">
                Our florists can help you choose the perfect bloom.
              </p>
              <router-link
                to="/contact"
                class="inline-block px-5 py-2 rounded-full border border-olive text-olive text-xs font-medium hover:bg-olive hover:text-white transition-all"
                >Contact Us</router-link
              >
            </div>
          </aside>

          <div>
            <div
              class="flex items-center justify-between mb-8 pb-4 border-b border-stone/50">
              <p
                class="text-sm text-muted font-medium uppercase tracking-widest">
                <span class="text-olive font-bold">{{
                  filteredProducts.length
                }}</span>
                Blooms Found
              </p>
            </div>

            <div
              v-if="filteredProducts.length"
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div
                v-for="product in filteredProducts"
                :key="product.id"
                class="group bg-white rounded-2xl overflow-hidden border border-stone shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all duration-500">
                <div
                  class="relative h-64 overflow-hidden cursor-pointer"
                  @click="$router.push('/products/' + product.id)">
                  <img
                    :src="product.image_url"
                    :alt="product.name"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy" />

                  <div
                    class="absolute inset-0 bg-olive/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <span
                      class="text-white font-semibold text-sm px-6 py-2.5 border border-white/50 bg-white/10 rounded-full backdrop-blur-md"
                      >View Details</span
                    >
                  </div>

                  <span
                    v-if="product.is_featured"
                    class="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-olive text-[0.65rem] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-sm"
                    >Signature</span
                  >
                </div>

                <div class="p-6">
                  <span
                    class="text-[0.65rem] text-sage font-bold uppercase tracking-widest block mb-2"
                    >{{ product.category_name }}</span
                  >
                  <h3
                    class="font-display text-lg font-semibold mb-2 cursor-pointer hover:text-olive transition-colors leading-tight"
                    @click="$router.push('/products/' + product.id)">
                    {{ product.name }}
                  </h3>
                  <p
                    class="text-[0.8rem] text-muted line-clamp-2 mb-4 leading-relaxed">
                    {{ product.description }}
                  </p>

                  <div
                    class="pt-4 border-t border-cream flex items-center justify-between">
                    <p class="text-base font-bold text-olive">
                      {{ formatPrice(product.price) }}
                    </p>
                    <button
                      @click="handleAddToCart(product)"
                      :class="[
                        'flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 outline-none',
                        addedIds.includes(product.id)
                          ? 'bg-sage text-white'
                          : 'bg-cream text-olive hover:bg-olive hover:text-white shadow-sm',
                      ]"
                      title="Add to Cart">
                      <span v-if="addedIds.includes(product.id)">✓</span>
                      <span v-else class="text-lg leading-none">+</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-else
              class="text-center py-24 bg-white rounded-3xl border border-dashed border-stone">
              <span class="text-5xl block mb-5 opacity-50 grayscale">🌻</span>
              <h3 class="font-display text-xl text-dark mb-2">
                No selections available
              </h3>
              <p class="text-muted text-sm">
                We couldn't find any products in this particular category.
              </p>
              <button
                @click="selectedCategory = null"
                class="mt-6 px-6 py-2 border border-olive text-olive rounded-full text-sm hover:bg-olive hover:text-white transition-all">
                View All Flowers
              </button>
            </div>
          </div>
        </div>
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
import { useCart } from "../composables/useCart";
import AddonsModal from "../components/AddonsModal.vue";

export default {
  name: "Products",
  components: {
    AddonsModal
  },
  setup() {
    const { addToCart, formatPrice, toggleCart } = useCart();
    return { addToCart, formatPrice, toggleCart };
  },
  data() {
    return {
      products: [],
      categories: [],
      selectedCategory: null,
      addedIds: [],
      showAddonsModal: false,
      selectedAddonIds: []
    };
  },
  computed: {
    filteredProducts() {
      if (!this.selectedCategory) return this.products;
      return this.products.filter(
        (p) => p.category_id === this.selectedCategory,
      );
    },
  },
  async mounted() {
    try {
      const [catRes, prodRes] = await Promise.all([
        fetch("/api/categories"),
        fetch("/api/products"),
      ]);
      this.categories = await catRes.json();
      this.products = await prodRes.json();

      const catId = this.$route.query.category;
      if (catId) this.selectedCategory = parseInt(catId);
    } catch (err) {
      console.error("Failed to fetch:", err);
    }
  },
  methods: {
    handleAddToCart(product) {
      this.addToCart(product);
      if (!this.addedIds.includes(product.id)) {
        this.addedIds.push(product.id);
        setTimeout(() => {
          this.addedIds = this.addedIds.filter((id) => id !== product.id);
        }, 2000);
      }

      if (product.category_name && product.category_name.toLowerCase().includes('add-on')) {
        this.toggleCart(true);
      } else {
        this.showAddonsModal = true;
        this.selectedAddonIds = []; 
      }
    },
    addAddon(addon) {
      if (!this.selectedAddonIds.includes(addon.id)) {
        this.addToCart(addon, 1);
        this.selectedAddonIds.push(addon.id);
      }
    },
    skipAddons() {
      this.showAddonsModal = false;
      this.toggleCart(true);
    }
  },
};
</script>
