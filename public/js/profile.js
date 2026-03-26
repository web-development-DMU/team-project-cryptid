document.title="My Profile";

let count = 1;
function displayAllItems(order) {// order will be alphabetical (regardless of state), locked-first (alphabetical) and unlocked-first (alphabetical)
    //will use item and user database to fetch all items and determine which are locked/unlocked
    //for now will just use the placeholder

    // Get item container
    const grid = document.getElementById("container-all-items");

    // Loop to create elements and display placeholder items (will be replaced later with actual items if we make them)
    for (count; count <= 21; count ++) {
        let item = document.createElement("img");
        item.src = "/imgs/collectible-placeholder" + (count % 2 == 0 ? "-dark.png" : ".jpg");
        item.classList.add("item");
        
        grid.appendChild(item);
    }
}

displayAllItems();