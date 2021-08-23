function buildPlot() {
    d3.csv("Resources/MoviesOnStreamingPlatforms_updated.csv").then(function (data) {
      var idList = []
      var titleList = []
      var yearList = []
      var ageList =[]
      var imdbList = []
      var rottenTomatoesList = []
      var netflixList = []
      var netflixImdb = []
      var netflixRotten = []
      var huluList = []
      var huluImdb = []
      var huluRotten = []
      var primeVideoList = []
      var primeImdb = []
      var primeRotten = []
      var disneyPlusList = []
      var disneyImdb = []
      var disneyRotten = []
      var typeList = []
      var directorsList = []
      var genresList = []
      var countryList = []
      var languageList = []
      var runtimeList = []
      var undefinedGenres = []
      
      for (var i = 0; i < data.length; i++) {
        var id = parseInt(data[i].ID)
        var title = data[i].Title
        var year = parseInt(data[i].Year)
        var age = data[i].Age
        var imdb = parseFloat(data[i].IMDb)
        var rottenTomatoes = parseInt(data[i]["Rotten Tomatoes"])
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
        
          idList.push(id);
          titleList.push(title)
          yearList.push(year);
          ageList.push(age)
          // IMDb values with nothing were set to NaN
          imdbList.push(imdb);
          rottenTomatoesList.push(rottenTomatoes);
          if (netflix == 1) {
            netflixList.push("Netflix")
            netflixImdb.push(imdb)
            netflixRotten.push(rottenTomatoes)
          }
          if(hulu == 1) {
            huluList.push("Hulu")
            huluImdb.push(imdb)
            huluRotten.push(rottenTomatoes)
          }
          if (primeVideo == 1){
            primeVideoList.push("Prime Video")
            primeImdb.push(imdb)
            primeRotten.push(rottenTomatoes)
          }
          if (disneyPlus == 1){
            disneyPlusList.push("Disney Plus")
            disneyImdb.push(imdb)
            disneyRotten.push(rottenTomatoes)
          }
          typeList.push(type)
          directorsList.push(directors)
          if (genres == "Action"){
            genresList.push("Action")
          }
          else if (genres == "Adventure"){
            genresList.push("Adventure")
          }
          else if (genres == "Animation"){
            genresList.push("Animation")
          }
          else if (genres == "Biography"){
            genresList.push("Biography")
          }
          else if (genres == "Comedy"){
            genresList.push("Comedy")
          }
          else if (genres == "Crime"){
            genresList.push("Crime")
          }
          else if (genres == "Documentary"){
            genresList.push("Documentary")
          }
          else if (genres == "Drama"){
            genresList.push("Drama")
          }
          else if (genres == "Family"){
            genresList.push("Family")
          }
          else if (genres == "Fantasy"){
            genresList.push("Fantasy")
          }
          else if (genres == "Film-Noir"){
            genresList.push("Film-Noir")
          }
          else if (genres == "Game-Show"){
            genresList.push("Game-Show")
          }
          else if (genres == "History"){
            genresList.push("History")
          }
          else if (genres == "Horror"){
            genresList.push("Horror")
          }
          else if (genres == "Music"){
            genresList.push("Music")
          }
          else if (genres == "Musical"){
            genresList.push("Musical")
          }
          else if (genres == "Mystery"){
            genresList.push("Mystery")
          }
          else if (genres == "News"){
            genresList.push("News")
          }
          else if (genres == "Reality-TV"){
            genresList.push("Reality-TV")
          }
          else if (genres == "Romance"){
            genresList.push("Romance")
          }
          else if (genres == "Sci-Fi"){
            genresList.push("Sci-Fi")
          }
          else if (genres == "Short"){
            genresList.push("Short")
          }
          else if (genres == "Sport"){
            genresList.push("Sport")
          }
          else if (genres == "Talk-Show"){
            genresList.push("Talk-Show")
          }
          else if (genres == "Thriller"){
            genresList.push("Thriller")
          }
          else if (genres == "War"){
            genresList.push("War")
          }
          else if (genres == "Western"){
            genresList.push("Western")
          }
          else {
            undefinedGenres.push("Undefined")
          }
          countryList.push(country)
          languageList.push(language)
          // runtime values with nothing were set to NaN
          runtimeList.push(parseInt(data[i].Runtime));
          
          //This block of code is used to validate if the data is the right type
          //The == is used instead of the === because the data type should be different and only the values are being compared
  
          // var validation = data[i].Runtime
          // if (validation == runtime) {
          //     console.log('working!')
          // }
          // else {
          //     console.log('not working at ID:')
          //     console.log(id)
          //     console.log("old and new values are:")
          //     console.log(validation)
          //     console.log(runtime)
          // }
      };

      function count(genre) {
      
        // An object to hold word frequency
        var genreFrequency = {};
      
        // Iterate through the array
        for (var i = 0; i < genresList.length; i++) {
          var currentWord = genresList[i];
          // If the word has been seen before...
          if (currentWord in genreFrequency) {
            // Add one to the counter
            genreFrequency[currentWord] += 1;
          }
          else {
            // Set the counter at 1
            genreFrequency[currentWord] = 1;
          }
        }
        console.log(genreFrequency);
        return genreFrequency;
      }
      
      var genresCount = count(genresList);
      console.log(genresCount)
      var genresCountList = []
      var keyList = []
      Object.entries(genresCount).forEach(([key, value]) => genresCountList.push(value));
      Object.entries(genresCount).forEach(([key, value]) => keyList.push(key));
      console.log(genresCountList)


      const imdbFilter = imdbList.filter(val => !!val);
      const imdbLen = imdbFilter.length
      const imdbSum = imdbFilter.reduce((sum, val) => (sum += val))
      const imdbAverage = imdbSum/imdbLen

      var traceGenres = {
        x: keyList,
        y: genresCountList,
        type: 'bar'
      };
      
      var data = [traceGenres]
      var layout = {
        title: "Netflix Genres",
        showlegend: false,
        xaxis: {title: "Genres"},
        yaxis: {title: "Count"}
      }
      Plotly.newPlot("plot4", data, layout);
    })
  }
  buildPlot();


