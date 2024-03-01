// script.js

// script.js
function displayName() {
    var name = document.getElementById('getname').value;
    localStorage.setItem('user', name);
  
    
  
  }
  
function checkEnter(event) {
      if (event.key === 'Enter') {
        displayName();
      }
    }

function redirect() {
    displayName(); // Call your existing function
    window.location.href = "Dashboard.html"; // Redirect to Dashboard.html
    updateDash(); //Update dashboard.
    }

function loadUserName(){
    var storedName = localStorage.getItem('user');
    if (storedName.trim() !== '') {
        document.getElementById('display').innerHTML = storedName;
    }
    
}

document.addEventListener('DOMContentLoaded',function(){
    if(document.title="Dashboard"){
        loadUserName();
        updateDash();
    }
});   

//For Transactions.html

const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    signDisplay: "always",
})

const list = document.getElementById("transactionList");
const form = document.getElementById("transactionForm")
const status = document.getElementById("status");
const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");




form.addEventListener('submit', addTransaction);

function updateTotal(){
    const incomeTotal = transactions
        .filter((trx)=>trx.type==="income")
        .reduce((total, trx)=>total + trx.amount, 0);
    const expenseTotal = transactions
        .filter((trx)=>trx.type==="expense")
        .reduce((total, trx)=>total + trx.amount, 0);

    const balanceTotal = incomeTotal - expenseTotal;

    balance.textContent = formatter.format(balanceTotal).substring(1);
    income.textContent = formatter.format(incomeTotal);
    expense.textContent = formatter.format(expenseTotal * -1);

    //For Dashboard
    //########################
    updateDashboardBalance(balanceTotal,expenseTotal,incomeTotal);
}

//For Dashboard
//##########################
function updateDashboardBalance(value1,value2,value3) {
    localStorage.setItem('balance', value1);
    localStorage.setItem('expense', value2);
    localStorage.setItem('income', value3);
}

function updateDash(){
    var balanceDash = localStorage.getItem('balance');
    var incomeDash = localStorage.getItem('income');
    var expenseDash = localStorage.getItem('expense');
    document.getElementById('balance-dashboard').innerHTML = balanceDash;
    document.getElementById('income-dashboard').innerHTML = incomeDash;
    document.getElementById('expense-dashboard').innerHTML = expenseDash;
    
}


function renderList(){
    list.innerHTML = "";

    status.textContent = "";
    if (transactions.length === 0){
        status.textContent = "No transactions.";
        return;
    }

    transactions.forEach(({id, name, amount, date, type})=>{
        const sign = income === type ? +1 : -1;
        
        const li = document.createElement("li");

        li.innerHTML = `
            <div class="name">
                <h4>${name}</h4>
                <p>${new Date(date).toLocaleDateString()}</p>
            </div>

            <div class="amount">
                <span class = ${type}> ${formatter.format(amount * sign)} </span>
            </div>
            
            <div class="action">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"
                onclick= "deleteTransaction(${id})">
                <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                </svg>
            </div>
        `;

        list.appendChild(li);
    });
}

renderList();
updateTotal();

function deleteTransaction(id) {
    const index = transactions.findIndex((trx)=>trx.id===id);
    transactions.splice(index, 1);

    updateTotal();
    saveTransactions();
    renderList();
    
}

function addTransaction(e){
    e.preventDefault();

    const formData = new FormData(this);

    transactions.push({
        id: transactions.length + 1,
        name: formData.get("name"),
        amount: parseFloat(formData.get("amount")),
        date: new Date(formData.get("date")),
        type: "on" === formData.get("type") ? "income" : "expense",
    });

    this.reset();

    updateTotal();
    saveTransactions();
    renderList();
}

function saveTransactions(){
    transactions.sort((a,b) => new Date(b.date) - new Date(a.date));

    localStorage.setItem("transactions", JSON.stringify(transactions));
}



