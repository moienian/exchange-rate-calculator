const currency_one = document.getElementById("currency-one");
const currency_two = document.getElementById("currency-two");
const amount_one = document.getElementById("amount-one");
const amount_two = document.getElementById("amount-two");
const rateDescription = document.getElementById("rate");
const swap = document.getElementById("swap");

function calculate() {
  const currencyOneValue = currency_one.value;
  const currencyTwoValue = currency_two.value;
  const amountOneValue = parseInt(amount_one.value);

  fetch(
    `https://prime.exchangerate-api.com/v5/d249201befbd0efb6489a81e/latest/${currencyOneValue}`
  )
    .then(res => res.json())
    .then(data => {
      const rate = data.conversion_rates[currencyTwoValue];
      amount_two.value = (amountOneValue * rate).toFixed(2);

      rateDescription.innerText = `1 ${currency_one.value} = ${rate.toFixed(
        2
      )} ${currency_two.value}`;
    });
}
currency_one.addEventListener("change", calculate);
currency_two.addEventListener("change", calculate);
amount_one.addEventListener("input", calculate);
amount_two.addEventListener("change", calculate);
swap.addEventListener("click", () => {
  const temp = currency_one.value;
  currency_one.value = currency_two.value;
  currency_two.value = temp;
  calculate();
});

calculate();
