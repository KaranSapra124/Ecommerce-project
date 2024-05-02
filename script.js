const allProducts = document.getElementById("allProducts");
fetchProducts("https://fakestoreapi.com/products");

function fetchProducts(url) {
  fetch(url)
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      displayProducts(data);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function displayProducts(arr) {
  console.log(arr);
  for (let i = 0; i < arr.length; i++) {
    allProducts.innerHTML += `
      
      <div class="max-w-md mx-auto bg-white shadow-md overflow-hidden md:max-w-2xl p-2">
      <h2 class="text-2xl font-semibold text-gray-800 p-4">${arr[i].title}</h2>
      <img src=${
        arr[i].image
      } class="w-full h-60  object-fit" alt="Product Image">
      <div class="p-4">
          <h3 class="text-lg font-semibold text-gray-700">${Math.floor(
            arr[i].price
          )}</h3>
          <h4 class="text-sm text-gray-600">${arr[i].category}</h4>
      </div>
  </div>`;
  }
}
