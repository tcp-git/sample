const API_URL = 'https://fakestoreapi.com/products';
const container = document.getElementById('product-list');
const paginationEl = document.getElementById('pagination');

let currentPage = 1;
const limit = 6; // สินค้าต่อหน้า
let productsData = []; // เก็บสินค้า
let totalPages = 1;

// Loader / Skeleton
function showSkeleton(count = limit) {
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const skeleton = document.createElement('div');
        skeleton.className = 'content-item skeleton';
        skeleton.innerHTML = `
            <div class="skeleton-img"></div>
            <div class="skeleton-title long"></div>
            <div class="skeleton-title medium"></div>
            <div class="skeleton-text long"></div>
            <div class="skeleton-text medium"></div>
            <div class="skeleton-text short"></div>
            <div class="skeleton-btn"></div>
        `;
        container.appendChild(skeleton);
    }
}

// Fetch สินค้าทั้งหมด
async function fetchProducts() {
    try {
        showSkeleton();
        const response = await fetch(API_URL);
        productsData = await response.json();
        totalPages = Math.ceil(productsData.length / limit);
        renderProducts();
        renderPagination();
    } catch (error) {
        console.error('Error fetching products:', error);
        container.innerHTML = '<p>เกิดข้อผิดพลาดในการโหลดสินค้า</p>';
    }
}

// Render สินค้าในหน้า
function renderProducts() {
    container.innerHTML = '';
    const start = (currentPage - 1) * limit;
    const end = start + limit;
    const pageProducts = productsData.slice(start, end);

    pageProducts.forEach(product => {
        const item = document.createElement('div');
        item.className = 'content-item';
        item.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h4>${product.title}</h4>
            <p>${product.description}</p>
            <p class="price">ราคา: $${product.price}</p>
            <a href="#" class="content-btn">ดูรายการสินค้า</a>
        `;
        container.appendChild(item);
    });
}

// Render ปุ่ม Pagination
function renderPagination() {
    paginationEl.innerHTML = '';

    // Prev Button
    const prevBtn = document.createElement('button');
    prevBtn.textContent = 'Prev';
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) currentPage--;
        renderProducts();
        renderPagination();
    });
    paginationEl.appendChild(prevBtn);

    // Page Buttons
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.className = i === currentPage ? 'active' : '';
        btn.addEventListener('click', () => {
            currentPage = i;
            renderProducts();
            renderPagination();
        });
        paginationEl.appendChild(btn);
    }

    // Next Button
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) currentPage++;
        renderProducts();
        renderPagination();
    });
    paginationEl.appendChild(nextBtn);
}

// เริ่มทำงาน
window.addEventListener('DOMContentLoaded', fetchProducts);
