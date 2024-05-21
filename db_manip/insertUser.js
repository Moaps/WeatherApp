const axios = require('axios');

async function createUser() {
  try {
    const response = await axios.post('http://localhost:3000/users', {
      nome: 'John Doe',
      login: 'johndoe',
      email: 'john.doe@example.com',
      senha: 'password123',
      local_assoc: 'New York'
    });
    console.log('User created:', response.data);
  } catch (error) {
    console.error('Error creating user:', error.response ? error.response.data : error.message);
  }
}

createUser();
