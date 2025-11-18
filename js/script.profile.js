const imgProfileUser = document.getElementById("imgProfileUser");
const userName = document.getElementById("name");
const userMail = document.getElementById("mail");
const btnSaveChanges = document.getElementById("btnSaveChanges");
const back = document.getElementById("btnBack").addEventListener("click",()=>{window.history.back()});
const urlAvatarP = document.getElementById("urlAvatarP");
const urlAvatar = document.getElementById("urlAvatar");
const btnCloseSession = document.getElementById("btnCloseSession").addEventListener("click",()=>{sessionStorage.removeItem("token");window.location.reload()});
let userNameOriginal;
let userMailOriginal;
let urlAvatarOriginal;
let userId;
let changedName = false;
let changedMail = false;
let changedAvatar = false;

if(!sessionStorage.getItem("token")){
    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded",async function(e){
    e.preventDefault();
    try{
        const res = await fetch("https://api.escuelajs.co/api/v1/auth/profile",{
            method: "GET",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${sessionStorage.getItem("token")}`
            }});
        const data = await res.json();
        imgProfileUser.src = `https://corsproxy.io/?${data.avatar}`;
        userName.textContent = data.name;
        userMail.textContent = data.email;
        userId = data.id;
        urlAvatar.textContent = data.avatar;

        userNameOriginal = data.name;
        userMailOriginal = data.email;
        urlAvatarOriginal = data.avatar;
    }catch(x){
        console.log("Error con: ",x);
    }
});


userName.addEventListener("input",function(e){
    e.preventDefault();
    if(userName.value != userNameOriginal){
        userName.style.border = "2px solid crimson";
        changedName = true;
    }else{
        userName.style.border = "1px solid black";
        changedName = false;
    }
    showChanges();
});
userName.addEventListener("keydown",function(e){ if(e.key == "Enter") e.preventDefault() });

userMail.addEventListener("input",function(e){
    e.preventDefault();
    if(userMail.value != userMailOriginal){
        userMail.style.border = "2px solid crimson";
        changedMail = true;
    }else{
        userMail.style.border = "1px solid black";
        changedMail = false;
    }
    showChanges();
});
userMail.addEventListener("keydown",function(e){ if(e.key == "Enter") e.preventDefault() });

imgProfileUser.addEventListener("click",function(e){
    e.preventDefault();
    if(urlAvatar.style.display == "none" && urlAvatarP.style.display == "none"){
        urlAvatar.style.display = "block";
        urlAvatarP.style.display = "block";
        urlAvatar.addEventListener("input", function(x){
            x.preventDefault();
            if(urlAvatar.value != urlAvatarOriginal){
                urlAvatar.style.border = "2px solid crimson";
                changedAvatar = true;
            }else{
                urlAvatar.style.border = "1px solid black";
                changedAvatar = false;
            }
            showChanges();
        });
        urlAvatar.addEventListener("keydow",function(x){ if(x.key == "Enter") x.preventDefault()});
    }
});

function showChanges(){
    if(changedName == true || changedMail == true || changedAvatar == true){
        btnSaveChanges.style.display = "block";
    }
    if(changedName == false && changedMail == false && changedAvatar == false){
        btnSaveChanges.style.display = "none";
    }
}

btnSaveChanges.addEventListener("click",function(e){
    e.preventDefault();
    if(changedName == true){
        changeUserData("name",userName.value);
        userName.style.border = "1px solid black";
        btnSaveChanges.style.display = "none";
    }
    if(changedMail == true){
        changeUserData("email",userMail.value);
        userMail.style.border = "1px solid black";
        btnSaveChanges.style.display = "none";
    }
    if(changedAvatar == true){
        changeUserData("avatar", urlAvatar.value);
        console.log(urlAvatar.value);
        urlAvatar.style.border = "1px solid black";
        btnSaveChanges.style.display = "none";
    }
});
document.addEventListener("keydown", function(e){
    if(e.key == "Enter"){
        e.preventDefault();
        btnSaveChanges.click();
    }
});


async function changeUserData(data, value){
    try{
        const updateData = {};
        updateData[data] = value; 
        console.log(updateData);

        await fetch(`https://api.escuelajs.co/api/v1/users/${userId}`,{
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${sessionStorage.getItem("token")}`
            },
            body : JSON.stringify(updateData),
            mode : "cors",
            credentials : "omit"
        });
        location.reload();
    }catch (x){
        console.log(x);
    }
}
