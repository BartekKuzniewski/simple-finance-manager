const incomeSection = document.querySelector('.income-area');
const expansesSection = document.querySelector('.expanses-section');
const addTransactionPanel = document.querySelector('.add-transaction-panel')
const availableMoney = document.querySelector('.available-money');

const addTransactionBtn = document.querySelector('.add-transaction');
const deleteAllBtn = document.querySelector('.delete-all');

const deleteTransactionBtn = document.querySelector('.delete');
const saveTransactionBtn = document.querySelector('.save');
const cancelTransactionBtn = document.querySelector('.cancel');

const transactionName = document.querySelector('#name');
const transactionAmount = document.querySelector('#amount');
const transactionCategory = document.querySelector('#category');

const lightMode = document.querySelector('.light');
const darkMode = document.querySelector('.dark');

let root = document.documentElement;
let ID = 0;
let categoryIcon;
let selectedIcon;
let moneyArr = [0];

////////////////////////
const showPanel = () => {
    addTransactionPanel.style.display = 'flex';
}

const hidePanel = () => {
    addTransactionPanel.style.display = 'none';
    clearInputs()
}
//////////////////////

const checkForm = () => {
    if(transactionName.value !== '' && transactionAmount !== '' && transactionCategory.value !== 'none') {
        console.log('ok');
        
    } else {
        alert('Wypełnij wszystkie pola!')
    }

    
}

const clearInputs = () => {
    transactionName.value = '';
    transactionAmount.value = '';
    transactionCategory.selectedIndex = 0;
}


addTransactionBtn.addEventListener('click', showPanel)
cancelTransactionBtn.addEventListener('click', hidePanel)
saveTransactionBtn.addEventListener('click', checkForm)