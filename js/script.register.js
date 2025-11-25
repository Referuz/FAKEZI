const back = document.getElementById("back");
back.style.cursor = "pointer";
back.addEventListener("click",()=>{window.history.back()});
document.getElementById("form").addEventListener("submit", async function(e){
    e.preventDefault();
    const nameBox = document.getElementById("name");
    const mailBox = document.getElementById("email");
    const passwordBox = document.getElementById("password");
    const name = nameBox.value.trim();
    const mail = mailBox.value.trim();
    const password = passwordBox.value.trim();

    if(name && mail && password){
        try{
            const createUser = await fetch("https://api.escuelajs.co/api/v1/users/",{
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify({
                    name : name,
                    email : mail,
                    password : password,
                    avatar : "https://wallpapers.com/images/featured/imagen-de-perfil-de-ghostface-tppvexcfqlv0dmg0.jpg"
                })
            });
            const data = await createUser.json();
            if(data.id){
                console.log(data.id);
                window.location.href = "index.html";
            }else{
                console.error("ERROR DE REGISTRO",data);
            }
        }catch (x){
            console.log(x);
        }
    }
});