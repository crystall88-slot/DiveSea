# Generated by Django 5.1.7 on 2025-03-17 14:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='NFT',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('royalty', models.IntegerField()),
                ('size', models.CharField(max_length=50)),
                ('tags', models.CharField(blank=True, max_length=200)),
                ('price', models.DecimalField(decimal_places=6, max_digits=10)),
                ('currency', models.CharField(choices=[('ETH', 'Ethereum'), ('BTC', 'Bitcoin')], max_length=10)),
                ('stock', models.IntegerField()),
                ('put_on_sale', models.BooleanField(default=False)),
                ('direct_sale', models.BooleanField(default=False)),
                ('image', models.ImageField(blank=True, null=True, upload_to='nft_images/')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.DeleteModel(
            name='Product',
        ),
    ]
