class ProductSelector {
  constructor() {
    this.selectedProduct = 2;
    this.init();
  }

  init() {
    this.bindEvents();
    this.updateTotal();
    this.initializeAccessibility();
  }

  bindEvents() {
    const productBoxes = document.querySelectorAll(".product-box");

    productBoxes.forEach((box) => {
      box.addEventListener("click", (e) => {
        if (e.target.tagName === "SELECT" || e.target.tagName === "OPTION")
          return;

        const productId = parseInt(box.dataset.product);
        this.selectProduct(productId);
      });

      const radioButton = box.querySelector(".radio-button");
      radioButton.addEventListener("click", (e) => {
        e.stopPropagation();
        const productId = parseInt(box.dataset.product);
        this.selectProduct(productId);
      });
    });

    document.addEventListener("change", (e) => {
      if (e.target.classList.contains("custom-select")) {
        this.handleSelectChange(e.target);
      }
    });

    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("add-to-cart")) {
        this.handleAddToCart();
      }
    });
  }

  selectProduct(productId) {
    document.querySelectorAll(".product-box").forEach((box) => {
      box.classList.remove("active");
      box.querySelector(".radio-button").classList.remove("checked");
      box.querySelector(".product-options").classList.remove("show");
    });

    const selectedBox = document.querySelector(`[data-product="${productId}"]`);
    selectedBox.classList.add("active");
    selectedBox.querySelector(".radio-button").classList.add("checked");

    requestAnimationFrame(() => {
      selectedBox.querySelector(".product-options").classList.add("show");
    });

    this.selectedProduct = productId;
    this.updateTotal();
  }

  handleSelectChange(selectElement) {
    selectElement.style.borderColor = "#FF6B9D";
    selectElement.style.boxShadow = "0 0 0 3px rgba(255, 107, 157, 0.1)";

    setTimeout(() => {
      selectElement.style.borderColor = "#D1D5DB";
      selectElement.style.boxShadow = "none";
    }, 300);
  }

  updateTotal() {
    const totalElement = document.querySelector(".total-price");
    const selectedBox = document.querySelector(".product-box.active");
    const price = parseFloat(selectedBox.dataset.price);
    totalElement.textContent = `Total : $${price.toFixed(2)} USD`;
  }

  handleAddToCart() {
    const button = document.querySelector(".add-to-cart");
    button.style.transform = "scale(0.98)";

    setTimeout(() => {
      button.style.transform = "scale(1)";
    }, 150);

    console.log("Product added to cart!", {
      product: this.selectedProduct,
      price: document.querySelector(".product-box.active").dataset.price,
    });
  }

  initializeAccessibility() {
    const productBoxes = document.querySelectorAll(".product-box");
    productBoxes.forEach((box, index) => {
      box.setAttribute("role", "button");
      box.setAttribute("tabindex", "0");
      box.setAttribute("aria-label", `Select product option ${index + 1}`);

      box.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          box.click();
        }
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new ProductSelector();
});
