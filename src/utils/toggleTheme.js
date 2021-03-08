export default function changeTheme(button) {
	document.body.classList.toggle('dark');
	document.body.classList.contains('dark')
		? (button.textContent = 'Light')
		: (button.textContent = 'Dark');
}
