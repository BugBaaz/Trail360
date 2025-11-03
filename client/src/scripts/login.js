document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      
      const res = await axios.post(
        `${BASE_URL_USER}/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      

      if (res.data.statusCode === 200) {
        localStorage.setItem("user",res.data.data.user)
        console.log(res.data.data);
        if (res.data.data.user.role === "admin") {
          window.location.href = "./admin/dashboard.html"
        }
        
        setTimeout(() => {
          
          window.location.href = "../../index.html";
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || "Login failed!";
      // showToast(message, false);
    }
  });

  const registerFormContainer = document.getElementById("register-form");
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit",async function (e) {
    e.preventDefault();

    
    if (window.getComputedStyle(registerFormContainer).display === "none") return;
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const role = document.getElementById("role").value
    const department = document.getElementById("department").value


    try {
        const res = await axios.post(`${BASE_URL_USER}/register`,{name, email,password,role,department},{withCredentials : true})
        console.log(res.data);
        if (res.data.statusCode === 201) {
          
          setTimeout(() => {
            window.location.reload()
          },1000)
        }
        
    } catch (error) {
        console.log(error);
        
    }
  });
}

