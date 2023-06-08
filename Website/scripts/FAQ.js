let openThreads = 0;
let threads = [];

function initThreads(){
    getAllThreads().then( (data) => {
        for(let i = 0; i < data.length; i++)
        {
            let thred = new Thread(data[i].question, data[i].author);
            thred.dateMessage = data[i].dateMessage;
            thred.createdAt = data[i].createdAt;
            thred.render();
            threads.push(thred);
            openThreads = i;
        }
    })
}

function createThread(){
    if(currentAccount === undefined)
    {
        alert("Not logged in");
        return;
    }
    modifyThreadDisplayer('block');
}

function cancelSubmit()
{
    modifyThreadDisplayer('none');
}

function submit()
{
    let title = document.getElementById("title-input").value;
    let thread = new Thread(title, currentAccount.id);
    thread.render();
    modifyThreadDisplayer('none');
    increaseOpenCounter();
    threads.push(thread);

    addQuestionToDataBase(thread, () => {
        console.log("Nice");
    })
}

function increaseOpenCounter(){
    openThreads++;
    let txt = document.getElementById("open-text");
    let str = String(openThreads) + " open ✘";
    txt.textContent = str;
}

function modifyThreadDisplayer(display){

    let title = document.getElementById("title");

    let title_string = display === 'block' ? "New issue" : "Faq";

    title.textContent = title_string;

    let other_section = document.getElementById("faq-new-thread");
    other_section.style.display = display;

    let a = display === 'none' ? 'block' : 'none';

    let current = document.getElementById("faq-display");
    current.style.display = a;
}

function searchForThread()
{
    let threadElements = document.getElementsByClassName("thread");

    let input, filter
    input = document.getElementById("question-searcher");
    filter = input.value.toUpperCase();

    for(let i = 0; i < threads.length; i++)
    {
        if(threads[i].question.toUpperCase().indexOf(filter) > -1)
        {
            threadElements[i].style.display = "";
        } else {
            threadElements[i].style.display = "none";
        }
    }
}

class Thread
{
    static threads = 0;
    author;
    dateMessage;
    question;
    createdAt;

    constructor(question, autor)
    {
        this.question = question;
        this.author = autor;
        Thread.threads++;
        this.dateMessage = `${Thread.threads}`;

        const currentDate = new Date();

        const day = String(currentDate.getDay());
        const month = String(currentDate.getMonth());
        const year = currentDate.getFullYear();
        const dateString = `${day}.${month}.${year}`;

        this.createdAt = dateString;

    }

    render()
    {
        const html = `
            <div style="margin-top: 0.5rem" class="thread">
              <div class="space-0-5rem"></div>
                  <div class="faq-container-style">
                    <div class="thread-container">
                      <p class="ctn-text question-style">${this.question}</p>
                      <p class="inline-box ctn-text creation-style">#${this.dateMessage} | ${this.createdAt}</p>
                    </div>
                    <p class="inline-box closed-style">closed: ✘</p>
                    <p class="inline-box author-style">${this.author}</p>
                  </div>
              <div style="margin-top: 0.5rem">
            </div>
            `;

        let all = document.getElementById("insert-here");

        all.innerHTML += html;

    }
}
