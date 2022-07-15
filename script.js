const olElement = document.querySelector('.cart__items');

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

const totalPriceToCart = () => {
  let value = 0;
  olElement.childNodes.forEach((element) => {
    const strLi = element.innerText;
    const strValue = Number(strLi.split('$')[1]);
    value += strValue;
  });
  const total = Math.round((value + Number.EPSILON) * 100) / 100;
  const pTotalCartValue = document.querySelector('.total-price');
  pTotalCartValue.innerText = total;
};

const cartItemClickListener = (event) => {
  olElement.removeChild(event.target);
  saveCartItems(olElement.innerHTML);
  totalPriceToCart();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const addLi = (add) => {
  olElement.appendChild(add);
};

const addOneProductToCart = () => {
  const sectionButton = document.querySelectorAll('.item__add');
  sectionButton.forEach((element) => {
    element.addEventListener('click', async (event) => {
      const span = getSkuFromProductItem(event.target.parentNode);
      const requisition = await fetchItem(span);
      const { id, title, price } = requisition;
      const li = createCartItemElement({ sku: id, name: title, salePrice: price });
      addLi(li);
      saveCartItems(olElement.innerHTML);
      totalPriceToCart();
    });
  });
};

const removeAllLiForCart = () => {
  const buttonRemove = document.querySelector('.empty-cart');
  buttonRemove.addEventListener('click', () => {
    olElement.innerHTML = '';
    saveCartItems(olElement.innerHTML);
    totalPriceToCart();
  });
};
removeAllLiForCart();

const loadElementsInHtml = async () => {
  const data = await fetchProducts('computador');
  data.results.map((computer) => {
    const { id, title, thumbnail } = computer;
    const create = createProductItemElement({ sku: id, name: title, image: thumbnail });
    const sectionFather = document.querySelector('.items');
    sectionFather.appendChild(create);
    return true;
  });
  addOneProductToCart();
};

const returnStorage = () => {
  const storage = getSavedCartItems();
  olElement.innerHTML = storage;
};

const getAllEvents = () => {
  const liRemove = document.querySelectorAll('.cart__item');
  liRemove.forEach((element) => {
    element.addEventListener('click', cartItemClickListener);
  });
};

const clickInClassCartTitle = () => {
  const sectionClassCart = document.querySelector('.cart');
  if (sectionClassCart.style.display !== 'flex') {
    return sectionClassCart.style.display = 'flex';
  } else if (sectionClassCart.style.display !== 'none') {
    return sectionClassCart.style.display = 'none';
  }
};

const eventToClassCartTitle = () => {
  const meuCarrinho = document.querySelector('.cart__title');
  console.log(meuCarrinho);
  meuCarrinho.addEventListener('click', clickInClassCartTitle);
};

const restart = () => {
  const sectionClassItem = document.querySelector('.items');
  sectionClassItem.style.display = 'none';
  const createSpan = document.createElement('h1');
  createSpan.innerText = 'carregando...';
  createSpan.classList = 'loading';
  const body = document.querySelector('body');
  body.appendChild(createSpan);
  setTimeout(async () => {
    sectionClassItem.style.display = 'flex';
    await loadElementsInHtml();
    body.removeChild(createSpan);
    returnStorage();
    getAllEvents();
    totalPriceToCart();
    eventToClassCartTitle();
  });
};

window.onload = () => { restart(); };
