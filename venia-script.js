let products = [];
let filteredProducts = [];
// Url for fetching products
const url = "https://fakestoreapi.com/products";

const fetchProducts = async () => {
  let data = [];
  let errorMsg = "";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      errorMsg = response.status;
      throw new Error(`Response status: ${response.status}`);
    }
    data = await response.json();
  } catch (error) {
    errorMsg = error.message;
    console.error(error.message);
  }
  // Error msg if any
  document.querySelector(".error-msg").innerHTML = errorMsg;

  products = [...data];
  filteredProducts = [...products];

  displayProducts(products);
};
// Fetching products data from API
const loadData = (e) => {
  fetchProducts();
};
window.addEventListener("load", loadData);

// Building products markup after fetching data from API
const buildProducts = (data) => {
  return `<div class="products-builder">
    ${data.map((val) => buildProductMarkup(val))}
    </div>`;
};
// Building individual product markup
const buildProductMarkup = (val) => {
  return `<div class="product">
    <div class="product-image"><img src=${val.image}  alt=${val.description}></div>
    <div class="product-title">${val.title}</div>
    <div class="product-price">$${val.price}</div>
    <div class="product-rating"><img src="./images/product-rating-img.png"  alt="Rate the product"></div>
  </div>`;
};
// Displaying products from products data array
displayProducts = (data) => {
  const dataArray = [...data];
  const markupStr = buildProducts(dataArray).split(",").join(" ");
  document.querySelector(".products-container").innerHTML = markupStr;
  document.querySelector(".result-count").innerHTML = dataArray.length;
};

// Filtering products by categories
const filterByOption = () => {
  const dataArr = [...products];
  let optionJewelleryArr = [];
  let optionElectronicsArr = [];
  let optionMensClothingArr = [];
  let optionWomensClothingArr = [];
  // console.log("filterByOption");
  if (document.querySelector("#option-jewellery").checked) {
    optionJewelleryArr = dataArr.filter((val) => val.category === "jewelery");
  } else {
    optionJewelleryArr = [];
  }
  if (document.querySelector("#option-electronics").checked) {
    optionElectronicsArr = dataArr.filter(
      (val) => val.category === "electronics"
    );
  } else {
    optionElectronicsArr = [];
  }
  if (document.querySelector("#option-mensclothing").checked) {
    optionMensClothingArr = dataArr.filter(
      (val) => val.category === "men's clothing"
    );
  } else {
    optionMensClothingArr = [];
  }
  if (document.querySelector("#option-womensclothing").checked) {
    optionWomensClothingArr = dataArr.filter(
      (val) => val.category === "women's clothing"
    );
  } else {
    optionWomensClothingArr = [];
  }
  const filteredArr = [
    ...optionJewelleryArr,
    ...optionElectronicsArr,
    ...optionMensClothingArr,
    ...optionWomensClothingArr,
  ];
  filteredProducts = [...filteredArr];
  sortProducts(document.querySelector("#sort-by-select"));
};

// Sorting products by price
const sortProducts = (sortOption) => {
  let sortedProducts = [...filteredProducts];
  if (sortOption.value === "sort-by-price-low-to-high") {
    sortedProducts.sort((a, b) => {
      let ap = Number(a.price);
      let bp = Number(b.price);
      return ap - bp;
    });
  } else if (sortOption.value === "sort-by-price-high-to-low") {
    sortedProducts.sort((a, b) => {
      let ap = Number(a.price);
      let bp = Number(b.price);
      return bp - ap;
    });
  }
  displayProducts(sortedProducts);
};
