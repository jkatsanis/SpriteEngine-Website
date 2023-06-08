
const thread_url = 'http://localhost:3000/threads';

function addQuestionToDataBase(thread, succes)
{
    fetch(thread_url,{
        method:"POST",
        headers:{'content-type':'application/json'},
        body:JSON.stringify(thread)
    }).then(()=>succes());
}

async function getAllThreads() {
    return await fetch(thread_url)
        .then(response => response.json())
}