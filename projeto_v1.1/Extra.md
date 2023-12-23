<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Title for the login page -->
    <title>F1 Login</title>

    <!-- External stylesheets and scripts for animations and Bootstrap -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
      rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

    <!-- Custom styles for the login page -->
    <link rel="stylesheet" href="/assets/styles/styles.css" />
  </head>
  <body>
    <main class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <!-- Logo and title -->

          <!-- Bootstrap Card -->
          <div class="card border-light mb-3">
            <div class="card-header">Login - Formula 1</div>
            <div class="card-body">
              <!-- Login Form -->
              <div v-scope="loginApp" class="animate__animated animate__fadeIn">
                <form v-if="!isLoggedin" @submit.prevent="login">
                  <!-- Username input field -->
                  <div class="mb-3">
                    <input
                      type="text"
                      v-model="username"
                      placeholder="Username"
                      class="form-control" />
                  </div>

                  <!-- Password input field -->
                  <div class="mb-3">
                    <input
                      type="password"
                      v-model="password"
                      placeholder="Password"
                      class="form-control" />
                  </div>

                  <!-- Login button -->
                  <button
                    type="submit"
                    :area-busy="isLoading.toString()"
                    class="btn btn-primary login-btn">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- JavaScript module for handling login functionality -->
    <script type="module" src="./components/Login.js"></script>
  </body>
</html>
