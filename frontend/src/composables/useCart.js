import { reactive, ref, watch } from 'vue'

const saved = localStorage.getItem('secretgarden_cart')
const initialCart = saved ? JSON.parse(saved) : []

const cart = reactive({
    items: initialCart
})

const isCartOpen = ref(false)

watch(() => cart.items, (val) => {
    localStorage.setItem('secretgarden_cart', JSON.stringify(val))
}, { deep: true })

export function useCart() {
    function toggleCart(forceState = null) {
        if (forceState !== null) {
            isCartOpen.value = forceState
        } else {
            isCartOpen.value = !isCartOpen.value
        }
    }
    function addToCart(product, qty = 1) {
        const existing = cart.items.find(item => item.id === product.id)
        if (existing) {
            existing.qty += qty
        } else {
            cart.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image_url: product.image_url,
                category_name: product.category_name || '',
                qty
            })
        }
    }

    function removeFromCart(productId) {
        const idx = cart.items.findIndex(item => item.id === productId)
        if (idx !== -1) cart.items.splice(idx, 1)
    }

    function updateQty(productId, qty) {
        const item = cart.items.find(item => item.id === productId)
        if (item) {
            if (qty <= 0) {
                removeFromCart(productId)
            } else {
                item.qty = qty
            }
        }
    }

    function clearCart() {
        cart.items.splice(0, cart.items.length)
    }

    function cartTotal() {
        return cart.items.reduce((sum, item) => sum + item.price * item.qty, 0)
    }

    function cartCount() {
        return cart.items.reduce((sum, item) => sum + item.qty, 0)
    }

    function formatPrice(price) {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price)
    }

    function generateWhatsAppMessage(invoiceCode = '') {
        if (cart.items.length === 0) return ''

        let msg = `Hi Secret Garden! 🌿\n\nI'd like to order the following:\n\n`

        if (invoiceCode) {
            msg += `*Invoice:* ${invoiceCode}\n`
            msg += `*Track Status:* ${window.location.origin}/track-order\n\n`
        }

        cart.items.forEach((item, i) => {
            msg += `${i + 1}. ${item.name}\n`
            msg += `   Qty: ${item.qty} × ${formatPrice(item.price)} = ${formatPrice(item.price * item.qty)}\n\n`
        })

        msg += `──────────────\n`
        msg += `Total: ${formatPrice(cartTotal())}\n\n`
        msg += `Please let me know about availability and delivery details. Thank you! 🌸`

        return msg
    }

    async function processOrder(customerName, customerPhone) {
        if (cart.items.length === 0) return null;

        try {
            let phone = '6285338001840';
            try {
                const settingsRes = await fetch('/api/settings/whatsapp_number');
                if (settingsRes.ok) {
                    const data = await settingsRes.json();
                    if (data.value) phone = data.value;
                }
            } catch (e) { console.error('Failed to get WA number from settings', e); }

            const orderPayload = {
                customer_name: customerName,
                customer_phone: customerPhone,
                total_amount: cartTotal(),
                order_items: cart.items
            };

            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderPayload)
            });

            if (!response.ok) throw new Error('Failed to save order');

            const data = await response.json();
            const invoiceCode = data.invoice_code;

            const text = encodeURIComponent(generateWhatsAppMessage(invoiceCode));
            const waUrl = `https://wa.me/${phone}?text=${text}`;

            return { success: true, waUrl, invoiceCode };
        } catch (error) {
            console.error('Error processing order:', error);
            return { success: false, error: error.message };
        }
    }

    return {
        cart,
        isCartOpen,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        cartTotal,
        cartCount,
        formatPrice,
        generateWhatsAppMessage,
        processOrder
    }
}
