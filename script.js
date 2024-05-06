// Get references to form elements and status message
const servoAngleInput = document.getElementById('servo-angle');
const servoControlForm = document.getElementById('servo-control-form');
const statusMessage = document.getElementById('status-message');

// Get a reference to the Firebase Realtime Database
const database = firebase.database();

// Handle form submission to update servo position and Firebase
servoControlForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  const desiredAngle = parseInt(servoAngleInput.value);

  // Validate angle input (0-180)
  if (isNaN(desiredAngle) || desiredAngle < 0 || desiredAngle > 180) {
    statusMessage.textContent = 'Invalid angle. Please enter a value between 0 and 180.';
    return;
  }

  // Update Firebase Realtime Database (replace 'rotation' with your actual parameter name)
  database.ref('Rotation').set(desiredAngle)
    .then(() => {
      statusMessage.textContent = 'Servo angle updated successfully!';
    })
    .catch((error) => {
      console.error('Error writing to Firebase:', error);
      statusMessage.textContent = 'An error occurred. Please check the console for details.';
    });
});
