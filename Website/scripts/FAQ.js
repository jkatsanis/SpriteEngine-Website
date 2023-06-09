let openThreads = -1;
let threads = [];
let current_thread = undefined;

function initThreads(){
    getAllThreads().then( (data) => {
        for(let i = 0; i < data.length; i++)
        {
            let thred = new Thread(data[i].question, data[i].author, data[i].questionContent);
            thred.dateMessage = data[i].dateMessage;
            thred.createdAt = data[i].createdAt;
            thred.closed = data[i].closed;
            thred.comments = data[i].comments;
            if(!thred.closed)
            {
                increaseOpenCounter();
            }
            thred.render();
            threads.push(thred);
            openThreads = i;
        }
        increaseOpenCounter();
        addThreadEventListener();
    })
    initUi();
}

function initUi()
{
    let btn = document.getElementById("leave-thread").style.display = 'none';
    document.getElementById("faq-new-Comment").style.display = 'none';
    modifyThreadDisplayer('none');
    modifyThreadDisplayerBasesOnCurrentThread('none');
}

function addThreadEventListener()
{
    let x = document.getElementsByClassName("thread");
    for(let i = 0; i < x.length; i++)
    {
        x[i].addEventListener("click", function ()
        {
            enterThread(threads[i]);
        })
    }
}

function leaveThread()
{
    current_thread.clearDiscussion();
    current_thread = undefined;
    modifyThreadDisplayerBasesOnCurrentThread('none');
    let title = document.getElementById("title");
    title.textContent =  "Faq";
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
    let title = document.getElementById("title-input");
    let content = document.getElementById("issue-input");

    if(title.value === ""
        || content.value === "")
    {
        alert("The content and title field must be filled!");
        return;
    }

    let thread = new Thread(title.value, currentAccount.id, content.value);
    thread.render();
    modifyThreadDisplayer('none');
    increaseOpenCounter();
    threads.push(thread);

    addThreadEventListener();
    addQuestionToDataBase(thread, () => {
    })

    title.value = "";
    content.value = "";
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

function modifyThreadDisplayerBasesOnCurrentThread(display)
{
    let discussionContainer = document.getElementById("thread-container");
    discussionContainer.style.display = display;

    let btn = document.getElementById("leave-thread").style.display = display;

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

function enterThread(thread)
{
    let title = document.getElementById("title");
    let title_string = thread.question;
    title.textContent = title_string;

    current_thread = thread;
    modifyThreadDisplayerBasesOnCurrentThread('block');
    current_thread.renderDiscussion(thread);
}

class Thread
{
    static threads = 0;
    author;
    dateMessage;
    question;
    createdAt;
    questionContent;
    comments;
    closed;

    constructor(question, autor, questionContent)
    {
        this.closed = false;
        this.questionContent = questionContent;
        this.question = question;
        this.author = autor;
        this.comments = [];
        Thread.threads++;
        this.dateMessage = `${Thread.threads}`;

        const currentDate = new Date();

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        let formattedDate = day + '.' + month + '.' + year;
        this.createdAt = formattedDate;
    }

    render()
    {
        let thread = this;

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

    renderDiscussion()
    {
        let discussionContainer = document.getElementById("thread-container");
        let commentContainer = document.getElementById("comments-container");

        discussionContainer.innerHTML = "";
        commentContainer.innerHTML = "";

        discussionContainer.innerHTML +=
            ` 
               <div class="comment">
                    <div class="author-info">
                        <p class="inline author-title creation-style">Author: </p>
                        <p class="inline author-name">${this.author}</p>
                    </div>
                   <hr class="underline">
                    <p class="comment-text">
                        ${this.questionContent}
                    </p>
                </div>
                <hr>
                <h1>Comments:</h1>
                <button class="get-plan-button p-2 mb-3 mx-0" style="display: block" id="add-comment">create comment</button>
            `;
        for (let comment of this.comments) {
            commentContainer.innerHTML +=
                ` 
               <div class="comment mb-3">
                    <div class="author-info">
                        <p class="inline author-title creation-style">Author: </p>
                        <p class="inline author-name">${comment.author}</p>
                    </div>
                   <hr class="underline">
                    <p class="comment-text">
                        ${comment.content}
                    </p>
                </div>
                `;
        }
        this.handleCommentBtn();
    }
    handleCommentBtn(){
        let addCommentBtn = document.getElementById("add-comment");
        addCommentBtn.addEventListener("click", ()=>{
            if (currentAccount ===undefined){
                alert("not logged in");
                return;
            }
            document.getElementById("faq-new-Comment").style.display = 'block';
            handleComment(this);
        });
    }

    clearDiscussion()
    {
        let discussionContainer = document.getElementById("thread-container");
        discussionContainer.innerHTML = "";
        let commentContainer = document.getElementById("comments-container");
        commentContainer.innerHTML = "";
    }
    addComment(comment)
    {
        this.comments.push(comment);
    }
}
function handleComment(thread){
    let commentContent = document.getElementById("comment-content");
    let submitComment = document.getElementById("submit-comment-btn");
    let cancelComment = document.getElementById("cancel-comment-btn");

    submitComment.addEventListener("click", ()=>{
        if (commentContent.value === ""){
            return;
        }

        let comment = new Comment(currentAccount.id, commentContent.value);
        thread.addComment(comment);
        commentContent.value = "";
        document.getElementById("faq-new-Comment").style.display = 'none';
        updateComments(thread.dateMessage, thread, () => {});
        thread.renderDiscussion();
    });
    cancelComment.addEventListener("click", ()=>{
        document.getElementById("faq-new-Comment").style.display = 'none';
    });
}
class Comment{
    author;
    content;
    constructor(author, content) {
        this.author = author;
        this.content = content;
    }

}