$(document).ready(function(){  //Code will only run once the page DOM is ready for JavaScript code to execute

    var topicsArr = [ //create array of topics (tv shows)
        "Westworld",
        "Game of Thrones",
        "Stranger Things",
        "Lost in Space",
        "Black Mirror"
    ];
    
    function makeButton(){ //main function to create buttons from the array 
        $("#buttonsHere").empty(); //clears out previous gifs
        
        for (var i = 0; i < topicsArr.length; i++){ //for loop to create each button from the array

            var newButton = $("<button>"); // adds button
            newButton.addClass("topics-btn"); //adds class to button
            newButton.attr("data-topic", topicsArr[i]); // gets data 
            newButton.text(topicsArr[i]); //adds text to button

            $("#buttonsHere").append(newButton); //appends each new button after the previous
        }
    }
   
    makeButton(); //calls create button function
    
    $("#add-topic").on("click", function(event){ // click event to make form button functional
            event.preventDefault();        
        var newTopic = $("#topic-input").val().trim(); // get the values of input element, trims any extra spaces
        topicsArr.push(newTopic); //pushes new button that user input to the array

        makeButton(); //calls to loop with new button
    });

   
    

    function dataPull(){
        var topicInput = $(this).attr("data-topic");
        var topicStr = topicInput.split(" ").join("+");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topicStr + "&api_key=sSZl7RKHXQaveXriP5j1W48d3dWoe2FP&limit=10";
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response){
            
            console.log(response)
            
            var results = response.data;
            
            $("#gifsHere").empty();
            for(var j = 0; j < results.length; j++) {    

                var displayDiv = $("<div>");
                var image = $("<img>");
                
                image.addClass("image-gifs");
                image.attr("src", results[j].images.original_still.url);
                image.attr("data-still", results[j].images.original_still.url);
                image.attr("data-animate", results[j].images.original.url);
                image.attr("data-state", "still");
                
                displayDiv.append(image);

                var rating = results[j].rating;
                
                var pRating = $("<p>").text("Rating: " + rating);
                displayDiv.append(pRating)

                $("#gifsHere").append(displayDiv);
            }; //ends for loop


            $(document).on("click", ".topics-btn", dataPull);

                   $(".image-gifs").on("click", function() {
                   var state = $(this).attr("data-state");  
   
                if (state === "still") {
                   $(this).attr("src", $(this).attr("data-animate"));
                   $(this).attr("data-state", "animate");
                } else {
                   $(this).attr("src", $(this).attr("data-still"));
                   $(this).attr("data-state", "still");
                 } 
           });

        }); //ends ajax response function

    }; //ends dataPull function
        
    $(document).on("click", ".topics-btn", dataPull);
    
            $(".image-gifs").on("click", function() {
            var state = $(this).attr("data-state");

            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            } 
     
        });
            
    $(document).on("click", ".image-gifs");

});