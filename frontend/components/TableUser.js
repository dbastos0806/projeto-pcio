import { createApp } from 'https://unpkg.com/petite-vue?module';

// Criação da aplicação PetiteVue
const app = createApp({
  // Estado da aplicação
  users: [],
  showTableHeader: false,
  showCreateUserButton: false,
  closeLoadUsersButton: true,
  showCloseUsersButton: false,
  showFormUser: false,
  showEditForm: false,
editUser: {
  _id: null,
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
},

async closeUsers(){
  this.users = false;
  this.showTableHeader = false;
  this.showCreateUserButton = false;
  this.closeLoadUsersButton = true;
  this.showCloseUsersButton = false;
},

  // Função assíncrona para buscar usuários
  async fetchUsers() {
    try {
      const url = "http://localhost:3000/userdb/";
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();

      // Atualiza o estado da aplicação com os usuários e ajusta as variáveis de exibição
      this.users = data;
      this.showTableHeader = true;
      this.showCreateUserButton = true;
      this.closeLoadUsersButton = false;
      this.showCloseUsersButton = true;

    } catch (error) {
      console.error("Erro:", error);
      throw error;
    }
  },


  // Função para editar usuário
  async editUser(userId) {
    const user = this.users.find(u => u._id === userId);
  if (user) {
    this.editUser = { ...user };
    this.showEditForm = true;
    this.showCreateUserButton = false;
  }
  },

  // Função para salvar usuário editado
  async updateUser() {
    try {
      // Verifica se todos os campos obrigatórios estão preenchidos
      if (!this.editUser.email || !this.editUser.firstName || !this.editUser.lastName || !this.editUser.phone) {
        alert('Todos os campos são obrigatórios.');
        return;
      }
  
      // Endereço do endpoint para atualização de usuário
      const url = `http://localhost:3000/userdb/${this.editUser._id}`;
  
      // Envia uma requisição PATCH com os dados atualizados do usuário
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.editUser.email,
          firstName: this.editUser.firstName,
          lastName: this.editUser.lastName,
          phone: this.editUser.phone,
        }),
      });
  
      // Verifica se a requisição foi bem-sucedida
      if (!response.ok) {
        throw new Error(`Erro: ${response.statusText}`);
      }
  
      // Atualiza a lista de usuários
      const updatedUser = await response.json();
      const userIndex = this.users.findIndex(u => u._id === this.editUser._id);
      if (userIndex !== -1) {
        this.users[userIndex] = updatedUser;
      }
  
      // Fecha o formulário de edição e exibe uma mensagem de sucesso
      this.cancelEdit();
      alert('Usuário atualizado com sucesso.');
  
    } catch (error) {
      // Exibe um erro se a atualização falhar
      console.error("Erro ao atualizar usuário:", error);
      alert('Erro ao atualizar usuário.');
    }
  },
  


  // Função para cancelar edição de usuário
  cancelEdit() {
    this.showEditForm = false;
    this.showCreateUserButton = true;
  },

  // Função assíncrona para excluir usuário
  async deleteUser(userId) {
    try {
      const url = `http://localhost:3000/userdb/${userId}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      // Remove o usuário da lista após a exclusão
      this.users = this.users.filter((user) => user._id !== userId);

      console.log("Usuário excluído com ID:", userId);
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      throw error;
    }
  },
  //criar um novo usuario
  async createUserForm() {
    this.showCreateUserButton = false;
    this.showFormUser = true;
    console.log("Criar usuário");
  },

  //salvar o novo usuario
  async saveUser(){
    try {
      // Coleta os dados do formulário de criação
      const newFirstName = document.getElementById('create-firstName').value;
      const newLastName = document.getElementById('create-lastName').value;
  
      // Outros dados do novo usuário
      const newUser = {
        email: document.getElementById('create-email').value,
        firstName: newFirstName,
        lastName: newLastName,
        phone: document.getElementById('create-phone').value,
      };
  
      // Envia uma requisição POST para criar um novo usuário
      const url = "http://localhost:3000/userdb/create";
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
  
      if (!response.ok) {
        throw new Error(response.statusText);
      }
  
      // Limpa os campos do formulário após a criação bem-sucedida
      document.getElementById('create-email').value = '';
      document.getElementById('create-firstName').value = '';
      document.getElementById('create-lastName').value = '';
      document.getElementById('create-phone').value = '';
  
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
    this.showCreateUserButton = true;
    this.showFormUser = false;
    console.log("Salvar usuário");
  },
  
  //fechar o formulario
  async closeNewUser(){
    this.showCreateUserButton = true;
    this.showFormUser = false;
    console.log("Fechar formulário");
  },
  

});

// Monta a aplicação no elemento com o ID 'app'
app.mount("#app");
