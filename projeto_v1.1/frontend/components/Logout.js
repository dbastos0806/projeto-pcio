function logout() {
    localStorage.removeItem("userToken");
    window.location.href = "/";}