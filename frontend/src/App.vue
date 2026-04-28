<template>
  <div id="florist-app">
    <Navbar v-if="!isAdminRoute" />
    <CartDrawer v-if="!isAdminRoute" />
    <main>
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer v-if="!isAdminRoute" />

    <a 
      v-if="!isAdminRoute"
      :href="`https://wa.me/${whatsappNumber}?text=Hi Secret Garden! 🌿 I have a question...`"
      target="_blank"
      class="group fixed bottom-6 left-6 z-50 flex items-center gap-3 animate-fade-in-up"
      title="Contact us on WhatsApp"
    >
      <span class="absolute left-16 bg-white text-[#25D366] font-semibold text-sm px-4 py-2 rounded-2xl shadow-lg border border-[#25D366]/20 opacity-0 -translate-x-4 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 before:content-[''] before:absolute before:top-1/2 before:-left-2 before:-translate-y-1/2 before:border-[6px] before:border-transparent before:border-r-white drop-shadow-sm whitespace-nowrap">
        Let's Chat! ✨
      </span>
      
      <div class="bg-[#25D366] text-white p-4 rounded-full shadow-lg group-hover:shadow-xl group-hover:animate-jelly transition-shadow duration-300 flex items-center justify-center relative">
        <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.996 0C5.372 0 0 5.37 0 11.994c0 2.126.551 4.195 1.594 6.01L.002 24l6.155-1.614A11.905 11.905 0 0011.996 24c6.621 0 11.996-5.37 11.996-11.994C23.992 5.37 18.618 0 11.996 0zm0 22.004a9.922 9.922 0 01-5.074-1.39l-.364-.216-3.771.99.999-3.676-.237-.377A9.907 9.907 0 011.998 12c0-5.512 4.484-9.996 9.998-9.996C17.51 2.004 22 6.488 22 12c0 5.511-4.49 9.996-10.004 9.996v.008zm5.495-7.514c-.302-.152-1.789-.884-2.065-.986-.277-.102-.478-.152-.68.152-.201.304-.783.985-.96 1.187-.176.202-.353.228-.655.076-.302-.152-1.278-.472-2.435-1.503-.9-.806-1.506-1.801-1.683-2.104-.176-.304-.02-.469.132-.62.136-.134.302-.353.453-.529.15-.176.201-.304.302-.506.1-.202.05-.38-.025-.531-.076-.152-.68-1.643-.933-2.25-.246-.593-.495-.513-.68-.523-.176-.008-.377-.01-.578-.01-.202 0-.529.076-.806.38-.277.304-1.058 1.034-1.058 2.522s1.083 2.927 1.234 3.129c.15.202 2.133 3.256 5.166 4.563 2.454 1.059 2.822.846 3.326.805.503-.04 1.587-.648 1.813-1.276.226-.628.226-1.165.15-1.277-.076-.112-.277-.178-.58-.33z"/>
        </svg>
      </div>
    </a>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import CartDrawer from './components/CartDrawer.vue'

export default {
  name: 'App',
  components: { Navbar, Footer, CartDrawer },
  data() {
    return {
      whatsappNumber: '6285338001840'
    }
  },
  async mounted() {
    try {
      const res = await fetch('/api/settings/whatsapp_number')
      if (res.ok) {
        const data = await res.json()
        if (data.value) {
          this.whatsappNumber = data.value.replace(/[^0-9]/g, '')
        }
      }
    } catch (err) {
      console.error('Failed to load WhatsApp setting for FAB', err)
    }
  },
  computed: {
    isAdminRoute() {
      return this.$route.path.startsWith('/admin')
    }
  }
}
</script>

<style>
#florist-app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>
