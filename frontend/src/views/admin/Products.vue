<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div>
        <h2 class="text-xl font-bold text-gray-800">Manage Products</h2>
        <p class="text-sm text-gray-500 mt-1">Add, edit, or remove floral arrangements</p>
      </div>
      <div>
          <button @click="openModal(null)" class="px-6 py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2">
            <span>+</span> Add New Product
          </button>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="product in products" :key="product.id" class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
            <div class="relative h-48">
                <img :src="product.image_url" :alt="product.name" class="w-full h-full object-cover" />
                <span v-if="product.is_featured" class="absolute top-3 left-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded shadow-sm">Featured</span>
            </div>
            
            <div class="p-5 flex-1 flex flex-col">
                <span class="text-xs text-emerald-600 font-semibold uppercase tracking-wider mb-1">{{ product.category_name }}</span>
                <h3 class="font-bold text-gray-800 mb-1 leading-tight">{{ product.name }}</h3>
                <p class="text-emerald-600 font-semibold mb-4">{{ formatPrice(product.price) }}</p>
                
                <div class="mt-auto grid grid-cols-2 gap-2 pt-4 border-t border-gray-100">
                    <button @click="openModal(product)" class="py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded bg-gray-100 hover:bg-gray-200 transition-colors">Edit</button>
                    <button @click="confirmDelete(product)" class="py-2 text-sm font-medium text-red-600 bg-red-50 rounded hover:bg-red-100 transition-colors">Delete</button>
                </div>
            </div>
        </div>
    </div>
    
    <div v-if="products.length === 0 && !isLoading" class="bg-white p-12 text-center rounded-xl border border-gray-100 shadow-sm">
        <p class="text-gray-500 mb-4">You don't have any products yet.</p>
        <button @click="openModal(null)" class="text-emerald-600 font-medium hover:underline">Add your first arrangement</button>
    </div>

    <div v-if="isModalOpen" class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]">
            <div class="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 class="font-bold text-xl text-gray-800">{{ editingProduct ? 'Edit Product' : 'Add New Product' }}</h3>
                <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            
            <div class="p-6 overflow-y-auto">
                <form @submit.prevent="saveProduct" class="space-y-5">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                        <input type="text" v-model="formData.name" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" placeholder="e.g. Classic Red Roses" />
                    </div>
                    
                    <div class="grid grid-cols-2 gap-5">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Price (IDR)</label>
                            <input type="number" v-model="formData.price" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" placeholder="500000" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select v-model="formData.category_id" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500">
                                <option value="" disabled>Select a category</option>
                                <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea v-model="formData.description" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" placeholder="Describe the arrangement..."></textarea>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Image</label>
                        <input type="file" @change="handleImageUpload" accept="image/*" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
                        
                        <div v-if="imagePreview || formData.image_url" class="mt-3 p-2 bg-gray-50 rounded-lg border border-gray-200">
                            <p class="text-xs text-gray-500 mb-2">Image Preview:</p>
                            <img :src="imagePreview || formData.image_url" class="h-32 rounded object-cover mx-auto" @error="imageError($event)" />
                        </div>
                    </div>

                    <div class="flex items-center gap-3 pt-2">
                        <input type="checkbox" id="featured" v-model="formData.is_featured" class="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500" />
                        <label for="featured" class="text-sm font-medium text-gray-700">Display as Featured on Homepage</label>
                    </div>
                </form>
            </div>
            
            <div class="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 rounded-b-2xl">
                <button @click="closeModal" class="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors" :disabled="isSaving">Cancel</button>
                <button @click="saveProduct" class="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium transition-colors flex items-center gap-2" :disabled="isSaving">
                    {{ isSaving ? 'Saving...' : 'Save Product' }}
                </button>
            </div>
        </div>
    </div>

  </div>
</template>

<script>
export default {
    name: 'ManageProducts',
    data() {
        return {
            products: [],
            categories: [],
            isLoading: true,
            isModalOpen: false,
            isSaving: false,
            editingProduct: null,
            imageFile: null,
            imagePreview: null,
            formData: this.getEmptyForm()
        }
    },
    async mounted() {
        await Promise.all([this.fetchProducts(), this.fetchCategories()]);
    },
    methods: {
        getEmptyForm() {
            return {
                name: '',
                description: '',
                price: '',
                image_url: '',
                category_id: '',
                is_featured: false
            }
        },
        async fetchProducts() {
            this.isLoading = true;
            try {
                const response = await fetch('/api/products');
                this.products = await response.json();
            } catch (error) {
                console.error('Failed to fetch products', error);
            } finally {
                this.isLoading = false;
            }
        },
        async fetchCategories() {
            try {
                const response = await fetch('/api/categories');
                this.categories = await response.json();
            } catch (error) {
                console.error('Failed to fetch categories', error);
            }
        },
        openModal(product = null) {
            this.isModalOpen = true;
            this.imageFile = null;
            this.imagePreview = null;
            if (product) {
                this.editingProduct = product;
                this.formData = { 
                    ...product,
                    is_featured: Boolean(product.is_featured)
                };
            } else {
                this.editingProduct = null;
                this.formData = this.getEmptyForm();
            }
        },
        closeModal() {
            this.isModalOpen = false;
            this.editingProduct = null;
            this.imageFile = null;
            this.imagePreview = null;
            this.formData = this.getEmptyForm();
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
        async saveProduct() {
            if (!this.formData.name || !this.formData.price || !this.formData.category_id || (!this.formData.image_url && !this.imageFile)) {
                alert('Please fill out all required fields and select an image');
                return;
            }

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

                const method = this.editingProduct ? 'PUT' : 'POST';
                const url = this.editingProduct 
                    ? `/api/products/${this.editingProduct.id}` 
                    : '/api/products';
                    
                const payload = {
                    ...this.formData,
                    image_url: imageUrl,
                    is_featured: this.formData.is_featured ? 1 : 0
                };

                const response = await fetch(url, {
                    method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) throw new Error('Failed to save product');
                
                await this.fetchProducts();
                this.closeModal();
            } catch (error) {
                console.error(error);
                alert('An error occurred while saving the product');
            } finally {
                this.isSaving = false;
            }
        },
        async confirmDelete(product) {
            if (confirm(`Are you sure you want to delete "${product.name}"? This action cannot be undone.`)) {
                try {
                    const response = await fetch(`/api/products/${product.id}`, { method: 'DELETE' });
                    if (!response.ok) throw new Error('Failed to delete');
                    await this.fetchProducts();
                } catch (error) {
                    console.error(error);
                    alert('Error deleting product');
                }
            }
        },
        formatPrice(price) {
            return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
        },
        imageError(e) {
            e.target.src = 'https://via.placeholder.com/400x300?text=Invalid+Image+URL';
        }
    }
}
</script>
