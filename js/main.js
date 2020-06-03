'use strict';

let app = new Vue ({
    el: '#container',
    data: {
        userSearchText: '',
        filtered: [],
    },
    methods: {
         filterIt: function () {
             const regExp = new RegExp(`[${this.userSearchText}]{1,10}`,'i');
             list.showProducts = [];
             //Фильтр не работает
             /*this.filtered = list.productsList.filter((product) => {
                 regExp.test(product['product_name']);
                 console.log(regExp.test(product['product_name']));
             });*/
             list.productsList.forEach((value => {
                 if (value['product_name'].search(regExp) != -1) {
                     list.showProducts.push(value);
                 }
             }));
             list.renderFiltered();
         }
    }
})

const APIProductsList = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json';
const APICart = '/getBasket';

class ProductsList {
    constructor(product, container = '.products') {
        this.container = container;
        this.productsList = [];
        this.showProducts = [];
        this.iteration = 0;
        this.total = 0;
        this.getProductsList();
        this.divContainer = document.querySelector(this.container);
        this.textForRenderNothing = `<div class="disclaimer">
                                <span>Соответствующих товаров нет</span>
                              </div>`
    }

    getProductsList() {
        fetch(APIProductsList)
            .then((response) => {
                return response.json()
            })
            .then(result => {
                this.productsList = result;
            })
            .then(() => this.render())
            .then(() => this.totalFunction())
    }

    render() {

        for (let product in this.productsList) {
            let productObj;
            if (++this.iteration % 4 == 0) {
                productObj = new ProductItem4(this.productsList[product]);
            } else {
                productObj = new ProductItem(this.productsList[product]);
            }
            this.showProducts.push(productObj);
            this.divContainer.insertAdjacentHTML('beforeend', productObj.render());
        }
        this.iteration = 0;
        this.addInvisibleDiv();
    }

    renderFiltered() {
        while (this.divContainer.firstElementChild) {
            this.divContainer.firstElementChild.remove();
        }
        console.log(this.showProducts.booleanValue);
        if (this.showProducts.length == 0) {
            console.log('AAA');
            this.divContainer.insertAdjacentHTML('afterbegin', this.renderNothingText());
        } else {
            for (let product in this.showProducts) {
                let productObj;
                if (++this.iteration % 4 == 0) {
                    productObj = new ProductItem4(this.showProducts[product]);
                } else {
                    productObj = new ProductItem(this.showProducts[product]);
                }
                this.divContainer.insertAdjacentHTML('beforeend', productObj.render());
            }
            this.iteration = 0;
            this.addInvisibleDiv();
        }
    }

    addInvisibleDiv() {
        const InvisibleDivText = `<div class="invisibleDiv"></div>`;
        for (let i = this.productsList.length; i % 4 != 0; i++) {
            document.querySelector('.products').insertAdjacentHTML('beforeend', InvisibleDivText);
        }
    }

    //Счетчик итоговый цены всех товаров в каталоге
    totalFunction() {

        let total = this.productsList.forEach((item,) => {
            if (item.price != undefined) {
                this.total += item.price;
            }
            return this.total;
        })
        console.log(`Всего товаров на ${this.total} рублей`);
    }
    renderNothingText() {
        return this.textForRenderNothing;
    }

}

class ProductItem {
    constructor(product, img = 'https://placehold.it/150x100') {
        this.id = product['id_product'];
        this.img = img;
        this.title = product['product_name'];
        this.price = product.price;
        this.textForRender = `<div class="product_item">
                                <img class="product_img" src="${this.img}" alt="Изображение товара">
                                <h3 class="product_title">${this.title}</h3>
                                <p class="product_price">Цена: ${this.price}</p>
                                <button class="buy_btn" onclick="cart.putToCart(${this.id})">Купить</button>
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

    render() {
        return this.textForRender;
    }
}

//Потомок ProductItem - частный случай рендеринга 4 блока в строке - перенос на новую стоку

class ProductItem4 extends ProductItem {
    constructor(id, img = 'https://placehold.it/150x100', title = 'Товар отсутствует', price = 0, textForRender) {
        super(id, img, title, price, textForRender);
        this.render()
    }

    render() {
        return `${super.render()}<div class="break"></div>`
    }
}

// Корзина

class Cart extends ProductsList {
    constructor(product) {
        super(product);
        this.productsInCart = {};
        this.hideCart();
    }

    //Следующая функция либо кладет в корзину новый объект, либо увеличивает количество товара.

    putToCart(id) {
        let alreadyInCart = false;
        if (Object.keys(this.productsInCart).length != 0) {
            for (let key in this.productsInCart) {
                let cartObj = this.productsInCart[key];
                if (cartObj['id_product'] == id) {
                    alreadyInCart = true;
                    cartObj.quantity++;
                }
            }
            if (alreadyInCart == false) {
                this.productsList.forEach((value) => {
                    if (value['id_product'] == id) {
                        this.productsInCart[id] = value;
                        this.productsInCart[id].quantity = 1;
                    }
                })
            }
        } else {
            this.productsList.forEach((value) => {
                if (value['id_product'] == id) {
                    this.productsInCart[id] = value;
                    this.productsInCart[id].quantity = 1;
                }
            })
        }
        this.render(this.productsInCart);
    }

    //Виртуальная очистка корзины
    deleteFromCart() {
        this.productsInCart = {};
    }

    //Визуальная очистка корзины

    cleanCartWindow() {
        let forDelete = document.querySelector('.cart_list>table');
        while (forDelete.firstElementChild) {
            forDelete.firstElementChild.remove();
        }
    }

    hideCart() {
        let g = document.querySelector('.cart');
        g.style.display = 'none';
    }

    showCart() {
        let g = document.querySelector('.cart');
        if (g.style.display == 'none') {
            g.style.display = 'block';
        } else {
            g.style.display = 'none';
        }
        this.render(this.productsInCart);
    }

    render() {
        let counter = 0;
        let cartList = document.querySelector('.cart_list>table');

        this.cleanCartWindow();

        if (document.querySelector('.cart').style.display == 'block') {
            if (this.productsInCart != undefined || this.productsInCart != '') {
                for (let key in this.productsInCart) {
                    console.log(this.productsInCart[key]);
                    let cartTextFull = '';
                    let cartindex = this.productsInCart[key];
                    let cartText = `<tr class="cart_temp">
                                        <td class="cart_temp">${++counter}</td>
                                        <td class="cart_temp">${cartindex['product_name']}</td>
                                        <td class="cart_temp">${cartindex.price} руб.</td>
                                        <td class="cart_temp">${cartindex.quantity} шт.</td>
                                    </tr class="cart_temp">`;
                    cartTextFull += cartText;
                    cartList.insertAdjacentHTML('beforeend', cartTextFull);
                }
            } else {
                return;
            }
        }
    };
}

let list = new ProductsList();
let cart = new Cart();

let searchBtn = document.querySelector('.search_btn');
searchBtn.addEventListener('click',search.filterIt);
