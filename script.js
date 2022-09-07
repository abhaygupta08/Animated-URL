const anchors = document.querySelectorAll("a");
anchors.forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
        e.preventDefault();
        customNavigate(
            anchor.href.replace(window.location.origin, ""),
            anchor.target
        );
    });
});


