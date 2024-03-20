const balance = document.getElementById("balance");
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let transactions = [];

// Add transaction
function addtransaction(e) {
    e.preventDefault();
    if (text.value.trim() === "" || amount.value.trim() === "") {
        alert("Please enter text and value");
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value,
        };
        transactions.push(transaction);
        addtransactionDOM(transaction);
        updateValues();
        text.value = "";
        amount.value = "";
    }
}

// Generate ID 
function generateID() {
    return Math.floor(Math.random() * 100000000)
}

function addtransactionDOM(transaction) {

    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");

    item.classList.add(
        transaction.amount < 0 ? "minus" : "plus"
    );

    item.innerHTML = `
      ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span>
      <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>`; // Corrected onclick attribute
    list.appendChild(item);
}

// Remove transaction
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    Init();
}


// Update values
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);
    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;

}

// Init app
function Init() {
    list.innerHTML = "";
    transactions.forEach(addtransactionDOM);
    updateValues();

}

Init();
form.addEventListener("submit", addtransaction);

