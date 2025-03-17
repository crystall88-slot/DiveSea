# catalog/models.py
from django.db import models

class NFT(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    royalty = models.IntegerField()
    size = models.CharField(max_length=50)
    tags = models.CharField(max_length=200, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=6)
    currency = models.CharField(max_length=10, choices=[('ETH', 'Ethereum'), ('BTC', 'Bitcoin')])
    stock = models.IntegerField()
    put_on_sale = models.BooleanField(default=False)
    direct_sale = models.BooleanField(default=False)
    image = models.ImageField(upload_to='nft_images/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
