let posts = null;

async function getPosts()
{
    try 
    {
        const res = await fetch('http://localhost:3000/posts')
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
    posts = await getPosts()
    const grid = document.querySelector("#grid")

    posts.forEach(post => 
        {
            const div = `
            <div>${post.id}</div>
            <div>${post.title}</div>
            <div>${post.body}</div>
            <div>${post.userId}</div>
            <div>
                <button onclick="edit(${post.id})"><i class="fa-solid fa-pen-to-square" style="color:darkblue;"></i></button>
                <button onclick="del(${post.id})"><i class="fa-regular fa-trash-can" style="color:firebrick"></i></button>
            </div>
            `
            grid.innerHTML += div
        });
}

setup()

async function add()
{
    let msg = prompt("Please enter your body:", "admin message");
    if (!msg)
    {
      msg = "test message";
    }

    url = "http://localhost:3000/posts"

    data = {"title": "admin-message",
            "body": msg,
            "userId": 0 }

    // Post a new post
    const response = await fetch(url, 
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
}

async function edit(postId)
{
    console.log(`post Id is ${postId}`)

    let thePost = posts.find(p => p.id==postId)

    let current = thePost.body;
    let fixed = prompt("Please enter new body:", current);
    if (fixed)
    {
      current = fixed;
    }

    url = "http://localhost:3000/posts/" + postId

    data = {"title": thePost.title,
            "body": current,
            "userId": thePost.userId}

    const response = await fetch(url, 
        {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
         })
}

async function del(postId)
{
    console.log(`post Id is ${postId}`)


    url = "http://localhost:3000/posts/" + postId

    let text = "Are you sure you want to delete the post ?";
    if (confirm(text)) 
    {
        const response = await fetch(url, 
            {
                method: "DELETE",
                headers: {"Content-Type": "application/json"}
            })
    }

}