// approval.js
document.addEventListener('DOMContentLoaded', function() {
    const approvalList = document.getElementById('approvalList');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach((task, index) => {
        if (task.status === 'pending') {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <p>Dikirim oleh: ${task.sender} pada ${task.timestamp}</p>
                ${task.file ? `<a href="${task.file}" download>Unduh File</a>` : ''}
                ${task.photo ? `<img src="${task.photo}" alt="Foto Tugas">` : ''}
                <button onclick="approveTask(${index})">Setujui</button>
                <button onclick="rejectTask(${index})">Tolak</button>
            `;
            approvalList.appendChild(listItem);
        }
    });
});

function approveTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index].status = 'approved';
    localStorage.setItem('tasks', JSON.stringify(tasks));
    alert(`Tugas ${tasks[index].title} disetujui!`);
    location.reload();
}

function rejectTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index].status = 'rejected';
    localStorage.setItem('tasks', JSON.stringify(tasks));
    alert(`Tugas ${tasks[index].title} ditolak!`);
    location.reload();
}

function approveAllTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        if (task.status === 'pending') {
            task.status = 'approved';
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    alert('Semua tugas disetujui!');
    location.reload();
}

function rejectAllTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        if (task.status === 'pending') {
            task.status = 'rejected';
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    alert('Semua tugas ditolak!');
    location.reload();
}
