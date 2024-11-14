document.addEventListener('DOMContentLoaded', function() {
  fetch('https://amimal.freeddns.org/Extension/isLoggedInExtension.php')
      .then(response => response.json())
      .then(data => {
          if (!data.loggedIn) {
              // Rediriger vers la page de connexion
              window.location.href = 'https://amimal.freeddns.org/Extension/isLoggedInExtension.php';
          } else {
              console.log('Utilisateur connecté:', data.userPseudo);
          }
      })
      .catch(error => console.error('Erreur lors de la requête API:', error));
});
