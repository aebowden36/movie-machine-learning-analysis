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
      // calculate means of array
      const netflixImdbFilter = netflixImdb.filter(val => !!val);
      const netflixLen = netflixImdbFilter.length
      const netflixImdbSum = netflixImdbFilter.reduce((sum, val) => (sum += val))
      const netflixImdbAverage = netflixImdbSum/netflixLen

      const huluImdbFilter = huluImdb.filter(val => !!val);
      const huluLen = huluImdbFilter.length
      const huluImdbSum = huluImdbFilter.reduce((sum, val) => (sum += val))
      const huluImdbAverage = huluImdbSum/huluLen

      const primeImdbFilter = primeImdb.filter(val => !!val);
      const primeLen = primeImdbFilter.length
      const primeImdbSum = primeImdbFilter.reduce((sum, val) => (sum += val))
      const primeImdbAverage = primeImdbSum/primeLen

      const disneyImdbFilter = disneyImdb.filter(val => !!val);
      const disneyLen = disneyImdbFilter.length
      const disneyImdbSum = disneyImdbFilter.reduce((sum, val) => (sum += val))
      const disneyImdbAverage = disneyImdbSum/disneyLen
// Calculate IMDb ratings that match Rotten Tomatoes Rating Measurement
      var netflixMatch = [netflixImdbAverage*10]
      var huluMatch = [huluImdbAverage*10]
      var primeMatch = [primeImdbAverage*10]
      var disneyMatch = [disneyImdbAverage*10]
      // Verify Calculations
      console.log(netflixMatch)
      console.log(huluMatch)
      console.log(primeMatch)
      console.log(disneyMatch)
        // create trace for imdb bar chart
      var traceNetflix = {
        x: netflixList,
        y: netflixMatch,
        marker: {
          color: 'rgb(247, 33, 17)'
        },
        type: 'bar'
      }
  
      var traceHulu = {
        x: huluList,
        y: huluMatch,
        marker: {
          color: 'rgb(57, 204, 12)'
        },
        type: 'bar'
      }
  
      var tracePrime = {
        x: primeVideoList,
        y: primeMatch,
        marker: {
          color: 'rgb(29, 167, 222)'
        },
        type: 'bar'
      }
  
      var traceDisney = {
        x: disneyPlusList,
        y: disneyMatch,
        marker: {
          color: 'rgb(88, 13, 217)'
        },
        type: 'bar'
      }
      
      var data = [traceNetflix, traceHulu, tracePrime, traceDisney]
      var layout = {
        title: "Average IMDb Ratings Across Platforms",
        showlegend: false,
        xaxis: {title: "Streaming Platform"},
        yaxis: {title: "Average IMDb Rating (%)"}
      }
      Plotly.newPlot("plot1", data, layout);
// calculate rotten tomatoes averages
      const netflixRottenFilter = netflixRotten.filter(val => !!val);
      const netflixRotLen = netflixRottenFilter.length
      const netflixRottenSum = netflixRottenFilter.reduce((sum, val) => (sum += val))
      const netflixRottenAverage = netflixRottenSum/netflixRotLen

      const huluRottenFilter = huluRotten.filter(val => !!val);
      const huluRotLen = huluRottenFilter.length
      const huluRottenSum = huluRottenFilter.reduce((sum, val) => (sum += val))
      const huluRottenAverage = huluRottenSum/huluRotLen

      const primeRottenFilter = primeRotten.filter(val => !!val);
      const primeRotLen = primeRottenFilter.length
      const primeRottenSum = primeRottenFilter.reduce((sum, val) => (sum += val))
      const primeRottenAverage = primeRottenSum/primeRotLen

      const disneyRottenFilter = disneyRotten.filter(val => !!val);
      const disneyRotLen = disneyRottenFilter.length
      const disneyRottenSum = disneyRottenFilter.reduce((sum, val) => (sum += val))
      const disneyRottenAverage = disneyRottenSum/disneyRotLen
      // console.log(netflixRottenAverage)
      // console.log(huluRottenAverage)
      // console.log(primeRottenAverage)
      // console.log(disneyRottenAverage)
      
      var netflixRottenAverageBar = [netflixRottenAverage]
      var huluRottenAverageBar = [huluRottenAverage]
      var primeRottenAverageBar = [primeRottenAverage]
      var disneyRottenAverageBar = [disneyRottenAverage]
      // create trace for rotten tomatoes bar chart
      var traceNetflixRot = {
        x: netflixList,
        y: netflixRottenAverageBar,
        marker: {
          color: 'rgb(130, 18, 44)'
        },
        type: 'bar'
      }
  
      var traceHuluRot = {
        x: huluList,
        y: huluRottenAverageBar,
        marker: {
          color: 'rgb(18, 117, 28)'
        },
        type: 'bar'
      }
  
      var tracePrimeRot = {
        x: primeVideoList,
        y: primeRottenAverageBar,
        marker: {
          color: 'rgb(18, 91, 120)'
        },
        type: 'bar'
      }
  
      var traceDisneyRot = {
        x: disneyPlusList,
        y: disneyRottenAverageBar,
        marker: {
          color: 'rgb(74, 16, 110)'
        },
        type: 'bar'
      }
      
      var data = [traceNetflixRot, traceHuluRot, tracePrimeRot, traceDisneyRot]
      var layout = {
        title: "Average Rotten Tomatoes Ratings Across Platforms",
        showlegend: false,
        xaxis: {title: "Streaming Platform"},
        yaxis: {title: "Average Rotten Tomatoes Rating (%)"}
      }
      Plotly.newPlot("plot2", data, layout);

      var xAxis = [netflixRottenAverage, huluRottenAverage, primeRottenAverage, disneyRottenAverage, netflixMatch[0], huluMatch[0], primeMatch[0], disneyMatch[0]]
      var yAxis = [netflixRotLen, huluRotLen, primeRotLen, disneyRotLen, netflixLen, huluLen, primeLen, disneyLen]
      // create trace for bubble chart
      var bubbleTrace = {
        x: xAxis,
        y: yAxis,
        mode: 'markers',
        marker: {
          color: ['rgb(130, 18, 44)', 'rgb(18, 117, 28)', 'rgb(18, 91, 120)', 'rgb(74, 16, 110)', 'rgb(247, 33, 17)', 'rgb(57, 204, 12)', 'rgb(29, 167, 222)', 'rgb(88, 13, 217)'],
          opacity: [0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6],
          size: 80,
          line: {
            color: ['rgb(0, 0, 0)', 'rgb(0, 0, 0)', 'rgb(0, 0, 0)', 'rgb(0, 0, 0)', 'rgb(0, 0, 0)', 'rgb(0, 0, 0)', 'rgb(0, 0, 0)', 'rgb(0, 0, 0)'],
            width: [2, 2, 2, 2, 2, 2, 2, 2]
          }
        }
      }

      var bubbleData = [bubbleTrace];

      var bubbleLayout = {
        title: 'Ratings vs. Number of Movies',
        xaxis: {title: "Average Ratings"},
        yaxis: {title: "Total Number of Movies"},
        showlegend: false,
        height: 600,
        width: 800
      };

      Plotly.newPlot('plot3', bubbleData, bubbleLayout);
    })
  }
  buildPlot();
