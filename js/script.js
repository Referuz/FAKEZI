document.getElementById("register").addEventListener("click",()=>{window.location.href="register.html"});

document.getElementById("form").addEventListener("submit", async function(event){
    event.preventDefault();
    const mailBox = document.getElementById("mail");
    const mail = mailBox.value.trim();
    const passwordBox = document.getElementById("password");
    const password = passwordBox.value.trim();
    if(mail && password){
        try{
            const res = await fetch("https://api.escuelajs.co/api/v1/auth/login",{
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify({
                email : mail,
                password : password  
            })});
            const data = await res.json();
            if(data.access_token){
                sessionStorage.setItem("token", data.access_token);
                window.location.href = "store.html";
            }
        }catch(x){
            console.log(x);
        }
    }else{
        if(!mail) mailBox.style.border = "2px solid red";
        else mailBox.style.border = "none";
        if(!password) passwordBox.style.border = "2px solid red";
        else passwordBox.style.border = "none";
    }
    
});