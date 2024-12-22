async function checkFlaskHealth() {
    try {
        // Replace with the ngrok URL provided by the Flask app
        const apiUrl = 'https://e479-34-29-210-166.ngrok-free.app/testl';

        // Prepare the request body with an 'id'
        const requestBody = {
            id: 12345, // Example ID, you can change this to anything
            url: "httpsasdfadsf"
        };

        // Make a POST request to the /health endpoint with the request body
        const response = await fetch(apiUrl, {
            method: 'GET',
            
        });

        // Parse the JSON response
        const data = await response.json();

        // Log the response to the console
        console.log("Response from Flask server:", data);
        
        // Check the status of the response
        if (data.status === "Flask server is running great!") {
            console.log("Flask server is up and running!");
        } else {
            console.log("Flask server is down or returned an unexpected response.");
        }
    } catch (error) {
        console.error("Error while making the request:", error);
    }
}

// Call the function to check the Flask health endpoint
checkFlaskHealth();
