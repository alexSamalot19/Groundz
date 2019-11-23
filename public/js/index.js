// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");
var carddel = $("#cardDel");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    console.log(example);
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

const getParkData = async input => {
  // const input =  $('#example-description').value
  const res = await fetch(`/api/parks/${input}`, {
    method: "GET"
  });
  res.json();
  console.log("creating", input);
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id,
          "data-description": example.description
        })
        .append($a);

      var $button = $("<button >")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      // var $button = $("<button>")
      //   .addClass("btn btn-success float-left groundz")
      //   .text("G");

      // $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
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
  // API.saveExample(example).then(function() {

  // });
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

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

let deletemeButton = async id => {
  console.log(id);

  let delCard = document.getElementById("deleteme").value;
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
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
// carddel.on("click", deletemeButton());
$(document).ready(function() {
  $("#deleteme").click(function(evt) {
    console.log(evt);
    // evt.stopPropagation();
    evt.stopImmediatePropagation();
    debugger;
    var id = $(this).attr("data-id");
    deletemeButton(id);
  });
});
