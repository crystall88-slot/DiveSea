from django.shortcuts import render, redirect
from django.contrib import messages
from .models import NFT
from django.db import transaction
from django.db.utils import DatabaseError
import logging

# Настройка логирования
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

def create_nft(request):
    logger.debug(f"Получен запрос: {request.method}, URL: {request.path}")
    if request.method == 'POST':
        logger.debug(f"POST-запрос: {request.POST}, Файлы: {request.FILES}")
        name = request.POST.get('name')
        description = request.POST.get('description')
        royalty = request.POST.get('royalty')
        tags = request.POST.get('tags', '')
        price = request.POST.get('price')
        currency = request.POST.get('currency')
        stock = request.POST.get('stock')
        put_on_sale = request.POST.get('put_on_sale') == 'on'
        direct_sale = request.POST.get('direct_sale') == 'on'
        image = request.FILES.get('image')

        logger.debug(f"Полученные данные: name={name}, description={description}, royalty={royalty}, price={price}, currency={currency}, stock={stock}, image={image}")

        if not name or len(name) < 3:
            messages.error(request, "Имя должно содержать не менее 3 символов.")
            logger.warning("Ошибка валидации: имя слишком короткое")
            return redirect('create_nft')
        if not description or len(description) < 10:
            messages.error(request, "Описание должно содержать не менее 10 символов.")
            logger.warning("Ошибка валидации: описание слишком короткое")
            return redirect('create_nft')
        try:
            royalty = int(royalty) if royalty else 0
            price = float(price) if price else 0
            stock = int(stock) if stock else 1
            if price <= 0:
                messages.error(request, "Цена должна быть больше 0.")
                logger.warning("Ошибка валидации: цена <= 0")
                return redirect('create_nft')
        except ValueError as e:
            messages.error(request, "Неверный формат числа для роялти, цены или количества.")
            logger.error(f"Ошибка валидации: {e}")
            return redirect('create_nft')

        try:
            with transaction.atomic():
                nft = NFT(
                    name=name,
                    description=description,
                    royalty=royalty,
                    size="N/A",
                    tags=tags,
                    price=price,
                    currency=currency,
                    stock=stock,
                    put_on_sale=put_on_sale,
                    direct_sale=direct_sale,
                    image=image
                )
                nft.save()
                logger.info(f"Сохранен NFT: {nft.name}, ID: {nft.id}, Изображение: {nft.image.url if nft.image else 'Нет изображения'}")
        except DatabaseError as e:
            messages.error(request, f"Ошибка при сохранении NFT: {e}")
            logger.error(f"Ошибка базы данных: {e}")
            return redirect('create_nft')
        except Exception as e:
            messages.error(request, f"Неизвестная ошибка: {e}")
            logger.error(f"Неизвестная ошибка: {e}")
            return redirect('create_nft')

        messages.success(request, "NFT успешно создан!")
        logger.debug("Перенаправление на главную страницу")
        return redirect('index')

    logger.debug("Отображение формы для создания NFT")
    return render(request, 'create_nft.html')

def index(request):
    nfts = NFT.objects.all().order_by('-created_at')
    logger.info(f"Количество NFT в базе данных: {nfts.count()}")
    for nft in nfts:
        logger.debug(f"NFT: {nft.name}, ID: {nft.id}, Image: {nft.image.url if nft.image else 'Нет изображения'}")
    context = {'nfts': nfts}
    return render(request, 'index.html', context)

def connect_wallet(request):
    return render(request, 'connect_wallet.html', {'title': 'Connect Wallet'})
