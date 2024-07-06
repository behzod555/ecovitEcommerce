from django.shortcuts import render,redirect,get_object_or_404
from django.http import JsonResponse, HttpResponse
from django.contrib.auth.decorators import login_required
import json
import datetime
from .models import * 

from .utils import cookieCart, cartData, guestOrder
from django.db.models import Q
from django.template.response import TemplateResponse
from django.http import QueryDict

def store(request):
	data = cartData(request)

	cartItems = data['cartItems']
	order = data['order']
	items = data['items']
	products = Product.objects.all()
	print(products)
	comments = Comment.objects.filter(approved=True)
	context = {'products':products, 'cartItems':cartItems, 'order':order, 'items':items,'comments':comments}
	return render(request, 'index.html', context)
def Products(request):
	data = cartData(request)

	cartItems = data['cartItems']
	order = data['order']
	items = data['items']
	products = Product.objects.all()
	gender = Gender.objects.all()
	categories = Category.objects.all()
	product_types = ProductType.objects.all()

		
	context = {'gender':gender,'categories':categories,'product_types':product_types,'products':products, 'cartItems':cartItems, 'order':order, 'items':items}
	
	
	return render(request, 'product.html', context)



def Comments(request):
	data = cartData(request)

	cartItems = data['cartItems']
	order = data['order']
	items = data['items']
	comments = Comment.objects.filter(approved=True)
	if request.method == "POST":
		name = request.POST.get('name', None)
		comment = request.POST.get('comment', None)
		gender = request.POST.get('radio')
		print(gender)
		
		if Comment:
			if(gender=='male'):
					Comment.objects.create(name=name,comment=comment,male=True)
			else:
				Comment.objects.create(name=name,comment=comment,female=True)
		return redirect('comments')

	context = {'comments':comments, 'cartItems':cartItems, 'order':order, 'items':items}
	return render(request, 'viewers.html', context)
def Contact(request):
	data = cartData(request)

	cartItems = data['cartItems']
	order = data['order']
	items = data['items']
	
	context = {'cartItems':cartItems, 'order':order, 'items':items}
	return render(request, 'contacts.html', context)
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
	order, created = Order.objects.get_or_create(complete=False)

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
	data = json.loads(request.body)
	name = data['form']['name']
	phone = data['form']['phone']
	address = data['form']['address']
	city = data['form']['city']
	postal = data['form']['postal']
	

	print(name)

	
	"""customer = request.user.customer
	order = Order.objects.get(id=id_order)
	order.complete=True
	order.save()
		
	OrderInfo.objects.create(customer=customer,order=order,name=name,phone=phone,phoneAdd=phoneAdd,address=address,time=time,date=date,payment=payment,comment=comment)"""

	if request.user.is_authenticated:
		customer = request.user.customer
		order, created = Order.objects.get_or_create(customer=customer, complete=False)
	else:
		customer, order = guestOrder(request, data)

			
	order.name = name
	order.phone = phone 
	order.address=address
	order.city=city
	order.postal=postal
	total = int(data['form']['total'])

	if total == order.get_cart_total:
		order.complete = True
	order.save()


	
	return JsonResponse('Payment submitted..', safe=False)

def Search(request):
	data = cartData(request)

	cartItems = data['cartItems']
	order = data['order']
	items = data['items']
	products = Product.objects.all()
	gender = Gender.objects.all()
	categories = Category.objects.all()
	product_types = ProductType.objects.all()


	if request.method == "POST":
		query_name = request.POST.get('search', None)
		
		

	context = {'cartItems':cartItems, 'order':order, 'items':items,'query_name':query_name,'products':products,'gender':gender,'categories':categories,'product_types':product_types}
	return render(request, 'search.html', context)