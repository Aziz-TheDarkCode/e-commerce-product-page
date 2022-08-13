let productDefaultImageIndex = '0';
let productQuantity = 1;
let lightboxIsOpen = false;
let activeImage = document.querySelector('#active-product-img');
let addToCartTrigger = document.querySelector('.add-to-cart');
let productPrice = document.querySelector('#product-price');
let productName = document.querySelector('#product-name');
let cartOnEmptyState= `<p class="text-center text-xs hiddn p-3 cart-on-empty">Your card is empty</p>`;
let cartMarkup =cartOnEmptyState;
let cartSingleRow = `<article class="flex items-center justify-between p-3">
        <img class="w-16 h-16 rounded-xl" src="../images/image-product-1-thumbnail.jpg" alt="selected-product-thumbail" >
        <!-- Selected product information -->
        <div class="text-gray-300 grow p-2">
            <p class="text-sm">${productName.textContent}</p>
            <p class="inline">${productPrice.textContent} * ${productQuantity} =</p>
            <span class="text-black font-bold">${parseInt(productPrice.textContent) * productQuantity}</span>
        </div>
        <img onclick="{this.parentElement.remove()}" class='delete-product-from-card' src="../images/icon-delete.svg" alt="delete-icon" srcset="">
    </article>`;

const cart = document.querySelector('.cart-content');
// Open/Close lightbox,menu
(function (){
        document.querySelectorAll('.triggers').forEach(trigger => {
            trigger.addEventListener('click', function(){
                let displayStyle = this.classList.contains('close-trigger') ? 'none' : 'block'
                document.querySelector(`.${this.dataset.trigger_target}`).style.display = displayStyle
            // lightbox pagination implementation
               lightboxIsOpen = this.dataset.trigger_target==='productModal' && displayStyle =='block' ?  true : false
               activeImage = lightboxIsOpen === true ? document.querySelector('#lightbox-img') : document.querySelector('#active-product-img');
               activeImage.src=`../images/image-product-${productDefaultImageIndex}.jpg`
            })
        });
}());
// function that implements decrement or increment of the quantity
(function (){
    document.querySelector('.quantity').value = productQuantity
    document.querySelectorAll('.operators').forEach(operator=>{
        operator.addEventListener('click',function(){
            this.textContent === '-' && productQuantity > 1 ? productQuantity-- : productQuantity++
            document.querySelector('.quantity').value = productQuantity
        })
    })
}());

// functions that implement the display of selected thumbnail as a large image
(function (){
   const thumbnails = document.querySelectorAll('.thumbnails')

   activeImage.src=`../images/image-product-${productDefaultImageIndex}.jpg`

   thumbnails.forEach(thumbnail=>{
        //load thumbnails
        thumbnail.firstElementChild.src=`../images/image-product-${thumbnail.dataset.image_index}.jpg`
        thumbnail.addEventListener('click',function (){
            // toggle active class for selected thumbnail
            thumbnails.forEach(thumbnail=>{thumbnail.classList.remove('active')})
            this.classList.add('active')
            productDefaultImageIndex = this.dataset.image_index
            // Display selected thumbnail as a large image
            activeImage.src=`../images/image-product-${productDefaultImageIndex}.jpg`
        })
    })
}());
// functions that implement mini the carousel
(function (){
    document.querySelectorAll('.arrows').forEach(arrow=>{
        arrow.addEventListener('click',function(){
            if (this.dataset.arrow_value  === 'previous' && productDefaultImageIndex>0)
            {
                productDefaultImageIndex--
            }
            else if (this.dataset.arrow_value== 'next' && productDefaultImageIndex<3)
            {
                productDefaultImageIndex++
            }
                activeImage.src=`../images/image-product-${productDefaultImageIndex}.jpg`
            })
    })
}())
// add to cart implementation
addToCartTrigger.addEventListener('click',function(){
        document.querySelector('.cart-content').insertAdjacentHTML('beforeend',`
        <article class="flex items-center justify-between p-3 text-gray-400">
                <img class="w-16 h-16 rounded-xl" src="../images/image-product-1-thumbnail.jpg" alt="selected-product-thumbail" >
                <!-- Selected product information -->
                <div class="grow p-2">
                    <p class="text-sm">${productName.textContent}</p>
                    <p class="inline">${productPrice.textContent} * ${productQuantity} =</p>
                    <span class="text-black font-bold">${parseInt(productPrice.textContent) * productQuantity}</span>
                </div>
                <svg onclick="{this.parentElement.remove()}" class='delete-product-from-card hover:text-[#ff7d1a]' width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill="currentColor" fill-rule="nonzero" xlink:href="#a"/></svg>
                </article>`)
});
document.querySelector('.cart-content').insertAdjacentHTML('beforeend',`${cartMarkup}`) ;

