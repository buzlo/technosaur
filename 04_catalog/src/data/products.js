const products = [
  {
    categoryId: 1,
    title: 'Беспроводные наушники Xiaomi Mi True Wireless Earbuds Basic 2 Global',
    price: 1567,
    image: '/img/1-mi-earbuds.webp',
    colors: ['#000', '#FFF', '#939393'],
  },
  {
    categoryId: 1,
    title: 'Портативная акустика SVEN PS-485, 28 Вт',
    price: 4315,
    image: '/img/2-sven-ps-485.webp',
    colors: ['#000', '#8BE000'],
  },
  {
    categoryId: 5,
    title: 'Часы USB электронные настольные с будильником, термометром и гигрометром (VST-888Y) черный',
    price: 799,
    image: '/img/3-vst-888y.webp',
    colors: ['#000', '#FFBE15', '#73B6EA'],
  },
  {
    categoryId: 1,
    title: 'Радиоприемник SVEN SRP-505',
    price: 2299,
    image: '/img/4-sven-srp-505.webp',
    colors: ['#000', '#939393'],
  },
  {
    categoryId: 3,
    title: '55" Телевизор Hyundai H-LED55QBU7500 QLED',
    price: 42990,
    image: '/img/5-hyundai-h-led.webp',
    colors: ['#000'],
  },
  {
    categoryId: 5,
    title: 'WiFi Реле Sonoff Basic R2',
    price: 493,
    image: '/img/6-sonoff-basic-r2.webp',
    colors: ['#FFF', '#73B6EA', '#FF6B00'],
  },
  {
    categoryId: 2,
    title: 'Настольный Светильник "Электроника"',
    price: 8900,
    image: '/img/7-elektronika-lamp.webp',
    colors: ['#939393', '#73B6EA'],
  },
  {
    categoryId: 4,
    title: 'Робот-пылесос Xiaomi Mi Robot Vacuum-Mop 2 Lite RU, белый',
    price: 12390,
    image: '/img/8-mi-robot-vacuum-mop-2.webp',
    colors: ['#FFF', '#000', '#FF6B00'],
  },
  {
    categoryId: 3,
    title: 'Игровая приставка Sony PlayStation 5 825 ГБ SSD',
    price: 58749,
    image: '/img/9-ps-5-835-gb.webp',
    colors: ['#FFF', '#000'],
  },
  {
    categoryId: 2,
    title: 'Кольцевая лампа Ring FILL MJ26 для блогеров, тик-ток (26 см) + Штатив (70 - 210 см)',
    price: 1990,
    image: '/img/10-ring-fill-mj-26.webp',
    colors: ['#000', '#FFBE15', '#8BE000'],
  },
  {
    categoryId: 5,
    title: 'Аппарат для приготовления попкорна',
    price: 1499,
    image: '/img/11-popcorn.webp',
    colors: ['#FF6B00'],
  },
  {
    categoryId: 2,
    title: 'Гирлянда Sh Lights Кисточки LD048C-W-FB, 5.17 м, 48 ламп',
    price: 1137,
    image: '/img/12-sh-lights.webp',
    colors: ['#FFF', '#000', '#FF6B00', '#73B6EA', '#8BE000'],
  },
];

for (let i = 0; i < products.length; i += 1) {
  products[i].id = i + 1;
}

export default products;
