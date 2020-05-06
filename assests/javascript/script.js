var apiKey = "5e4c82fbd0742f2ed879eca39e3192ea";

// //var city = $("inputCity").val();
// var city = "london,uk";
// var test = city.split(",");
// var country = test[test.length - 1];
// var city = city.replace("," + country, "");

// console.log(city + "+" + country);

// api.openweathermap.org/data/2.5/weather?q={city name},{state}&appid={your api key}

var url = `https://api.openweathermap.org/data/2.5/weather?q=london,&appid=${apiKey}`;

$.ajax({
  url: url,
  method: "GET",
}).then(function (response) {
  console.log(response);
});
