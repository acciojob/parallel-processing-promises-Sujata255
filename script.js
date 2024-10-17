//your JS code here. If required.
// Get the output and button elements from the HTML
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

// Array of image URLs
const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to load a single image
function loadImage(image) {
  return new Promise((resolve, reject) => {
    const img = new Image(); // Create a new image element
    img.src = image.url;

    // Resolve when the image loads successfully
    img.onload = () => resolve(img);

    // Reject if the image fails to load
    img.onerror = () => reject(`Failed to load image's URL: ${image.url}`);
  });
}

// Event listener for the button click
btn.addEventListener("click", () => {
  output.innerHTML = ''; // Clear the output before downloading new images

  // Create an array of promises for each image
  const promises = images.map(image => loadImage(image));

  // Use Promise.all to download all images in parallel
  Promise.all(promises)
    .then(results => {
      // Append each loaded image to the output div
      results.forEach(img => {
        output.appendChild(img);
      });
    })
    .catch(error => {
      // Display error message in the output div if any image fails to load
      output.innerHTML = `<p id="error">${error}</p>`;
    });
});
