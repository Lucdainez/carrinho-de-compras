require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Teste se "fetchProducts" é uma função', () => {
    expect(typeof (fetchProducts)).toEqual('function');
  });

  it('Caso a função "fetchProducts" tenha o argumento "computador" verifica se fetch foi chamada', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador" ', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toBeCalledWith("https://api.mercadolibre.com/sites/MLB/search?q=computador");
  });

  it('Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    expect.assertions(1);
    const callFunction = await fetchProducts('computador');
    expect(callFunction).toEqual(computadorSearch);
  });

  it('Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: "You must provide an url"', async () => {
    expect.assertions(1);
    const expected = await fetchProducts();
    expect(expected).toEqual(new Error('You must provide an url'));
  })
});
