const allProducts = document.getElementById("allProducts");
const productDesc = document.getElementById("productDesc");
const similarProducts = document.getElementById("similarProducts");
const cart = document.getElementById("cart");
const selectFilter = document.getElementById("selectFilter");
const searchInp = document.getElementById("searchInp");
const cartDetails = document.getElementById("cartDetails");
let cartArr = [];
let productArr = [];
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

      productArr.push(...data.products);
      displayProducts(data.products);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function displayProducts(arr) {
  // console.log(arr[0].images, "ARR");
  allProducts.innerHTML = "";
  console.log(arr);
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
 <button class="bg-yellow-400 p-2 mt-2 rounded text-white font-semibold hover:bg-yellow-500" onclick="AddToCart('${
   obj.thumbnail
 }','${obj.title}',${obj.price},${obj.rating})">Add to Cart </button>
  
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

if (productDesc) {
  fetchSingleProduct(`https://dummyjson.com/products/${val}`);
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

const displayRelatedProducts = (arr) => {
  const filteredArr = arr.filter((elem) => {
    return elem.id !== +val;
  });
  filteredArr.map((elem) => {
    return (similarProducts.innerHTML += `
    <a href='../productPage.html?id=${elem.id}'>
    <div>
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

    </div>
    </a>`);
  });
};

const AddToCart = (prodImg, prodTitle, prodPrice, prodRating) => {
  const prodObj = {
    prodImg: prodImg,
    prodTitle: prodTitle,
    prodPrice: prodPrice,
    prodRating: prodRating,
  };
  if (localStorage.getItem("cart")) {
    const cartData = JSON.parse(localStorage.getItem("cart"));
    cartData.push(prodObj);
    localStorage.setItem("cart", JSON.stringify(cartData));
  } else {
    cartArr.push(prodObj);
    localStorage.setItem("cart", JSON.stringify(cartArr));
  }
  // Create

  // Store
};

const getCart = () => {
  const cartData = JSON.parse(localStorage.getItem("cart"));
  let total = cartData.reduce((acc, curr) => {
    return acc + Math.round(curr.prodPrice * 80);
  }, 0);
  cartData.map((elem, index) => {
    return (cart.innerHTML += `
    <div class="bg-white shadow-lg rounded-lg p-4 max-w-sm mx-auto w-52">
    <h1 class="text-xl font-semibold mb-2">${elem.prodTitle}</h1>
    <img src="${
      elem.prodImg
    }" alt="Product Image" class="w-full h-48 object-cover rounded mb-4" />
    <div class="flex items-center justify-between">
      <p class="text-lg font-bold text-gray-800">₹${Math.round(
        elem.prodPrice * 80
      )}</p>
      <span class="${
        elem.prodRating < 5
          ? "bg-green-500 text-white px-2 py-1 rounded"
          : "bg-green-600 text-white px-2 py-1 rounded"
      }">
        ⭐ ${elem.prodRating}
      </span>
    </div>
  </div>
    `);
  });
  cartDetails.innerHTML = `<div class="bg-white p-4 rounded" >
  <h3 class="font-semibold">Price Details</h3>
  <hr class="mb-2"/>
  <p class="flex justify-between mb-4">Price (${cartData.length} items) <span>${total}</span></p>
  <p  class="flex justify-between w-52 mb-4">Delivery Charges <span>${total < 1000 ? 40 : "Free"}</span></p>
  <hr/>
  <p class="flex justify-between w-52 font-bold">Total <span>${total}</span></p>
  </div>`;
};

if (window.location.pathname.includes("/Cart.html")) {
  getCart();
}

selectFilter?.addEventListener("change", () => {
  filterByCategory(productArr, selectFilter.value);
});

searchInp?.addEventListener("change", (e) => {
  filterBySearch(productArr, e.target.value);
});

const filterByCategory = (arr, category) => {
  const filteredArr = arr.filter((elem) => {
    return elem.category == category;
  });
  displayProducts(filteredArr);
};
const filterBySearch = (arr, searchTxt) => {
  const searchArr = arr.filter((elem) => {
    return elem.title.includes(searchTxt);
  });
  displayProducts(searchArr);
};
