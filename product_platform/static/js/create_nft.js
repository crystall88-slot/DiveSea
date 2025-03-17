document.addEventListener('DOMContentLoaded', () => {
  // Получаем элементы по классам
  const uploadBtn = document.querySelector('.create__nft-upload--btn');
  const uploadInput = document.querySelector('.create__nft-form--group-input__upload');
  const uploadBox = document.querySelector('.create__nft-upload--box_js');

  // Отладка: проверяем, найдены ли элементы
  console.log('uploadBtn:', uploadBtn);
  console.log('uploadInput:', uploadInput);
  console.log('uploadBox:', uploadBox);

  if (!uploadBtn || !uploadInput || !uploadBox) {
      console.error('One or more elements not found:', { uploadBtn, uploadInput, uploadBox });
      return; // Прерываем выполнение, если элементы не найдены
  }

  // При клике на кнопку "Upload" открываем input
  uploadBtn.addEventListener('click', () => {
      console.log('Upload button clicked');
      uploadInput.click();
  });

  // Обработка выбора файла
  uploadInput.addEventListener('change', (e) => {
      console.log('File input changed');
      const file = e.target.files[0];
      if (file) {
          console.log('Selected file:', file.name, file.type, file.size);
          const reader = new FileReader();
          reader.onload = (event) => {
              console.log('File loaded, setting preview');
              uploadBox.innerHTML = `<img src="${event.target.result}" alt="NFT Preview" class="create__nft-upload--preview">`;
          };
          reader.readAsDataURL(file);

          // Проверка размера файла (максимум 10Mb)
          if (file.size > 10 * 1024 * 1024) {
              console.warn('File size exceeds 10MB');
              alert('File size exceeds 10MB. Please choose a smaller file.');
              uploadInput.value = ''; // Сбрасываем выбор
              uploadBox.innerHTML = '<img src="{% static "img/upload-icon.png" %}" alt="Upload Icon" class="create__nft-upload--icon"><p>PNG, GIF, WEBP, MP4 or MP3. Max 10Mb.</p>';
          }
      } else {
          console.log('No file selected');
      }
  });
});
