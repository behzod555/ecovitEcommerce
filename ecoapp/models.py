from django.db import models
from django.contrib.auth.models import User
import datetime
from ckeditor.fields import RichTextField

# Create your models here.

class Customer(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE, related_name = 'customer', null=True, blank=True)
	name = models.CharField(max_length=200, null=True, verbose_name="Имя")
	email = models.CharField(max_length=200,null=True,blank=True)
	tel = models.CharField(max_length=200, verbose_name="Номер телефона",null=True,blank=True)
	def __str__(self):
		return self.name

	class Meta:
		verbose_name = 'Клиенты'
		verbose_name_plural = "Клиенты"


class Category(models.Model):
	title = models.CharField(max_length=255, verbose_name="Название Категории")
	slug = models.SlugField(max_length=255, verbose_name="Ссылка")

	class Meta:
		verbose_name_plural = 'Категории'
        
	def __str__(self):
		return self.title
	def get_absolute_url(self):
		return '/%s/' % (self.slug)
class ProductType(models.Model):
	title = models.CharField(max_length=255, verbose_name="Название тип продукта")
	slug = models.SlugField(max_length=255, verbose_name="Ссылка")

	class Meta:
		verbose_name_plural = 'Тип продуктов'
        
	def __str__(self):
		return self.title
	def get_absolute_url(self):
		return '/%s/' % (self.slug)
class Gender(models.Model):
	title = models.CharField(max_length=255, verbose_name="Пол")
	slug = models.SlugField(max_length=255, verbose_name="Ссылка")

	class Meta:
		verbose_name_plural = 'Пол'
        
	def __str__(self):
		return self.title
	def get_absolute_url(self):
		return '/%s/' % (self.slug)

class Product(models.Model):
	category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, verbose_name="Категория")
	typeP = models.ForeignKey(ProductType, on_delete=models.SET_NULL, null=True, blank=True, verbose_name="Тип продукта")
	gender = models.ForeignKey(Gender, on_delete=models.SET_NULL, null=True, blank=True, verbose_name="Для кого")
	name = models.CharField(max_length=200, verbose_name="Название продукта")
	price = models.IntegerField(verbose_name="Цена")
	"""description = RichTextField(blank=True, verbose_name="Описание:")"""
	description = models.CharField(max_length=1000,blank=True, verbose_name="Описание:")
	image = models.ImageField(null=True, blank=True, verbose_name="Изображение")
	
	def __str__(self):
		return self.name

	class Meta:
		verbose_name = 'Продукты'
		verbose_name_plural = "Продукты"


	@property
	def imageURL(self):
		try:
			url = self.image.url
		except:
			url = ''
		return url




class Order(models.Model):
	customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True, blank=True, verbose_name="Клиент")
	name = models.CharField(max_length=200, verbose_name="Имя Фамилия:")
	phone = models.CharField(max_length=200, verbose_name="Номер телефона:",null=True,blank=True)
	address = models.CharField(max_length=200, verbose_name="Адрес:",null=True,blank=True)
	city = models.CharField(max_length=200, verbose_name="Город:",null=True,blank=True)
	postal = models.CharField(max_length=20, verbose_name="Почтовый индекс:",null=True,blank=True)
	date_ordered = models.DateTimeField(auto_now_add=True, verbose_name="Дата", null=True, blank=True)
	complete = models.BooleanField(default=False, verbose_name="Заказанно", null=True, blank=True)
	paid = models.BooleanField(default=False, verbose_name="Оплачено", null=True, blank=True)
	delivered = models.BooleanField(default=False, verbose_name="Доставлено", null=True, blank=True)
	
	

	def __str__(self):
		return str(self.id)
	class Meta:
		verbose_name = 'Заказы'
		verbose_name_plural = "Заказы"	
	@property
	def shipping(self):
		shipping = False
		orderitems = self.orderitem_set.all()
		for i in orderitems:
			if i.product.digital == False:
				shipping = True
		return shipping

	@property
	def get_cart_total(self):
		orderitems = self.orderitem_set.all()
		total = sum([item.get_total for item in orderitems])
		return total 

	@property
	def get_cart_items(self):
		orderitems = self.orderitem_set.all()
		total = sum([item.quantity for item in orderitems])
		return total
	
	@property
	def get_vid_items(self):
		orderitems = self.orderitem_set.all()
		total = sum([1 for item in orderitems])
		return total

	@property
	def order_id(self):
		return self.id
	

"""class OrderInfo(models.Model):
	order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True,verbose_name="ID заказа")
	customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True, blank=True, verbose_name="Клиент")
	name = models.CharField(max_length=200, verbose_name="Имя Фамилия:")
	phone = models.CharField(max_length=200, verbose_name="Номер телефона:",null=True,blank=True)
	address = models.CharField(max_length=200, verbose_name="Адрес:",null=True,blank=True)
	city = models.CharField(max_length=200, verbose_name="Город:",null=True,blank=True)
	time = models.CharField(max_length=200, verbose_name="Время:",null=True,blank=True)
	postal = models.CharField(max_length=20, verbose_name="Почтовый индекс:",null=True,blank=True)
	
	def __str__(self):
		return str(self.order)


	class Meta:
		verbose_name = 'Информации о заказе'
		verbose_name_plural = "Информации о заказе"""


	
class OrderItem(models.Model):
	product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, verbose_name="Название товара")
	order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True,verbose_name="ID заказа")
	quantity = models.IntegerField(default=0, null=True, blank=True, verbose_name="Количество")
	date_added = models.DateTimeField(auto_now_add=True, verbose_name="Дата")

	class Meta:
		verbose_name = 'Заказанные товары'
		verbose_name_plural = "Заказанные товары"

	@property
	def get_total(self):
		total = self.product.price * self.quantity
		return total

class Comment(models.Model):
	name = models.CharField(max_length=100, verbose_name="Имя клиента: ")
	comment = models.CharField(max_length=2500, verbose_name="Отзыв")
	date_added = models.DateTimeField(auto_now_add=True, verbose_name="Дата")
	male = models.BooleanField(default=False, verbose_name="Мужчина")
	female = models.BooleanField(default=False, verbose_name="Женщина")
	approved = models.BooleanField(default=False, verbose_name="Подтвердить")
	def __str__(self):
		return str(self.name)

	class Meta:
		verbose_name = 'Коментарии'
		verbose_name_plural = "Коментарии"
