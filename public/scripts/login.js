document.addEventListener("DOMContentLoaded", function () {

  // Input configuration

  const inputs = document.querySelectorAll(".input");

  function addcl() {
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
  }

  function remcl() {
    let parent = this.parentNode.parentNode;
    if(this.value == ""){
      parent.classList.remove("focus");
    }
  }

  inputs.forEach(input => {
    input.addEventListener("focus", addcl);
    input.addEventListener("blur", remcl);
  });


  // Button to show and hide the password

  const toggleIcon = document.querySelector('.toggle-icon');
  const passwordInput = document.querySelector('.input[type="password"]');

  toggleIcon.style.display = 'none';

  toggleIcon.addEventListener('click', function () {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      toggleIcon.classList.remove('fa-eye');
      toggleIcon.classList.add('fa-eye-slash');
    } else {
      passwordInput.type = 'password';
      toggleIcon.classList.remove('fa-eye-slash');
      toggleIcon.classList.add('fa-eye');
    }
  });

  passwordInput.addEventListener('input', function () {
    if (passwordInput.value.length > 0) {
      toggleIcon.style.display = 'block';
    } else {
      toggleIcon.style.display = 'none';
    }
  });

});
