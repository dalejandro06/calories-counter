const cleanInputs = (inputs) =>
	inputs.map((input) => {
		input.parentNode.classList.remove('is-invalid');
		input.value = '';
	});

export default cleanInputs;
