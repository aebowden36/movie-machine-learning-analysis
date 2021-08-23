var netflixTitles = []
var huluTitles = []
var primeVideoTitles = []
var disneyPlusTitles = []
var full_data = d3.csv("Resources/MoviesOnStreamingPlatforms_updated.csv").then(function (data) {

    for (var i = 0; i < data.length; i++) {

        var id = parseInt(data[i].ID)
        var title = data[i].Title
        var year = parseInt(data[i].Year)
        var age = data[i].Age
        var imdb = parseFloat(data[i].IMDb)
        var rottenTomatoes = data[i]["Rotten Tomatoes"]
        var netflix = data[i].Netflix
        var hulu = data[i].Hulu
        var primeVideo = data[i]["Prime Video"]
        var disneyPlus = data[i]["Disney+"]
        var type = data[i].Type
        var directors = data[i].Directors.split(",")
        var genres = data[i].Genres.split(",")
        var country = data[i].Country.split(",")
        var language = data[i].Language.split(",")
        var runtime = parseInt(data[i].Runtime)
        if (netflix == 1) {
            netflixTitles.push(title)
        }
        if (hulu == 1) {
            huluTitles.push(title)
        }
        if (primeVideo == 1) {
            primeVideoTitles.push(title)
        }
        if (disneyPlus == 1) {
            disneyPlusTitles.push(title)
        }

    };
})

function getMovieTitle() {
    var base_url = "https://api.themoviedb.org/3/search/movie?api_key=6dbfde2a3c4d58cee3922f80324d975c&query=";
    var query = document.getElementById("user_input").value;
    var full_url = base_url + query;
    var image_base = "https://image.tmdb.org/t/p/w500";

    var movie_vals = d3.json(full_url).then(x => {
        var api_res = x['results']['0'];
        return api_res;
    });

    movie_vals.then(value => {
        var image_base = "https://image.tmdb.org/t/p/w500";
        var full_image_url = image_base + value['poster_path'];
        document.getElementById("movie_image").src = full_image_url
        document.getElementById("movie_title").textContent = value["title"]
        document.getElementById("movie_overview").textContent = value["overview"]

        var netflixBoolean = netflixTitles.includes(value['title'])
        var huluBoolean = huluTitles.includes(value['title'])
        var primeVideoBoolean = primeVideoTitles.includes(value['title'])
        var disneyPlusBoolean = disneyPlusTitles.includes(value['title'])

        d3.selectAll("#netflix_indicator").remove()
        d3.selectAll("#hulu_indicator").remove()
        d3.selectAll("#primeVideo_indicator").remove()
        d3.selectAll("#disneyPlus_indicator").remove()

        if (netflixBoolean) {
            d3.select("#is_on_netflix").append("button").attr('type', 'button').attr('class', 'btn btn-success').attr('id', 'netflix_indicator')
        }
        else {
            d3.select("#is_on_netflix").append("button").attr('type', 'button').attr('class', 'btn btn-danger').attr('id', 'netflix_indicator')
        }

        if (huluBoolean) {
            d3.select("#is_on_hulu").append("button").attr('type', 'button').attr('class', 'btn btn-success').attr('id', 'hulu_indicator')
        }
        else {
            d3.select("#is_on_hulu").append("button").attr('type', 'button').attr('class', 'btn btn-danger').attr('id', 'hulu_indicator')
        }

        if (primeVideoBoolean) {
            d3.select("#is_on_primeVideo").append("button").attr('type', 'button').attr('class', 'btn btn-success').attr('id', 'primeVideo_indicator')
        }
        else {
            d3.select("#is_on_primeVideo").append("button").attr('type', 'button').attr('class', 'btn btn-danger').attr('id', 'primeVideo_indicator')
        }

        if (disneyPlusBoolean) {
            d3.select("#is_on_disneyPlus").append("button").attr('type', 'button').attr('class', 'btn btn-success').attr('id', 'disneyPlus_indicator')
        }
        else {
            d3.select("#is_on_disneyPlus").append("button").attr('type', 'button').attr('class', 'btn btn-danger').attr('id', 'disneyPlus_indicator')
        }
    })
}