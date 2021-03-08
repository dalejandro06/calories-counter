export default function getIndexFromItem(nodeElement, list) {
	const id = Number(nodeElement.getAttribute('data-id'));
	const itemToRemove = list.find((item) => item.id === id);
	const index = list.indexOf(itemToRemove);
	return { index, itemToRemove };
}
