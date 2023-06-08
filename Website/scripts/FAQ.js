
let threads = [];

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

class Thread
{
    static threads = 0;
    author;
    dateMessage;
    question;

    constructor(question, autor)
    {
        this.question = question;
        this.author = autor;
        Thread.threads++;
        this.dateMessage = `${Thread.threads}`;

    }

    render()
    {
        const currentDate = new Date();

        const day = String(currentDate.getDay());
        const month = String(currentDate.getMonth());
        const year = currentDate.getFullYear();
        const dateString = `${day}.${month}.${year}`;

        const html = `
            <div style="margin-top: 0.5rem">
              <div class="space-0-5rem"></div>
                  <div class="faq-container-style">
                    <div class="thread-container">
                      <p class="ctn-text question-style">${this.question}</p>
                      <p class="inline-box ctn-text creation-style">#${this.dateMessage} | ${dateString}</p>
                    </div>
                    <p class="inline-box closed-style">Closed: ✘</p>
                    <p class="inline-box author-style">${this.author}</p>
                  </div>
              <div style="margin-top: 0.5rem">
            </div>
            `;

        let all = document.getElementById("insert-here");

        all.innerHTML += html;

    }
}
