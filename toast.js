function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.classList.add('toast', type);
  toast.innerText = message;
  console.log(message);
  

  container.appendChild(toast);


  setTimeout(() => {
    toast.remove();
  }, 3000);
}
