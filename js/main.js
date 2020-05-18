'use strict';

const products = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 20},
    {id: 3, title: 'Keyboard', price: 200},
    {id: 4, title: 'Gamepad', price: 50},
    {},
];

const renderProduct = (id, title = 'Товар отсутствует', price = 0) => {

    //Каждый 4 блок товара содержит блок разрыва для симметрии flex-контейнера
    if (id % 4 != 0) {
        return `<div class="product_item">
                <img class="product_img" src="#" alt="Изображение товара">
                <h3 class="product_title">${title}</h3>
                <p class="product_price">Цена: ${price}</p>
                <button class="buy_btn">Купить</button>
                </div>`
    } else {
        return `<div class="product_item">
                <img class="product_img" src="#" alt="Изображение товара">
                <h3 class="product_title">${title}</h3>
                <p class="product_price">Цена: ${price}</p>
                <button class="buy_btn">Купить</button>
                </div>
                <div class="break"></div>`
    }
};

const renderPage = list => {

    //Считаем блоки с идентификаторами
    let idCounter = 0;
    list.forEach((listObj) => {
        if (listObj.id) {
            idCounter++;
        } else return;
    });

    // Блокам без идентификаторов присваиваем их
    list.forEach((listObj) => {
        if (!listObj.id) {
            listObj.id = ++idCounter;
        } else return;
    })

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

};

renderPage(products);