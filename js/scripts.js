// scripts.js
document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.getElementById('taskList');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach((task, index) => {
        if (task.status === 'approved') {
            const listItem = createListItem(task, index);
            taskList.appendChild(listItem);
        }
    });
});

document.getElementById('submissionForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Mencegah submit form default
    
    // Ambil nilai form
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const file = document.getElementById('file').files[0];
    const photo = document.getElementById('photo').files[0];
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (title && description && currentUser) {
        // Simpan tugas di local storage untuk sementara
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const newTask = {
            title,
            description,
            file: file ? URL.createObjectURL(file) : null,
            photo: photo ? URL.createObjectURL(photo) : null,
            status: 'pending',
            sender: currentUser.username,
            timestamp: new Date().toLocaleString()
        };
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        
        alert('Tugas berhasil diajukan!');
        // Reset form
        document.getElementById('submissionForm').reset();
    } else {
        alert('Harap lengkapi judul, deskripsi, dan pastikan Anda telah login!');
    }
});

function createListItem(task, index) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <p>Dikirim oleh: ${task.sender} pada ${task.timestamp}</p>
        ${task.file ? `<a href="${task.file}" download>Unduh File</a>` : ''}
        ${task.photo ? `<img src="${task.photo}" alt="Foto Tugas">` : ''}
        <button onclick="deleteTask(${index})">Hapus Tugas</button>
    `;
    return listItem;
}

function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    alert('Tugas berhasil dihapus.');
    location.reload();
}

function deleteAllTasks() {
    localStorage.removeItem('tasks');
    alert('Semua tugas berhasil dihapus.');
    location.reload();
}
