<template>
  <div>
    <section class="bg-gradient-to-r from-cream via-rose/30 to-ivory border-b border-stone/50 pt-28 pb-14 text-center">
      <div class="max-w-7xl mx-auto px-6">
        <h1 class="font-display text-4xl md:text-5xl font-semibold mb-3 text-dark">Get in Touch</h1>
        <p class="text-muted text-lg tracking-wide">We'd love to help bring your floral vision to life</p>
      </div>
    </section>

    <section class="py-16 bg-ivory">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 items-start">
          <div>
            <h2 class="font-display text-3xl font-semibold mb-2 text-dark">Send Us a Message</h2>
            <p class="text-muted mb-8">Tell us about your floral needs and we'll get back to you shortly.</p>

            <form @submit.prevent="handleSubmit" class="space-y-6 bg-white p-8 rounded-2xl border border-stone shadow-sm">
              <div>
                <label for="name" class="block font-medium text-sm text-dark mb-2">Full Name *</label>
                <input type="text" id="name" v-model="form.name" placeholder="Enter your name" required class="w-full px-5 py-3.5 border border-stone rounded-xl font-sans text-sm text-dark bg-ivory/50 outline-none focus:border-olive focus:bg-white focus:ring-4 focus:ring-sage/20 transition-all duration-300 shadow-inner" />
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label for="email" class="block font-medium text-sm text-dark mb-2">Email *</label>
                  <input type="email" id="email" v-model="form.email" placeholder="you@email.com" required class="w-full px-5 py-3.5 border border-stone rounded-xl font-sans text-sm text-dark bg-ivory/50 outline-none focus:border-olive focus:bg-white focus:ring-4 focus:ring-sage/20 transition-all duration-300 shadow-inner" />
                </div>
                <div>
                  <label for="phone" class="block font-medium text-sm text-dark mb-2">Phone</label>
                  <input type="tel" id="phone" v-model="form.phone" placeholder="+62 8xx-xxxx-xxxx" class="w-full px-5 py-3.5 border border-stone rounded-xl font-sans text-sm text-dark bg-ivory/50 outline-none focus:border-olive focus:bg-white focus:ring-4 focus:ring-sage/20 transition-all duration-300 shadow-inner" />
                </div>
              </div>
              <div>
                <label for="message" class="block font-medium text-sm text-dark mb-2">Message *</label>
                <textarea id="message" v-model="form.message" placeholder="Describe your floral needs..." rows="5" required class="w-full px-5 py-3.5 border border-stone rounded-xl font-sans text-sm text-dark bg-ivory/50 outline-none focus:border-olive focus:bg-white focus:ring-4 focus:ring-sage/20 transition-all duration-300 shadow-inner resize-y min-h-32"></textarea>
              </div>
              <button type="submit" :disabled="isSubmitting" class="w-full py-4 mt-2 bg-olive text-white rounded-xl font-semibold tracking-wide text-sm hover:bg-olive/90 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed">
                {{ isSubmitting ? 'Sending...' : '✉️ Send Message' }}
              </button>
            </form>

            <transition name="page">
              <div v-if="successMessage" class="flex items-center gap-3 mt-5 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg animate-fade-in-up">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                <p class="text-sm font-medium">{{ successMessage }}</p>
              </div>
            </transition>

            <transition name="page">
              <div v-if="errorMessage" class="flex items-center gap-3 mt-5 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg animate-fade-in-up">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                <p class="text-sm font-medium">{{ errorMessage }}</p>
              </div>
            </transition>
          </div>

          <div class="space-y-6">
            <div class="bg-white rounded-2xl p-8 border border-stone shadow-sm">
              <h3 class="font-display text-xl text-dark font-semibold mb-6 pb-4 border-b border-stone/50">Contact Information</h3>
              <div class="space-y-6">
                <div class="flex gap-4">
                  <div class="w-10 h-10 rounded-full bg-cream border border-stone flex items-center justify-center shrink-0 text-olive">
                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div>
                    <strong class="block text-sm text-dark mb-1">Address</strong>
                    <p class="text-sm text-muted leading-relaxed">
                    <a href="https://www.google.com/maps?q=12+Rose+Garden+Ave+South+Jakarta" target="_blank" class="underline hover:text-olive">
                      12 Rose Garden Ave<br />South Jakarta, 12345
                    </a>
                  </p>
                  </div>
                </div>
                <div class="flex gap-4">
                  <div class="w-10 h-10 rounded-full bg-cream border border-stone flex items-center justify-center shrink-0 text-olive">
                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <div>
                    <strong class="block text-sm text-dark mb-1">Phone</strong>
                    <p class="text-sm text-olive font-medium">+62 853-3800-1840</p>
                  </div>
                </div>
                <div class="flex gap-4">
                  <div class="w-10 h-10 rounded-full bg-cream border border-stone flex items-center justify-center shrink-0 text-olive">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </div>
                  <div>
                    <strong class="block text-sm text-dark mb-1">Email</strong>
                    <p class="text-sm text-olive font-medium">hello@secretgarden.id</p>
                  </div>
                </div>
                <div class="flex gap-4">
                  <div class="w-10 h-10 rounded-full bg-cream border border-stone flex items-center justify-center shrink-0 text-olive">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </div>
                  <div>
                    <strong class="block text-sm text-dark mb-1">Business Hours</strong>
                    <p class="text-sm text-muted leading-relaxed">Mon - Sat: 08:00 - 20:00<br />Sun: 09:00 - 17:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-cream via-rose/20 to-stone/30 rounded-2xl p-12 text-center border border-stone shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 mx-auto mb-4 text-olive opacity-80 filter drop-shadow-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>
              <p class="font-display text-xl font-semibold text-dark mb-2">Our Location</p>
              <small class="text-muted text-sm px-4">12 Rose Garden Ave, South Jakarta</small>
              <div class="mt-4 w-full h-64">
                <iframe
                  src="https://www.google.com/maps?q=12+Rose+Garden+Ave+South+Jakarta&output=embed"
                  width="100%"
                  height="100%"
                  style="border:0;"
                  allowfullscreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            <div class="bg-white rounded-2xl p-8 border border-stone shadow-sm">
              <h4 class="font-display text-lg text-dark font-semibold mb-5 text-center">Follow Us</h4>
              <div class="flex gap-3">
                <a href="#" class="flex-1 flex flex-col items-center justify-center gap-2.5 py-4 rounded-xl border border-stone bg-ivory/50 text-xs font-medium text-body hover:bg-olive hover:text-white hover:border-olive hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  Instagram
                </a>
                <a href="#" class="flex-1 flex flex-col items-center justify-center gap-2.5 py-4 rounded-xl border border-stone bg-ivory/50 text-xs font-medium text-body hover:bg-olive hover:text-white hover:border-olive hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  Facebook
                </a>
                <a href="#" class="flex-1 flex flex-col items-center justify-center gap-2.5 py-4 rounded-xl border border-stone bg-ivory/50 text-xs font-medium text-body hover:bg-olive hover:text-white hover:border-olive hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                  WhatsApp
                </a>
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
  name: 'Contact',
  data() {
    return {
      form: { name: '', email: '', phone: '', message: '' },
      isSubmitting: false,
      successMessage: '',
      errorMessage: ''
    }
  },
  methods: {
    async handleSubmit() {
      this.isSubmitting = true
      this.successMessage = ''
      this.errorMessage = ''
      try {
        const res = await fetch('/api/contacts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.form)
        })
        const data = await res.json()
        if (res.ok) {
          this.successMessage = 'Your message has been sent successfully! We will get back to you shortly.'
          this.form = { name: '', email: '', phone: '', message: '' }
        } else {
          this.errorMessage = data.error || 'Failed to send message. Please try again.'
        }
      } catch (err) {
        this.errorMessage = 'An error occurred. Please check your connection and try again.'
      } finally {
        this.isSubmitting = false
      }
    }
  }
}
</script>
