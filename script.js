const allProducts = document.getElementById("allProducts");
const productDesc = document.getElementById("productDesc");
const id = new URLSearchParams(window.location.search);
const val = id.get("id");

if (allProducts) {
  fetchProducts("https://dummyjson.com/products");
}

function fetchProducts(url) {
  fetch(url)
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      // console.log(data, "DATA");
      displayProducts(data.products);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function displayProducts(arr) {
  // console.log(arr[0].images, "ARR");
  for (let i = 0; i < arr.length; i++) {
    allProducts.innerHTML += `
      
     <a href='../productPage.html?id=${arr[i].id}'>
     
     <div class="max-w-md mx-auto bg-white shadow-md overflow-hidden md:max-w-2xl p-2">
     <h2 class="text-2xl font-semibold text-gray-800 p-4">${arr[i].title}</h2>
     <img src=${
       arr[i].images[0]
     } class="w-full h-60  object-fit" alt="Product Image">
     <div class="p-4">
         <h3 class="text-lg font-semibold text-gray-700">${Math.floor(
           arr[i].price
         )}</h3>
         <h4 class="text-sm text-gray-600">${arr[i].category}</h4>
     </div>
 </div>
     
     </a>`;
  }
}

function fetchSingleProduct(url) {
  fetch(url)
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      console.log(data);
      displayIndividualProduct(data);
    });
}

function displayIndividualProduct(obj) {
  productDesc.innerHTML = `
  
 <div> <img  src=${obj.images[0]} />
 <button class="bg-yellow-400 p-2 mt-2 rounded text-white font-semibold hover:bg-yellow-500" hover:>Add to Cart </button>
  
 <button class="bg-green-400 p-2 mt-2 rounded text-white font-semibold hover:bg-green-500" hover:>Buy Now </button>
 </div>
  <div class="flex flex-col">

  <h1 class="mb-2 text-3xl">${obj.title}</h1>
  <span class="${
    obj.rating < 5
      ? "bg-green-500 text-white w-fit  p-1 rounded "
      : "text-white  p-1 bg-green-600"
  }">
  ⭐ ${obj.rating}
</span>
<div class="flex items-center">
<p class="text-2xl font-semibold" >₹${
    obj.discountPercentage
      ? Math.round(
          obj.price - (obj.price * Math.round(obj.discountPercentage)) / 100
        )
      : obj.price
  }</p>
<p class="${
    obj.discountPercentage ? "line-through mx-2 text-gray-400" : "hidden"
  }" >₹${obj.price}</p>
  <span class="${
    obj.discountPercentage ? " mx-2 text-green-500 font-semibold" : "hidden"
  }">${Math.round(obj.discountPercentage)}% Off</span>

</div>
<div><span class="font-bold mx-2">Description:</span>${obj.description}</div>


  




  </div>
  `;
}

fetchSingleProduct(`https://dummyjson.com/products/${val}`);

// Students data school
