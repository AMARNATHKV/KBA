const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const library = new Map();

function askCommand() {
    console.log("Welcome to the World of Books!");
    console.log("Available commands: add, remove, search, update, summary, exit");
    rl.question("Enter a Command: ", function(command) {
        switch(command.trim().toLowerCase()) {
            case 'add':
                addItemPrompt();
                break;
            case 'remove':
                removeItemPrompt();
                break;
            case 'search':
                searchItemsPrompt();
                break;
            case 'update':
                updateItemPrompt();
                break;
            case 'summary':
                printSummary();
                askCommand();
                break;
            case 'exit':
                rl.close();
                break;
            default:
                console.log("Invalid Command. Please try again!");
                askCommand();
                break;
        }
    });
}

// Function to add item prompt
function addItemPrompt() {
    rl.question("Enter book id: ", function(id) {
        rl.question("Enter book name: ", function(name) {
            rl.question("Enter book author: ", function(author) {
                addItem(id, name, author);
                askCommand();
            });
        });
    });
}

// Function to add an item
function addItem(id, name, author) {
    if (library.has(id)) {
        console.log(`Error: Item with ID ${id} already exists.`);
    } else {
        library.set(id, { name, author });
        console.log(`Item with ID ${id} added.`);
    }
}

// Function to remove item prompt
function removeItemPrompt() {
    rl.question("Enter book id: ", function(id) {
        removeItem(id);
        askCommand();
    });
}

// Function to remove an item
function removeItem(id) {
    if (library.has(id)) {
        library.delete(id);
        console.log(`Item with ID ${id} removed.`);
    } else {
        console.log(`Error: Item with ID ${id} not found.`);
    }
}

// Function to search for items prompt
function searchItemsPrompt() {
    rl.question("Enter search term: ", function(searchTerm) {
        searchItems(searchTerm);
        askCommand();
    });
}

// Function to search for items
function searchItems(searchTerm) {
    const results = [];
    for (const [id, item] of library) {
        if (id.includes(searchTerm) || item.name.includes(searchTerm) || item.author.includes(searchTerm)) {
            results.push({ id, ...item });
        }
    }
    if (results.length > 0) {
        console.log('Search Results:', results);
    } else {
        console.log('No items found!');
    }
}

// Function to update item prompt
function updateItemPrompt() {
    rl.question("Enter item id: ", function(id) {
        rl.question("Enter item name: ", function(name) {
            rl.question("Enter item author: ", function(author) {
                updateItem(id, name, author);
                askCommand();
            });
        });
    });
}

// Function to update an item
function updateItem(id, newName, newAuthor) {
    if (library.has(id)) {
        const item = library.get(id);
        item.name = newName || item.name;
        item.author = newAuthor || item.author;
        library.set(id, item);
        console.log(`Item with ID ${id} updated.`);
    } else {
        console.log(`Error: Item with ID ${id} not found.`);
    }
}

// Function to print a summary report of all items
function printSummary() {
    if (library.size > 0) {
        console.log('Library Summary:');
        for (const [id, item] of library) {
            console.log(`ID: ${id}, Name: ${item.name}, Author: ${item.author}`);
        }
    } else {
        console.log('Library is empty.');
    }
}

askCommand();
