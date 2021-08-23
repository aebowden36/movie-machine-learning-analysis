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
    var netflixYear = []
    var huluList = []
    var huluImdb = []
    var huluRotten = []
    var huluYear = []
    var primeVideoList = []
    var primeImdb = []
    var primeRotten = []
    var primeYear = []
    var disneyPlusList = []
    var disneyImdb = []
    var disneyRotten = []
    var disneyYear = []
    var typeList = []
    var directorsList = []
    var genresList = []
    var countryList = []
    var languageList = []
    var runtimeList = []
    
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
          netflixYear.push(year)
        }
        if(hulu == 1) {
          huluList.push("Hulu")
          huluImdb.push(imdb)
          huluRotten.push(rottenTomatoes)
          huluYear.push(year)
        }
        if (primeVideo == 1){
          primeVideoList.push("Prime Video")
          primeImdb.push(imdb)
          primeRotten.push(rottenTomatoes)
          primeYear.push(year)
        }
        if (disneyPlus == 1){
          disneyPlusList.push("Disney Plus")
          disneyImdb.push(imdb)
          disneyRotten.push(rottenTomatoes)
          disneyYear.push(year)
        }
        typeList.push(type)
        directorsList.push(directors)
        genresList.push(genres)
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
    // Netflix Year Plot
    const netflixYearFilter = netflixYear.filter(val => !!val);
    var netflixYearCounts = {}
    for (var i=0; i < netflixYearFilter.length; i++) {
        netflixYearCounts[netflixYearFilter[i]] = 1 + (netflixYearCounts[netflixYearFilter[i]] || 0);
    }
    var netflixYearArr = Object.keys(netflixYearCounts);
    var netflixUniqueCounts = Object.values(netflixYearCounts);
    console.log(netflixYearArr);
    console.log(netflixUniqueCounts);
    var traceNetflix = {
      x: netflixYearArr,
      y: netflixUniqueCounts,
      marker: {
        color: "rgb(228,26,28)"
      },
      type: 'bar'
    }
    var data = [traceNetflix]
    var layout = {
      title: "Netflix",
      xaxis: { title: "Year"},
      yaxis: { title: "# of Movies"}
    };
    Plotly.newPlot("netflix-plot", data, layout);

    // Hulu Year Plot
    const huluYearFilter = huluYear.filter(val => !!val);
    var huluYearCounts = {}
    for (var i=0; i < huluYearFilter.length; i++) {
      huluYearCounts[huluYearFilter[i]] = 1 + (huluYearCounts[huluYearFilter[i]] || 0);
    }
    var huluYearArr = Object.keys(huluYearCounts);
    var huluUniqueCounts = Object.values(huluYearCounts);
    console.log(huluYearArr);
    console.log(huluUniqueCounts);
    var traceHulu = {
      x: huluYearArr,
      y: huluUniqueCounts,
      marker: {
        color: "#22FFA7"
      },
      type: 'bar'
    }
    var data = [traceHulu]
    var layout = {
      title: "Hulu",
      xaxis: { title: "Year"},
      yaxis: { title: "# of Movies"}
    };
    Plotly.newPlot("hulu-plot", data, layout);

    // Prime Year Plot
    const primeYearFilter = primeYear.filter(val => !!val);
    var primeYearCounts = {}
    for (var i=0; i < primeYearFilter.length; i++) {
      primeYearCounts[primeYearFilter[i]] = 1 + (primeYearCounts[primeYearFilter[i]] || 0);
    }
    var primeYearArr = Object.keys(primeYearCounts);
    var primeUniqueCounts = Object.values(primeYearCounts);
    console.log(primeYearArr);
    console.log(primeUniqueCounts);
    var tracePrime = {
      x: primeYearArr,
      y: primeUniqueCounts,
      marker: {
        color: "#00B5F7"
      },
      type: 'bar'
    }
    var data = [tracePrime]
    var layout = {
      title: "Prime Video",
      xaxis: { title: "Year"},
      yaxis: { title: "# of Movies"}
    };
    Plotly.newPlot("prime-plot", data, layout);

    // Disney Year Plot
    const disneyYearFilter = disneyYear.filter(val => !!val);
    var disneyYearCounts = {}
    for (var i=0; i < disneyYearFilter.length; i++) {
      disneyYearCounts[disneyYearFilter[i]] = 1 + (disneyYearCounts[disneyYearFilter[i]] || 0);
    }
    var disneyYearArr = Object.keys(disneyYearCounts);
    var disneyUniqueCounts = Object.values(disneyYearCounts);
    console.log(disneyYearArr);
    console.log(disneyUniqueCounts);
    var traceDisney = {
      x: disneyYearArr,
      y: disneyUniqueCounts,
      marker: {
        color: "#1616A7"
      },
      type: 'bar'
    }
    var data = [traceDisney]
    var layout = {
      title: "Disney Plus",
      xaxis: { title: "Year"},
      yaxis: { title: "# of Movies"}
    };
    Plotly.newPlot("disney-plot", data, layout);

    // Multi-line chart

    var traceNetflixLine = {
      x: netflixYearArr,
      y: netflixUniqueCounts,
      marker: {
        color: "rgb(228,26,28)"
      },
      mode: 'lines',
      name: 'Netflix'
    }

    var traceHuluLine = {
      x: huluYearArr,
      y: huluUniqueCounts,
      marker: {
        color: "#22FFA7"
      },
      mode: 'lines',
      name: 'Hulu'
    }

    var tracePrimeLine = {
      x: primeYearArr,
      y: primeUniqueCounts,
      marker: {
        color: "#00B5F7"
      },
      mode: 'lines',
      name: 'Prime Video'
    }

    var traceDisneyLine = {
      x: disneyYearArr,
      y: disneyUniqueCounts,
      marker: {
        color: "#1616A7"
      },
      mode: 'lines',
      name: 'Disney Plus'
    }

    var data = [traceNetflixLine, traceHuluLine, tracePrimeLine, traceDisneyLine]
    var layout = {
      xaxis: { title: "Year"},
      yaxis: { title: "# of Movies"}
    };
    Plotly.newPlot("line-plot", data, layout);
  })
}
buildPlot();