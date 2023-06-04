window.addEventListener('DOMContentLoaded', (event) => {
    let button = document.getElementById('pizza-button');
    let slices = document.querySelectorAll('[id^=slice]');
    let sliceIndex = 0;

    button.addEventListener('click', () => {
        let sliceId = `slice-${sliceIndex + 1}`;

        if (sliceIndex > 5) {
            let message = document.createElement('p');
            message.textContent = "Sorry, we are all out of pizza!";
            message.classList.add('svg');
            document.body.appendChild(message);
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
