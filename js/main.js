/*DOM Elements */
let title = document.getElementById('title');
let carbohidrates = document.getElementById('carbohidrates');
let calories = document.getElementById('calories');
let proteins = document.getElementById('proteins');
let totalCarbs = document.getElementById('totalCarbs');
let totalCalories = document.getElementById('totalCalories');
let totalProteins = document.getElementById('totalProteins');
const $overlay = document.querySelector('.overlay');
const $addItemForm = document.querySelector('.inputs');
const $addItemButton = document.querySelector('.add--item button');
const $btnAddForm = document.querySelector('.button--add button');
const listOfItems = document.querySelector('#list-of-items');
const timeParagraph = document.getElementById('time');

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
inputs.forEach(({ parentNode }) => {
	input.onkeypress = () => parentNode.classList.remove('is-invalid');
});
$addItemButton.onclick = () => renderform(mount);
$btnAddForm.onclick = validateInputs;

/* Functions*/
function validateInputs() {
	inputs.forEach((input) => {
		const { parentNode } = input;
		!input.value && parentNode.classList.add('is-invalid');
	});
	const hasValues = inputs.every((input) => input.value);
	if (hasValues) {
		addToList();
		renderform(unmount);
	}
}

const addToList = () => {
	const time = new Date();
	const date = time.getDate();
	const month = months[time.getMonth()];
	const year = time.getFullYear();
	const newItem = {
		title: title.value,
		calories: parseInt(calories.value),
		carbohidrates: parseInt(carbohidrates.value),
		proteins: parseInt(proteins.value),
		addedTime: `${date} ${month}, ${year}`
	};
	list.push(newItem);
	renderItems();
	cleaninputs();
	// updateTotals();
};

function renderform(action) {
	switch (action) {
		case mount:
			$overlay.classList.add('active');
			$addItemForm.classList.add('active');
			document.title = 'Añadir un Item';
			break;
		case unmount:
			$overlay.classList.remove('active');
			$addItemForm.classList.remove('active');
			document.title = 'Contador de calorias';
			inputs.forEach(({ parentNode }) =>
				parentNode.classList.remove('is-invalid')
			);
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

const cleaninputs = () => inputs.map((input) => (input.value = ''));

const renderItems = () => {
	listOfItems.innerHTML = '';
	list.map((item, index) => {
		const itemWrapper = createNodeElement('div');
		const itemToHtml = itemTemplate(item, index);
		listOfItems.append(itemWrapper(itemToHtml));
	});
	validateChildCount();
};

function createNodeElement(tag) {
	const element = document.createElement(tag);
	return (content) => {
		element.innerHTML = content;
		return element;
	};
}

function validateChildCount() {
	const tagElement = createNodeElement('h4');
	if (!listOfItems.childElementCount) {
		listOfItems.appendChild(tagElement('No hay contenido que mostrar'));
	}
	return tagElement;
}

function removeItem(index) {
	list.splice(index, 1);
	renderItems();
	// updateTotals();
}

const itemTemplate = (el, index) =>
	`<div class="item--container">
		<h3 class="item--title">
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
			<button class="button--delete" onclick="removeItem(${index})">
				<img src="./img/delete-sign.png" />
			</button>
			<button class="button--edit" onclick="editItem(${index})">
				<img src="./img/edit.png" />
			</button>
		</div>
	</div>`;
