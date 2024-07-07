// Clase para manejar las solicitudes a la API
class UserService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    // Método para obtener todos los usuarios
    async fetchAllUsers() {
        try {
            const response = await fetch(`${this.baseUrl}/users`);
            const users = await response.json();
            console.log(users);
            return users;
        } catch (error) {
            console.error('Error fetching all users:', error);
        }
    }

    // Método para obtener un usuario por su ID
    async fetchUserById(id) {
        try {
            const response = await fetch(`${this.baseUrl}/users/${id}`);
            if (!response.ok) {
                throw new Error('User not found');
            }
            const user = await response.json();
            console.log(user);
            return user;
        } catch (error) {
            console.error(`Error fetching user with ID ${id}:`, error);
        }
    }
}

// Función que se ejecuta cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', async () => {
    const userService = new UserService('https://jsonplaceholder.typicode.com');

    // Obtener y mostrar todos los usuarios en la tabla
    const users = await userService.fetchAllUsers();
    const usersTableBody = document.querySelector('#usersTable tbody');
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.address.city}</td>
        `;
        usersTableBody.appendChild(row);
    });

    // Agregar evento al botón para buscar un usuario por ID
    const fetchUserButton = document.getElementById('fetchUserButton');
    fetchUserButton.addEventListener('click', async () => {
        const userId = document.getElementById('userIdInput').value;
        if (userId) {
            const user = await userService.fetchUserById(userId);
            if (user) {
                const userDetails = document.getElementById('userDetails');
                userDetails.innerHTML = `
                    <p>Nombre: ${user.name} &emsp; &emsp; 
                       Teléfono: ${user.phone}</p>
                `;
            } else {
                alert('Usuario no encontrado');
            }
        } else {
            alert('Por favor, ingrese un ID de usuario');
        }
    });
});
