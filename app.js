const endpointUrl = 'http://localhost:8080/api/products';
const productsPerPage = 9;
let currentPage = 1;
let allProducts = [];


async function loadProducts() {
    try {
        const response = await fetch(endpointUrl);
        if (!response.ok) {
            throw new Error('Error al obtener los productos');
        }
        allProducts = await response.json();
        displayProducts(allProducts, currentPage);
        setupPagination(allProducts);
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

function displayProducts(products, page) {
    const productListContainer = document.getElementById('product-list');
    productListContainer.innerHTML = '';
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = page * productsPerPage;
    const productsToShow = products.slice(startIndex, endIndex);

    productsToShow.forEach(product => {
        const card = `
            <div class="col mb-4">
                <div class="card">
                    <img src="http://localhost:8080/api/products/image/${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text">Precio: S/${product.price}</p>
                        <p class="card-text">Cantidad disponible: ${product.quantity}</p>
                    </div>
                </div>
            </div>
        `;
        productListContainer.innerHTML += card;
    });
}

function setupPagination(products) {
    const paginationContainer = document.getElementById('pagination');
    const pageCount = Math.ceil(products.length / productsPerPage);
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= pageCount; i++) {
        const pageItem = document.createElement('li');
        pageItem.classList.add('page-item');
        pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        pageItem.addEventListener('click', () => {
            currentPage = i;
            displayProducts(products, currentPage);
        });
        paginationContainer.appendChild(pageItem);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});
