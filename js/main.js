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
const months = [
	'Enero',
	'Febrero',
	'Marzo',
	'Abril',
	'Mayo',
	'Junio',
	'Julio',
	'Agosto',
	'Septiembre',
	'Octubre',
	'Noviembre',
	'Diciembre'
];

// Events
$overlay.addEventListener('click', () => renderform(unmount));
window.addEventListener('load', validateChildCount);
// Delete 'is-invalid' class when keypress within the input
inputs.forEach((input) => {
	const { parentNode } = input;
	input.onkeypress = () => parentNode.classList.remove('is-invalid');
});
toggleTheme.onclick = changeTheme;
$addItemButton.onclick = () => renderform(mount);
$btnAddForm.onclick = (e) => validateInputs(e);

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

function changeTheme() {
	document.body.classList.toggle('dark');
	document.body.classList.contains('dark')
		? (toggleTheme.textContent = 'Light')
		: (toggleTheme.textContent = 'Dark');
}

const addItemToList = () => {
	const time = new Date();
	const date = time.getDate();
	const month = months[time.getMonth()];
	const year = time.getFullYear();
	const id = Math.round(Math.random() * 10000);

	const newItem = {
		id,
		title: title.value,
		calories: parseInt(calories.value),
		carbohidrates: parseInt(carbohidrates.value),
		proteins: parseInt(proteins.value),
		addedTime: `${date} ${month}, ${year}`
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
			cleaninputs();
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

const cleaninputs = () =>
	inputs.map((input) => {
		input.parentNode.classList.remove('is-invalid');
		input.value = '';
	});

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
};

// receive a html tag and attributes for that element
function createNodeElement(tag = 'div', attributes = {}) {
	const element = document.createElement(tag);
	for (const attribute in attributes) {
		element.setAttribute(attribute, attributes[attribute]);
	}
	return (content) => {
		element.innerHTML = content;
		return element;
	};
}

// Validate if there is one of more children on the list wrapper
function validateChildCount() {
	if (!listOfItems.childElementCount) {
		const tagElement = createNodeElement('h4', { id: 'not-elements' });
		listOfItems.appendChild(tagElement('There is no content to show'));
		totalsContainer.classList.add('hidden');
	} else {
		totalsContainer.classList.remove('hidden');
		document.getElementById('not-elements')?.remove();
	}
}

function removeItem(el) {
	const { index } = getIndexFromItem(el.offsetParent);
	list.splice(index, 1);
	el.offsetParent.remove();
	updateTotals();
	validateChildCount();
}

// Open modal form with the values of the current item
function editItem(el) {
	const { itemToRemove, index } = getIndexFromItem(el.offsetParent);
	title.value = itemToRemove.title;
	carbohidrates.value = itemToRemove.carbohidrates;
	calories.value = itemToRemove.calories;
	proteins.value = itemToRemove.proteins;
	renderform(mount);
}

function updateItem(itemToRemove, index) {
	const newItem = {
		id: itemToRemove.id,
		title: title.value,
		carbohidrates: carbohidrates.value,
		calories: calories.value,
		proteins: proteins.value,
		addedTime: itemToRemove.addedTime
	};
	const itemRemoved = list.splice(index, 1, newItem);
	console.log(itemRemoved);
}

// Returns an index and the item found giving a html element
function getIndexFromItem(nodeElement) {
	const id = Number(nodeElement.getAttribute('data-id'));
	const itemToRemove = list.find((item) => item.id === id);
	const index = list.indexOf(itemToRemove);
	return { index, itemToRemove };
}

const itemTemplate = (el) =>
	`<h3 class="item--title">
			${el.title}
			<span>${el.addedTime}</span>
		</h3>
		<div class="item-description">
			<p class="item-calories">
				Calorias: <span>${el.calories}</span>
			</p>
			<p class="item-carbohidrates">
				Carbohidratos: <span>${el.carbohidrates}</span>
			</p>
			<p class="item-proteins">
				Proteínas: <span>${el.proteins}</span>
			</p>
		</div>
		<div class="item--buttons">
			<button class="button--delete" onclick="removeItem(this)">
				<img src="./img/delete-sign.png" />
			</button>
			<button class="button--edit" onclick="editItem(this)">
				<img src="./img/edit.png" />
			</button>
		</div>`;
