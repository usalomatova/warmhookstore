

document.getElementById("checkBtn").addEventListener("click", function() {
    const A = parseFloat(document.getElementById("a").value);
    const H = parseFloat(document.getElementById("h").value);
    const R = parseFloat(document.getElementById("r").value);
    const M = parseFloat(document.getElementById("m").value);
    const result = document.getElementById("result");

    if (isNaN(A) || isNaN(H) || isNaN(R) || isNaN(M) || A <= 0 || H <= 0 || R <= 0 || M <= 0) {
        result.innerHTML = "Введите корректные положительные значения!";
        result.style.color = "red";
        return;
    }

    const cubeVolume = Math.pow(A, 3);
    const cylinderVolume = Math.PI * Math.pow(R, 2) * H;

    let message = "";
    let color = "#222"; 

    if (M <= cubeVolume && M <= cylinderVolume) {
        message = "Жидкость помещается в обе емкости.";
    } else if (M <= cubeVolume) {
        message = "Жидкость помещается только в кубическую ёмкость.";
    } else if (M <= cylinderVolume) {
        message = "Жидкость помещается только в цилиндрическую ёмкость.";
    } else {
        message = "Жидкость не помещается ни в одну ёмкость.";
        color = "darkred";
    }

    result.innerHTML = message;
    result.style.color = color;
});