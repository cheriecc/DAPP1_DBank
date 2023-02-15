import { dbank_backend } from "../../declarations/dbank_backend";

window.addEventListener("load", async function() {
  update();
});

document.querySelector("form").addEventListener("submit", async function(event) {
  event.preventDefault();
  // console.log("submitted");

  const button = event.target.querySelector("#submit-btn");

  const inputAmount = parseFloat(document.getElementById("input-amount").value);
  const withdrawAmount = parseFloat(document.getElementById("withdrawal-amount").value);

  button.setAttribute("disabled", true);

  if (document.getElementById("input-amount").value.length != 0) {
    await dbank_backend.topUp(inputAmount);
    document.getElementById("input-amount").value = "";
  }

  if (document.getElementById("withdrawal-amount").value.length != 0) {
    await dbank_backend.withdrawal(withdrawAmount);
    document.getElementById("withdrawal-amount").value = "";
  }

  await dbank_backend.compound();

  update();

  button.removeAttribute("disabled");

});

async function update() {
  const currentAmount = await dbank_backend.checkBalance();
  document.getElementById("value").innerText = Math.round(currentAmount * 100) / 100;
};