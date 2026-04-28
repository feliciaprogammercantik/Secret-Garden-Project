<template>
  <div class="space-y-6 max-w-5xl">
    <!-- Header & Actions -->
    <div class="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div>
        <h2 class="text-xl font-bold text-gray-800">Manage Categories</h2>
        <p class="text-sm text-gray-500 mt-1">Organize your products into meaningful groups</p>
      </div>
      <div>
          <button @click="openModal(null)" class="px-6 py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2">
            <span>+</span> Add Category
          </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="category in categories" :key="category.id" class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div class="h-32 bg-gray-100 relative">
                <img v-if="category.image_url" :src="category.image_url" :alt="category.name" class="w-full h-full object-cover" />
                <div v-else class="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
            </div>
            <div class="p-5 flex-1 flex flex-col">
                <h3 class="font-bold text-gray-800 mb-2">{{ category.name }}</h3>
                <p class="text-sm text-gray-500 mb-4 flex-1">{{ category.description || 'No description provided.' }}</p>
                
                <div class="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100 mt-auto">
                    <button @click="openModal(category)" class="py-2 text-sm font-medium text-emerald-600 bg-emerald-50 rounded hover:bg-emerald-100 transition-colors">Edit</button>
                    <button @click="confirmDelete(category)" class="py-2 text-sm font-medium text-red-600 bg-red-50 rounded hover:bg-red-100 transition-colors">Delete</button>
                </div>
            </div>
        </div>
    </div>

     <div v-if="categories.length === 0 && !isLoading" class="bg-white p-12 text-center rounded-xl border border-gray-100 shadow-sm">
        <p class="text-gray-500 mb-4">No categories found.</p>
    </div>

    <div v-if="isModalOpen" class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl w-full max-w-md shadow-2xl flex flex-col">
            <div class="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 class="font-bold text-xl text-gray-800">{{ editingCategory ? 'Edit Category' : 'Add New Category' }}</h3>
                <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            
            <form @submit.prevent="saveCategory" class="p-6 space-y-5">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                    <input type="text" v-model="formData.name" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" placeholder="e.g. Bouquets" />
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                    <textarea v-model="formData.description" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" placeholder="Brief description..."></textarea>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Cover Image (Optional)</label>
                    <input type="file" @change="handleImageUpload" accept="image/*" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
                    
                    <div v-if="imagePreview || formData.image_url" class="mt-3 p-2 bg-gray-50 rounded-lg border border-gray-200">
                        <p class="text-xs text-gray-500 mb-2">Image Preview:</p>
                        <img :src="imagePreview || formData.image_url" class="h-32 rounded object-cover mx-auto" />
                    </div>
                </div>

                <div class="pt-4 flex justify-end gap-3">
                    <button type="button" @click="closeModal" class="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors" :disabled="isSaving">Cancel</button>
                    <button type="submit" class="px-5 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium transition-colors flex items-center gap-2" :disabled="isSaving">
                        {{ isSaving ? 'Saving...' : 'Save Category' }}
                    </button>
                </div>
            </form>
        </div>
    </div>

  </div>
</template>

<script>
export default {
    name: 'ManageCategories',
    data() {
        return {
            categories: [],
            isLoading: true,
            isModalOpen: false,
            isSaving: false,
            editingCategory: null,
            imageFile: null,
            imagePreview: null,
            formData: { name: '', description: '', image_url: '' }
        }
    },
    async mounted() {
        await this.fetchCategories();
    },
    methods: {
        async fetchCategories() {
            this.isLoading = true;
            try {
                const response = await fetch('/api/categories');
                this.categories = await response.json();
            } catch (error) {
                console.error('Failed to fetch categories', error);
            } finally {
                this.isLoading = false;
            }
        },
        openModal(category = null) {
            this.isModalOpen = true;
            this.imageFile = null;
            this.imagePreview = null;
            if (category) {
                this.editingCategory = category;
                this.formData = { ...category };
            } else {
                this.editingCategory = null;
                this.formData = { name: '', description: '', image_url: '' };
            }
        },
        closeModal() {
            this.isModalOpen = false;
            this.editingCategory = null;
            this.imageFile = null;
            this.imagePreview = null;
            this.formData = { name: '', description: '', image_url: '' };
        },
        handleImageUpload(event) {
            const file = event.target.files[0];
            if (file) {
                this.imageFile = file;
                this.imagePreview = URL.createObjectURL(file);
            } else {
                this.imageFile = null;
                this.imagePreview = null;
            }
        },
        async saveCategory() {
            if (!this.formData.name) return;

            this.isSaving = true;
            try {
                let imageUrl = this.formData.image_url;
                
                if (this.imageFile) {
                    const uploadData = new FormData();
                    uploadData.append('image', this.imageFile);
                    
                    const uploadRes = await fetch('/api/upload', {
                        method: 'POST',
                        body: uploadData
                    });
                    
                    if (!uploadRes.ok) throw new Error('Failed to upload image');
                    const uploadJson = await uploadRes.json();
                    imageUrl = uploadJson.url;
                }

                const method = this.editingCategory ? 'PUT' : 'POST';
                const url = this.editingCategory 
                    ? `/api/categories/${this.editingCategory.id}` 
                    : '/api/categories';
                    
                const payload = {
                    ...this.formData,
                    image_url: imageUrl
                };

                const response = await fetch(url, {
                    method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) throw new Error('Failed to save category');
                
                await this.fetchCategories();
                this.closeModal();
            } catch (error) {
                console.error(error);
                alert('An error occurred');
            } finally {
                this.isSaving = false;
            }
        },
        async confirmDelete(category) {
            if (confirm(`Delete category "${category.name}"? Note: Ensure no products are using this category first.`)) {
                try {
                    const response = await fetch(`/api/categories/${category.id}`, { method: 'DELETE' });
                    if (!response.ok) throw new Error('Failed to delete');
                    await this.fetchCategories();
                } catch (error) {
                    console.error(error);
                    alert('Error deleting category');
                }
            }
        }
    }
}
</script>
