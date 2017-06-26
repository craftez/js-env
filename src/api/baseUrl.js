export default function getBaseUrl() {
	const isDevelopment = window.location.hostname === 'localhost';
	return isDevelopment ? 'http://localhost:3001/' : 'https://nameless-beyond-35983.herokuapp.com/';
}
