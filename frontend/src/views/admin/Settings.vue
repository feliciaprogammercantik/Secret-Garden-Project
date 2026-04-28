<template>
  <div class="space-y-6 max-w-4xl">
    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 class="text-xl font-bold text-gray-800">Website Settings</h2>
      <p class="text-sm text-gray-500 mt-1">Configure your florist store preferences</p>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="p-6 border-b border-gray-100 bg-gray-50">
            <h3 class="font-bold text-gray-800">Contact & Orders</h3>
            <p class="text-sm text-gray-500 mt-1">Manage where customer orders and messages are received</p>
        </div>
        
        <form @submit.prevent="saveSettings" class="p-6 space-y-6">
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">WhatsApp Number for Orders</label>
                <div class="flex gap-4 items-center">
                    <span class="text-gray-500 bg-gray-100 px-4 py-3 rounded-lg border border-gray-200">wa.me/</span>
                    <input 
                        type="text" 
                        v-model="settings.whatsapp_number" 
                        class="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                        placeholder="6281234567890"
                        required
                    />
                </div>
                <p class="text-xs text-gray-500 mt-2">Enter the number with country code (e.g., 62 for Indonesia). Do not use + or spaces.</p>
            </div>

            <div class="pt-6 border-t border-gray-100 flex justify-end gap-3">
                <button type="button" @click="fetchSettings" class="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors" :disabled="isSaving">
                    Cancel
                </button>
                <button type="submit" class="px-6 py-2.5 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2" :disabled="isSaving">
                    <template v-if="isSaving">
                        <span class="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                        Saving...
                    </template>
                    <template v-else>
                        Save Settings
                    </template>
                </button>
            </div>
            
            <div v-if="successMsg" class="mt-4 p-4 bg-emerald-50 text-emerald-700 rounded-lg text-sm border border-emerald-100">
                ✅ {{ successMsg }}
            </div>
        </form>
    </div>

  </div>
</template>

<script>
export default {
    name: 'AdminSettings',
    data() {
        return {
            settings: {
                whatsapp_number: ''
            },
            isSaving: false,
            successMsg: ''
        }
    },
    async mounted() {
        await this.fetchSettings();
    },
    methods: {
        async fetchSettings() {
            try {
                const response = await fetch('/api/settings');
                const data = await response.json();
                if (data.whatsapp_number) {
                    this.settings.whatsapp_number = data.whatsapp_number;
                }
            } catch (error) {
                console.error('Failed to fetch settings:', error);
            }
        },
        async saveSettings() {
            this.isSaving = true;
            this.successMsg = '';
            
            try {
                this.settings.whatsapp_number = this.settings.whatsapp_number.replace(/[^0-9]/g, '');
                
                const response = await fetch('/api/settings', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.settings)
                });
                
                if (!response.ok) throw new Error('Failed to save settings');
                
                this.successMsg = 'Settings saved successfully!';
                setTimeout(() => { this.successMsg = ''; }, 3000);
            } catch (error) {
                console.error(error);
                alert('Failed to save settings.');
            } finally {
                this.isSaving = false;
            }
        }
    }
}
</script>
