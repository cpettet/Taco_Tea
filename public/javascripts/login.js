window.addEventListener("DOMContentLoaded", async ()=> {
    const demoUserLogin = document.querySelector(".demo")
    demoUserLogin.addEventListener("click", async(e) => {
        e.preventDefault();
        try {
            const response = await fetch("/users/demo");
            if (response.status !== 200) throw new Error("Login unsuccessful");
            const data = await response.json();
            window.location.replace("/");
        } catch(e) {
            const errorBox = document.querySelector(".error-box");
            errorBox.hidden = false;
            errorBox.innerHTML = e;
            errorBox.style.textAlign = "center";
            errorBox.style.marginTop = "1rem";
        }
    });
});