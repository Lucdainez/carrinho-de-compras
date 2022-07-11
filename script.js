const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  document.querySelector('.cart__item').remove();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const loadElementsInHtml = async () => {
  const data = await fetchProducts('computador');
  data.results.map((computer) => {
    const { id, title, thumbnail } = computer;
    const create = createProductItemElement({ sku: id, name: title, image: thumbnail });
    const sectionFather = document.querySelector('.items');
    sectionFather.appendChild(create);
    return true;
  });
};

const addProductToCart = async () => {
  const data = await fetchItem('MLB1341706310');
    const { id, title, price } = data;
    const create = createCartItemElement({ sku: id, name: title, salePrice: price });
    const ol = document.querySelector('.cart__items');
    ol.appendChild(create);
};
addProductToCart();
getSkuFromProductItem();

window.onload = () => { loadElementsInHtml(); };
