


import { createApp, reactive } from 'https://unpkg.com/petite-vue?module';

const loginApp = reactive({
  username: '',
  password: '',
  user: null,
  isLoggedin: false,
  isLoading: false,
  async login() {
    try {
      this.isLoading = true;
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password
        })
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();

      if (data && data.token) {
        localStorage.setItem('isLoggedin', true);
        this.user = {
          id: data.id,
          username: data.username,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          image: data.image
        };
        this.isLoggedin = true;

        // Verificar o gênero e redirecionar
        if (this.user.gender === 'male') {
          window.location.href = '/admin';
        } else if (this.user.gender === 'female') {
          window.location.href = '/user';
        }
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.log("Error:", error);
      alert("Failed to Login");
    } finally {
      this.isLoading = false;
    }
  },
  logout() {
    // Remover token do localStorage
    localStorage.removeItem('isLoggedin');

    this.user = null;
    this.password = '';
    this.isLoggedin = false;
    // Redirecionar de volta para a página de login
    window.location.href = '/';
  }
  
});

createApp({ loginApp }).mount();
