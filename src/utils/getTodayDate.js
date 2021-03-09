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

function getTodayDate() {
	const time = new Date();
	const date = time.getDate();
	const month = months[time.getMonth()];
	const year = time.getFullYear();
	return `${date} ${month}, ${year}`;
}

export default getTodayDate;
