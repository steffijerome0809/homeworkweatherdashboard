var city = JSON.parse(localStorage.getItem("city")) || [];

var apiKey = "5e4c82fbd0742f2ed879eca39e3192ea";

// This function captures the location to be displayed from the response and takes the temp,humidity,wind speed
// units=imperial will convert the temperature to F

function defaultSearch(searchName) {
  $("#inputSearch").val(searchName);
  getData();
  //$("#inputSearch").val("");
}

function getData() {
  var searchparam = $("#inputSearch").val();

  searchCity(searchparam);

  var url = `https://api.openweathermap.org/data/2.5/weather?q=${searchparam}&appid=${apiKey}&units=imperial`;

  $.ajax({
    url: url,
    method: "GET",
  }).then(function (response) {
    //console.log(response);

    var countryname = response.name;
    var todaytime = moment().format("l");
    var icon = response.weather[0].icon;

    //console.log(icon);

    $("#cityName").html(
      countryname + "(" + todaytime + ")" + "<img id='weatherIcon'>"
    );
    $("#weatherIcon").attr(
      "src",
      "https://openweathermap.org/img/wn/" + icon + ".png"
    );

    $("#temp").html("Temperature: " + response.main.temp + "°F");
    $("#humid").html("Humidity: " + response.main.humidity);
    $("#windSpeed").html("Wind Speed: " + response.wind.speed);

    // A new ajax funciton is called to include api for uv index

    $.get(
      "https://api.openweathermap.org/data/2.5/uvi?appid=5e4c82fbd0742f2ed879eca39e3192ea&lat=" +
        response.coord.lat +
        "&lon=" +
        response.coord.lon +
        ""
    ).then(function (uvdata) {
      //console.log(uvdata);
      $("#uvIndex").html("UVIndex: " + uvdata.value);
    });

    // A new ajax function is called right after receiving the response from the previous uv index api

    $.get(
      "https://api.openweathermap.org/data/2.5/forecast?appid=5e4c82fbd0742f2ed879eca39e3192ea&q=" +
        searchparam +
        "&units=imperial"
    ).then(function (forecast) {
      //console.log(forecast);

      for (i = 0; i < 5; i++) {
        var days = forecast.list[8 * i];
        var date = moment().add(i, "days").format("l");

        console.log(days + ":" + date);
        // to retrive the information needed for 5 day forecast

        var forecastDate = $("#day" + i);
        var forecastIcon = days.weather[0].icon;

        console.log(forecastIcon);
        forecastDate.children(".date").html("<p>" + date + "</p>");

        forecastDate
          .children(".icon")
          .html(
            '<img src="https://openweathermap.org/img/w/' +
              forecastIcon +
              '.png" alt="weather icon">'
          );

        forecastDate.children(".temp").html("Temperature: " + days.main.temp);
        forecastDate
          .children(".humid")
          .html("Humidity: " + days.main.humidity + "%");
      }
    });
  });
}

// This function is generated when the user clicks the search button after entering the location
function search() {
  getData();
}

function searchCity(inputcity) {
  if (city.indexOf(inputcity) === -1) {
    city.push(inputcity);
    localStorage.setItem("city", JSON.stringify(city));
    rendercityHistory();
  } else {
    console.log("it exists");
  }
}

function rendercityHistory() {
  $(".item").empty();
  for (i = 0; i < city.length; i++) {
    $(".input-group").after(
      '<a href="#" onclick="defaultSearch($(this).text())" class="row item">' +
        city[i] +
        "</a>"
    );
  }
}
