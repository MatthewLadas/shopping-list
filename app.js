const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');

// We need an array to hold our state
let items = [];

function handleSubmit(e) {
	e.preventDefault();
	console.log('submitted!!');
	const name = e.currentTarget.item.value;
	if (!name) return;

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
	// Fire off a custom event that will tell anyone else who cares that the items have been updated!
	list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function displayItems() {
	const html = items
		.map(item => {
			return `<li class="shopping-item">
    <input type="checkbox" value="${item.id}" ${item.complete && 'checked'}>
    <span class="itemName">${item.name}</span>
    <button aria-label="Remove ${item.name} value="${item.id}">&times;</button>
    </li>`;
		})
		.join('');
	list.innerHTML = html;
}

function mirrorToLocalStorage() {
	console.info('Saving items to local storage');
	localStorage.setItem('items', JSON.stringify(items));
}

function restoreFromLocalStorage() {
	console.info('Restoring from LS');
	// Pull the items from Local Storage (LS)
	const lsItems = JSON.parse(localStorage.getItem('items'));
	if (lsItems.length) {
		items.push(...lsItems);
		list.dispatchEvent(new CustomEvent('itemsUpdated'));
	}
}

function deleteItem(id) {
	console.log('DELETING ITEM', id);
	// Update our items array without this one
	items = items.filter(item => item.id !== id);
	list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function markAsComplete(id) {
	console.log('Marking as complete', id);
  const itemRef = items.find(item => item.id === id);
  itemRef.complete = !itemRef.complete;
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

shoppingForm.addEventListener('submit', handleSubmit);
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', mirrorToLocalStorage);
// Event Delegation: We listen for the click on the list (ul), but then delegate the click over to the button if that is what was clicked
list.addEventListener('click', function (e) {
	const id = parseInt(e.target.value);
	if (e.target.matches('button')) {
		deleteItem(id);
	}
	if (e.target.matches('input[type="checkbox"]')) {
		markAsComplete(id);
	}
});
restoreFromLocalStorage();
