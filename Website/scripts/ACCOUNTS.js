
const url = 'http://localhost:3000/user';

function handleSubmit(){
    let username = document.getElementById("usrReg");
    let password = document.getElementById("pwdReg");
    if (username.value.length < 6 || password.value.length < 6)
    {
        alert("invalid password or username");
        return;
    }
    if (accountExists(username.value, password.value) === true)
    {
        alert("username already exists");
        return;
    }
    let account = new Account(username.value, password.value);
    alert("registered successfully");
    addAccount(account, () => {
        console.log("registered successfully");
    });

}

function handleLogIn()
{
    getAllITmes()
    .then(data => {
        let username = document.getElementById("usr").value;
        let password = document.getElementById("pwd").value;

        if(accountExists(username, password, data))
        {
            let b = "Succesfully logged in as " + username;
            alert(b);
        }
        else
        {
            alert("invalid username or password!");
        }
    })

}

function accountExists(username, password, data)
{
    for(let i = 0; i < data.length; i++)
    {
        if(data[i].id === username && data[i].password === password)
        {
            return true;
        }
    }
    return  false;
}

async function getAllITmes() {
    return await fetch(url)
        .then(response => response.json())
}
function addAccount(account, success){
    fetch(url,{
        method:"POST",
        headers:{'content-type':'application/json'},
        body:JSON.stringify(account)
    }).then(()=>success());
}

class Account{
    constructor(username, password) {
        this.id = username;
        this.password = password;
    }
}