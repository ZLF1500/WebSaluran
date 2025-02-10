document.getElementById('usernameForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const newUsername = document.getElementById('newUsername').value;

    if (newUsername) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let users = JSON.parse(localStorage.getItem('users')) || [];

        const userIndex = users.findIndex(u => u.username === currentUser.username);
        if (userIndex !== -1) {
            users[userIndex].username = newUsername;
            localStorage.setItem('users', JSON.stringify(users));
            currentUser.username = newUsername;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            alert('Username berhasil diubah!');
            window.location.href = 'index.html';
        } else {
            alert('Pengguna tidak ditemukan.');
        }
    } else {
        alert('Harap masukkan username baru.');
    }
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert('Login berhasil!');
        window.location.href = 'index.html';
    } else {
        alert('Username atau password salah! Anda belum memiliki akun, silakan buat akun baru.');
        if (confirm('Apakah Anda ingin membuat akun baru?')) {
            window.location.href = 'register.html';
        }
    }
});

function logout() {
    localStorage.removeItem('currentUser');
    alert('Anda telah logout.');
    window.location.href = 'login.html';
}

// Fungsi untuk menambahkan admin
function addAdmin(username) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser.role === 'owner') {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.username === username);
        if (user) {
            user.role = 'admin';
            localStorage.setItem('users', JSON.stringify(users));
            alert(`Pengguna ${username} sekarang adalah admin.`);
        } else {
            alert(`Pengguna ${username} tidak ditemukan.`);
        }
    } else {
        alert('Anda tidak memiliki izin untuk menambahkan admin.');
    }
}
