from django.shortcuts import render,redirect,get_object_or_404
from django.http import JsonResponse, HttpResponse
from django.contrib.auth.decorators import login_required
import json
import datetime
from .models import * 

from .utils import cookieCart, cartData, guestOrder
from django.db.models import Q


def store(request):
	data = cartData(request)

	cartItems = data['cartItems']
	order = data['order']
	items = data['items']
	products = Product.objects.all()

	context = {'products':products, 'cartItems':cartItems, 'order':order, 'items':items}
	return render(request, 'store.html', context)

"""def cart(request):
	data = cartData(request)

	cartItems = data['cartItems']
	order = data['order']
	items = data['items']
	
	
	products = Product.objects.all()
	

	context = {'products':products,'items' : items, 'order' : order, 'cartItems' : cartItems}
	return render(request, 'store/cart.html', context)

def checkout(request):
	data = cartData(request)
	
	cartItems = data['cartItems']
	order = data['order']
	items = data['items']
	
	
	categories_for_menu = Category.objects.filter(parent=None)[:6]
	
	products = Product.objects.all()
	

	context = {'products':products,'items' : items, 'order' : order, 'cartItems' : cartItems}"""
	return render(request, 'store/checkout.html', context)

def updateItem(request):
	data = json.loads(request.body)
	productId = data['productId']
	action = data['action']
	quantity = data['quantity']
	print('Action:', action)
	print('Product:', productId)
	print('Quantity:',quantity)

	customer = request.user.customer
	product = Product.objects.get(id=productId)
	order, created = Order.objects.get_or_create(customer=customer, complete=False)

	orderItem, created = OrderItem.objects.get_or_create(order=order, product=product)

	if action == 'add':
		orderItem.quantity = (orderItem.quantity + quantity)

	if action == 'remove':
		orderItem.quantity = (orderItem.quantity - quantity)

	orderItem.save()
	
	if action=='delete':
		orderItem.quantity=0

	if orderItem.quantity <= 0:
		orderItem.delete()

	
	return JsonResponse('Item was added', safe=False)

def processOrder(request):
	transaction_id = datetime.datetime.now().timestamp()
	data = json.loads(request.body)
	name = data['form']['name']
	email = data['form']['email']
	phone = data['form']['number']
	phoneAdd = data['form']['numberAdd']
	address = data['form']['address']
	time = data['form']['time']
	date = data['form']['date']
	payment = data['form']['payment']
	comment = data['form']['comment']
	id_order = int(data['form']['id'])



	if request.user.is_authenticated:
		customer = request.user.customer
		order = Order.objects.get(id=id_order)
		order.transaction_id = transaction_id 
		order.complete=True
		order.save()
		
		OrderInfo.objects.create(customer=customer,order=order,name=name,email=email,phone=phone,phoneAdd=phoneAdd,address=address,time=time,date=date,payment=payment,comment=comment)


	else:
		print("Not logged in ")
	
	return JsonResponse('Payment submitted..', safe=False)
"""def Search(request):
	data = cartData(request)

	cartItems = data['cartItems']
	order = data['order']
	items = data['items']
	


	if request.method == "POST":
		query_name = request.POST.get('search', None)
		
		if query_name:
			results = Product.objects.filter(name__contains=query_name)
			return render(request, 'store/search.html', {'items' : items, 'order' : order, 'cartItems' : cartItems,"results":results,"query_name":query_name,'categories_for_menu':categories_for_menu,'wishedProducts':wishedProducts,'wishedProductsList':wishedProductsList,'count':count})


	return render(request, 'store/search.html', {'items' : items, 'order' : order, 'cartItems' : cartItems})
	
def ViewComments(request):
	data = cartData(request)

	cartItems = data['cartItems']
	order = data['order']
	items = data['items']
	
	comments = Comment.objects.filter(approved=True)
	

	return render(request, 'store/search.html', {'items' : items, 'order' : order, 'cartItems' : cartItems,'comments':comments})

def SaveComment(request):
	if request.method == "POST":
		comment = request.POST.get('comment', None)
		
		if Comment:
			comment.objects.create(comment=comment)

	return JsonResponse('Comment Saved..', safe=False)"""