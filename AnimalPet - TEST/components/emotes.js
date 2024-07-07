let emote = 'none';
const emoteImage = document.getElementById('emote');

export function displayEmote(emote){

    emoteImage.src = `assets/images/emotes/${emote}.png`;
    
    setTimeout(() => {
        emoteImage.src = `assets/images/emotes/none.png`;
    }, 2000);
}