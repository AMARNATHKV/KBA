const items = {
    "Laptop": { price: 180512, name: "Laptop" },
    "Mobile Phone": { price: 20999, name: "Mobile Phone" },
    "Tablet": { price: 16999, name: "Tablet" },
    "Headphones": { price: 1499, name: "Headphones" },
    "Television": { price: 15240, name: "Television" },
    "Smart Watch": { price: 2500, name: "Smart Watch" }
};

const cart = new Map();

function addToCart() {
    const itemSelect = document.getElementById('itemSelect');
    const quantity = document.getElementById('quantity');
    
    const selectedItem = itemSelect.value;
    const qty = parseInt(quantity.value);

    if (qty > 0) {
        if (cart.has(selectedItem)) {
            cart.get(selectedItem).qty += qty;
        } else {
            cart.set(selectedItem, { qty, price: items[selectedItem].price, name: items[selectedItem].name });
        }
        updateCart();
    } else {
        alert('Please enter a valid Quantity.');
    }
}

function updateCart() {
    const cart_items = document.getElementById('cart_items');
    cart_items.innerHTML = '';

    let total = 0;

    cart.forEach((item, key) => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;

        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.qty}</td>
            <td>&#8377;${item.price.toFixed(2)}</td>
            <td>&#8377;${itemTotal.toFixed(2)}</td>
            <td><button onclick="removeFromCart('${key}')" class="remove">Remove</button></td>
        `;

        cart_items.appendChild(row);
    });

    document.getElementById('total').innerText = total.toFixed(2);
}

function removeFromCart(itemKey) {
    cart.delete(itemKey);
    updateCart();
}
