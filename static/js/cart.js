var updateBtns = document.getElementsByClassName('update-cart')
var updateBtnsCart = document.getElementsByClassName('update-cart-cart')
var changeQ = document.getElementsByClassName('increase')
var changeQP = document.getElementsByClassName('increase-popup')
var wishlist = document.getElementsByClassName('addWishlist')
var updateBtnsPopUp = document.getElementsByClassName('update-cart-popup')
var productT = document.getElementsByClassName("table__btn")
var productV = document.getElementsByClassName("vid-product")
var gender = document.getElementsByClassName("gender")
var f1 = document.getElementsByClassName('table__filter-btn--active')
var time = document.getElementsByClassName('time')
for (i = 0; i < time.length; i++) {
	var str = time[i].textContent
	var time_str = str.split(' ');
	var time_str = time_str.splice(0, 3);
	var tt = time_str.toString()
	time[i].textContent = tt.replaceAll(',', ' ');
}
for (i = 0; i < gender.length; i++) {
	gender[i].addEventListener('click', function () {

		var oldId = 0;
		var elements = document.getElementsByClassName('gender');
		for (i = 0; i < elements.length; i++) {
			if (elements[i].classList.contains('table__filter-btn--active')) {

				oldId = Number(elements[i].getAttribute('data-product'))

			} else {

			}
		}
		var elements = document.getElementsByClassName('gender table__filter-btn--active');
		while (elements.length > 0) {
			elements[0].classList.remove('table__filter-btn--active');
		}
		var genderId = this.dataset.product

		if (genderId != oldId) {
			var elem = document.querySelector('.gender[data-product="' + genderId + '"]')
			elem.classList.add("table__filter-btn--active")

		}



	})
}
for (i = 0; i < productV.length; i++) {
	productV[i].addEventListener('click', function () {

		var oldId = 0;
		var elements = document.getElementsByClassName('vid-product');
		for (i = 0; i < elements.length; i++) {
			if (elements[i].classList.contains('table__filter-btn--active-1')) {

				oldId = Number(elements[i].getAttribute('data-product'))

			} else {

			}
		}
		var elements = document.getElementsByClassName('vid-product table__filter-btn--active-1');
		while (elements.length > 0) {
			elements[0].classList.remove('table__filter-btn--active-1');
		}
		var productVId = this.dataset.product

		if (productVId != oldId) {
			var elem = document.querySelector('.vid-product[data-product="' + productVId + '"]')
			elem.classList.add("table__filter-btn--active-1")

		}
	})
}
for (i = 0; i < productT.length; i++) {
	productT[i].addEventListener('click', function () {

		var oldId = 0;
		var elements = document.getElementsByClassName('table__btn');
		for (i = 0; i < elements.length; i++) {
			if (elements[i].classList.contains('table__btn--active')) {

				oldId = Number(elements[i].getAttribute('data-product'))
				elements[i].classList.remove('table__btn--active');
			}
		}


		var productTId = this.dataset.product


		if (productTId != oldId) {
			var elem = document.querySelector('.table__btn[data-product="' + productTId + '"]')
			elem.classList.add("table__btn--active")

		}


	})
}
if (document.getElementById('span')) {
	var cart_quantity = document.getElementById('span').textContent;
	var div = document.getElementById('cart-div')
	if (Number(cart_quantity) == 0) {
		div.classList.add("hidden")
	}
}

function CloseAll() {
	var products = document.getElementsByClassName('popup');
	for (var i = 0; i < products.length; i++) {
		if (products[i].classList.contains("popup-active")) {
			products[i].classList.remove('popup-active')
			products[i].classList.add('hidden')
			console.log("hidden")
		}
	}

}

function Filter() {
	var products = document.getElementsByClassName('card');
	for (var i = 0; i < products.length; i++) {
		products[i].classList.remove("hidden")
	}
	var search = document.getElementById("search1").value;
	var elements = document.getElementsByClassName("card__title");
	for (var i = 0, len = elements.length; i < len; i++) {
		let text = (elements[i].textContent).toLowerCase();
		if (text.includes(search.toLowerCase())) {

		} else {
			var productId = Number(elements[i].getAttribute('data-product'));
			var div = document.querySelector('.card[data-product="' + productId + '"]')

			div.classList.add("hidden")

		}
	}

}

function Filter2() {
	var products = document.getElementsByClassName('card');
	for (var i = 0; i < products.length; i++) {
		products[i].classList.remove("hidden")
	}
	var search = document.getElementById("search1").value;
	var elements = document.getElementsByClassName("card__title");
	for (var i = 0, len = elements.length; i < len; i++) {
		let text = (elements[i].textContent).toLowerCase();
		if (text.includes(search.toLowerCase())) {

		} else {
			var productId = Number(elements[i].getAttribute('data-product'));
			var div = document.querySelector('.card[data-product="' + productId + '"]')

			div.classList.add("hidden")

		}
	}

	var gender = document.querySelector('.table__filter-btn--active')

	var productV = document.querySelector('.table__filter-btn--active-1')
	var productT = document.querySelector('.table__btn--active')



	if (gender) {
		var genderId = gender.dataset.product
	} else {
		genderId = 0
	}
	if (productT) {
		var productTId = productT.dataset.product
	} else {
		productTId = 0
	}
	if (productV) {
		var productVId = productV.dataset.product
	} else {
		productVId = 0
	}


	if (productTId != 0) {
		var elements = document.getElementsByClassName("typeP");
		for (var i = 0, len = elements.length; i < len; i++) {
			var checkId = Number(elements[i].getAttribute('data-product'));
			var confirmId = Number(productTId);
			if (checkId != confirmId) {
				var productId = Number(elements[i].getAttribute('data-action'));
				var div = document.querySelector('.card[data-product="' + productId + '"]')

				div.classList.add("hidden")
			}
		}
	}
	if (productVId != 0) {
		var elements = document.getElementsByClassName("category");
		for (var i = 0, len = elements.length; i < len; i++) {
			var checkId = Number(elements[i].getAttribute('data-product'));
			var confirmId = Number(productVId);
			if (checkId != confirmId) {
				var productId = Number(elements[i].getAttribute('data-action'));

				var div = document.querySelector('.card[data-product="' + productId + '"]')

				div.classList.add("hidden")
			}
		}
	}
	if (genderId != 0) {
		var elements = document.getElementsByClassName("gender");
		for (var i = 0, len = elements.length; i < len; i++) {
			var checkId = Number(elements[i].getAttribute('data-product'));
			var confirmId = Number(genderId);
			if (checkId != confirmId) {
				var productId = Number(elements[i].getAttribute('data-action'));

				var div = document.querySelector('.card[data-product="' + productId + '"]')
				if (div !== null) {

					div.classList.add("hidden")
				}
			}
		}
	}
}
/*function Filter2(){
	var gender = document.querySelector('.table__filter-btn--active')
	console.log(gender)
	var productV = document.querySelector('.table__filter-btn--active-1')
	var productT = document.querySelector('.table__btn--active')
	
	
	
	
	if (gender){
		var genderId=gender.dataset.product
	}else{
		genderId=0
	}
	if (productT){
		var productTId = productT.dataset.product 
	}else{
		productTId=0
	}
	if (productV){
		var productVId = productV.dataset.product
	}else{
		productVId=0
	}
	var url = '/products/'

		fetch(url, {
			method:'POST',
			headers:{
				'Content-Type':'application/json',
				'X-CSRFToken':csrftoken,
			}, 
			body:JSON.stringify({'productTId':productTId, 'productVId':productVId,'genderId':genderId})
		})
		
		.then((data) => {
		    console.log("True")
		})

	
	
	
}*/
const popupBase = document.querySelectorAll('.popup-base');

popupBase.forEach(item => {
	const popupBaseBody = item.querySelector('.popup-base__body');
	popupBaseBody.addEventListener('click', function (e) {
		if (e.target.classList.contains('popup-base__body')) {
			popupBase.forEach(item => {
				item.classList.add('hidden')
				document.querySelector('body').classList.remove('not-scroll')
			})
		} else {
			return false
		}
	})

})

function CloseProductPopUp() {
	const div = document.querySelector('.popup-active')
	div.classList.remove('popup-active')
	div.classList.add('hidden')
	document.querySelector('.body').classList.remove('not-scroll')

}


function CloseCheckout() {
	const div = document.querySelector('.popup-info')
	div.classList.add('hidden')
	document.querySelector('.body').classList.remove('not-scroll')
}

function CloseCommentForm() {
	const div = document.querySelector('.popup-viewers')
	div.classList.add('hidden')
	document.querySelector('.body').classList.remove('not-scroll')
}

function CloseCart() {
	const div = document.querySelector('.popup-cart')
	div.classList.add('hidden')
	document.querySelector('.body').classList.remove('not-scroll')
}

function SubmitComment() {
	const div = document.querySelector('.popup-viewers__successful')
	div.classList.remove('popup-viewers__successful--hidden')
}

function OpenForm() {
	const div = document.querySelector('.popup-viewers')
	div.classList.remove('hidden')
	document.querySelector('.body').classList.add('not-scroll')
}

function OpenCheckout() {
	const div = document.querySelector('.popup-cart')
	div.classList.add('hidden')

	const div1 = document.querySelector('.popup-info')
	div1.classList.remove('hidden')

	document.querySelector('.body').classList.add('not-scroll')
}

function OpenCart() {

	const div = document.querySelector('.popup-cart')
	div.classList.remove('hidden')
	document.querySelector('.body').classList.add('not-scroll')
}

function More(id) {
	const div = document.querySelector('.popup[data-product="' + id + '"]')
	div.classList.remove('hidden');
	div.classList.add('popup-active');
	document.querySelector('.body').classList.add('not-scroll')
}


for (i = 0; i < wishlist.length; i++) {
	wishlist[i].addEventListener('click', function () {
		var productId = this.dataset.product
		var action = this.dataset.action



		if (user == 'AnonymousUser') {
			Console.log('Not Logged in!')
		} else {
			addToWishlist(productId, action)
		}
	})
}

function addCookieItemWish(productId, action) {
	console.log('User is not authenticated')
	var quantity = Number(document.querySelector('p[data-product="' + productId + '"]').textContent)
	if (action == 'add') {
		if (cart[productId] == undefined) {
			cart[productId] = {
				'quantity': quantity
			}

		} else {
			cart[productId]['quantity'] += 1
		}
	}

	if (action == 'remove') {
		cart[productId]['quantity'] -= 1

		if (cart[productId]['quantity'] <= 0) {
			console.log('Item should be deleted')
			delete cart[productId]
		}
	}
	if (action == 'delete') {
		cart[productId]['quantity'] == 0
		delete cart[productId]
	}

	console.log('CART:', cart)
	document.cookie = 'cart=' + JSON.stringify(cart) + ";domain=;path=/"

	location.reload()
}


function addToWishlist(productId, action) {
	console.log('User is authenticated, sending data...')

	var url = '/add_wishlist/'

	fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-CSRFToken': csrftoken,
			},
			body: JSON.stringify({
				'productId': productId,
				'action': action
			})
		})

		.then((data) => {
			location.reload()
		})
}



for (i = 0; i < changeQ.length; i++) {
	changeQ[i].addEventListener('click', function () {
		var productId = this.dataset.product
		var action = this.dataset.action



		if (action == 'plus') {
			Increase(productId, action)

		} else if (action == 'minus') {
			Decrease(productId, action)
		}
	})
}

function Increase(productId, action) {
	var quantity = Number(document.querySelector('p[data-product="' + productId + '"]').textContent);
	var change = document.querySelector('.increase[data-product="' + productId + '"]')
	console.log(quantity)
	var str = document.querySelector('.card__price[data-product="' + productId + '"]').textContent;
	var price_str = str.split(' ');

	var price = Number(price_str[0]) / quantity;
	console.log(price)

	quantity = quantity + 1;



	document.querySelector('p[data-product="' + productId + '"]').textContent = quantity;
	total_price = price * quantity;
	console.log(total_price)
	document.querySelector('.card__price[data-product="' + productId + '"]').textContent = total_price + " р";
	if (quantity > 1) {
		change.classList.add('green')
	}

}


function Decrease(productId, action) {
	var quantity = Number(document.querySelector('p[data-product="' + productId + '"]').textContent);
	var str = document.querySelector('.card__price[data-product="' + productId + '"]').textContent;
	var change = document.querySelector('.increase[data-product="' + productId + '"]')

	var price_str = str.split(' ');
	var price = Number(price_str[0]) / quantity;
	quantity = quantity - 1;

	if (quantity < 1) {
		quantity = 1;
	}

	document.querySelector('p[data-product="' + productId + '"]').textContent = quantity;
	total_price = price * quantity;
	console.log(total_price)
	document.querySelector('.card__price[data-product="' + productId + '"]').textContent = total_price + " р";
	if (quantity > 1) {
		change.classList.add('green')

	} else {
		change.classList.remove('green')

	}

}



for (i = 0; i < changeQP.length; i++) {
	changeQP[i].addEventListener('click', function () {
		var productId = this.dataset.product
		var action = this.dataset.action



		if (action == 'plus') {
			IncreasePopUp(productId, action)

		} else if (action == 'minus') {
			DecreasePopUp(productId, action)
		}
	})
}

function IncreasePopUp(productId, action) {
	var quantity = Number(document.querySelector('h3[data-product="' + productId + '"]').textContent);

	var str = document.querySelector('.popup__price[data-product="' + productId + '"]').textContent;

	var change = document.querySelector('.increase-popup[data-product="' + productId + '"]')
	var price_str = str.split(' ');

	var price = Number(price_str[0]) / quantity;

	quantity = quantity + 1;



	document.querySelector('h3[data-product="' + productId + '"]').textContent = quantity;
	total_price = price * quantity;
	console.log(total_price)
	document.querySelector('.popup__price[data-product="' + productId + '"]').textContent = total_price + " р";
	if (quantity > 1) {
		change.classList.remove('card__changed-btn--max')
		change.classList.add('green')
	}

}


function DecreasePopUp(productId, action) {
	var quantity = Number(document.querySelector('h3[data-product="' + productId + '"]').textContent);
	var str = document.querySelector('.popup__price[data-product="' + productId + '"]').textContent;
	var change = document.querySelector('.increase-popup[data-product="' + productId + '"]')
	var price_str = str.split(' ');
	var price = Number(price_str[0]) / quantity;
	quantity = quantity - 1;
	if (quantity < 1) {
		quantity = 1;
	}


	document.querySelector('h3[data-product="' + productId + '"]').textContent = quantity;
	total_price = price * quantity;
	console.log(total_price)
	document.querySelector('.popup__price[data-product="' + productId + '"]').textContent = total_price + " р";
	if (quantity > 1) {
		change.classList.remove('card__changed-btn--max')
		change.classList.add('green')

	} else {
		change.classList.remove('green')
		change.classList.add('card__changed-btn--max')

	}


}


for (i = 0; i < updateBtns.length; i++) {
	updateBtns[i].addEventListener('click', function () {
		var productId = this.dataset.product
		var action = this.dataset.action
		var quantity = Number(document.querySelector('p[data-product="' + productId + '"]').textContent)
		console.log('productId:', productId, 'Action:', action)
		console.log('USER:', user)

		if (user == 'AnonymousUser') {
			addCookieItem(productId, action, quantity)
		} else {
			updateUserOrder(productId, action, quantity)
		}
	})
}

function updateUserOrder(productId, action, quantity) {
	console.log('User is authenticated, sending data...')

	var url = '/update_item/'

	fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-CSRFToken': csrftoken,
			},
			body: JSON.stringify({
				'productId': productId,
				'action': action,
				'quantity': quantity
			})
		})
		.then((response) => {
			return response.json()
		})
		.then((data) => {
			location.reload()
		})
}

function addCookieItem(productId, action) {
	console.log('User is not authenticated')
	var change = document.querySelector('.update-cart[data-product="' + productId + '"]')
	var quantity = Number(document.querySelector('p[data-product="' + productId + '"]').textContent)
	if (action == 'add') {
		if (cart[productId] == undefined) {
			cart[productId] = {
				'quantity': quantity
			}

		} else {
			cart[productId]['quantity'] += quantity
		}
	}

	if (action == 'remove') {
		cart[productId]['quantity'] -= 1

		if (cart[productId]['quantity'] <= 0) {
			console.log('Item should be deleted')
			delete cart[productId]
		}
	}
	if (action == 'delete') {
		cart[productId]['quantity'] == 0
		delete cart[productId]
	}
	console.log('CART:', cart)
	document.cookie = 'cart=' + JSON.stringify(cart) + ";domain=;path=/"
	localStorage.removeItem('popup')
	const div = document.querySelector('.popup-cart');
	if (div.classList.contains('hidden')) {
		console.log("True")
	} else {
		localStorage.setItem('popup', 'True');
	}

	location.reload()


}
if (localStorage.getItem('popup') == "True") {
	if (document.getElementsByClassName('popup-cart__card').length > 0) {
		const div = document.querySelector('.popup-cart')
		div.classList.remove('hidden')
		document.querySelector('.body').classList.remove('not-scroll')
		localStorage.removeItem('popup')
	}
}
var div = document.getElementsByClassName('quantity')
var change = document.querySelector('a[data-action="remove"]')
for (i = 0; i < div.length; i++) {
	var quantity = Number(div[i].textContent)

	if (quantity > 1) {
		var productId = Number(div[i].getAttribute('data-product'))
		var elem = document.querySelector("[data-action='remove'][data-product='" + productId + "']")
		if (elem !== null) {
			elem.classList.remove('popup-cart__btn--max')
			elem.classList.add('green')
			console.log("True")

		}
	} else {
		var productId = Number(div[i].getAttribute('data-product'))
		var elem = document.querySelector("[data-action='remove'][data-product='" + productId + "']")
		if (elem !== null) {
			elem.classList.remove('green')
			elem.classList.add('popup-cart__btn--max')
		}

	}
}

for (i = 0; i < updateBtnsPopUp.length; i++) {
	updateBtnsPopUp[i].addEventListener('click', function () {
		var productId = this.dataset.product
		var action = this.dataset.action
		var quantity = Number(document.querySelector('h3[data-product="' + productId + '"]').textContent)
		console.log('productId:', productId, 'Action:', action)
		console.log('USER:', user)

		if (user == 'AnonymousUser') {
			addCookieItemPopUp(productId, action, quantity)
		} else {
			updateUserOrderPopUp(productId, action, quantity)
		}
	})
}

function updateUserOrderPopUp(productId, action, quantity) {
	console.log('User is authenticated, sending data...')

	var url = '/update_item/'

	fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-CSRFToken': csrftoken,
			},
			body: JSON.stringify({
				'productId': productId,
				'action': action,
				'quantity': quantity
			})
		})
		.then((response) => {
			return response.json()
		})
		.then((data) => {
			location.reload()
		})
}

function addCookieItemPopUp(productId, action) {
	console.log('User is not authenticated')
	var quantity = Number(document.querySelector('h3[data-product="' + productId + '"]').textContent)
	if (action == 'add') {
		if (cart[productId] == undefined) {
			cart[productId] = {
				'quantity': quantity
			}

		} else {
			cart[productId]['quantity'] += quantity
		}
	}

	if (action == 'remove') {
		cart[productId]['quantity'] -= 1

		if (cart[productId]['quantity'] <= 0) {
			console.log('Item should be deleted')
			delete cart[productId]
		}
	}
	if (action == 'delete') {
		cart[productId]['quantity'] == 0
		delete cart[productId]
	}

	console.log('CART:', cart)
	document.cookie = 'cart=' + JSON.stringify(cart) + ";domain=;path=/"

	location.reload()
}
for (i = 0; i < updateBtnsCart.length; i++) {
	updateBtnsCart[i].addEventListener('click', function () {
		var productId = this.dataset.product
		var action = this.dataset.action
		var quantity = Number(document.querySelector("input[class='child']").value)
		console.log('productId:', productId, 'Action:', action)
		console.log('USER:', user)

		if (user == 'AnonymousUser') {
			addCookieItem1(productId, action, quantity)
		} else {
			updateUserOrder1(productId, action, quantity)
		}
	})
}

function updateUserOrder1(productId, action, quantity) {
	console.log('User is authenticated, sending data...')

	var url = '/update_item/'

	fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-CSRFToken': csrftoken,
			},
			body: JSON.stringify({
				'productId': productId,
				'action': action,
				'quantity': quantity
			})
		})
		.then((response) => {
			return response.json()
		})
		.then((data) => {
			location.reload()
		})
}

function addCookieItem1(productId, action) {
	console.log('User is not authenticated')
	var quantity = Number(document.querySelector('input[data-product="' + productId + '"]').value)
	var quantity1 = Number(document.querySelector("input[class='child']").value)
	if (action == 'add') {
		if (cart[productId] == undefined) {
			cart[productId] = {
				'quantity': quantity1
			}

		} else {
			cart[productId]['quantity'] += quantity1
		}
	}

	if (action == 'remove') {
		cart[productId]['quantity'] -= quantity1

		if (cart[productId]['quantity'] <= 0) {
			console.log('Item should be deleted')
			delete cart[productId]
		}
	}
	if (action == 'delete') {
		cart[productId]['quantity'] == 0
		delete cart[productId]
	}

	console.log('CART:', cart)
	document.cookie = 'cart=' + JSON.stringify(cart) + ";domain=;path=/"

	location.reload()
}