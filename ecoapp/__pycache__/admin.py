from django.contrib import admin

from .models import *

class ProductAdmin(admin.ModelAdmin):
	list_display = ('name','price')
	list_filter = ['name']
	search_fields = ['name']
class CustomerAdmin(admin.ModelAdmin):
	list_display = ['name','email']
	search_fields = ['name']
class OrderItemAdmin(admin.ModelAdmin):
	list_display = ['order','product','quantity']
	search_fields = ['order']

class OrderAdmin(admin.ModelAdmin):
	list_display = ['id', 'customer','complete']
	list_filter = ['complete']
	search_fields = ['order']
class CommentAdmin(admin.ModelAdmin):
	list_display = ['product','comment','approved']
	list_filter = ['approved']
	search_fields = ['comment']

admin.site.register(Category)
admin.site.register(Customer, CustomerAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem, OrderItemAdmin)
admin.site.register(OrderInfo)
admin.site.register(Comment)