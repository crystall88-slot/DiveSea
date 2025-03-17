from django.db import models

class Product(models.Model):
    title = models.CharField(max_length=200)  
    description = models.TextField()       
    price = models.DecimalField(max_digits=10, decimal_places=2) 
    category = models.CharField(max_length=100)  
    image = models.ImageField(upload_to='products/', null=True, blank=True)  
    tags = models.CharField(max_length=200, blank=True) 
    stock = models.IntegerField(default=1)  
    on_sale = models.BooleanField(default=False)  
    direct_sale = models.BooleanField(default=False)  
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title