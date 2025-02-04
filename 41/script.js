const form = document.querySelector("form");
if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.querySelector("#name").value.trim();
        const email = document.querySelector("#email").value.trim();
        const message = document.querySelector("#message").value.trim();

        if (name && email && message) {
            alert("We received your message and will get back to you soon.");
            this.reset();
        } else {
            alert("Fill out all fields before submitting.");
        }
    });
}