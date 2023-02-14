// import { dbank_backend } from "../../declarations/dbank_backend";

// document.querySelector("form").addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const button = e.target.querySelector("button");

//   const name = document.getElementById("name").value.toString();

//   button.setAttribute("disabled", true);

//   // Interact with foo actor, calling the greet method
//   const greeting = await dbank_backend.greet(name);

//   button.removeAttribute("disabled");

//   document.getElementById("greeting").innerText = greeting;

//   return false;
// });


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