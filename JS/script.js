document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Café Americano', description: 'Carga de café (30 ml) con 130 ml de agua.', price: 3000, image: 'americano.JPEG' },
        { id: 2, name: 'Capuccino', description: 'Doble carga de café 60 ml con 190 ml de leche texturizada.', price: 4200, image: 'capuccino.JPEG' },
        { id: 3, name: 'Cortado', description: 'Carga de café 30 ml con 100 ml de leche texturizada.', price: 3400, image: 'cortado.JPEG' },
        { id: 4, name: 'Expresso', description: 'Carga de café 30 ml.', price: 2800, image: 'expresso.JPEG' },
        { id: 5, name: 'Expresso doble', description: 'Doble carga de café 60 ml.', price: 3500, image: 'doblexpresso.JPEG' },
        { id: 6, name: 'Latte', description: 'Carga de café 30 ml con 220 ml de leche texturizada.', price: 4200, image: 'latte.JPEG' }
    ];

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Elementos del DOM
    const productList = document.getElementById('productList');
    const cartDiv = document.getElementById('cart');
    const viewCartBtn = document.getElementById('viewCart');
    const closeCartBtn = document.getElementById('closeCart');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartItemsDiv = document.getElementById('cartItems');

    // Renderizar productos
    products.forEach(({ id, name, description, price, image }) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'col-lg-4 col-md-6 mb-4';
        productDiv.innerHTML = `
            <div class="card">
                <img src="../MEDIA/${image}" class="card-img-top" alt="Imagen del producto">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <p class="card-text">${description}</p>
                    <p class="card-price font-weight-bold">$${price}</p>
                    <button data-id="${id}" class="btn btn-primary addToCart">Agregar al carrito</button>
                </div>
            </div>
        `;
        productList.appendChild(productDiv);
    });

    // Manejo de eventos 
    document.querySelectorAll('.addToCart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            addToCart(productId);
        });
    });

    // agregar al carrito y guardar en localStorage
    function addToCart(productId) {
        const product = products.find(({ id }) => id === productId);
        if (product) {
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();
        }
    }

    // eliminar del carrito y actualizar localStorage
    function removeFromCart(productId) {
        const updatedCart = cart.filter(product => product.id !== productId);
        cart = [...updatedCart];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }

    // Actualizar vista del carrito
    function updateCart() {
        cartItemsDiv.innerHTML = '';
        cart.forEach(product => {
            if (product && product.id && product.name && product.price) {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <span>${product.name}</span>
                    <span>$${product.price}</span>
                    <button data-id="${product.id}">&times;</button>
                `;
                cartItem.querySelector('button').addEventListener('click', (e) => {
                    const productId = parseInt(e.target.dataset.id);
                    removeFromCart(productId);
                });
                cartItemsDiv.appendChild(cartItem);
            }
        });
    }

    // Mostrar/ocultar carrito
    viewCartBtn.addEventListener('click', () => {
        document.body.classList.add('cart-open');
    });

    closeCartBtn.addEventListener('click', () => {
        document.body.classList.remove('cart-open');
    });

    cartOverlay.addEventListener('click', () => {
        document.body.classList.remove('cart-open');
    });

    // Iniciar carrito al cargar la página
    updateCart();
});
