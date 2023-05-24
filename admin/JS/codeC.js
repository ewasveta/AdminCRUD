let comments = null;

async function getComments()
{
    try 
    {
        const res = await fetch('http://localhost:3000/comments')
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
    comments = await getComments()
    const grid = document.querySelector("#gridC")

    comments.forEach(comment => 
        {
            const div = `
            <div>${comment.id}</div>
            <div>${comment.name}</div>
            <div>${comment.body}</div>
            <div>${comment.email}</div>
            <div>${comment.postId}</div>
            <div>
                <button onclick="edit(${comment.id})"><i class="fa-solid fa-pen-to-square" style="color:darkblue;"></i></button>
                <button onclick="del(${comment.id})"><i class="fa-regular fa-trash-can" style="color:firebrick"></i></button>
            </div>
            `
            grid.innerHTML += div
        });
}

setup()