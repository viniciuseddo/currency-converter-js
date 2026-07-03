// Taxas de câmbio fixas, usando o Real (BRL) como moeda base.
// Valores de referência — atualize manualmente ou substitua pela função
// fetchLiveRates() abaixo para consumir uma API de câmbio em tempo real.
const rates = {
  BRL: 1,
  USD: 0.18,
  EUR: 0.17,
};

const amountInput = document.getElementById("amount");
const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");
const swapButton = document.getElementById("swap");
const resultValue = document.getElementById("resultValue");
const rateInfo = document.getElementById("rateInfo");

function convert(amount, from, to) {
  const amountInBRL = amount / rates[from];
  const converted = amountInBRL * rates[to];
  return converted;
}

function formatCurrency(value, currency) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency,
  }).format(value);
}

function updateResult() {
  const amount = parseFloat(amountInput.value);
  const from = fromSelect.value;
  const to = toSelect.value;

  if (isNaN(amount) || amount < 0) {
    resultValue.textContent = "—";
    rateInfo.textContent = "";
    return;
  }

  const converted = convert(amount, from, to);
  resultValue.textContent = formatCurrency(converted, to);

  const unitRate = convert(1, from, to);
  rateInfo.textContent = `1 ${from} = ${unitRate.toFixed(4)} ${to}`;
}

function swapCurrencies() {
  const temp = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = temp;
  updateResult();
}

amountInput.addEventListener("input", updateResult);
fromSelect.addEventListener("change", updateResult);
toSelect.addEventListener("change", updateResult);
swapButton.addEventListener("click", swapCurrencies);

updateResult();

/*
  Próximo passo (evolução planejada do projeto):
  Substituir o objeto `rates` fixo por uma chamada assíncrona a uma API
  de câmbio real, como a AwesomeAPI (https://docs.awesomeapi.com.br/).

  async function fetchLiveRates() {
    const response = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL");
    const data = await response.json();
    rates.USD = 1 / parseFloat(data.USDBRL.bid);
    rates.EUR = 1 / parseFloat(data.EURBRL.bid);
  }
*/
