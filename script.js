//I have no idea how it works, I used ChatGPT for it :)

window.addEventListener('DOMContentLoaded', (event) => {
    let button = document.getElementById('pizza-button');
    const slices = document.querySelectorAll('[id^=slice]');
    let sliceIndex = 0;

    button.addEventListener('click', () => {
        let sliceId = `slice-${sliceIndex + 1}`;

        if (sliceIndex > 4) {
            let elementsToRemove = document.querySelectorAll(`[id=${sliceId}]`);
            elementsToRemove.forEach((element) => {
                element.remove();
            });

            let message = document.createElement('p');
            var div = document.getElementsByClassName('pizza')[0];
            message.textContent = "Sorry, we are all out of pizza!";
            div.appendChild(message);
            button.disabled = true; // Disable the button to prevent further clicks
        } else {
            // Remove elements with the current sliceId
            let elementsToRemove = document.querySelectorAll(`[id=${sliceId}]`);
            elementsToRemove.forEach((element) => {
                element.remove();
            });

            sliceIndex = (sliceIndex + 1) % slices.length;
        }
    });
});
