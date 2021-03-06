const incomeSection = document.querySelector('.income-area');
const expansesSection = document.querySelector('.expenses-area');
const addTransactionPanel = document.querySelector('.add-transaction-panel');
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
let selectedCategory;
let moneyArr = [0];

////////////////////////
const showPanel = () => {
	addTransactionPanel.style.display = 'flex';
};

const hidePanel = () => {
	addTransactionPanel.style.display = 'none';
	clearInputs();
};
//////////////////////

const checkForm = () => {
	if (
		transactionName.value !== '' &&
		transactionAmount !== '' &&
		transactionCategory.value !== 'none'
	) {
		createNewTransaction();
	} else {
		alert('Wypełnij wszystkie pola!');
	}
};

const clearInputs = () => {
	transactionName.value = '';
	transactionAmount.value = '';
	transactionCategory.selectedIndex = 0;
};

/////////////

const createNewTransaction = () => {
	const newTransaction = document.createElement('div');
	newTransaction.classList.add('transaction');
	newTransaction.setAttribute('id', ID);
	checkCategory(selectedCategory);

	newTransaction.innerHTML = `
		<p class='transaction-name'>
			${categoryIcon} ${transactionName.value}
		</p>
		<p class='transaction-amount'>
			${transactionAmount.value}zł
			<button class='delete' onclick="deleteTransaction(${ID})">
				<i class='fas fa-times'></i>
			</button>
		</p>
	`;

	if (transactionAmount.value > 0) {
		incomeSection.append(newTransaction);
		newTransaction.classList.add('income');
	} else {
		expansesSection.append(newTransaction);
		newTransaction.classList.add('expanses');
	}

	moneyArr.push(parseFloat(transactionAmount.value));
	countMoney(moneyArr);

	hidePanel();
	ID++;
	clearInputs();
};

const selectCategory = () => {
	selectedCategory =
		transactionCategory.options[transactionCategory.selectedIndex].text;
};

const checkCategory = (transaction) => {
	switch (transaction) {
		case '[ + ] Przychód':
			categoryIcon = '<i class="fas fa-money-bill-wave"></i>';
			break;
		case '[ - ] Zakupy':
			categoryIcon = '<i class="fas fa-cart-arrow-down"></i>';
			break;
		case '[ - ] Kino':
			categoryIcon = '<i class="fas fa-film"></i>';
			break;
		case '[ - ] Jedzenie':
			categoryIcon = '<i class="fas fa-film"></i>';
			break;
	}
};

const countMoney = (amount) => {
	const newAmount = amount.reduce((a, b) => a + b);
	availableMoney.textContent = `${newAmount} zł`;
};

const deleteTransaction = (id) => {
	const transactionToDelete = document.getElementById(id);
	const transactionValue = parseFloat(
		transactionToDelete.childNodes[3].innerText
	);
	const indexOfTransaction = moneyArr.indexOf(transactionValue);

	transactionToDelete.classList.contains('income')
		? incomeSection.removeChild(transactionToDelete)
		: expansesSection.removeChild(transactionToDelete);

	moneyArr.splice(indexOfTransaction, 1);
	countMoney(moneyArr);
};

const deleteAllTransaction = () => {
	incomeSection.innerHTML = '<h3>Przychód:</h3>';
	expansesSection.innerHTML = '<h3>Wydatki:</h3>';
	availableMoney.textContent = '0zł';
	moneyArr = [0];
};

const lightModeOn = () => {
	root.style.setProperty('--first-color', '#F9F9F9');
	root.style.setProperty('--second-color', '#14161F');
	root.style.setProperty('--border-color', 'rgba(0, 0, 0, .2)');
};

const darkModeOn = () => {
	root.style.setProperty('--first-color', '#14161F');
	root.style.setProperty('--second-color', '#F9F9F9');
	root.style.setProperty('--border-color', 'rgba(255, 255, 255, .42)');
};

addTransactionBtn.addEventListener('click', showPanel);
cancelTransactionBtn.addEventListener('click', hidePanel);
saveTransactionBtn.addEventListener('click', checkForm);
deleteAllBtn.addEventListener('click', deleteAllTransaction);
lightMode.addEventListener('click', lightModeOn);
darkMode.addEventListener('click', darkModeOn);
