// Planner (todo list)
function addTodo() {
  const input = document.getElementById('todo-input');
  const list = document.getElementById('todo-list');
  if (!input || !list) return;
  const text = input.value.trim();
  if (!text) return;
  const li = document.createElement('li');
  li.className = 'flex items-center justify-between rounded-lg px-3 py-2 bg-white/10 border border-white/20';
  li.innerHTML = `<span>${text}</span><button class="text-sm underline" onclick="this.parentElement.remove(); saveTodos();">Remove</button>`;
  list.appendChild(li);
  input.value = '';
  saveTodos();
  input.focus();
}

function saveTodos() {
  const list = document.getElementById('todo-list');
  if (!list) return;
  const items = Array.from(list.querySelectorAll('li span')).map(s => s.textContent);
  localStorage.setItem('planner.todos', JSON.stringify(items));
}

function loadTodos() {
  const list = document.getElementById('todo-list');
  if (!list) return;
  const items = JSON.parse(localStorage.getItem('planner.todos') || '[]');
  items.forEach(t => {
    const li = document.createElement('li');
    li.className = 'flex items-center justify-between rounded-lg px-3 py-2 bg-white/10 border border-white/20';
    li.innerHTML = `<span>${t}</span><button class="text-sm underline" onclick="this.parentElement.remove(); saveTodos();">Remove</button>`;
    list.appendChild(li);
  });
}

// Budget
function saveBudget() {
  const ids = ['b-transport','b-stay','b-food','b-activities','b-misc'];
  const vals = {};
  ids.forEach(id => {
    const el = document.getElementById(id);
    vals[id] = Number(el && el.value ? el.value : 0);
  });
  localStorage.setItem('budget.values', JSON.stringify(vals));
  renderBudgetTotal();
}

function loadBudget() {
  const raw = localStorage.getItem('budget.values');
  if (!raw) return;
  const vals = JSON.parse(raw);
  Object.entries(vals).forEach(([k,v]) => {
    const el = document.getElementById(k);
    if (el) el.value = v;
  });
  renderBudgetTotal();
}

function renderBudgetTotal() {
  const ids = ['b-transport','b-stay','b-food','b-activities','b-misc'];
  let sum = 0;
  ids.forEach(id => {
    const el = document.getElementById(id);
    sum += Number(el && el.value ? el.value : 0);
  });
  const out = document.getElementById('b-total');
  if (out) out.textContent = String(sum);
}

document.addEventListener('DOMContentLoaded', () => {
  loadTodos();
  loadBudget();
});
