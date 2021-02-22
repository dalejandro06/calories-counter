// las variables primitivas se almacenan y se acceden por valor, mientras que las variables de tipo objeto se almacenan y acceden por referencia.
let a = {
	name: 'Diego',
	attributes: {
		height: '100'
	}
};
// El primer parámetro es donde se va a hacer la copia (en este caso un nuevo objeto vacío) y la segunda que va a copiar
// Object.assign copia los valores solo en el primer nivel
let b = JSON.parse(JSON.stringify(a)) || Object.assign({}, a);
b.name = 'Alejandro';

console.log(a);
console.log(b);

// FUNCIONES PURAS VS PRIMITIVAS
// Las funciones puras son las que siempre nos regresan el mismo valor con los mismos parámetros, las primitivas son las que dependen de variables externas para devolver su valor

// Puras
// Trabajan solo con los parámetros que reciben y tratan de no mutar ninguna variable en la aplicación
function sum(a, b) {
	return a + b;
}

// Primitiva
// Es primitiva porque si el valor de c cambia, va a retornar distinto así los parámetros siempre sean los mismos
const c = 10;
function sum2(a, b) {
	return a + b + c;
}

// Closures
function createTag(tag) {
	return (content) => `<${tag}>${content}</${tag}>`;
}
const h1 = createTag('h1');
h1('Contenido de un h1');

// Currying
function buildSum(a) {
	return (b) => a + b;
}

const addFive = buildSum(5);

console.log(addFive(5));

// FUNCIONES MUTABLES VS INMUTABLES
// Las funciones mutables son aquellas que mutan o cambian el valor de algún dato que le llegue por parámetro, mientras las inmutables son aquellas que no mutan ningún valor pasado por parámetro si no que devuelven uno nuevo

// Mutable
function addToList(list, item, quantity) {
	list.push({
		item,
		quantity
	});
	return list;
}

// Inmutable
function addToNewList(list, item, quantity) {
	const newList = JSON.parse(JSON.stringify(list));
	newList.push({
		item,
		quantity
	});
	return newList;
}

// Shared state
// Es un concepto donde varias funciones mutan el mismo objeto, por lo que importará el orden en el que sean ejecutadas, ya que comparten ese objeto o estado
const d = {
	value: 2
};

const addOne = () => (d.value += 1);

const timesTwo = () => (d.value *= 2);

addOne();
timesTwo();
console.log('d', d); // 6

timesTwo();
addOne();
console.log('d', d); //5

/////////////////////

const e = {
	value: 2
};

// El tercer argumento es los valores que queremos cambiar del objeto que estamos copiando
const addOneCopy = (object) =>
	Object.assign({}, object, { value: object.value + 1 });
const timesTwoCopy = (object) =>
	Object.assign({}, object, { value: object.value * 2 });

// Aquí no importa el orden en que llamemos las funciones ya que no estamos mutando el objeto b, si no que se lo pasamos por parámetro a las funciones que generan nuevos objetos con las nuevas propiedades
addOneCopy(e);
timesTwoCopy(e);
console.log('e', e); //6

timesTwoCopy(e);
addOneCopy(e);
console.log('e', e); //6
