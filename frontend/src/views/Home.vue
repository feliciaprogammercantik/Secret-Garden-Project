<template>
  <div>
    <!-- Hero Section -->
    <section
      class="relative min-h-screen pt-20 pb-12 flex items-center overflow-hidden bg-[#FAFAF8]">
      <div class="max-w-7xl mx-auto px-6 w-full">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            class="order-2 lg:order-1 relative z-10 max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
            <p
              class="text-sm font-medium text-olive tracking-[0.2em] uppercase mb-4 animate-fade-in-up">
              ✨ Nature's Finest, Delivered with Love
            </p>
            <h1
              class="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] mb-6 text-dark animate-fade-in-up"
              style="animation-delay: 0.1s">
              Exquisite Florals<br />
              <span class="text-olive italic font-serif"
                >For Every Occasion</span
              >
            </h1>
            <p
              class="text-lg text-body mb-8 leading-relaxed animate-fade-in-up"
              style="animation-delay: 0.2s">
              We craft nature's beauty into breathtaking arrangements, adding an
              extraordinary touch to life's most cherished moments.
            </p>
            <div
              class="flex flex-wrap gap-4 justify-center lg:justify-start animate-fade-in-up"
              style="animation-delay: 0.3s">
              <router-link
                to="/products"
                class="inline-flex items-center gap-2 px-8 py-4 bg-olive text-white rounded-full font-medium text-sm hover:bg-olive/85 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
                Explore Collections →
              </router-link>
              <router-link
                to="/contact"
                class="inline-flex items-center gap-2 px-8 py-4 bg-white border border-olive/20 text-olive rounded-full font-medium text-sm hover:border-olive hover:bg-olive/5 hover:-translate-y-0.5 transition-all duration-300">
                Get in Touch
              </router-link>
            </div>

            <div
              class="mt-12 pt-10 border-t border-olive/10 grid grid-cols-3 gap-6 animate-fade-in-up"
              style="animation-delay: 0.4s">
              <div>
                <p class="text-3xl font-display text-olive mb-1">5k+</p>
                <p class="text-xs text-muted uppercase tracking-wider">
                  Happy Clients
                </p>
              </div>
              <div>
                <p class="text-3xl font-display text-olive mb-1">Ex</p>
                <p class="text-xs text-muted uppercase tracking-wider">
                  Premium Blooms
                </p>
              </div>
              <div>
                <p class="text-3xl font-display text-olive mb-1">100%</p>
                <p class="text-xs text-muted uppercase tracking-wider">
                  Satisfaction
                </p>
              </div>
            </div>
          </div>

          <div
            class="order-1 lg:order-2 relative animate-fade-in-up"
            style="animation-delay: 0.2s">
            <div
              class="absolute -top-6 -right-6 w-32 h-32 bg-olive/10 rounded-full blur-2xl"></div>
            <div
              class="absolute -bottom-10 -left-10 w-40 h-40 bg-rose/20 rounded-full blur-3xl"></div>
            <div
              class="relative rounded-t-[140px] rounded-b-[40px] overflow-hidden shadow-2xl bg-white p-3 rotate-1 hover:rotate-0 transition-transform duration-700">
              <div
                class="rounded-t-[130px] rounded-b-[30px] overflow-hidden h-[500px] lg:h-[650px] relative">
                <img
                  src="../assets/toko1.jpeg"
                  alt="Secret Garden Signature Floral Arrangement"
                  class="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-1000" />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-dark/30 to-transparent"></div>
              </div>
            </div>

            <div
              class="absolute top-1/4 -left-6 lg:-left-12 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-float">
              <div
                class="w-12 h-12 rounded-full bg-cream flex items-center justify-center text-xl">
                🌸
              </div>
              <div>
                <p class="text-xs text-muted uppercase tracking-wider mb-0.5">
                  Established
                </p>
                <p class="text-sm font-semibold text-dark">Since 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-12">
          <h2
            class="font-display text-3xl md:text-4xl font-semibold mb-3 relative inline-block">
            Our Collections
            <span
              class="block w-14 h-[3px] bg-gradient-to-r from-sage to-blush mx-auto mt-3 rounded-full"></span>
          </h2>
          <p class="text-muted mt-4 max-w-md mx-auto">
            Discover the perfect arrangement for every special occasion
          </p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="cat in categories"
            :key="cat.id"
            class="group rounded-xl overflow-hidden bg-ivory cursor-pointer hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300"
            @click="
              $router.push({ path: '/products', query: { category: cat.id } })
            ">
            <div class="relative h-48 overflow-hidden">
              <img
                :src="cat.image_url"
                :alt="cat.name"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy" />
              <div
                class="absolute inset-0 bg-olive/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span
                  class="text-white font-semibold text-sm px-6 py-2.5 border-2 border-white rounded-full"
                  >View →</span
                >
              </div>
            </div>
            <div class="p-5">
              <h3 class="font-display text-base font-semibold mb-1.5">
                {{ cat.name }}
              </h3>
              <p class="text-xs text-muted line-clamp-2">
                {{ cat.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-cream">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-12">
          <h2
            class="font-display text-3xl md:text-4xl font-semibold mb-3 relative inline-block">
            Signature Arrangements
            <span
              class="block w-14 h-[3px] bg-gradient-to-r from-sage to-blush mx-auto mt-3 rounded-full"></span>
          </h2>
          <p class="text-muted mt-4 max-w-md mx-auto">
            Our most beloved creations, handpicked for you
          </p>
        </div>
        <div class="relative overflow-hidden group">
          <div class="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none"></div>
          
          <div class="flex gap-7 animate-infinite-scroll group-hover:pause-animation py-4 px-4 w-max">
            <div
              v-for="product in featuredProducts"
              :key="'set1-' + product.id"
              class="w-[280px] shrink-0 bg-white rounded-xl overflow-hidden shadow-sm hover:-translate-y-1.5 hover:shadow-xl cursor-pointer transition-all duration-300"
              @click="$router.push('/products/' + product.id)">
              <div class="relative h-60 overflow-hidden">
                <img
                  :src="product.image_url"
                  :alt="product.name"
                  class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy" />
                <span
                  class="absolute top-3 left-3 bg-olive text-white text-[0.7rem] font-semibold px-3.5 py-1 rounded-full tracking-wide"
                  >Signature</span
                >
              </div>
              <div class="p-5">
                <span
                  class="text-[0.7rem] text-sage font-semibold uppercase tracking-wider"
                  >{{ product.category_name }}</span
                >
                <h3 class="font-display text-base font-semibold mt-1.5 mb-1 truncate">
                  {{ product.name }}
                </h3>
                <p class="text-base font-semibold text-olive">
                  {{ formatPrice(product.price) }}
                </p>
              </div>
            </div>

            <div
              v-for="product in featuredProducts"
              :key="'set2-' + product.id"
              class="w-[280px] shrink-0 bg-white rounded-xl overflow-hidden shadow-sm hover:-translate-y-1.5 hover:shadow-xl cursor-pointer transition-all duration-300"
              @click="$router.push('/products/' + product.id)">
              <div class="relative h-60 overflow-hidden">
                <img
                  :src="product.image_url"
                  :alt="product.name"
                  class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy" />
                <span
                  class="absolute top-3 left-3 bg-olive text-white text-[0.7rem] font-semibold px-3.5 py-1 rounded-full tracking-wide"
                  >Signature</span
                >
              </div>
              <div class="p-5">
                <span
                  class="text-[0.7rem] text-sage font-semibold uppercase tracking-wider"
                  >{{ product.category_name }}</span
                >
                <h3 class="font-display text-base font-semibold mt-1.5 mb-1 truncate">
                  {{ product.name }}
                </h3>
                <p class="text-base font-semibold text-olive">
                  {{ formatPrice(product.price) }}
                </p>
              </div>
            </div>
            
            <div
              v-for="product in featuredProducts"
              :key="'set3-' + product.id"
              class="w-[280px] shrink-0 bg-white rounded-xl overflow-hidden shadow-sm hover:-translate-y-1.5 hover:shadow-xl cursor-pointer transition-all duration-300"
              @click="$router.push('/products/' + product.id)">
              <div class="relative h-60 overflow-hidden">
                <img
                  :src="product.image_url"
                  :alt="product.name"
                  class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy" />
                <span
                  class="absolute top-3 left-3 bg-olive text-white text-[0.7rem] font-semibold px-3.5 py-1 rounded-full tracking-wide"
                  >Signature</span
                >
              </div>
              <div class="p-5">
                <span
                  class="text-[0.7rem] text-sage font-semibold uppercase tracking-wider"
                  >{{ product.category_name }}</span
                >
                <h3 class="font-display text-base font-semibold mt-1.5 mb-1 truncate">
                  {{ product.name }}
                </h3>
                <p class="text-base font-semibold text-olive">
                  {{ formatPrice(product.price) }}
                </p>
              </div>
            </div>
          </div>

          <div class="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none"></div>
        </div>
        <div class="text-center mt-10">
          <router-link
            to="/products"
            class="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-olive text-olive rounded-full font-medium text-sm hover:bg-olive hover:text-white hover:-translate-y-0.5 transition-all duration-300"
            >View All Collections →</router-link
          >
        </div>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-12">
          <h2
            class="font-display text-3xl md:text-4xl font-semibold mb-3 relative inline-block">
            Why Secret Garden?
            <span
              class="block w-14 h-[3px] bg-gradient-to-r from-sage to-blush mx-auto mt-3 rounded-full"></span>
          </h2>
          <p class="text-muted mt-4 max-w-md mx-auto">
            Our commitment to perfection in every petal
          </p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          <div
            v-for="(item, i) in whyItems"
            :key="i"
            class="text-center p-9 rounded-xl bg-ivory hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <div class="text-4xl mb-4">{{ item.icon }}</div>
            <h3 class="font-display text-base font-semibold mb-2.5">
              {{ item.title }}
            </h3>
            <p class="text-sm text-muted leading-relaxed">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-gradient-to-br from-rose to-cream">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-12">
          <h2
            class="font-display text-3xl md:text-4xl font-semibold mb-3 relative inline-block">
            What Our Clients Say
            <span
              class="block w-14 h-[3px] bg-gradient-to-r from-sage to-blush mx-auto mt-3 rounded-full"></span>
          </h2>
          <p class="text-muted mt-4 max-w-md mx-auto">
            Trusted by hundreds of happy clients
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-7">
          <div
            v-for="(t, i) in testimonials"
            :key="i"
            class="bg-white p-8 rounded-xl shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300">
            <div class="text-amber-400 text-sm tracking-widest mb-4">★★★★★</div>
            <p class="text-sm text-body leading-relaxed italic mb-5">
              "{{ t.text }}"
            </p>
            <div class="flex items-center gap-3">
              <div
                class="w-11 h-11 rounded-full bg-gradient-to-br from-sage to-olive flex items-center justify-center text-white font-semibold text-lg font-display">
                {{ t.name[0] }}
              </div>
              <div>
                <strong class="block text-dark text-sm">{{ t.name }}</strong>
                <span class="text-xs text-muted">{{ t.role }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 bg-ivory">
      <div class="max-w-3xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="font-display text-3xl font-semibold mb-3 relative inline-block text-dark">
            Frequently Asked Questions
            <span class="block w-12 h-[2px] bg-gradient-to-r from-sage to-blush mx-auto mt-4 rounded-full"></span>
          </h2>
          <p class="text-muted mt-6 font-light text-base max-w-lg mx-auto">
            Find answers to common questions about our floral arrangements, delivery options, and customization services to help you make the perfect choice.
          </p>
        </div>

        <div class="border-t border-stone/50">
          <div 
            v-for="(faq, index) in faqs" 
            :key="index"
            class="border-b border-stone/50"
          >
            <button 
              @click="toggleFaq(index)"
              class="w-full flex items-center justify-between py-4 sm:py-5 text-left outline-none group"
            >
              <h3 
                class="font-display text-base sm:text-lg font-medium pr-6 transition-colors duration-300"
                :class="activeFaq === index ? 'text-sage' : 'text-olive group-hover:text-sage'"
              >
                {{ faq.question }}
              </h3>
              <div class="flex-shrink-0 text-muted transition-transform duration-300" :class="{ 'rotate-180 text-olive': activeFaq === index }">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
            
            <div 
              class="grid transition-all duration-300 ease-in-out"
              :style="{ gridTemplateRows: activeFaq === index ? '1fr' : '0fr' }"
            >
              <div class="overflow-hidden">
                <div class="pb-5 text-sm sm:text-base text-body leading-relaxed pr-8 opacity-90">
                  {{ faq.answer }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-10 text-center">
          <p class="text-sm text-muted">
            Still have questions? 
            <router-link to="/contact" class="text-olive font-semibold hover:underline decoration-sage underline-offset-4">Contact our support team</router-link>
          </p>
        </div>
      </div>
    </section>

    <section class="bg-ivory pb-24 pt-4 px-6">
      <div class="max-w-5xl mx-auto rounded-3xl bg-olive/95 backdrop-blur-md relative overflow-hidden py-16 px-6 text-center shadow-xl hover:shadow-2xl transition-shadow duration-500">
        <div class="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-12 -left-12 w-64 h-64 bg-sage/20 rounded-full blur-3xl pointer-events-none"></div>

        <div class="relative z-10 max-w-xl mx-auto">
          <h2 class="font-display text-3xl md:text-4xl font-semibold text-white mb-4">
            Ready to Create Something Beautiful?
          </h2>
          <p class="text-white/85 mb-8 text-lg font-light leading-relaxed">
            Let us craft the perfect arrangement for your most special moments. Experience the artistry of Secret Garden.
          </p>
          <router-link
            to="/contact"
            class="inline-flex items-center gap-2 px-8 py-4 bg-white text-olive rounded-full font-medium text-sm hover:bg-ivory hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
          >
            Reach Out to Us 
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      categories: [],
      featuredProducts: [],
      activeFaq: null,
      faqs: [
        {
          question: "How far in advance should I place an order for delivery?",
          answer: "For signature arrangements, we recommend placing your order at least 24 hours in advance to guarantee flower availability. For large custom events or weddings, please reach out 3-4 weeks prior."
        },
        {
          question: "Do you offer same-day delivery?",
          answer: "Yes! We offer same-day delivery for select arrangements if the order is placed before 1:00 PM local time. Please check our 'Fresh Flowers' section for eligible blooms."
        },
        {
          question: "Can I customize the flowers in an arrangement?",
          answer: "Absolutely. We pride ourselves on bespoke florist services. You can easily click our WhatsApp floating button or use the 'Contact Us' page to discuss your specific vision and budget."
        },
        {
          question: "How long will my flowers stay fresh?",
          answer: "Our farm-fresh blooms typically last 5–7 days or longer. To maximize their vase life, keep them away from direct sunlight, change the water every two days, and trim the stems at a 45-degree angle."
        },
        {
          question: "What is your return or replacement policy?",
          answer: "We guarantee the freshness and quality of every delivery. If your flowers arrive damaged or do not meet our high standards, please contact us with a photo within 12 hours of delivery, and we will happily replace them."
        }
      ],
      whyItems: [
        {
          icon: "🌿",
          title: "Farm-Fresh Daily",
          desc: "We source only the finest blooms, hand-picked from trusted growers every single day.",
        },
        {
          icon: "🎨",
          title: "Artisan Design",
          desc: "Each arrangement is exclusively crafted by our professional florists with an artistic touch.",
        },
        {
          icon: "🚚",
          title: "Punctual Delivery",
          desc: "Swift and secure delivery service ensuring your flowers arrive in pristine condition.",
        },
        {
          icon: "💝",
          title: "Bespoke Service",
          desc: "Every moment is unique. Consult with us for a personally tailored floral experience.",
        },
      ],
      testimonials: [
        {
          name: "Sarah Wijaya",
          role: "Bride",
          text: "The wedding arrangements from Secret Garden were absolutely breathtaking. Every guest was mesmerized by the floral decor. Truly exceptional!",
        },
        {
          name: "Andi Pratama",
          role: "Client",
          text: "Ordered a birthday bouquet for my wife and it arrived perfectly on time. The flowers were stunning and she was moved to tears. Highly recommend!",
        },
        {
          name: "Diana Chen",
          role: "Event Planner",
          text: "As an event planner, I always trust Secret Garden for floral décor. The results are consistently outstanding and professionally executed.",
        },
      ],
    };
  },
  async mounted() {
    try {
      const [catRes, prodRes] = await Promise.all([
        fetch("/api/categories"),
        fetch("/api/products?featured=true"),
      ]);
      this.categories = await catRes.json();
      this.featuredProducts = await prodRes.json();
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(price);
    },
    toggleFaq(index) {
      this.activeFaq = this.activeFaq === index ? null : index;
    }
  },
};
</script>
