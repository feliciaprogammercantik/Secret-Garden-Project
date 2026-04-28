<template>
  <div>
    <section class="bg-gradient-to-r from-cream via-rose/30 to-ivory border-b border-stone/50 pt-28 pb-14 text-center">
      <div class="max-w-7xl mx-auto px-6">
        <h1 class="font-display text-4xl md:text-5xl font-semibold mb-3 text-dark">Our Story</h1>
        <p class="text-muted text-lg tracking-wide">Crafting Beauty with Passion Since 2020</p>
      </div>
    </section>

    <section class="py-20 bg-ivory">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <div class="relative">
            <img src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600" alt="Secret Garden Story" class="rounded-2xl shadow-xl w-full aspect-[4/5] object-cover" />
            <div class="absolute -bottom-5 -right-5 w-48 h-48 bg-gradient-to-br from-sage/30 to-blush/30 rounded-2xl -z-10 border border-stone"></div>
          </div>
          <div>
            <span class="text-xs text-sage font-bold uppercase tracking-[2px]">Our Journey</span>
            <h2 class="font-display text-3xl md:text-4xl font-semibold mt-3 mb-6 text-dark leading-tight">Creating Happiness<br />Through Flowers</h2>
            <div class="w-14 h-[3px] bg-gradient-to-r from-sage to-blush rounded-full mb-6"></div>
            <p class="text-body leading-relaxed mb-4">Secret Garden was born from a deep love for nature's beauty. We believe every bloom carries a story and a message that can touch the heart.</p>
            <p class="text-body leading-relaxed mb-4">Since 2020, we have served thousands of clients with fresh, premium-quality floral arrangements. Each creation is designed with utmost care by our team of experienced professional florists.</p>
            <p class="text-body leading-relaxed text-olive font-medium">Our vision is simple: to bring joy and beauty into every moment of your life through extraordinary floral artistry.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-blush/80 py-16 border-y border-stone/30 relative overflow-hidden" ref="statsSection">
      <div class="absolute top-0 left-0 w-64 h-64 bg-rose/40 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
      <div class="absolute bottom-0 right-0 w-64 h-64 bg-stone/40 rounded-full blur-3xl translate-y-1/2 translate-x-1/2"></div>

      <div class="max-w-7xl mx-auto px-6 relative z-10">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div v-for="(stat, i) in stats" :key="i">
            <span class="block font-display text-4xl font-bold text-dark mb-1.5">{{ formatNumber(stat.current) }}{{ stat.suffix }}</span>
            <span class="text-dark/80 font-medium text-sm tracking-wide">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-cream">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="font-display text-3xl md:text-4xl font-semibold mb-3 relative inline-block text-dark">
            Our Values
            <span class="block w-14 h-[3px] bg-gradient-to-r from-sage to-blush mx-auto mt-3 rounded-full"></span>
          </h2>
          <p class="text-muted mt-4 max-w-md mx-auto">The principles we hold dear in every creation</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          <div v-for="(v, i) in values" :key="i" class="text-center bg-white border border-stone p-9 rounded-2xl shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
            <div class="mb-5" v-html="v.icon"></div>
            <h3 class="font-display text-lg font-semibold mb-2.5 text-olive">{{ v.title }}</h3>
            <p class="text-sm text-body leading-relaxed">{{ v.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-cream">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="font-display text-3xl md:text-4xl font-semibold mb-3 relative inline-block">
            Meet the Team
            <span class="block w-14 h-[3px] bg-gradient-to-r from-sage to-blush mx-auto mt-3 rounded-full"></span>
          </h2>
          <p class="text-muted mt-4 max-w-md mx-auto">The passionate people behind every arrangement</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="(member, i) in team" :key="i" class="text-center bg-white p-8 rounded-xl shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300">
            <div class="w-20 h-20 rounded-full bg-gradient-to-br from-sage to-olive flex items-center justify-center mx-auto mb-5 overflow-hidden shadow-inner relative">
              <img v-if="member.image" :src="member.image" :alt="member.name" class="w-full h-full object-cover relative z-10" />
              <span v-else class="text-white text-3xl font-bold font-display z-0">{{ member.name[0] }}</span>
            </div>
            <h3 class="font-display text-lg font-semibold mb-1">{{ member.name }}</h3>
            <span class="text-xs text-sage font-semibold uppercase tracking-wider">{{ member.role }}</span>
            <p class="text-sm text-muted leading-relaxed mt-3.5">{{ member.bio }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      animated: false,
      stats: [
        { target: 5000, current: 0, suffix: '+', label: 'Arrangements Created' },
        { target: 3000, current: 0, suffix: '+', label: 'Happy Clients' },
        { target: 5, current: 0, suffix: '', label: 'Years of Excellence' },
        { target: 50, current: 0, suffix: '+', label: 'Flower Varieties' }
      ],
      values: [
        { icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 mx-auto text-sage" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 1 8.3C19.2 14.9 14 20 11 20Z"></path><line x1="11" y1="20" x2="16.5" y2="14.5"></line></svg>', title: 'Freshness', desc: 'We use only the freshest blooms, picked within 24 hours. Quality is our absolute priority.' },
        { icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 mx-auto text-sage" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10z"></path><path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path><path d="M14 6.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path><path d="M17 11.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path><path d="M15 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path></svg>', title: 'Creativity', desc: 'Every arrangement is a unique work of art, crafted with our florists\' signature creative touch.' },
        { icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 mx-auto text-sage" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>', title: 'Sustainability', desc: 'We are committed to eco-friendly practices, from packaging materials to sourcing from local growers.' },
        { icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 mx-auto text-sage" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>', title: 'Trust', desc: 'Client satisfaction is everything. We build lasting relationships through exceptional service.' }
      ],
      team: [
        { name: 'Felicia Alfaiqah', role: 'Founder & Head Florist', bio: 'Over 8 years of experience in floral artistry and event decoration.', image: '/team/feli gemes.jpeg' },
        { name: 'Anisa Suci', role: 'Senior Florist', bio: 'Specializes in wedding arrangements and modern minimalist interior décor.', image: '/team/suci.jpeg' },
        { name: 'Bella Adsella', role: 'Operations Manager', bio: 'Ensures every order is delivered on time and in perfect condition.', image: '/team/bella.jpeg' },
        { name: 'Deswitasari', role: 'Creative Director', bio: 'Brings visionary concepts to life with unique color palettes and floral designs.', image: '/team/deswita.jpeg' }
      ]
    }
  },
  mounted() {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !this.animated) {
        this.animated = true;
        this.animateStats();
      }
    }, { threshold: 0.5 });
    
    if (this.$refs.statsSection) {
      observer.observe(this.$refs.statsSection);
    }
  },
  methods: {
    formatNumber(num) {
      return num.toLocaleString('en-US');
    },
    animateStats() {
      const duration = 4000;
      const frameDuration = 1000 / 60;
      const totalFrames = Math.round(duration / frameDuration);
      
      this.stats.forEach(stat => {
        let frame = 0;
        const countTo = stat.target;
        
        const easeOutExpo = (x) => {
          return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
        };

        const counter = setInterval(() => {
          frame++;
          const progress = easeOutExpo(frame / totalFrames);
          const currentCount = Math.round(countTo * progress);
          
          stat.current = currentCount;
          
          if (frame >= totalFrames) {
            clearInterval(counter);
            stat.current = stat.target;
          }
        }, frameDuration);
      });
    }
  }
}
</script>
