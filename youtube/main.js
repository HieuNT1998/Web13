$(document).ready(function () {
    $('#search').on("submit", (event) => {
        event.preventDefault();
        var str = $('#keyword').val();

        $.ajax({
            url: "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=" + str + "&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw",
            type: "GET",
            success: function (CaiDeoJCungDuoc) {
                for (let i = 0; i < 10; i++) {
                    $("#result-list").append(`<a class="result col-md-12" href="https://youtube.com/watch?v=${CaiDeoJCungDuoc.items[i].id.videoId}&autoplay=true" target="_black">
                                        <img src="`+ CaiDeoJCungDuoc.items[i].snippet.thumbnails.default.url + `" alt="">
                        <div class="video_info">
                            <h2 class="title">`+ CaiDeoJCungDuoc.items[i].snippet.title + ` </h2>
                            <p class="description">`+ CaiDeoJCungDuoc.items[i].snippet.description + ` </p>
                            <span>View >></span>
                        </div>
                </a>`);

                }
                // console.log(CaiDeoJCungDuoc.items[0].id.videoId);
            },
            error: function (err) {
                console.log(err);
            }
        })

    })
})