fetch('https://amimal.freeddns.org/Extension/isLoggedInExtension.php')
    .then(response => response.json())
    .then(data => {
        if (data.loggedIn) {
            console.log('Utilisateur connecté:', data.userPseudo);

            fetch('https://amimal.freeddns.org/Extension/isLoggedInExtension.php', {
                method: 'GET',
                credentials: 'include'
            })
            .then(response => response.json())
            .then(data => {
                let animalImage = document.getElementById('animal');
                let animalImageLink;

                if (data.sponsoredAnimalRaces && data.sponsoredAnimalRaces.length > 0) {
                    const sponsoredAnimalRace = data.sponsoredAnimalRaces[0];

                    switch (sponsoredAnimalRace) {
                        case 'Lion':
                            animalImageLink = '../assets/images/animals/Lion.png';
                            break;
                        case 'Panda roux':
                            animalImageLink = '../assets/images/animals/Panda-roux.png';
                            break;
                        case 'Panda':
                            animalImageLink = '../assets/images/animals/Panda.png';
                            break;
                        case 'Tigre':
                            animalImageLink = '../assets/images/animals/Tigre.png';
                            break;
                        case 'Loutre':
                            animalImageLink = '../assets/images/animals/Loutre.png';
                            break;
                        default:
                            animalImageLink = '../assets/images/animals/Panda-roux.png';
                            break;
                    }
                } else {
                    animalImageLink = '../assets/images/animals/Panda-roux.png';
                }

                animalImage.src = animalImageLink;
                localStorage.setItem('animalImageLink', animalImageLink);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données de l\'API :', error);
            });
        } else {
            console.log('Utilisateur non connecté');
        }
    })
    .catch(error => console.error('Erreur lors de la requête API :', error));
