'use strict'

Vue.component('login-box', {
    template: `<div class="login_box">
                    <a href="#" @click="showLogin" class="login">Войти</a>
                    <a href="#" @click="showRegister" class="register">Зарегистрироваться</a>
                    <div class="login_form">
                    
</div>
                    <div class="register_form">
                    <form action="register">
                    <label for="register_surname">Фамилия:</label>
                    <input type="text" id="register_surname">
                    <label for="register_name">Имя:</label>
                    <input type="text" id="register_name">
                    <label for="register_password">Пароль:</label>
                    <input type="password" id="register_password">
                    <label for="register_email">E-mail:</label>
                    <input type="text" id="register_email">
                    <submit>Принять</submit>
</form>
</div>
               </div>`,
    methods: {
        showLogin () {

        },
        showRegister () {

        }
    }
})

Vue.component('search',{
    data() {
        userSearchText: '';
    },
    props: ['userSearchText'],
    template: `<div id="search">
                    <input type="text" class="search_input" placeholder="Поиск товара" v-model="userSearchText">
                    <button class="search_btn" :filtered="filtered" @click="filtered.filter(userSearchText)"></button>
                </div>`,
    /*methods: {
        filterIt () {
            let regExp = new RegExp(`[${this.userSearchText}]{1,10}`, 'i');
            console.log(this.imgProd);
            this.filtered = this.filtered.filter(el => regExp.test(el.product_name));
            console.log(regExp);
            console.log($emit.filtered);
        },
    }*/
})

Vue.component('products', {
    props: ["products","img"],
    template:  `<section class="products">
<product v-for="item of products" 
                :key="item.id_product" 
                :img="img"
                :product="item">
             </product>
             </section>`
});

Vue.component('product', {
    props: ['product','img'],
    template: `<div class="product_item">
                                <img class="product_img" :src="img" alt="Изображение товара">
                                <div class="desc">
                    <h3>{{product.product_name}}</h3>
                    <p>{{product.price}}</p>
                    <button class="buy-btn" @click="$parent.$emit('add-product', product)">Купить</button>
                </div>
                              </div>`,
});

// Vue.component('product4', {
//     props: ['img','title','price'],
//     template: `<div class="product_item">
//                                 <img class="product_img" :src="img" alt="Изображение товара">
//                                 <h3 class="product_title">{{product.product_name}}</h3>
//                                 <p class="product_price">Цена: {{product.price}} руб.</p>
//                                 <button class="buy_btn" @click= "putToCart">Купить</button>
//                               </div>
//                                 <div class="break">
//                               </div>`
// });

Vue.component('cart', {
    props: ['cartItems', 'img', 'visibility'],
    template: `
            <figure class="cart-block" v-show="visibility">
                <span class="cart_title">Корзина</span>
                <div class="cart_list">
                    <cart-item v-for="item of cartItems" :key="item.id" :img="img" :cart-item="item"></cart-item>
                </div>
            </figure>
    `
});

Vue.component('cart-item', {
    props: ['cartItem'],
    template: `
    <div class="cart-item">
                    <div class="product-bio">
                        <div class="product-desc">
                            <div class="product-title">{{ cartItem.product_name }}</div>
                            <div class="product-quantity">Quantity: {{ cartItem.quantity }}</div>
                            <div class="product-single-price">$ {{ cartItem.price }} each</div>
                        </div>
                    </div>
                    <div class="right-block">
                        <div class="product-price">{{cartItem.quantity*cartItem.price}}</div>
                        <button class="del-btn" @click="$parent.$emit('remove', cartItem)">&times;</button>
                    </div>
                </div>
    `
})

