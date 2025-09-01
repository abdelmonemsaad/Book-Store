// document.querySelectorAll("img").forEach(img => {

//     if (!img.hasAttribute("loading")) {
//         img.setAttribute("loading", "lazy");
//     }
// });
const bar = document.querySelector(".barIcon");
const links = document.querySelector(".links");
if (bar) {
  bar.addEventListener("click", () => {
    links.classList.toggle("show");
  });
}

//  slider
const slider = document.querySelector(".landing .slider");
const slides = document.querySelectorAll(".landing .slider img");
const leftBtn = document.querySelector(".landing .left");
const rightBtn = document.querySelector(".landing .right");
const dotsContainer = document.querySelector(".landing .dots");

let currentSlide = 0;
const totalSlides = slides.length;
let autoSlide;

function updateSlider() {
  const slideWidth = window.innerWidth;
  if (slider) {
    slider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
  }
  updateDots();
}
if (rightBtn) {
  rightBtn.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
    stopAutoSlide();
  });
}
if (leftBtn) {
  leftBtn.addEventListener("click", () => {
    stopAutoSlide();
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
  });
}
window.addEventListener("resize", updateSlider);

function startAutoSlide() {
  autoSlide = setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
  }, 3000);
}

function stopAutoSlide() {
  clearInterval(autoSlide);
}
startAutoSlide();

function updateDots() {
  dots.forEach((dot) => dot.classList.remove("active"));
  if (dots[currentSlide]) {
    dots[currentSlide].classList.add("active");
  }
}
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  dot.setAttribute("data-slide", i);
  dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll(".landing .dots .dot");
dots.forEach((dot) => {
  if (dot) {
    dot.addEventListener("click", (e) => {
      currentSlide = parseInt(e.target.getAttribute("data-slide"));
      updateSlider();
      stopAutoSlide();
    });
  }
});
///////top
let span = document.querySelector(".up");

window.onscroll = function () {
  this.scrollY >= 100
    ? span.classList.add("show")
    : span.classList.remove("show");
};
if (span) {
  span.onclick = function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
}
//////visits count
window.onload = function () {
  const countSpan = document.querySelector(".footer .count");
  let count = localStorage.getItem("reloadCount") || 0;
  count = Number(count) + 1;
  localStorage.setItem("reloadCount", count);
  countSpan.innerHTML = count;
};

///validation form register
let arr = JSON.parse(window.localStorage.getItem("users")) || [];
if (document.getElementById("createAccount")) {
  document
    .getElementById("createAccount")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      let valid = true;
      const name = document.getElementById("signupUsername").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const password2 = document.getElementById("password2").value;
      const nameError = document.getElementById("name-error");
      const emailError = document.getElementById("email-error");
      const passwordError = document.getElementById("password-error");
      const passwordError2 = document.getElementById("password-error2");
      const successMsg = document.querySelector(".form__message p");
      nameError.textContent = "";
      emailError.textContent = "";
      passwordError.textContent = "";
      passwordError2.textContent = "";
      successMsg.textContent = "";
      const userRegex = /^[a-zA-Z]+$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      //التحقق من ان الاسم موجودولا لا فى الارى
      let vaildNameArray = arr.some((u) => u.name === name);

      if (name === "" || !userRegex.test(name) || vaildNameArray) {
        nameError.textContent = "user name not correct";
        valid = false;
      }
      if (email === "" || !emailRegex.test(email)) {
        emailError.textContent = "email not correct";
        valid = false;
      }
      if (password === "" || password.length < 8) {
        passwordError.textContent = "password must be more than 8";
        valid = false;
      }
      if (password2 === "" || password2 !== password) {
        passwordError2.textContent = "password must equal first";
        valid = false;
      }
      if (valid) {
        successMsg.textContent = "Account created successfully";
        document.querySelector(".form__message").style.display = "block";
        document.getElementById("createAccount").reset();
        let user = {
          name: name,
          pass: password,
        };
        arr.push(user);
        window.localStorage.setItem("users", JSON.stringify(arr));
      }
    });
}
//validation form login
let loginform = document.getElementById("login");
if (loginform) {
  loginform.addEventListener("submit", function (e) {
    e.preventDefault();
    let userNamelogin = document.querySelector("#login .username").value.trim();
    let passlogin = document.querySelector("#login .pass").value.trim();
    let loginerror = document.querySelector(
      "#login .form__input-error-message"
    );
    loginerror.textContent = "";
    let validlogin = true;

    let userFoundOrNot = false;

    for (let i = 0; i < arr.length; i++) {
      if (userNamelogin === arr[i].name && passlogin === arr[i].pass) {
        userFoundOrNot = true;
        break;
      }
    }

    if (userNamelogin === "" || passlogin === "" || userFoundOrNot === false) {
      loginerror.textContent = "user name or password not correct";
      validlogin = false;
    }
    if (validlogin) {
      loginform.reset();
      document.querySelector("header .login").textContent = "logout";
      document.querySelector(
        "header .userNames"
      ).textContent = `Hi, ${userNamelogin}`;
      window.localStorage.setItem("usernow", userNamelogin);
      showAlert("You have successfully logged in.");
    }
  });
}
// اشوف الاسم موجود عشان لما يعمل رفرش يفضل موجود
let nameUserNow = window.localStorage.getItem("usernow");
if (nameUserNow) {
  document.querySelector("header .login").textContent = "logout";
  document.querySelector(
    "header .userNames"
  ).textContent = `Hi, ${nameUserNow}`;
}

let btnlogout = document.querySelector("header .login");
if (btnlogout) {
  btnlogout.addEventListener("click", function () {
    let nameUserNow = window.localStorage.getItem("usernow");
    if (nameUserNow) {
      window.localStorage.removeItem("usernow");
      btnlogout.textContent = "login";
      document.querySelector("header .userNames").textContent = "";
      window.localStorage.setItem(
        "logoutMessage",
        "You have successfully logged out."
      );
      window.location.reload();
    }
  });
}
//alart msg
let alertBox = document.getElementById("alertBox");
let textalart = document.querySelector("#alertBox p");
let btnexitalart = document.querySelector("#alertBox .exit");

function showAlert(message) {
  textalart.textContent = message;
  alertBox.classList.remove("hidden");
}
if (btnexitalart) {
  btnexitalart.addEventListener("click", () => {
    alertBox.classList.add("hidden");
  });
}
// لو فيه رسالة خروج مخزنة، اعرضها
let logoutMsg = window.localStorage.getItem("logoutMessage");
if (logoutMsg) {
  showAlert(logoutMsg);
  window.localStorage.removeItem("logoutMessage");
}

/////books add

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// تحديث عداد السلة في الهيدر
function updateBasketCount() {
  let countbasketElem = document.querySelector("header .basket .count");
  if (countbasketElem) {
    countbasketElem.textContent = cart.length;
  }
}
updateBasketCount();

// صفحة المنتجات (index.html)
let btnsAdd = document.querySelectorAll(".books .add-btn");

btnsAdd.forEach((button) => {
  button.addEventListener("click", function () {
    let parentEle = button.parentElement;

    let book = {
      title: parentEle.querySelector("h3").textContent,
      price: parentEle.querySelector(".price").textContent,
      img: parentEle.querySelector("img").getAttribute("src"),
      quantity: 1,
    };

    // لو الكتاب موجود قبل كده زوّد الكمية
    let existing = cart.find((item) => item.title === book.title);
    if (existing) {
      showAlert("book exist done chocie anathor book");
    } else {
      cart.push(book);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateBasketCount();
  });
});

// صفحة السلة (basket.html)
let container = document.querySelector(".booksAdd");
let totalAmount = document.querySelector(".amount");

function renderCart() {
  if (!container) return;

  container.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    let card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${item.img}" alt="${item.title}">
      <h3>${item.title}</h3>
      <p class="price">${item.price}</p>
      <div class="Supplyandreduce">
        <div class="supply-btn">-</div>
        <p class="numberbooks">${item.quantity}</p>
        <div class="reduce-btn">+</div>
      </div>
      <button class="delete-btn">delete</button>
    `;

    let numberElem = card.querySelector(".numberbooks");
    let plusBtn = card.querySelector(".reduce-btn");
    let minusBtn = card.querySelector(".supply-btn");
    let deleteBtn = card.querySelector(".delete-btn");

    let price = parseFloat(item.price);

    total += price * item.quantity;

    plusBtn.addEventListener("click", () => {
      item.quantity++;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });

    minusBtn.addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity--;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      }
    });

    deleteBtn.addEventListener("click", () => {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
      updateBasketCount();
    });

    container.appendChild(card);
  });

  totalAmount.textContent = total + " EGP";
  updateBasketCount();
}

renderCart();

let buynow = document.getElementsByClassName("buynow")[0];
if (buynow) {
  buynow.onclick = function () {
    showAlert("Buy now successly thank you!");

    container.innerHTML = "";
    window.localStorage.removeItem("cart");
  };
}

let shop = document.getElementsByClassName("shop-btn")[0];
if (shop) {
  shop.onclick = function () {
    window.location.href = "books.html";
  };
}
////////////
// ------------------- بيانات الكتب -------------------
let booksData = [
  {
    id: 1,
    title: "Think Like a Cat",
    price: "235.00 EGP",
    img: "images/book.jpg",
    author: "Pam Johnson-Bennett",
    desc: "A complete guide to understanding your cat's behavior.",
    year: "2019",
    category: "Pets",
  },
  {
    id: 2,
    title: "Perfectly Hidden Depression",
    price: "304.00 EGP",
    img: "images/books.jpg",
    author: "Margaret Robinson",
    desc: "How to recognize and deal with hidden depression.",
    year: "2020",
    category: "Psychology",
  },
  {
    id: 3,
    title: "War on Palestine",
    price: "441.00 EGP",
    img: "images/download-6.jpg",
    author: "Edward Said",
    desc: "An analysis of the conflict in Palestine.",
    year: "2015",
    category: "Politics",
  },
  {
    id: 4,
    title: "Therapy Session",
    price: "344.00 EGP",
    img: "images/front-view-stacked-books-ladders-education-day.jpg",
    author: "Dr. John Smith",
    desc: "Exploring therapeutic approaches to mental health.",
    year: "2018",
    category: "Psychology",
  },
  {
    id: 5,
    title: "Egyptian Scrolls",
    price: "382.00 EGP",
    img: "images/front-view-stacked-books-ladders-education-day.jpg",
    author: "Ahmed Kamal",
    desc: "Ancient texts and their influence on Egyptian culture.",
    year: "2016",
    category: "History",
  },
  {
    id: 6,
    title: "The Lost Library",
    price: "424.00 EGP",
    img: "images/download-6.jpg",
    author: "Laura Stevens",
    desc: "A mystery novel about ancient hidden knowledge.",
    year: "2021",
    category: "Fiction",
  },
  {
    id: 7,
    title: "Book Title 7",
    price: "200.00 EGP",
    img: "images/book.jpg",
    author: "Unknown",
    desc: "Description not available.",
    year: "1999",
    category: "General",
  },
  {
    id: 8,
    title: "Book Title 8",
    price: "300.00 EGP",
    img: "images/book.jpg",
    author: "Unknown",
    desc: "Description not available.",
    year: "2000",
    category: "General",
  },
];

localStorage.setItem("booksData", JSON.stringify(booksData));

// ------------------- صفحة قائمة الكتب -------------------

let bookscards = document.querySelectorAll(".books .container .card");

let bookcontainer = document.querySelector(".book .container");

// اعرض الكروت
bookscards.forEach((card, index) => {
  let buttonview = document.createElement("button");
  buttonview.setAttribute("class", "btn-view");
  buttonview.textContent = "Details";
  card.append(buttonview);
  card.setAttribute("data-id", index + 1);
  if (buttonview) {
    buttonview.addEventListener("click", function (e) {
      e.stopPropagation();
      let cardId = parseInt(card.getAttribute("data-id"));
      let books = JSON.parse(localStorage.getItem("booksData"));
      let book = books.find((b) => b.id === cardId);
      console.log(book);
      if (book) {
        localStorage.setItem("selectedBook", JSON.stringify(book));
        window.location.href = "book.html";
      }
    });
  }
});
let selectedBook = JSON.parse(localStorage.getItem("selectedBook"));
if (selectedBook) {
  bookcontainer.innerHTML = `
    <div class="book-detials">
    <img src="${selectedBook.img}" alt="${selectedBook.title}">
    <h3>${selectedBook.title}</h3>
    <p class="price">${selectedBook.price}</p>
    <p class="author">By: ${selectedBook.author}</p>
    <p class="desc">${selectedBook.desc}</p>
    <p class="year">Year: ${selectedBook.year}</p>
    <p class="category">Category: ${selectedBook.category}</p>
    </div>
  `;
}
