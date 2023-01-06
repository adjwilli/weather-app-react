const codes = {
  "0": {
    "string": "Clear sky",
    "className": "clear",
    "faIcon": "sun",
	"precipitation": false,
	"atmosphere": 0
  },
  "1": {
    "string": "Mainly clear",
    "className": "clear",
    "faIcon": "sun",
	"precipitation": false,
	"atmosphere": 1
  },
  "2": {
    "string": "Partly cloudy",
    "className": "partly-cloudy",
    "faIcon": "cloud-sun",
	"precipitation": false,
	"atmosphere": 2
  },
  "3": {
    "string": "Overcast",
    "className": "cloudy",
    "faIcon": "cloud",
	"precipitation": false,
	"atmosphere": 3
  },
  "45": {
    "string": "Fog",
    "className": "foggy",
    "faIcon": "smog",
	"precipitation": false,
	"atmosphere": 4
  },
  "48": {
    "string": "Depositing rime fog",
    "className": "foggy",
    "faIcon": "smog",
	"precipitation": false,
	"atmosphere": 4
  },
  "51": {
    "string": "Drizzle: Light",
    "className": "drizzle",
    "faIcon": "cloud-rain",
	"precipitation": "drizzle",
	"atmosphere": 3
  },
  "53": {
    "string": "Drizzle: Moderate",
    "className": "drizzle",
    "faIcon": "cloud-rain",
	"precipitation": "drizzle",
	"atmosphere": 3
  },
  "55": {
    "string": "Drizzle: Strong",
    "className": "drizzle",
    "faIcon": "cloud-rain",
	"precipitation": "drizzle",
	"atmosphere": 3
  },
  "56": {
    "string": "Freezing Drizzle: Light",
    "className": "drizzle",
    "faIcon": "cloud-rain",
	"precipitation": "drizzle",
	"atmosphere": 3
  },
  "57": {
    "string": "Freezing Drizzle: Strong",
    "className": "drizzle",
    "faIcon": "cloud-rain",
	"precipitation": "drizzle",
	"atmosphere": 3
  },
  "61": {
    "string": "Rain: Light",
    "className": "precipitation",
    "faIcon": "cloud-showers-heavy",
	"precipitation": "rain",
	"atmosphere": 3
  },
  "63": {
    "string": "Rain: Moderate",
    "className": "precipitation",
    "faIcon": "cloud-showers-heavy",
	"precipitation": "rain",
	"atmosphere": 3
  },
  "65": {
    "string": "Rain: Strong",
    "className": "precipitation",
    "faIcon": "cloud-showers-heavy",
	"precipitation": "rain",
	"atmosphere": 3
  },
  "66": {
    "string": "Freezing Rain: Light",
    "className": "precipitation",
    "faIcon": "cloud-showers-heavy",
	"precipitation": "rain",
	"atmosphere": 3
  },
  "67": {
    "string": "Freezing Rain: Strong",
    "className": "precipitation",
    "faIcon": "cloud-showers-heavy",
	"precipitation": "rain",
	"atmosphere": 3
  },
  "71": {
    "string": "Snow: Light",
    "className": "snow",
    "faIcon": "snowflake",
	"precipitation": "snow",
	"atmosphere": 3
  },
  "73": {
    "string": "Snow: Moderate",
    "className": "snow",
    "faIcon": "snowflake",
	"precipitation": "snow",
	"atmosphere": 3
  },
  "75": {
    "string": "Snow: Strong",
    "className": "snow",
    "faIcon": "snowflake",
	"precipitation": "snow",
	"atmosphere": 3
  },
  "77": {
    "string": "Snow Grains",
    "className": "snow",
    "faIcon": "snowflake",
	"precipitation": "snow",
	"atmosphere": 3
  },
  "80": {
    "string": "Rain Showers: Light",
    "className": "precipitation",
    "faIcon": "cloud-showers-heavy",
	"precipitation": "rain",
	"atmosphere": 3
  },
  "81": {
    "string": "Rain Showers: Moderate",
    "className": "precipitation",
    "faIcon": "cloud-showers-heavy",
	"precipitation": "rain",
	"atmosphere": 3
  },
  "82": {
    "string": "Rain Showers: Strong",
    "className": "precipitation",
    "faIcon": "cloud-showers-heavy",
	"precipitation": "rain",
	"atmosphere": 3
  },
  "85": {
    "string": "Snow Showers: Light",
    "className": "snow",
    "faIcon": "snowflake",
	"precipitation": "snow",
	"atmosphere": 3
  },
  "86": {
    "string": "Snow Showers: Strong",
    "className": "snow",
    "faIcon": "snowflake",
	"precipitation": "snow",
	"atmosphere": 3
  },
  "95": {
    "string": "Thunderstorms",
    "className": "storm",
    "faIcon": "cloud-bolt",
	"precipitation": "rain",
	"atmosphere": 3
  },
  "96": {
    "string": "Thunderstorms",
    "className": "storm",
    "faIcon": "cloud-bolt",
	"precipitation": "rain",
	"atmosphere": 3
  },
  "99": {
    "string": "Thunderstorm: with Hail: Strong",
    "className": "storm",
    "faIcon": "cloud-bolt",
	"precipitation": "rain",
	"atmosphere": 3
  }
}

module.exports = codes;
