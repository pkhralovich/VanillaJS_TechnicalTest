let navOptions;

window.onload = function() {
    document.getElementById("hamburguer").addEventListener("click", clickMenu);
}

function clickMenu() {
    if (!navOptions) navOptions = document.getElementById("nav-options");

    if (navOptions.style.display != "block") navOptions.style.display = "block";
    else navOptions.style.display = "none";
}
