import './css/main.css';
import itemTemplate from './templates/Item';
import changeTheme from './utils/toggleTheme';
import getIndexFromItem from './utils/getIndexFromItem';
import createNodeElement from './utils/createNodeElement';
import cleanInputs from './utils/cleanInputs';
import getTodayDate from './utils/getTodayDate';

/*DOM Elements */
const title = document.getElementById('title');
const toggleTheme = document.getElementById('toggle-theme');
const carbohidrates = document.getElementById('carbohidrates');
const calories = document.getElementById('calories');
const proteins = document.getElementById('proteins');
const totalCarbs = document.getElementById('totalCarbs');
const totalCalories = document.getElementById('totalCalories');
const totalProteins = document.getElementById('totalProteins');
const $overlay = document.querySelector('.overlay');
const $addItemForm = document.querySelector('.inputs');
const $addItemButton = document.querySelector('.add--item button');
const $btnAddForm = document.querySelector('.button--add button');
const listOfItems = document.querySelector('#list-of-items');
const totalsContainer = document.querySelector('.totals');

/* Variables */
let list = [];
const inputs = [title, carbohidrates, calories, proteins];
const mount = 'mount';
const unmount = 'unmount';

// Events
$overlay.addEventListener('click', () => renderform(unmount));
window.addEventListener('load', validateChildCount);
// Delete 'is-invalid' class when keypress within the input
inputs.forEach((input) => {
	const { parentNode } = input;
	input.onkeypress = () => parentNode.classList.remove('is-invalid');
});
toggleTheme.onclick = () => changeTheme(toggleTheme);
$addItemButton.onclick = () => renderform(mount);
$btnAddForm.onclick = validateInputs;

/* Functions*/
function validateInputs(e) {
	e.preventDefault();
	inputs.forEach(({ parentNode, value }) => {
		!value && parentNode.classList.add('is-invalid');
		setTimeout(() => parentNode.classList.remove('is-invalid'), 2000);
	});
	const hasValues = inputs.every((input) => input.value);
	if (hasValues) {
		addItemToList();
		renderform(unmount);
	}
}

const addItemToList = () => {
	const id = Math.round(Math.random() * 10000);
	const newItem = {
		id,
		title: title.value,
		calories: parseInt(calories.value),
		carbohidrates: parseInt(carbohidrates.value),
		proteins: parseInt(proteins.value),
		addedTime: getTodayDate()
	};
	list.push(newItem);
	renderItems();
	updateTotals();
};

function renderform(action) {
	switch (action) {
		case mount:
			$overlay.classList.add('active');
			$addItemForm.classList.add('active');
			break;
		case unmount:
			$overlay.classList.remove('active');
			$addItemForm.classList.remove('active');
			cleanInputs(inputs);
			break;
		default:
			throw TypeError(`No valid actions were provided, get "${action}" action`);
	}
}

const updateTotals = () => {
	let calories = 0;
	let carbohidrates = 0;
	let proteins = 0;
	list.map((item) => {
		(calories += item.calories),
			(carbohidrates += item.carbohidrates),
			(proteins += item.proteins);
	});
	totalCalories.textContent = calories;
	totalCarbs.textContent = carbohidrates;
	totalProteins.textContent = proteins;
};

const renderItems = () => {
	let itemWrapper;
	let itemToHtml;
	list.map((item) => {
		itemWrapper = createNodeElement('div', {
			class: 'item--container',
			'data-id': item.id
		});
		itemToHtml = itemTemplate(item);
	});
	listOfItems.appendChild(itemWrapper(itemToHtml));
	validateChildCount();
	updateTotals();
};

// Validate if there is one of more children on the list wrapper
function validateChildCount() {
	if (!listOfItems.childElementCount) {
		const tagElement = createNodeElement('p', { id: 'not-elements' });
		listOfItems.appendChild(tagElement('There is no content to show'));
		totalsContainer.classList.add('hidden');
	} else {
		totalsContainer.classList.remove('hidden');
		document.getElementById('not-elements')?.remove();
	}
}

function removeItem(el) {
	const { index } = getIndexFromItem(el.offsetParent, list);
	list.splice(index, 1);
	el.offsetParent.remove();
	updateTotals();
	validateChildCount();
}

// Open modal form with the values of the current item
function editItem(el) {
	const { itemToRemove, index } = getIndexFromItem(el.offsetParent, list);
	title.value = itemToRemove.title;
	carbohidrates.value = itemToRemove.carbohidrates;
	calories.value = itemToRemove.calories;
	proteins.value = itemToRemove.proteins;
	renderform(mount);
	$btnAddForm.onclick = null;
	const action = (e) => {
		e.preventDefault();
		updateItem({ itemToRemove, index }, el.offsetParent);
		$btnAddForm.onclick = validateInputs;
		$btnAddForm.removeEventListener('click', action);
	};
	$btnAddForm.addEventListener('click', action);
}

function updateItem({ itemToRemove, index }, nodeToRemove) {
	const newItem = {
		id: itemToRemove.id,
		title: title.value || itemToRemove.title,
		carbohidrates: Number(carbohidrates.value) || itemToRemove.carbohidrates,
		calories: Number(calories.value) || itemToRemove.calories,
		proteins: Number(proteins.value) || itemToRemove.proteins,
		addedTime: getTodayDate()
	};
	const newNode = createNodeElement('div', {
		class: 'item--container',
		'data-id': newItem.id
	});
	const itemHtml = itemTemplate(newItem);
	listOfItems.replaceChild(newNode(itemHtml), nodeToRemove);
	list.splice(index, 1, newItem);
	renderform(unmount);
	updateTotals()
}

window.removeItem = removeItem;
window.editItem = editItem;
