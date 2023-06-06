
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
              <p class="inline-box ctn-text creation-style">#${this.dateMessage} | Created at 19.05.2022</p>
            </div>
            <p class="inline-box author-style">y4ni</p>
          </div>
          <div style="margin-top: 0.5rem">
            `;

        let all = document.getElementById("insert-here");

        all.innerHTML += html;

    }
}
