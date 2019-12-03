// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");

const getParkData = async input => {
  const res = await fetch(`/api/parks/${input}`, {
    method: "GET"
  });
  res.json();
  console.log("creating", input);
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  const user = $exampleText.val().trim();
  const ST = $exampleDescription.val().trim();
  const input = user.concat(ST);

  console.log(input);
  getParkData(input).then(function() {
    window.location.href = "/";
  });
  $exampleText.val("");
  $exampleDescription.val("");
};

let deletemeButton = async id => {
  console.log(id);
  await fetch(`/api/examples/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(() => {
    window.location.href = "/";
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$(document).ready(function() {
  $(".delete").click(function(evt) {
    console.log(evt);
    evt.stopImmediatePropagation();
    var id = $(this).attr("data-id");
    deletemeButton(id);
  });
});
