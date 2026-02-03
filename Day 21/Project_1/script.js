// ==============================
// EVENT DATA - List of events
// ==============================
var events = [
    { id: 1, title: "Swimming Pool Party", description: "Fun pool party with music", participants: 10 },
    { id: 2, title: "Yoga Class", description: "Morning yoga for everyone", participants: 5 },
    { id: 3, title: "BBQ Dinner", description: "Evening BBQ with friends", participants: 15 }
];

// Variable to track which event is selected
var selectedEvent = null;

// ==============================
// STEP 1: Get HTML elements
// ==============================
var eventList = document.getElementById("eventList");
var eventTitle = document.getElementById("eventTitle");
var eventDesc = document.getElementById("eventDesc");
var count = document.getElementById("count");
var registerBtn = document.getElementById("registerBtn");
var unregisterBtn = document.getElementById("unregisterBtn");
var addEventBtn = document.getElementById("addEventBtn");
var newEventTitle = document.getElementById("newEventTitle");
var newEventDesc = document.getElementById("newEventDesc");
var newEventCount = document.getElementById("newEventCount");

// ==============================
// STEP 2: Show all events
// ==============================
function showEvents() {
    // Clear the list first
    eventList.innerHTML = "";
    
    // Loop through each event
    for (var i = 0; i < events.length; i++) {
        // Create new list item
        var li = document.createElement("li");
        li.textContent = events[i].title + " (" + events[i].participants + ")";
        
        // Add click event to select this event
        li.onclick = function() {
            selectEvent(this);
        };
        
        // Add to list
        eventList.appendChild(li);
    }
}

// ==============================
// STEP 3: Select an event
// ==============================
function selectEvent(liElement) {
    // Get the event title from the clicked item
    var title = liElement.textContent.split(" (")[0];
    
    // Find the event in our array
    for (var i = 0; i < events.length; i++) {
        if (events[i].title === title) {
            selectedEvent = events[i];
            break;
        }
    }
    
    // Update the details display
    eventTitle.textContent = selectedEvent.title;
    eventDesc.textContent = selectedEvent.description;
    count.textContent = selectedEvent.participants;
    
    // Highlight selected event
    var allItems = eventList.getElementsByTagName("li");
    for (var j = 0; j < allItems.length; j++) {
        allItems[j].style.backgroundColor = "white";
    }
    liElement.style.backgroundColor = "orange";
}

// ==============================
// STEP 4: Register for event
// ==============================
registerBtn.onclick = function() {
    if (selectedEvent === null) {
        alert("Please select an event first!");
        return;
    }
    
    // Increase participants
    selectedEvent.participants++;
    
    // Update display
    count.textContent = selectedEvent.participants;
    
    // Refresh event list
    showEvents();
    
    alert("You registered for " + selectedEvent.title + "!");
};

// ==============================
// STEP 5: Unregister from event
// ==============================
unregisterBtn.onclick = function() {
    if (selectedEvent === null) {
        alert("Please select an event first!");
        return;
    }
    
    // Decrease participants
    selectedEvent.participants--;
    
    // Update display
    count.textContent = selectedEvent.participants;
    
    // Refresh event list
    showEvents();
    
    alert("You unregistered from " + selectedEvent.title + "!");
};

// ==============================
// STEP 6: Add new event
// ==============================
addEventBtn.onclick = function() {
    // Get input values
    var title = newEventTitle.value;
    var desc = newEventDesc.value;
    var countValue = newEventCount.value;
    
    // Check if inputs are empty
    if (title === "" || desc === "") {
        alert("Please fill in all fields!");
        return;
    }
    
    // Create new event object
    var newEvent = {
        id: events.length + 1,
        title: title,
        description: desc,
        participants: parseInt(countValue)
    };
    
    // Add to array
    events.push(newEvent);
    
    // Clear inputs
    newEventTitle.value = "";
    newEventDesc.value = "";
    newEventCount.value = "0";
    
    // Refresh list
    showEvents();
    
    alert("New event added: " + title);
};

// ==============================
// STEP 7: Run on page load
// ==============================
window.onload = function() {
    const event = events.find(e => e.id === selectedEventId);
    
    if (!event) return;
    
    // Add to user's registered events
    userRegisteredEvents.add(selectedEventId);
    
    // Increment participant count (Modify Text)
    event.participants++;
    countSpan.textContent = event.participants;
    
    // Update button states
    updateButtonStates();
    
    // Refresh event list to show updated participant count
    displayEvents();
    
    // Show confirmation message
    showMessage(`Successfully registered for "${event.title}"!`, 'success');
}

// ============================================
// STEP 6: Unregister from Event (Remove / Modify)
// ============================================

// Function to unregister from an event
function unregisterFromEvent() {
    if (selectedEventId === null) {
        alert('Please select an event first!');
        return;
    }
    
    // Find the event
    const event = events.find(e => e.id === selectedEventId);
    
    if (!event) return;
    
    // Remove from user's registered events
    userRegisteredEvents.delete(selectedEventId);
    
    // Decrement participant count (Modify Text)
    event.participants--;
    countSpan.textContent = event.participants;
    
    // Update button states
    updateButtonStates();
    
    // Refresh event list to show updated participant count
    displayEvents();
    
    // Show confirmation message
    showMessage(`Successfully unregistered from "${event.title}"!`, 'success');
}

// ============================================
// STEP 7: Add New Event Dynamically (Create + Append)
// ============================================

// Function to add a new event
function addNewEvent() {
    // Get input values
    const title = newEventTitle.value.trim();
    const description = newEventDesc.value.trim();
    const participants = parseInt(newEventParticipants.value) || 0;
    
    // Validate inputs (Prevent Errors)
    if (!title) {
        showMessage('Please enter an event title!', 'error');
        return;
    }
    
    if (!description) {
        showMessage('Please enter an event description!', 'error');
        return;
    }
    
    // Create new event object
    const newEvent = {
        id: events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1,
        title: title,
        description: description,
        participants: participants
    };
    
    // Add to events array (Add Elements)
    events.push(newEvent);
    
    // Refresh event list
    displayEvents();
    
    // Clear input fields
    newEventTitle.value = '';
    newEventDesc.value = '';
    newEventParticipants.value = '0';
    
    // Show success message
    showMessage(`New event "${title}" added successfully!`, 'success');
}

// ============================================
// STEP 8: Helper Functions
// ============================================

// Function to show messages to user
function showMessage(text, type) {
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    
    // Add to DOM
    const addEventContainer = document.querySelector('.add-event-container');
    addEventContainer.insertBefore(messageDiv, addEventContainer.querySelector('h3').nextSibling);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// ============================================
// STEP 9: Event Listeners Setup
// ============================================

// Register button click event
registerBtn.addEventListener('click', registerForEvent);

// Unregister button click event
unregisterBtn.addEventListener('click', unregisterFromEvent);

// Add event button click event
addEventBtn.addEventListener('click', addNewEvent);

// ============================================
// STEP 10: Initialize Application
// ============================================

// Display events when page loads (US-01)
document.addEventListener('DOMContentLoaded', () => {
    displayEvents();
    console.log('Event Registration Dashboard loaded successfully');
    console.log(`Total events: ${events.length}`);
});

