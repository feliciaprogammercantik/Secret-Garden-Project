<template>
  <nav :class="['fixed top-0 left-0 right-0 z-50 transition-all duration-300', isScrolled ? 'bg-ivory/85 backdrop-blur-xl shadow-sm py-3' : 'bg-transparent py-5']">
    <div class="max-w-7xl mx-auto px-6 flex items-center justify-between">
      <router-link to="/" class="flex items-center gap-2. z-[1001]" @click="mobileOpen = false">
        <img :src="logo" alt="Logo Secret Garden" class="w-15 h-10 object-contain" />
        <span class="font-display text-xl font-semibold text-dark tracking-tight">Secret <em class="text-sage italic">Garden</em></span>
      </router-link>

      <div class="flex items-center gap-2">
        <ul :class="['flex gap-2', mobileOpen ? 'max-md:fixed max-md:inset-0 max-md:bg-ivory/98 max-md:backdrop-blur-xl max-md:flex-col max-md:items-center max-md:justify-center max-md:gap-3 max-md:opacity-100 max-md:visible' : 'max-md:fixed max-md:inset-0 max-md:opacity-0 max-md:invisible']" class="transition-all duration-300">
          <li v-for="link in links" :key="link.path">
            <router-link
              :to="link.path"
              :class="['px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-200 block', $route.path === link.path ? 'text-olive bg-sage/15 font-semibold' : 'text-body hover:text-olive hover:bg-sage/10']"
              @click="mobileOpen = false"
            >
              {{ link.name }}
            </router-link>
          </li>
        </ul>

        <button @click="toggleCart(true)" class="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-sage/10 transition-all duration-200 z-[1001]" title="Cart">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-body"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
          <span v-if="count > 0" class="absolute -top-0.5 -right-0.5 w-5 h-5 bg-olive text-white text-[0.6rem] font-bold rounded-full flex items-center justify-center">{{ count > 99 ? '99+' : count }}</span>
        </button>

        <button class="md:hidden flex flex-col gap-[5px] p-2 z-[1001] bg-transparent border-none cursor-pointer" @click="mobileOpen = !mobileOpen" aria-label="Toggle menu">
          <span :class="['block w-6 h-[2.5px] bg-dark rounded transition-all duration-200', mobileOpen ? 'rotate-45 translate-x-[5px] translate-y-[5px]' : '']"></span>
          <span :class="['block w-6 h-[2.5px] bg-dark rounded transition-all duration-200', mobileOpen ? 'opacity-0' : '']"></span>
          <span :class="['block w-6 h-[2.5px] bg-dark rounded transition-all duration-200', mobileOpen ? '-rotate-45 translate-x-[6px] -translate-y-[6px]' : '']"></span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { useCart } from '../composables/useCart'
import logo from '../assets/logosecretgarden.png'

export default {
  name: 'Navbar',
  setup() {
    const { cartCount, toggleCart } = useCart()
    return { cartCount, toggleCart, logo }
  },
  data() {
    return {
      isScrolled: false,
      mobileOpen: false,
      links: [
        { name: 'Home', path: '/' },
        { name: 'Collections', path: '/products' },
        { name: 'About', path: '/about' },
        { name: 'Track Order', path: '/track-order' },
        { name: 'Contact', path: '/contact' }
      ]
    }
  },
  computed: {
    count() {
      return typeof this.cartCount === 'function' ? this.cartCount() : this.cartCount
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 40
    }
  }
}
</script>