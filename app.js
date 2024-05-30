// // // Promises
// // let num = 0;
// // const p1 = new Promise(function (res, rej) {
// //   for (let i = 0; i <= 10; i++) {
// //     if (i % 2 == 0) {
// //       num++;
// //       res("This number is even.");
// //     } else {
// //       rej("this number is odd!");
// //     }
// //   }
// // });

// // // p1 => then , catch | resolve ? then : catch

// // // Using the promise
// // p1.then(function (res) {
// //   //Resolve
// //   console.log(res);
// // }).catch(function (err) {
// //   //Reject
// //   console.log(err);
// // });

// // // console.log("HELLO");

// // // Task -> number, even, resolve, reject;

// // Boiled milk time -> 10min
// // Bread slice -> 5min

// // Case 1 -> wait karo till milk boils then preare bread -> 10 + 5 -> 15min (synchronous)
// // Case 2 -> prepare both at same time  -> 10min (Efficient) (Asynchronous)

// // Handle karne ke , do tareeke hote hai -> Promises ✔ , Aync Await

// // Promises
// // case -> friends met up and decided to visit tomorrow at stadium for IPL match.
// // They said if we get any work to do , 'I will not come'
// // const isAllComing = true;

// // // Promise constructed
// // const friendsProm = new Promise(function (res, rej) {
// //   if (isAllComing == true) {
// //     res("We all are coming.");
// //   } else {
// //     return rej("I am not coming.");
// //   }
// // });

// // // Promise handling
// // friendsProm
// //   .then(function (data) {
// //     console.log(data); //Resolved
// //   })
// //   .catch(function (err) {
// //     console.log(err); //Rejected
// //   });

// // if rain , resolve the promise , else reject

// // const willRain = true;

// // const checkRain = new Promise(function (res, rej) {
// //   if (willRain) {
// //     res("It's Raining!");
// //   } else {
// //     rej("Not Raining!");
// //   }
// // });

// // checkRain
// //   .then(function (data) {
// //     console.log(data);
// //   })
// //   .catch(function (err) {
// //     console.log(err);
// //   });

// // const num = 10;

// // const isEven = new Promise(function (res, rej) {
// //   if (num % 2 == 0) {
// //     res("It is even");
// //   } else {
// //     rej("Its odd");
// //   }
// // });

// // isEven
// //   .then(function (data) {
// //     console.log(data);
// //   })
// //   .catch(function (err) {
// //     console.log(err);
// //   });

// // const fruits = ["Apple", "Orange", "Papaya"];
// // // let resolve = "";

// // function accessArr(val) {
// //   return new Promise(function (res, rej) {
// //     if (val !== undefined && val !== null) {
// //       res(val);
// //     } else {
// //       rej("Value is not present");
// //     }
// //   });
// // }

// // console.log(fruits.length);

// // for (let i = 0; i < fruits.length; i++) {
// //   accessArr(fruits[i])
// //     .then(function (data) {
// //       console.log(data);
// //     })
// //     .catch(function (err) {
// //       console.log(err);
// //     });
// // }

// // Api -> Application programming interface

// // JSON , lightweight data format , easy humans read write , machines get , parse
// let result = "";
// function fetchApi(url) {
//   fetch(url)
//     .then(function (data) {
//       //JSON , directly , parse to original form
//       return data.json(); //original form main convert
//     })
//     .then(function (res) {
//       //json , parse original form main
//       result = res;
//       console.log(res);
//     });
// }

// // fetchApi("https://fakestoreapi.com/products");
// Promise.all([fetchApi("https://fakestoreapi.com/products")])
//   .then(function (data) {
//     console.log(data);
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

// const arr = ["",undefined,"Max","Jennie",null,"Jane"]

// function checkName (val){
//   return new Promise(function(res,rej){
//     if(val !== undefined && val !== null && val !== ""){
//       res(val)
//     }else{
//       rej("Value is not readable!")
//     }
//   })
// }

// for(let i = 0;i < arr.length;i++){
//   checkName(arr[i])
//   .then(function(Data){
//     console.log(Data)
//   })
//   .catch(function(err){
//     console.log(err)
//   })
// }

// Api fetching

// DOM target
const products = document.getElementById("products");
const allProducts = document.getElementById("allProducts");

// To fetch Api in JS , their are two methods , First -> Promise ✔ , Second -> Async Await

fetchProducts("https://dummyjson.com/products");

function fetchProducts(url) {
  fetch(url)
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      console.log(data)
      displayData(data.products);
      displayProducts(data);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function displayData(arr) {
  for (let i = 0; i < 3; i++) {
    products.innerHTML += `
    
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

    
    
    `;
  }
}
function displayProducts(arr) {
  // console.log(arr);
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
