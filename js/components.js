'use strict'

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

