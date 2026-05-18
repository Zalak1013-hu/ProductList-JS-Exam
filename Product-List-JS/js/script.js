let products = JSON.parse(localStorage.getItem("products")) || [];
let editIndex = null;

displayProducts();


function addProduct() {
  const title = document.getElementById("title").value.trim();
  const price = document.getElementById("price").value.trim();
  const image = document.getElementById("image").value.trim();
  const category = document.getElementById("category").value.trim();

 
  if (title === "" || price === "") {
    alert("Please enter product title and price");
    return;
  }

  const product = {
    id: Date.now(),
    title,
    price: Number(price),
    image,
    category
  };


  if (editIndex !== null) {
    products[editIndex] = product;
    editIndex = null;
  } else {
    products.push(product);
  }

  saveToLocalStorage();
  displayProducts();
  clearInputs();
}


function displayProducts(filteredProducts = products) {

  const productList = document.getElementById("productList");

  productList.innerHTML = "";

  if (filteredProducts.length === 0) {
    productList.innerHTML = `
      <h3 class="text-center text-danger">No Products Found</h3>
    `;
    return;
  }

  filteredProducts.forEach((product, index) => {

    productList.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card product-card h-100">

          <img src="${product.image || 'https://via.placeholder.com/300'}" class="card-img-top">

          <div class="card-body">

            <h5 class="card-title">${product.title}</h5>

            <p class="card-text">
              <strong>Price:</strong> ₹${product.price}
            </p>

            <p class="card-text">
              <strong>Category:</strong> ${product.category}
            </p>

            <button class="btn btn-warning me-2"
              onclick="editProduct(${index})">
              Edit
            </button>

            <button class="btn btn-danger"
              onclick="deleteProduct(${index})">
              Delete
            </button>

          </div>
        </div>
      </div>
    `;
  });
}

function saveToLocalStorage() {
  localStorage.setItem("products", JSON.stringify(products));
}

function deleteProduct(index) {

  if (confirm("Are you sure you want to delete this product?")) {

    products.splice(index, 1);

    saveToLocalStorage();

    displayProducts();
  }
}

function editProduct(index) {

  const product = products[index];

  document.getElementById("title").value = product.title;
  document.getElementById("price").value = product.price;
  document.getElementById("image").value = product.image;
  document.getElementById("category").value = product.category;

  editIndex = index;

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function clearInputs() {
  document.getElementById("title").value = "";
  document.getElementById("price").value = "";
  document.getElementById("image").value = "";
  document.getElementById("category").value = "";
}

document.getElementById("searchInput").addEventListener("input", function () {

  const value = this.value.toLowerCase();
  const filtered = products.filter(product =>
    product.title.toLowerCase().includes(value)
  );

  displayProducts(filtered);
});

document.getElementById("filterCategory").addEventListener("input", function () {

  const value = this.value.toLowerCase();

  const filtered = products.filter(product =>
    product.category.toLowerCase().includes(value)
  );

  displayProducts(filtered);
});

document.getElementById("sortPrice").addEventListener("change", function () {

  let sortedProducts = [...products];

  if (this.value === "lowToHigh") {
    sortedProducts.sort((a, b) => a.price - b.price);
  }

  if (this.value === "highToLow") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  displayProducts(sortedProducts);
});
