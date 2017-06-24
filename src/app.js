import { getUsers, deleteUser } from './api/userApi';

getUsers().then(result => {
	let usersBody = result
		.map(
			item => `
        <tr>
            <td><a href="#" data-id="${item.id}" class="deleteUser">Delete</a></td>
            <td>${item.id}</td>
            <td>${item.firstName}</td>
            <td>${item.lastName}</td>
            <td>${item.email}</td>
        </tr>
    `
		)
		.join('');

	global.document.getElementById('users').innerHTML = usersBody;

	const deleteLinks = global.document.getElementsByClassName('deleteUser');

	Array.from(deleteLinks, link => {
		link.onclick = function(event) {
			const element = event.target;
			event.preventDefault();
			deleteUser(element.attributes['data-id'].value);
			const row = element.parentNode.parentNode;
			row.parentNode.removeChild(row);
		};
	});
});
