// array for topic
var topics = ["HunterxHunter", "Dragon Ball Z", "Black Clover", "Naruto"];


//on click function for retrieveing data
$("#buttons-view").on("click","button", function topicGifs() {
    // console.log($(this).attr("data-topic"));
    var topic = $(this).attr("data-topic");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topic + "&api_key=rx8BVFeyOWK0KiqG1CVnf3a3XFCqRu9l&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating:" + rating);

                var topicImage = $("<img>");
                topicImage.attr("src", results[i].images.fixed_height.url)

                gifDiv.prepend(p)
                gifDiv.prepend(topicImage)

                $("#gifs").prepend(gifDiv);
            }
        });
        //clearing previouse gifS
        $("#gifs").empty();
});
//button creation
function renderButtons() {
    $("#buttons-view").empty();
    
    // looping array for anime buttons
    for (var i = 0; i < topics.length; i++) {

        var btn = $("<button type=button>");
        btn.addClass("data-topic");
        btn.addClass("btn btn-dark")
        btn.attr("data-topic", topics[i]);
        btn.text(topics[i]);
        $("#buttons-view").append(btn);
    }
}
$("#add-gif").on("click", function(event) {
    event.preventDefault();
    var topic = $("#gif-input").val().trim();
    topics.push(topic);
    console.log(topics);
    renderButtons();
});

//calling render function so buttons will display
renderButtons();