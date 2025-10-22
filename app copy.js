const API_URL = 'https://fakestoreapi.com/products';
const loader = document.getElementById('loader');
const container = document.getElementById('product-list');

// ฟังก์ชันดึงสินค้า
async function fetchProducts() {
    try {
        loader.style.display = 'block'; // แสดง loader
        container.innerHTML = '';       // ล้าง container

        const response = await fetch(API_URL);
        const products = await response.json();

        renderProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        container.innerHTML = '<p>เกิดข้อผิดพลาดในการโหลดสินค้า</p>';
    } finally {
        loader.style.display = 'none'; // ซ่อน loader หลังโหลดเสร็จ
    }
}

// ฟังก์ชัน render สินค้า
function renderProducts(products) {
    container.innerHTML = ''; // ล้างก่อน render

    products.forEach(product => {
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

// เรียกใช้งานเมื่อโหลดหน้า
window.addEventListener('DOMContentLoaded', fetchProducts);
