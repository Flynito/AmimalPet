document.addEventListener('DOMContentLoaded', function() {
    const selectRace = document.getElementById('selectRace');
    const updateAnimalBtn = document.getElementById('updateAnimalBtn');

    if (!selectRace) {
        console.error('Element with ID "selectRace" not found.');
        return;
    }

    // Gérer le clic sur le bouton de validation
    updateAnimalBtn.addEventListener('click', function() {
        const selectedRace = selectRace.value;
        const animalImage = window.opener.document.getElementById('animal');

        if (animalImage) {
            switch (selectedRace) {
                case 'Panda roux':
                    animalImage.src = 'assets/images/animals/Panda-roux.png';
                    break;
                case 'Panda':
                    animalImage.src = 'assets/images/animals/Panda.png';
                    break;
                case 'Tigre':
                    animalImage.src = 'assets/images/animals/Tigre.png';
                    break;
                case 'Lion':
                    animalImage.src = 'assets/images/animals/Lion.png';
                    break;
                case 'Loutre':
                    animalImage.src = 'assets/images/animals/Loutre.png';
                    break;
                default:
                    animalImage.src = 'assets/images/animals/default.png';
                    break;
            }
            window.close(); // Fermer la fenêtre actuelle
        } else {
            console.error('Element with ID "animal" not found in the parent window.');
        }
    });
});
