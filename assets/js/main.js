document.addEventListener('DOMContentLoaded', () => {
    const hourButtons = document.querySelectorAll('.hourButton');
    const hoursCommittedInput = document.getElementById('hoursCommitted');

    hourButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Set the value of the hidden input based on the button clicked
            hoursCommittedInput.value = this.getAttribute('data-hours');
        });
    });

    document.getElementById('signupForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Collect form data
        const formData = new FormData(this);
        const data = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            zipCode: formData.get('zipCode'),
            email: formData.get('email'),
            hoursCommitted: formData.get('hoursCommitted')
        };

        // Send POST request to the Flask back-end
        fetch('https://your-flask-backend.herokuapp.com/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('responseMessage').innerText = 'Signup successful!';
            // Optionally, handle the response data here
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('responseMessage').innerText = 'Signup failed. Please try again.';
        });
    });
});
