// Get references to page elements
var $parkText = $("#park-text");
var $parkDescription = $("#park-description");
var $submitBtn = $("#submit");

const getParkData = async input => {
  const res = await fetch(`/api/parks/${input}`, {
    method: "GET"
  });
  res.json();
  console.log("creating", input);
};

// handleFormSubmit is called whenever we submit a new park
// Save the new park to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var park = {
    text: $parkText.val().trim(),
    description: $parkDescription.val().trim()
  };

  if (!(park.text && park.description)) {
    alert("You must enter an park text and description!");
    return;
  }

  const user = $parkText.val().trim();
  const ST = $parkDescription.val().trim();
  const input = user.concat(ST);

  console.log(input);
  getParkData(input).then(function() {
    window.location.href = "/";
  });
  $parkText.val("");
  $parkDescription.val("");
};

let deletemeButton = async id => {
  console.log(id);
  await fetch(`/api/parks/${id}`, {
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
