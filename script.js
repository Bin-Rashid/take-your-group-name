const nameForm = document.getElementById('nameForm');
const nameInput = document.getElementById('nameInput');
const nameList = document.getElementById('nameList');
const winnerDiv = document.getElementById('winner');
const lotteryButton = document.getElementById('lotteryButton');

// Load saved names
let names = JSON.parse(localStorage.getItem('groupNames')) || [];

function updateList() {
  nameList.innerHTML = '';
  names.forEach((name, index) => {
    const li = document.createElement('li');
    li.textContent = name;
    nameList.appendChild(li);
  });
}

nameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newName = nameInput.value.trim();
  if (newName && !names.includes(newName)) {
    names.push(newName);
    localStorage.setItem('groupNames', JSON.stringify(names));
    updateList();
  }
  nameInput.value = '';
});

lotteryButton.addEventListener('click', () => {
  if (names.length === 0) {
    winnerDiv.textContent = "No names to draw from!";
    return;
  }
  const winner = names[Math.floor(Math.random() * names.length)];
  winnerDiv.textContent = `🎉 The Winner is: ${winner}! 🎉`;
});

updateList();
