const allProducts = document.getElementById("allProducts");
const productDesc = document.getElementById("productDesc");
const similarProducts = document.getElementById("similarProducts");
const id = new URLSearchParams(window.location.search);
const val = id.get("id");
let productCategory = "";

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
  fetchProductsByCategory(
    `https://dummyjson.com/products/category/${obj.category}`
  );
  productDesc.innerHTML = `
  
 <div> <img  src=${obj.thumbnail} />
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
<span class="bg-green-100 w-fit text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">${
    obj.category
  }</span>

<div><span class="font-bold mx-2">Description:</span>${obj.description}</div>


  




  </div>
  `;
}

const fetchProductsByCategory = (url) => {
  fetch(url)
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      displayRelatedProducts(data.products);
    })
    .catch((err) => {
      console.log(err);
    });
};

fetchSingleProduct(`https://dummyjson.com/products/${val}`);

const displayRelatedProducts = (arr) => {
  const filteredArr = arr.filter((elem) => {
    return elem.id !== +val;
  });
  filteredArr.map((elem) => {
    return (similarProducts.innerHTML += `<div>
    <img class="w-52 h-52 object-cover" src='${elem?.thumbnail}'/>
    <h3>${elem.title}</h3>
    <span class="${
      elem.rating < 5
        ? "bg-green-500 text-white w-fit text-sm  p-1 rounded "
        : "text-white  p-1 bg-green-600"
    }">
    ⭐ ${elem.rating}
  </span>
  <p class="text-2xl font-semibold" >₹${
    elem.discountPercentage
      ? Math.round(
          elem.price - (elem.price * Math.round(elem.discountPercentage)) / 100
        )
      : elem.price
  }</p>
<p class="${
      elem.discountPercentage ? "line-through mx-2 text-gray-400" : "hidden"
    }" >₹${elem.price}</p>
  <span class="${
    elem.discountPercentage ? " mx-2 text-green-500 font-semibold" : "hidden"
  }">${Math.round(elem.discountPercentage)}% Off</span>

    </div>`);
  });
};

// Students data school
