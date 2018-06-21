$(document).ready(function(){
/* 1. Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called `topics`.
    */
  var topicsArr = [
    "Westworld",
    "Game of Thrones",
    "Stranger Things",
    "Lost in Space",
    "Black Mirror"
];
    

       

/* 2. Your app should take the topics in this array and create buttons in your HTML.
    * Try using a loop that appends a button for each string in the array. */

    function makeButton(){
        $("#buttonsHere").empty();
        
        for (var i = 0; i < topicsArr.length; i++){

            var newButton = $("<button>");
            newButton.addClass("topics-btn");
            newButton.attr("data-topic", topicsArr[i]);
            newButton.text(topicsArr[i]);

            $("#buttonsHere").append(newButton);
        }
    }
        
    //
    
    $("#add-topic").on("click", function(event){
            event.preventDefault();
            
        var topic = $("#topic-input").val().trim();
        topicsArr.push(topic);

        makeButton();
    });

    makeButton();

    function dataPull(){
        var topicInput = $(this).attr("data-topic");
        var topicStr = topicInput.split(" ").join("+");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topicStr + "&api_key=sSZl7RKHXQaveXriP5j1W48d3dWoe2FP&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response){
            
            console.log(response.data)
            
            
            $("#gifsHere").empty();
            for(var j = 0; j < response.data.length; j++) {    

                var displayDiv = $("<div>");
                var image = $("<img>");
                
                image.addClass("image-gifs");
                image.attr("src", response.data[j].images.original_still.url);
                image.attr("data-still", response.data[j].images.original_still.url);
                image.attr("data-animate", response.data[j].images.original.url);
                image.attr("data-state", "still");
                image.attr("class", "gif");
                displayDiv.append(image);

                var rating = response.data[j].rating;
                console.log(response);
                var pRating = $("<p>").text("Rating: " + rating);
                displayDiv.append(pRating)

                $("#gifsHere").append(displayDiv);
            }; //ends forloop
        }); //ends ajax

    }; //ends dataPull function
        
    $(document).on("click", ".topics-btn", dataPull);

         //   function animateGifs(){
                $(".image-gifs").on("click", function() {
                var state = $(this).attr("data-state");
                

                if (state === "still") {
                    $(this).attr("src", results[position].images.fixed_height.url);
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", results[position].images.fixed_height_still.url);
                    $(this).attr("data-state", "still");
                } //ends if else
           // }; //ends function
        });
            
    $(document).on("click", ".image-gifs", animateGifs);

});