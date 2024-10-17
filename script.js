document.getElementById('download-images-button').addEventListener('click', function() {
    const imageArray = [
        { url: 'https://example.com/image1.jpg' },
        { url: 'https://example.com/image2.jpg' },
        { url: 'https://example.com/image3.jpg' }
        // Add more image URLs here
    ];

    const outputDiv = document.getElementById('output');

    // Function to download image and return a promise
    function loadImage(image) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = image.url;

            img.onload = () => resolve(img);
            img.onerror = () => reject(`Failed to load image's URL: ${image.url}`);
        });
    }

    // Create an array of promises
    const imagePromises = imageArray.map(imgObj => loadImage(imgObj));

    // Using Promise.all to download all images in parallel
    Promise.all(imagePromises)
        .then(images => {
            // If all images are successfully loaded, append them to the output div
            images.forEach(img => {
                outputDiv.appendChild(img);
            });
        })
        .catch(error => {
            // Handle error if any image fails to load
            outputDiv.innerHTML = `<p style="color:red">${error}</p>`;
        });
});
