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
                <button onclick="edit(${user.id})"><i class="fa-solid fa-pen-to-square" style="color:darkblue;"></i></button>
                <button onclick="del(${user.id})"><i class="fa-regular fa-trash-can" style="color:firebrick"></i></button>
            </div>
            `
            grid.innerHTML += div
        });
}

setup()