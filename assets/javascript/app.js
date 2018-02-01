 
 var topics = ["cat", "dog", "bear"];

 function displayAnimalGif () {      
// Grabbing and storing the data-animal property value from the button
    $("#animals").empty();
      var animal = $(this).attr("data-animal");

      // Constructing a queryURL using the animal name
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(queryURL);

      // Performing an AJAX request with the queryURL
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After data comes back from the request
        .then(function(response) {
          
          // storing the data from the AJAX request in the results variable
          var results = response.data;

          // Looping through each result item
          for (var i = 0; i < results.length; i++) {

          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

            // Creating and storing a div tag
            //var animalDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var animalImage = $("<img>");
            animalImage.addClass("gify");
            // Setting the src attribute of the image to a property pulled off the result item
            animalImage.attr("src", results[i].images.fixed_height_still.url);
            animalImage.attr("data-still", results[i].images.fixed_height_still.url);
            animalImage.attr("data-animate", results[i].images.fixed_height.url);
            animalImage.attr("data-state", "still")
            

            $("#animals").append(animalImage).append(p);
           }
          }
        });
    };

      $(document).on("click", '.gify', function() {
        console.log(state)
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
    

 function renderButtons () {
  console.log(topics);
  $("#animalButtons").empty();
  for (var i = 0; i<topics.length; i++) {
  var a = $("<button>");
  a.attr("id", "animalButton");
  a.attr("data-animal", topics[i]);
  a.text(topics[i]);
  $("#animalButtons").append(a);
  }
 }

 $("#addAnimal").on("click", function(event) {
  event.preventDefault();

  var animal = $("#animalInput").val().trim();
  console.log(animal);
  topics.push(animal);
  renderButtons();
 });

$(document).on("click", "#animalButton", displayAnimalGif);
  
  renderButtons();
