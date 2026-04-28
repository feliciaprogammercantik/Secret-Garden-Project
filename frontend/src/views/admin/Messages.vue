<template>
  <div class="space-y-6 max-w-5xl">
    <!-- Header -->
    <div class="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div>
        <h2 class="text-xl font-bold text-gray-800">Inbox</h2>
        <p class="text-sm text-gray-500 mt-1">Manage customer inquiries and messages</p>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div v-if="messages.length === 0 && !isLoading" class="p-12 text-center">
            <div class="text-4xl mb-3">📭</div>
            <p class="text-gray-500">Your inbox is empty.</p>
        </div>

        <div v-else class="divide-y divide-gray-100">
            <div v-for="message in messages" :key="message.id" class="p-6 hover:bg-gray-50 transition-colors flex gap-6">
                
                <div class="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-lg flex-shrink-0">
                    {{ message.name.charAt(0).toUpperCase() }}
                </div>
                
                <div class="flex-1">
                    <div class="flex justify-between items-start mb-2">
                        <div>
                            <h3 class="font-bold text-gray-800">{{ message.name }}</h3>
                            <div class="flex items-center gap-3 text-sm text-gray-500 mt-0.5">
                                <a :href="`mailto:${message.email}`" class="hover:text-emerald-600 transition-colors flex items-center gap-1">✉️ {{ message.email }}</a>
                                <a v-if="message.phone" :href="`https://wa.me/${message.phone.replace(/[^0-9]/g, '')}`" target="_blank" class="hover:text-emerald-600 transition-colors flex items-center gap-1">📞 {{ message.phone }}</a>
                            </div>
                        </div>
                        <span class="text-sm text-gray-400 whitespace-nowrap">{{ formatDate(message.created_at) }}</span>
                    </div>
                    
                    <div class="bg-gray-50 p-4 rounded-lg border border-gray-100 text-gray-700 text-sm mt-3 whitespace-pre-wrap">
                        {{ message.message }}
                    </div>
                    
                    <div class="mt-4 flex justify-end">
                        <button @click="confirmDelete(message.id)" class="text-sm font-medium text-red-500 hover:text-red-700 transition-colors flex items-center gap-1">
                             Delete Message
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

  </div>
</template>

<script>
export default {
    name: 'ManageMessages',
    data() {
        return {
            messages: [],
            isLoading: true
        }
    },
    async mounted() {
        await this.fetchMessages();
    },
    methods: {
        async fetchMessages() {
            this.isLoading = true;
            try {
                const response = await fetch('/api/contacts');
                this.messages = await response.json();
            } catch (error) {
                console.error('Failed to fetch messages', error);
            } finally {
                this.isLoading = false;
            }
        },
        async confirmDelete(id) {
            if (confirm(`Are you sure you want to delete this message?`)) {
                try {
                    const response = await fetch(`/api/contacts/${id}`, { method: 'DELETE' });
                    if (!response.ok) throw new Error('Failed to delete');
                    
                    // Remove from array instead of refetching for better UX
                    this.messages = this.messages.filter(m => m.id !== id);
                } catch (error) {
                    console.error(error);
                    alert('Error deleting message');
                }
            }
        },
        formatDate(dateString) {
            const d = new Date(dateString);
            return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
        }
    }
}
</script>
