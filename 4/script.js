const form = document.querySelector("#bill-form");
const friendsExpensesInput = document.getElementById("friends-expenses");
const generalExpensesInput = document.getElementById("general-expenses");
const resultsList = document.querySelector("#results ul");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const friendsInput = friendsExpensesInput.value.trim();
  const friendsData = friendsInput.split(",").map((item) => {
    const [name, expense] = item.split(":").map((value) => value.trim());
    return { name, expense: parseFloat(expense) || 0 };
  });

  const generalExpenses = generalExpensesInput.value
    .trim()
    .split(",")
    .map(Number);

  if (friendsData.length === 0 || generalExpenses.some(isNaN)) {
    alert("Please ensure all inputs are correct.");
    return;
  }

  const totalGeneralExpense = generalExpenses.reduce(
    (sum, exp) => sum + exp,
    0
  );
  const equalShare = totalGeneralExpense / friendsData.length;

  resultsList.innerHTML = "";

  friendsData.forEach((friend) => {
    const net = equalShare - friend.expense;
    const status =
      net === 0
        ? "(Settled)"
        : net > 0
        ? `(Owes $${net.toFixed(2)})`
        : `(Will receive $${Math.abs(net).toFixed(2)})`;

    const li = document.createElement("li");
    li.textContent = `${friend.name}: Paid $${friend.expense.toFixed(
      2
    )}. ${status}`;
    resultsList.appendChild(li);
  });
});
