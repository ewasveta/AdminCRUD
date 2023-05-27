let users = null;

async function getUsers()
{
    try 
    {
        const res = await fetch('http://localhost:3000/users')
        const data = await res.json()
        return data
    } 
    catch (error) 
    {
        console.log("Error fetching data",error)
    }
}
async function setup()
{
    users = await getUsers()
    const grid = document.querySelector("#grid")

    users.forEach(user => 
        {
            const div = `
            <div>${user.id}</div>
            <div>${user.name}</div>
            <div>${user.surname}</div>
            <div>${user.email}</div>
            <div>
                <button onclick="poped(${user.id})"><i class="fa-solid fa-pen-to-square" style="color:darkblue;"></i></button>
                <button onclick="del(${user.id})"><i class="fa-regular fa-trash-can" style="color:firebrick"></i></button>
            </div>
            `
            grid.innerHTML += div
        });
}

setup()

function popup()
{
    document.querySelector('#modal').style.display='block'
}

function poped(userId)
{
    let theUser = users.find(u => u.id==userId)

    document.querySelector('#eN').value = theUser.name;
    document.querySelector('#eS').value = theUser.surname;
    document.querySelector('#eE').value = theUser.email;

    let span = document.querySelector('#eSpan');
    span.setAttribute("data-id", userId); 

    document.querySelector('#eModal').style.display='block'
}

function hide()
{
    document.querySelector('#modal').style.display='none'
}

function eHide()
{
    document.querySelector('#eModal').style.display='none'
}

async function add()
{
    console.log("add()")

    let uName = document.querySelector('#N').value;
    let uSurname = document.querySelector('#S').value;
    let uEmail = document.querySelector('#E').value;

    if(uName && uSurname && uEmail)
    {
        url = "http://localhost:3000/users"

        data = {"name": uName,
                "surname": uSurname,
                "email": uEmail }

        // Post a new post
        const response = await fetch(url, 
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            })
        document.querySelector('#modal').style.display='none'
    }
    else
    {
        console.error(`no add data`);
        return;   
    }
}

async function del(userId)
{
    url = "http://localhost:3000/users/" + userId

    let text = "Are you sure you want to delete the user ?";
    if (confirm(text)) 
    {
        const response = await fetch(url, 
            {
                method: "DELETE",
                headers: {"Content-Type": "application/json"}
            })
    }
}

async function edit()
{
    let userId = document.querySelector('#eSpan').getAttribute("data-id");

    console.log(`edit(): userId=${userId}`)       

    let uName = document.querySelector('#eN').value;
    let uSurname = document.querySelector('#eS').value;
    let uEmail = document.querySelector('#eE').value;

    let theUser = users.find(u => u.id==userId)

    if(uName && uSurname && uEmail)
    {
        console.log(`uEmail: ${uEmail}`);

        url = "http://localhost:3000/users/" + userId

        data = {"name": uName,
                "surname": uSurname,
                "email": uEmail }

        const response = await fetch(url, 
            {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            })
        document.querySelector('#eModal').style.display='none'    
    }
    else
    {
        console.error(`no edit data`);
        return;   
    }
}

