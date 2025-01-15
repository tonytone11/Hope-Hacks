// google translate functionality
function googleTranslateElementInit() {
  new google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
}

document
  .getElementById("search-container")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const city = document.getElementById("city").value.trim();
    const state = document.getElementById("state").value.trim();
    const resultsDiv = document.getElementById("results");

    // Clear previous results
    resultsDiv.innerHTML = "";

    // Check for empty inputs
    if (!city || !state) {
      resultsDiv.innerHTML = `<p>Please provide both city and state.</p>`;
      return;
    }

    try {
      const response = await fetch(
        `/data/api/resources?city=${encodeURIComponent(city)}&state=${encodeURIComponent(state)}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      console.log("API Response Data:", data); // <-- Log the response data

      // Check if data is an empty array
      if (!Array.isArray(data) || data.length === 0) {
        resultsDiv.innerHTML = `<p>No resources found for the given location.</p>`;
        return;
      }

      // Iterate through each resource in the array
      data.forEach((item, index) => {
        console.log(`Item ${index}:`, item); // <-- Log each item for debugging

        // Create a new div for each resource with class "result-item"
        const resultItemDiv = document.createElement("div");
        resultItemDiv.classList.add("result-item");

        // Populate the div with the resource data
        resultItemDiv.innerHTML = `
          <p><strong>Name:</strong> ${item.name || "N/A"}</p>
          <p><strong>City:</strong> ${item.city || "N/A"}</p>
          <p><strong>State:</strong> ${item.state || "N/A"}</p>
          <p><strong>Type:</strong> ${item.type || "N/A"}</p>
          <p><strong>Full Address:</strong> ${item.full_address || "N/A"}</p>
          <p><strong>Phone Number:</strong> ${item.phone_number || "N/A"}</p>
          <p><strong>Business Hours:</strong> ${item.business_hours || "N/A"}</p>
        `;

        // Append the new result item div to the results container
        resultsDiv.appendChild(resultItemDiv);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      resultsDiv.innerHTML = `<p>Error fetching data. Please try again later.</p>`;
    }
  });
