// Kreiramo unikatni token za svakog pojedinacnog korisnika koji ce se koristiti za autorizaciju i autentifikaciju
function generateUniqueToken() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=[]{}|;:,.<>?';
    let token = '';

    for (let i = 0; i < characters.length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        token += characters.charAt(randomIndex);
    }

    return token;
}


export default generateUniqueToken;