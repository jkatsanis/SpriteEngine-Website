function initCodeHighlight()
{
    let object = "green";

    var classes = [
        { name: "int", color: "blue" },
        { name: "string", color: object },
        { name: "std", color: "grey"},
        { name: "SpriteRenderer", color: object},
        { name: "BoxCollider", color: object},
        { name: "PhysicsBody", color: object},
        { name: "Transform", color: object},
    ];
  
    // Get the paragraph element
    var paragraphes = document.getElementsByClassName("paragraph");

    for(let paragraph of paragraphes)
    {
          
      // Get the content of the paragraph
      var content = paragraph.innerHTML;
  
      // Loop through the classes and dynamically highlight the words
      for (var i = 0; i < classes.length; i++) {
        var className = classes[i].name;
        var classColor = classes[i].color;
  
        var regex = new RegExp("\\b" + className + "\\b", "gi");
        content = content.replace(regex, '<span class="highlight" style="color:' + classColor + ';">' + className + '</span>');
      }
  
      // Wrap the modified content in a box
      var boxedContent = '<div class="box">' + content + '</div>';
  
      // Update the paragraph with the modified and boxed content
      paragraph.innerHTML = boxedContent;
    }

}

function search() {
    let input, filter, details, summary, i, txtValue;
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

