function init()
{
    console.log("done");
}
function search() {
    var input, filter, details, summary, i, txtValue;
    input = document.getElementById("feature-searcher");
    filter = input.value.toUpperCase();
    details = document.getElementsByTagName("details");
    for (i = 0; i < details.length; i++) {
        summary = details[i].getElementsByTagName("summary")[0];
        txtValue = summary.textContent || summary.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            details[i].style.display = "";
        } else {
            details[i].style.display = "none";
        }
    }
}

document.addEventListener('DOMContentLoaded',(event) => init());
