const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');

// We need an array to hold our state
const items = [];

function handleSubmit(e) {
	e.preventDefault();
	console.log('submitted!!');
	const name = e.currentTarget.item.value;
	const item = {
		name: name,
		id: Date.now(),
		complete: false,
	};
  // Push the items into our state
  items.push(item);
  console.log(`You have ${items.length} item in your state`);
  // Clear the form
  e.target.reset();
  displayItems()
}

function displayItems() {
  const html = items.map(item => {
    return `<li class="shopping-item">
    <input type="checkbox">
    <span class="itemName">${item.name}</span>
    <button aria-label="Remove ${item.name}">&times;</button>

    </li>`
  }).join('');
  list.innerHTML = html;
}

shoppingForm.addEventListener('submit', handleSubmit);
