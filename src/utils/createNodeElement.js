// receive a html tag and attributes for that element and create a nodeElement
export default function createNodeElement(tag = 'div', attributes = {}) {
	const element = document.createElement(tag);
	for (const attribute in attributes) {
		element.setAttribute(attribute, attributes[attribute]);
	}
	return (content) => {
		element.innerHTML = content;
		return element;
	};
}
