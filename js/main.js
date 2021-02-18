const compose = (...functions) => (data) =>
	functions.reduceRight((value, func) => func(value), data);

/*DOM Node Elements */
let description = document.getElementById('description');
let carbohidrates = document.getElementById('carbohidrates');
let calories = document.getElementById('calories');
let proteins = document.getElementById('proteins');
let totalCarbs = document.getElementById('totalCarbs');
let totalCalories = document.getElementById('totalCalories');
let totalProteins = document.getElementById('totalProteins');

/* Variables */
let list = [];
const inputs = [description, carbohidrates, calories, proteins];

/*Events*/
description.onkeypress = () => description.classList.remove('is-invalid');
carbohidrates.onkeypress = () => carbohidrates.classList.remove('is-invalid');
calories.onkeypress = () => calories.classList.remove('is-invalid');
proteins.onkeypress = () => proteins.classList.remove('is-invalid');

/* Functions*/
function validateInputs() {
	inputs.forEach((input) => {
		!input.value && input.classList.add('is-invalid');
	});
	const hasValues = inputs.every((input) => input.value);
	if (hasValues) {
		addToList();
	}
}

const addToList = () => {
	const newItem = {
		description: description.value,
		calories: parseInt(calories.value),
		carbohidrates: parseInt(carbohidrates.value),
		proteins: parseInt(proteins.value)
	};
	list.push(newItem);
	renderItems();
	cleaninputs();
	updateTotals();
};

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
	const tableBody = document.querySelector('#listOfItems');
	tableBody.innerHTML = '';
	list.map(({ description, calories, carbohidrates, proteins }, index) => {
		const trashIcon = createHtmlTag({
			tag: 'i',
			attrs: { class: 'fas fa-trash-alt' }
		})('');
		const removeButton = createHtmlTag({
			tag: 'button',
			attrs: {
				class: 'btn btn-outline-danger',
				onClick: `removeItem(${index})`
			}
		})(trashIcon);
		tableBody.innerHTML += mapTableRow([
			description,
			calories,
			carbohidrates,
			proteins,
			removeButton
		]);
	});
};

const createHtmlTag = (tag) => {
	if (typeof tag === 'string') return innerTagAttributes({ tag });

	return innerTagAttributes(tag);
};

const attrsToString = (obj = {}) => {
	const keys = Object.keys(obj);
	return keys.map((key) => `${key}="${obj[key]}"`).join(' ');
};

const innerTagAttributes = (obj) => (content = '') => {
	const hasAttributes = Object.entries(obj).length > 0;
	return `<${obj.tag} ${hasAttributes && ' '} ${attrsToString(obj.attrs)}>
		${content}
		</${obj.tag}>`;
};

function removeItem(index) {
	list.splice(index, 1);
	renderItems();
	updateTotals();
}

const tableCell = createHtmlTag('td');
const mapTableCell = (cells) => cells.map(tableCell).join('');

const tableRow = createHtmlTag('tr');
const mapTableRow = (rows) => tableRow(mapTableCell(rows));
// const mapTableRow = (rows) => compose(tableRow, mapTableCell)(rows);
