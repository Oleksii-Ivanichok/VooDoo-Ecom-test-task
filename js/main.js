const urlParams = new URLSearchParams(window.location.search);
const limit = 24;
const currentPage = parseInt(urlParams.get('page')) || 1;
let totalPages = 1;


const productContainer = document.getElementById("catalog-container");
const paginationContainer = document.querySelector(".pagination");

fetchProducts(currentPage, limit).then(products => {
  totalPages = Math.ceil(products.length / limit);

  const paginationLinks = generatePaginationLinks(totalPages, currentPage);
  paginationContainer.innerHTML = paginationLinks;

  const productsToRender = products.slice(currentPage * limit - limit, currentPage * limit)

  productsToRender.forEach(product => {
    const productHTML = generateProductHTML(product);
    productContainer.insertAdjacentHTML("beforeend", productHTML);
  });
});


async function fetchProducts(page, limit) {
  const response = await fetch("https://voodoo-sandbox.myshopify.com/products.json?limit=461");
  const data = await response.json();
  return data.products;
}

function generateProductHTML(product) {
  let imageSrc = "img/product-photo.png";

  if (product.images.length > 0) {
    imageSrc = product.images[0].src;
  }

  return `
<div class="catalog__card max-w-[342px] relative" uId="${product.id}">
<div
    class="card__used w-12 h-6 bg-black rounded text-xs text-white flex items-center justify-center absolute top-3 left-3">
    USED</div>
<img src="${imageSrc}" alt="" class="w-full">
<div class="card__description max-w-full py-3 flex justify-between gap-1">
    <div class="card__info max-w-[150px] flex flex-col">
        <h3 class="card__name font-bold truncate break-words">
        ${product.title}    
        <p class="card__price font-bold">${product.variants[0].price} KR.</p>
    </div>
    <div class="card__condition flex flex-col">
        <p class="font-medium self-end">Condition</p>
        <p>Slightly used</p>
    </div>
</div>
<button add-to-cart class="add-to-cart bg-black text-white w-full text-sm font-main rounded font-bold h-10">ADD
    TO CART</button>
</div>
    `;
}


function generatePaginationLinks(totalPages, currentPage) {
  const paginationHTML = [];

  const minPage = Math.max(1, currentPage - 2);
  const maxPage = Math.min(totalPages, currentPage + 2);

  if (minPage > 1) {
    paginationHTML.push(`<a href="?page=${1}" class="pagination__page">1</a>`);
    if (minPage > 2) {
      paginationHTML.push(`<a href="?page=${minPage - 1}" class="pagination__page">...</a>`);
    }
  }

  for (let i = minPage; i <= maxPage; i++) {
    if (i === currentPage) {
      paginationHTML.push(`<a href="?page=${i}" class="pagination__page pagination__page-current">${i}</a>`);
    } else {
      paginationHTML.push(`<a href="?page=${i}" class="pagination__page">${i}</a>`);
    }
  }

  if (maxPage < totalPages) {
    if (maxPage < totalPages - 1) {
      paginationHTML.push(`<a href="?page=${maxPage + 1}" class="pagination__page">...</a>`);
    }
    paginationHTML.push(`<a href="?page=${totalPages}" class="pagination__page">${totalPages}</a>`);
  }

  return paginationHTML.join("");
}