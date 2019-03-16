// array for topic
var topics = ["HunterxHunter", "Dragon Ball Z", "Black Clover", "Naruto"];


//on click function for retrieveing data
$("#buttons-view").on("click", "button", function topicGifs() {
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

            console.log(response.data)
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);
               console.log(results[i].title)
                var p2= $("<p>").text("Title: " + results[i].title)
                var topicImage = $("<img>");
                topicImage.attr("data-state", "still")
                var still = results[i].images.fixed_height_still.url
                var animate = results[i].images.fixed_height.url
                var a= $("<a download> Download </a>").attr("href", results[i].images.fixed_height_small.webp)


                topicImage.attr("still", still)
                topicImage.attr("animate", animate)
                topicImage.attr("src", still).addClass("gif")

                gifDiv.prepend(p , p2, a)
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
$("#add-gif").on("click", function (event) {
    event.preventDefault();
    var topic = $("#gif-input").val().trim();
    topics.push(topic);
    console.log(topics);
    renderButtons();
});
$(document).on("click", ".gif", function () {
    var state = $(this).attr("data-state")
console.log(state)
console.log($(this).attr("animate"))
if (state === "still"){
    $(this).attr("data-state", "animate");
    $(this).attr("src", $(this).attr("animate"))  
}else {
    $(this).attr("data-state", "still")
    $(this).attr("src",$(this).attr("still"));
}
})

//calling render function so buttons will display
renderButtons();