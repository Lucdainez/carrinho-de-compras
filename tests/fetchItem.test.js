require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Teste se "fetchItem" é uma função', () => {
    expect(typeof (fetchItem)).toEqual('function');
  });

  it('função "fetchItem" com o argumento do item "MLB1615760527" verifica se fetch foi chamada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('Teste se, ao chamar a função "fetchItem" com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/items/MLB1615760527");
  });

  it('Teste se o retorno da função "fetchItem" com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo', async () => {
    expect.assertions(1);
    const expected = await fetchItem('MLB1615760527');
    expect(expected).toEqual(item);
  });

  it('Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: "You must provide an url"', async () => {
    expect.assertions(1);
    const expected = await fetchItem();
    expect(expected).toEqual(new Error('You must provide an url'));
  });
});
