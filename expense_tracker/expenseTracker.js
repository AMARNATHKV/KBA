let descriptions = [];
let amounts = [];
let categories = [];

function addexpense() {
    const descriptionInput = document.getElementById("description");
    const amountInput = document.getElementById("amount");
    const categoryInput = document.getElementById("category");
    const expenseList = document.getElementById("expenselist");

    let description = descriptionInput.value.trim();
    let amount = Number(amountInput.value.trim());
    let category = Number(categoryInput.value.trim());

    if (description !== "" && !isNaN(amount) && (category >= 1 && category <= 3)) {
        descriptions.push(description);
        amounts.push(amount);
        categories.push(category);

        const li = document.createElement("li");
        li.textContent = `Expense Description: ${description}, Expense Amount: ${amount}`;

        switch (category) {
            case 1:
                li.classList.add("food");
                break;
            case 2:
                li.classList.add("transport");
                break;
            case 3:
                li.classList.add("entertainment");
                break;
        }

        const completeButton = document.createElement("button");
        completeButton.textContent = "Complete";
        completeButton.onclick = function () {
            li.classList.toggle("completed");
        };
        li.appendChild(completeButton);

        const editButton = document.createElement("button");
        editButton.textContent = "Edit Description";
        editButton.onclick = function () {
            let newdes = prompt("Enter new Description", description);
            if (newdes !== null && newdes.trim() !== "") {
                const descriptionIndex = descriptions.indexOf(description);
                descriptions[descriptionIndex] = newdes;
                li.firstChild.textContent = `Expense Description: ${newdes}, Expense Amount: ${amount}`;
                description = newdes;
            }
        };
        li.appendChild(editButton);

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.onclick = function () {
            expenseList.removeChild(li);
            const descriptionIndex = descriptions.indexOf(description);
            descriptions.splice(descriptionIndex, 1);
            amounts.splice(descriptionIndex, 1);
            categories.splice(descriptionIndex, 1);
        };
        li.appendChild(removeButton);

        expenseList.appendChild(li);
        descriptionInput.value = '';
        amountInput.value = '';
        categoryInput.value = '';
    } else {
        alert("Invalid input. Please enter a valid description, amount, and category.");
    }
}
