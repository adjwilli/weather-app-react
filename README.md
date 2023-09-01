# What is this project?

As we were being asked more and more to have our project at work support React apps, I wanted to to get a deeper understanding of the framework, so I decided to make a weather app similar to the built-in iOS Weather app. The requirements I set were for it to support adding multiple cities from a search field or using the current location based on the [`navigator.geolocation`](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwiX_cXmj7T8AhXGkmoFHZu7A7gQFnoECB4QAQ&url=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FNavigator%2Fgeolocation&usg=AOvVaw3J1gfFvRKpnrPqoPo6GV4W) API, being able to swipe them away to remove them, and having animated background to visualize the weather.

This project uses the [Open Meteo API](https://open-meteo.com) for weather  and location data.

Backgrounds are animated depending on the weather of the location using a heavily modified fork of [ParticlesJS](https://vincentgarreau.com/particles.js/).

To run the project locally, start by running `npm install` then `npm start` to run the app in the development mode. This will start at web server available at [http://localhost:3000](http://localhost:3000).

<video src='https://github.com/adjwilli/weather-app-react/assets/260890/aac7edf3-1dbf-4660-a585-ac494a74fd57' width=180 autoplay/>
