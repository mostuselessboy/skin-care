// Function to add the delete button and functionality to a row
function addDeleteButton(row) {
    let deleteCell = row.insertCell(-1); // Add a new cell for the delete button
    deleteCell.innerHTML = "<button class='delete-btn'>🗑️</button>";

    // Add event listener for the delete button
    deleteCell.querySelector('.delete-btn').addEventListener('click', () => {
        let confirmDelete = confirm("Are you sure you want to delete this row?");
        if (confirmDelete) {
            row.remove(); // Remove the row from the table
            console.log('Row deleted');
        }
    });
}

// Function to add a new row to the table
document.querySelector('.add-row-btn').addEventListener('click', () => {
    let tableBody = document.querySelector('#product-table tbody');
    let newRow = document.createElement('tr'); // Create a new row

    // Create the input fields in the new row
    newRow.innerHTML = `
        <td><input type='text' placeholder='Product Link'></td>
        <td><input type='text' placeholder='Name'></td>
        <td><input type='text' placeholder='Ingredients'></td>
        <td><input type='text' placeholder='Price'></td>
    `;

    tableBody.appendChild(newRow); // Append the new row to the table body
    
    addDeleteButton(newRow); // Add the delete button to the new row

    // Log the action
    console.log('New row added');
});

// Function to open the modal for adding new column
function openColumnModal() {
    document.getElementById('column-modal').style.display = 'block';
}

// Function to close the modal
function closeColumnModal() {
    document.getElementById('column-modal').style.display = 'none';
}

// Function to add a new column to the table
function addNewColumn() {
    const columnName = document.getElementById('column-name').value;
    const columnType = document.getElementById('column-type').value;

    if (!columnName) {
        alert("Please enter a valid column name.");
        return;
    }

    // Add a new column to the table header, before the delete column
    const tableHead = document.querySelector('#product-table thead tr');
    const deleteHeader = tableHead.querySelector('th:last-child'); // Get the delete column header
    const newHeader = document.createElement('th');
    newHeader.textContent = columnName;

    // Insert the new header before the delete column header
    tableHead.insertBefore(newHeader, deleteHeader);

    // Add a new column to all existing rows in the table body, before the delete column
    const tableRows = document.querySelectorAll('#product-table tbody tr');
    tableRows.forEach(row => {
        // Insert the new cell just before the last cell (delete button)
        const deleteCell = row.querySelector('td:last-child'); // Get the delete button cell
        const newCell = document.createElement('td');

        if (columnType === 'text') {
            newCell.innerHTML = `<input type='text' placeholder='${columnName}'>`;
        } else if (columnType === 'number') {
            newCell.innerHTML = `<input type='number' placeholder='${columnName}'>`;
        } else if (columnType === 'date') {
            newCell.innerHTML = `<input type='date'>`;
        }

        // Insert the new cell before the delete cell
        row.insertBefore(newCell, deleteCell);
    });

    // Close the modal and clear input values
    closeColumnModal();
    document.getElementById('column-name').value = '';
    document.getElementById('column-type').value = 'text';

    console.log(`New column "${columnName}" of type "${columnType}" added.`);
}

// Function to enable filtering
function addFilterFunctionality() {
    const tableHead = document.querySelectorAll('#product-table thead th');
    
    tableHead.forEach((header, index) => {
        if (header.innerHTML.indexOf('<button class="filter-btn">') === -1 && header.textContent !== "Delete") {
            // Add a filter button to each column header except the "Delete" column
            header.innerHTML += ` <button class='filter-btn'>🔍</button>`;
            
            header.querySelector('.filter-btn').addEventListener('click', () => {
                const filterValue = prompt(`Enter filter value for ${header.textContent}`);
                filterTable(index, filterValue);
            });
        }
    });
}

// Function to filter table based on column index and filter value
function filterTable(columnIndex, filterValue) {
    const rows = document.querySelectorAll('#product-table tbody tr');
    
    rows.forEach(row => {
        const cell = row.cells[columnIndex];
        if (cell) {
            const cellValue = cell.querySelector('input') ? cell.querySelector('input').value : cell.textContent;
            if (cellValue.toLowerCase().includes(filterValue.toLowerCase())) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    });
}

// Function to reset all filters
function resetFilters() {
    const rows = document.querySelectorAll('#product-table tbody tr');
    rows.forEach(row => {
        row.style.display = ''; // Show all rows
    });
}

// Event listeners for adding columns
document.querySelector('.add-column-btn').addEventListener('click', openColumnModal);
document.getElementById('create-column-btn').addEventListener('click', addNewColumn);
document.getElementById('close-modal-btn').addEventListener('click', closeColumnModal);

// Initialize filter functionality on load
addFilterFunctionality();

// Event listener to reset filters
document.querySelector('.reset-filters-btn').addEventListener('click', resetFilters);
