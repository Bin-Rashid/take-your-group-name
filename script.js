const nameForm = document.getElementById('nameForm');
const nameInput = document.getElementById('nameInput');
const nameList = document.getElementById('nameList');
const winnerDiv = document.getElementById('winner');
const lotteryButton = document.getElementById('lotteryButton');
const resetButton = document.getElementById('resetButton');

let names = JSON.parse(localStorage.getItem('groupNames')) || [];

function saveNames() {
  localStorage.setItem('groupNames', JSON.stringify(names));
}

function updateList() {
  nameList.innerHTML = '';
  names.forEach((name, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${name}</span>
      <button onclick="removeName(${index})">❌</button>
    `;
    nameList.appendChild(li);
  });
}

function removeName(index) {
  names.splice(index, 1);
  saveNames();
  updateList();
}

nameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newName = nameInput.value.trim();
  if (newName && !names.includes(newName)) {
    names.push(newName);
    saveNames();
    updateList();
  }
  nameInput.value = '';
});

resetButton.addEventListener('click', () => {
  if (confirm('Are you sure you want to reset all names?')) {
    names = [];
    saveNames();
    updateList();
    winnerDiv.textContent = '';
  }
});

lotteryButton.addEventListener('click', () => {
  if (names.length === 0) {
    winnerDiv.textContent = "No names to draw from!";
    return;
  }

  winnerDiv.textContent = "Picking a name...";
  winnerDiv.classList.add('loading');

  setTimeout(() => {
    const winner = names[Math.floor(Math.random() * names.length)];
    winnerDiv.classList.remove('loading');
    winnerDiv.textContent = `🎉 The Winner is: ${winner}! 🎉`;
  }, 2000);
});

updateList();
