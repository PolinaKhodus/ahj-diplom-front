# Дипломное задание к курсу «Продвинутый JavaScript в браузере». 
## Chaos Organizer
[![Node.js CI](https://github.com/PolinaKhodus/ahj-diplom-front/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/PolinaKhodus/ahj-diplom-front/actions/workflows/node.js.yml)
https://polinakhodus.github.io/ahj-diplom-front/

### Основной функционал
  - [x] Сохранение в истории ссылок и текстовых сообщений;   

    - Поле ввода сообщение не должно быть пустым;
    -  Отправка сообщения по нажатию "Enter";
    - Отправка сообщений по нажатию на кнопку
    <img src="./scrins/1 send_message.jpg" style="zoom:50%;" />

  - [x] Ссылки (то, что начинается с http:// или https://) должны быть кликабельны и отображаться как ссылки; 
   <img src="./scrins/14 Link.jpg" style="zoom:50%;" />

  - [x] Сохранение в истории изображений, видео и аудио, других файлов;

    - Через кнопку 
    <img src="./scrins/3 Load_file.jpg" style="zoom:50%;" />
    - Через перенос файлов с компьютера
   <img src="./scrins/2 DragDrop.jpg" style="zoom:50%;" />

  - [x] Скачивание файлов (на компьютер пользователя);

     - Скачивание происходит при нажатии на кнопку
     <img src="./scrins/4 Save_file.jpg" style="zoom:70%;" />	

       - скачивание происходит в системную папку ***Загрузки / Downloads***;

  - [x] Ленивая подгрузка.
***
### Дополнительный функционал
   - [x] Синхронизация при открытии в нескольких окнах / вкладках.
   - [x] Запись видео и аудио (используя API браузера).
     - Запись аудио/видео начинается при нажатии на кнопки 
      <img src="./scrins/5 Audio_video.jpg" style="zoom:50%;" /> 
     - Запись отменяется в окне записи файла при нажатии на кнопку 
     <img src="./scrins/7 Media_cancel.jpg" style="zoom:50%;" />
     - Файл сохраняется в истории при нажатии на кнопку 
   <img src="./scrins/6 Media_apply.jpg" style="zoom:50%;" />
   - [x] Отправка геолокации.
     - Отправка геолокации возможна при "зелёной" кнопке 
   <img src="./scrins/9 Geolocation.jpg" style="zoom:50%;" />
     - Отправка геолокации осуществляется при нажатии на кнопку
      <img src="./scrins/8 Geo.jpg" style="zoom:50%;" />
   - [x] Воспроизведение видео/аудио (используя API браузера);
   - [x] Закрепление (pin) сообщений;
      - сообщение закрепляется при нажатии на иконку на сообщении 
      <img src="./scrins/10 Pinned.jpg" style="zoom:50%;" />
      - сообщение открепляется при нажатии на кнопку на прикрепленном сообщении 
   <img src="./scrins/13 Pinned 2.jpg" style="zoom:50%;" />
   - [x] Добавление сообщения в избранное;
      - сообщение попадает в избранное при нажатии на иконку 
     <img src="./scrins/11 Favor.jpg" style="zoom:70%;" />
      - иконка меняет цвет;
      - посмотреть избранное можно при нажатии на 
   <img src="./scrins/12 Favor.jpg" style="zoom:70%;" />
   
