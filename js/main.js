const compose = (...functions) => (data) =>
	functions.reduceRight((value, func) => func(value), data);

/*DOM Node Elements */
let description = document.getElementById('description');
let carbohidrates = document.getElementById('carbohidrates');
let calories = document.getElementById('calories');
let proteins = document.getElementById('proteins');

/*Events*/
description.onkeypress = () => description.classList.remove('is-invalid');
carbohidrates.onkeypress = () => carbohidrates.classList.remove('is-invalid');
calories.onkeypress = () => calories.classList.remove('is-invalid');
proteins.onkeypress = () => proteins.classList.remove('is-invalid');

/* Variables */
let list = [];
const inputs = [description, carbohidrates, calories, proteins];

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
	console.log(list);
	cleaninputs();
};

const cleaninputs = () => inputs.map((input) => (input.value = ''));

function tag(tag) {
	return (content) => `<${tag}>${content}</${tag}>`;
}
