document.addEventListener('DOMContentLoaded', function () {
    // Hide all content divs except the first one
    document.querySelectorAll('#contentContainer .single-post-content-wrapper').forEach((content, index) => {
        if (index === 0) {
            content.style.display = 'block';
        } else {
            content.style.display = 'none';
        }
    });

    // Add click event listeners to the buttons
    document.querySelectorAll('#buttonList button').forEach((button, index) => {
        button.addEventListener('click', function () {
            showContent(index);
        });
    });
});

function showContent(index) {
    // Reset all buttons to remove the active class
    document.querySelectorAll('#buttonList button').forEach(button => button.classList.remove('active'));

    // Add the active class to the clicked button
    document.querySelector(`#buttonList li:nth-child(${index + 1}) button`).classList.add('active');

    // Hide all content divs
    document.querySelectorAll('#contentContainer .single-post-content-wrapper').forEach(content => content.style.display = 'none');

    // Show the content for the clicked button
    document.querySelector(`#contentContainer #content${index}`).style.display = 'block';
}