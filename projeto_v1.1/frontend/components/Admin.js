    // Verificar se o usuário está autenticado
  const userToken = localStorage.getItem("isLoggedin");
  if (!userToken) {
    // Se não estiver autenticado, redirecionar para a página de login
    window.location.href = "/";
  } 