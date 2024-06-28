document.addEventListener("DOMContentLoaded", function () {
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-placeholder").innerHTML = data;
            setupSearch();
        })
        .catch(error => console.error('Error al cargar header.html:', error));

    fetch("footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-placeholder").innerHTML = data;
        })
        .catch(error => console.error('Error al cargar footer.html:', error));

    fetch("background.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("background-placeholder").innerHTML = data;
        })
        .catch(error => console.error('Error al cargar background.html:', error));
});

function setupSearch() {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const searchTerm = searchInput.value.trim().toLowerCase();

        if (searchTerm) {
            isSearching = true;
            try {
                const response = await fetch(endpointUrl);
                if (!response.ok) {
                    throw new Error('Error al obtener los productos');
                }
                const products = await response.json();
                filteredProducts = products.filter(product =>
                    product.name.toLowerCase().includes(searchTerm) ||
                    product.description.toLowerCase().includes(searchTerm)
                );

                currentPage = 1;
                displayProducts(filteredProducts, currentPage);
                setupPagination(filteredProducts);
            } catch (error) {
                console.error('Error al buscar productos:', error);
            }
        } else {
            isSearching = false;
            currentPage = 1;
            displayProducts(allProducts, currentPage);
            setupPagination(allProducts);
        }
    });
}
