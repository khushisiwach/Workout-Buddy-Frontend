// Store current index for each meal type, starting from 1 since 0 is pre-rendered
const mealItemIndexes = {
    breakfast: 1,
    lunch: 1,
    dinner: 1
};

// Get today's date in YYYY-MM-DD format
function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Add new meal item dynamically
function addMealItem(mealType) {
    const container = document.getElementById(`${mealType}-items`);
    const currentIndex = mealItemIndexes[mealType];

    const itemHTML = `
        <div class="meal-item-grid">
            <input type="text" placeholder="Item Name" name="${mealType}[${currentIndex}][item_name]" required>
            <input type="number" step="0.01" placeholder="Quantity (optional)" class="item-quantity" name="${mealType}[${currentIndex}][quantity]">
            <input type="number" step="0.01" placeholder="Weight (grams, optional)" name="${mealType}[${currentIndex}][weight_in_grams]">
            <button type="button" class="remove-item-button" onclick="removeMealItem(this)">X</button>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', itemHTML);
    mealItemIndexes[mealType]++;
}

// Remove meal item
function removeMealItem(button) {
    button.closest('.meal-item-grid').remove();
}

// Prefill data and set date if available
document.addEventListener("DOMContentLoaded", function () {
    const prefillData = window.prefillData || {};  // Assigned by Django template
    const selectedDate = window.selectedDate || ""; // Assigned by Django template

    // Set date field
    if (selectedDate) {
        document.getElementById("date").value = selectedDate;
    } else {
        document.getElementById("date").value = getTodayDate();
    }

    // Prefill meal data if available
    ['breakfast', 'lunch', 'dinner'].forEach(mealType => {
        const section = document.getElementById(`${mealType}-items`);
        if (prefillData[mealType]) {
            section.innerHTML = ''; // Clear existing inputs
            prefillData[mealType].forEach((item, index) => {
                const html = `
                    <div class="meal-item-grid">
                        <input type="text" name="${mealType}[${index}][item_name]" value="${item.item_name}" placeholder="Item name" required>
                        <input type="number" class="item-quantity" name="${mealType}[${index}][quantity]" value="${item.quantity}" placeholder="Quantity (e.g., 2)">
                        <input type="number" name="${mealType}[${index}][weight_in_grams]" value="${item.weight_in_grams}" placeholder="Weight (grams)">
                        <button type="button" class="remove-item-button" onclick="removeMealItem(this)">X</button>
                    </div>`;
                section.insertAdjacentHTML('beforeend', html);
            });
            mealItemIndexes[mealType] = prefillData[mealType].length;
        }
    });
});
