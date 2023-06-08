
const url = 'http://localhost:3000/user';

let currentAccount = undefined;
let accountTextField = undefined;

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
            currentAccount = new Account(username, password);
            updateCurrentAccount();
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

function logoutButton()
{
    currentAccount = undefined;
    updateCurrentAccount();
}

function updateCurrentAccount()
{
    if(currentAccount !== undefined)
    {
        accountTextField.textContent = "Logged in as " + currentAccount.id;
        const jsonString = JSON.stringify(currentAccount);
        localStorage.setItem('personData', jsonString);

        let btn = document.createElement("button");

    }
    else
    {
        let btn = document.getElementById("logout-icon");
        btn.style.display = 'none';
        localStorage.removeItem('personData');
        accountTextField.textContent = "Not logged in";
    }
}

function init()
{
    console.log("init");
    const storedData = localStorage.getItem('personData');
    const parsedData = JSON.parse(storedData);

    if(parsedData !== null && parsedData !== undefined)
    {
        currentAccount = new Account(parsedData.id, parsedData.password);
    }


    addLogoutButton();
    accountTextField = document.getElementById("account-text");
    updateCurrentAccount();
}

function addLogoutButton() {
    // Create the button element
    let button = document.createElement("button");
    button.id = "logout-icon";
    button.className = "inline-box";
    button.onclick = logoutButton;

    // Create the image element
    let image = document.createElement("img");
    image.id = "logout-icon-picture";
    image.src = "pictures/logout.png";

    // Append the image to the button
    button.appendChild(image);

    // Find the <p id="account-text">Hi</p> element
    let accountText = document.getElementById("account-text");

    // Create a new line break element
    let lineBreak = document.createElement("br");

    // Insert the button and line break after the accountText element
    accountText.parentNode.insertBefore(button, accountText.nextSibling);
    accountText.parentNode.insertBefore(lineBreak, accountText.nextSibling);
}

document.addEventListener('DOMContentLoaded',(event) => init());
