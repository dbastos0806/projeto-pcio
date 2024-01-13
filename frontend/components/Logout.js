function logout() {
    localStorage.removeItem('isLoggedin');
    localStorage.removeItem("userToken");
    this.user = null;
    this.password = '';
    this.isLoggedin = false;
    // Redirecionar de volta para a página de login
    window.location.href = '/';
  }