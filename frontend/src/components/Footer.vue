<template>
  <footer class="relative mt-10">
    <div class="text-olive leading-[0] -mb-px">
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none" class="w-full h-20">
        <path d="M0,40 C360,100 720,0 1080,60 C1260,80 1380,40 1440,50 L1440,100 L0,100 Z" fill="currentColor"/>
      </svg>
    </div>

    <div class="bg-olive text-white/85 pt-14 pb-6">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div class="lg:col-span-1">
            <div class="flex items-center gap-2.5 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 1 8.3C19.2 14.9 14 20 11 20Z"></path><line x1="11" y1="20" x2="16.5" y2="14.5"></line></svg>
              <h3 class="text-white font-display text-xl font-semibold">Secret <em class="text-sage">Garden</em></h3>
            </div>
            <p class="text-sm leading-relaxed opacity-85">Curating nature's finest blooms into breathtaking arrangements for life's most extraordinary moments.</p>
          </div>

          <div>
            <h4 class="text-white font-display text-base mb-5 pb-2.5 border-b-2 border-sage/30 inline-block">Quick Links</h4>
            <ul class="space-y-2.5">
              <li><router-link to="/" class="text-sm opacity-80 hover:opacity-100 hover:pl-1.5 hover:text-sage transition-all duration-200">Home</router-link></li>
              <li><router-link to="/products" class="text-sm opacity-80 hover:opacity-100 hover:pl-1.5 hover:text-sage transition-all duration-200">Collections</router-link></li>
              <li><router-link to="/about" class="text-sm opacity-80 hover:opacity-100 hover:pl-1.5 hover:text-sage transition-all duration-200">Our Story</router-link></li>
              <li><router-link to="/contact" class="text-sm opacity-80 hover:opacity-100 hover:pl-1.5 hover:text-sage transition-all duration-200">Contact</router-link></li>
              <li><router-link to="/admin" class="text-sm opacity-80 hover:opacity-100 hover:pl-1.5 hover:text-sage transition-all duration-200">Admin Portal</router-link></li>
            </ul>
          </div>

          <div>
            <h4 class="text-white font-display text-base mb-5 pb-2.5 border-b-2 border-sage/30 inline-block">Collections</h4>
            <ul class="space-y-2.5">
              <li><router-link to="/products" class="text-sm opacity-80 hover:opacity-100 hover:pl-1.5 hover:text-sage transition-all duration-200">Fresh Flowers</router-link></li>
              <li><router-link to="/products" class="text-sm opacity-80 hover:opacity-100 hover:pl-1.5 hover:text-sage transition-all duration-200">Artificial Flowers</router-link></li>
              <li><router-link to="/products" class="text-sm opacity-80 hover:opacity-100 hover:pl-1.5 hover:text-sage transition-all duration-200">Custom Bouquets</router-link></li>
              <li><router-link to="/products" class="text-sm opacity-80 hover:opacity-100 hover:pl-1.5 hover:text-sage transition-all duration-200">Satin Flowers</router-link></li>
              <li><router-link to="/products" class="text-sm opacity-80 hover:opacity-100 hover:pl-1.5 hover:text-sage transition-all duration-200">Add-ons</router-link></li>
            </ul>
          </div>

          <div>
            <h4 class="text-white font-display text-base mb-5 pb-2.5 border-b-2 border-sage/30 inline-block">Reach Us</h4>
            <ul class="space-y-3 text-sm opacity-85">
              <li class="flex items-start gap-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" class="shrink-0 mt-0.5 text-sage" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>12 Rose Garden Ave, Jakarta</span>
              </li>
              <li class="flex items-center gap-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" class="shrink-0 text-sage" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>+62 853-3800-1840</span>
              </li>
              <li class="flex items-center gap-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" class="shrink-0 text-sage" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <span>hello@secretgarden.id</span>
              </li>
              <li class="flex items-start gap-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" class="shrink-0 mt-0.5 text-sage" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>Mon - Sat, 08:00 - 20:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-12 pt-6 border-t border-white/15 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p class="text-xs opacity-70">&copy; {{ currentYear }} Secret Garden. All rights reserved.</p>
          <div class="flex gap-4">
            <a href="#" aria-label="Instagram" class="w-10 h-10 rounded-full border border-white/25 flex items-center justify-center text-white/80 hover:bg-sage hover:border-sage hover:text-olive hover:-translate-y-0.5 transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#" aria-label="Facebook" class="w-10 h-10 rounded-full border border-white/25 flex items-center justify-center text-white/80 hover:bg-sage hover:border-sage hover:text-olive hover:-translate-y-0.5 transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" aria-label="WhatsApp" class="w-10 h-10 rounded-full border border-white/25 flex items-center justify-center text-white/80 hover:bg-sage hover:border-sage hover:text-olive hover:-translate-y-0.5 transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComp',
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  }
}
</script>
