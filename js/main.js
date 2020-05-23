'use strict';

//Каталог товаров

class ProductsList {
    constructor (product, container = '.products') {
        this.container = container;
        this.productsList = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 20},
            {id: 3, title: 'Keyboard', price: 200},
            {id: 4, title: 'Gamepad', price: 50},
            {},
        ];
        this.showProducts = [];
        this.iteration = 0;
        this.total = 0;
        this.render();
        this.totalFunction();
    }
    render() {
        const divContainer = document.querySelector(this.container);
        for (let product in this.productsList) {
            let productObj;
            if (++this.iteration % 4 == 0) {
                productObj = new ProductItem4(this.productsList[product]);
            } else {
                productObj = new ProductItem(this.productsList[product]);
            }
            this.showProducts.push(productObj);
            divContainer.insertAdjacentHTML('beforeend',productObj.render());
        }
    }

    //Счетчик итоговый цены всех товаров в каталоге
    totalFunction () {

        for (let product in this.productsList) {
            let productObj = this.productsList[product];
            if (productObj.price != undefined) {
                this.total += productObj.price;
            } else {
                this.total += 0;
            }
        }
        return this.total;
    }
}

class ProductItem {
    constructor (product, img = 'https://placehold.it/150x100') {
        this.id = product.id;
        this.img = img;
        this.title = product.title;
        this.price= product.price;
        this.textForRender = `<div class="product_item">
                                <img class="product_img" src="${this.img}" alt="Изображение товара">
                                <h3 class="product_title">${this.title}</h3>
                                <p class="product_price">Цена: ${this.price}</p>
                                <button class="buy_btn">Купить</button>
                              </div>`
    }

    //Далее идут сеттеры и геттеры для установки значений по умолчанию

    get title() {
        return this._title;
    }

    set title(value) {

        if (value == undefined) {
            this._title = 'Товар отсутствует';
        } else {
            this._title = value;
        }
    }
    get price() {
        return this._price;
    }

    set price(value) {

        if (value == undefined) {
            this._price = 0;
        } else {
            this._price = value;
        }
    }

    render () {
        return this.textForRender;
    }

}

//Потомок ProductItem - частный случай рендеринга 4 блока в строке - перенос на новую стоку

class ProductItem4 extends ProductItem {
    constructor (id, img = 'https://placehold.it/150x100', title = 'Товар отсутствует', price = 0, textForRender) {
        super(id, img, title, price, textForRender);
        this.render()
    }
    render() {
        return `${super.render()}<div class="break"></div>`
    }
}

let list = new ProductsList();

// Корзина. Идентифицирую просто по порядку, хотя лучше по ID

class Cart {
    constructor(product, quantity) {
        this.product = list.productsList[product];
        this.productsNames = [];
        this.productsQuantity = [];

    }
    putToCart () {
        this.productsNames.push(this.product.name);
        this.productsQuantity.push(this.product.price);
    }
    render() {};
}

class CartItem {
    constructor(product) {
        this.product = list.productsList[product]
        this.id = this.product.id;
        this.img = this.product.img;
        this.title = this.product.title;
        this.price= this.product.price;
        this.textForRender = `<div class="cart_item">
                                <img class="cart_item_img" src="${this.img}" alt="Изображение товара">
                                <h3 class="cart_item_title">${this.title}</h3>
                                <p class="cart_item_price">Цена: ${this.price}</p>
                                <button class="buy_btn">Купить</button>
                              </div>`
    }
    render() {
        return this.textForRender;
    }
}

////////////////////

/* Старый код, не реализованный через ООП

const renderPage = list => {

    const productsList = list.map(item => renderProduct(item.id, item.title, item.price));

    //Добавляем невидимые блоки в products, чтобы выровнять последние строчки во флекс контейнере

    let addInvisibleDiv = () => {
        let InvisibleDivText = `<div class="invisibleDiv"></div>`;
        for (let i = productsList.length; i % 4 != 0; i++) {
            productsList.push(InvisibleDivText);
        }
    }
    addInvisibleDiv();

    for (let i = 0; i < productsList.length; i++) {
        document.querySelector('.products').innerHTML += productsList[i];
    }

}*/
