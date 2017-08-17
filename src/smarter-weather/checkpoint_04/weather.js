import React, { Component } from "react";

import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image
} from "react-native";

import Forecast from "./forecast";
import OpenWeatherMap from "./open_weather_map";

const STORAGE_KEY = "@SmarterWeather:zip";

class WeatherProject extends Component {
  constructor(props) {
    super(props);
    this.state = { zip: "", forecast: null };

    // If a previous zip code exists, load that.
    // Otherwise, fetch the user's current location.
    this._loadZipCode().then(zip => {
      if (zip !== null) {
        this.state.zip = zip;
        this._getForecastForZip(zip);
      } else {
        this._fetchLocation();
      }
    });
  }

  _loadZipCode = () => {
    return AsyncStorage
      .getItem(STORAGE_KEY)
      .catch(error => console.error("AsyncStorage error: " + error.message));
  };

  _fetchLocation = () => {
    navigator.geolocation.getCurrentPosition(
      initialPosition => {
        let lat = initialPosition.coords.latitude;
        let long = initialPosition.coords.longitude;
        this._getForecastForLocation(lat, long);
      },
      error => {
        alert(error.message);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  _getForecastForLocation = (lat, long) => {
    OpenWeatherMap.fetchLatLonForecast(lat, long).then(forecast => {
      this.setState({ forecast: forecast });
    });
  };

  _getForecastForZip = zip => {
    // Store zip code
    AsyncStorage
      .setItem(STORAGE_KEY, zip)
      .then(() => console.log("Saved selection to disk: " + zip))
      .catch(error => console.error("AsyncStorage error: " + error.message));

    OpenWeatherMap.fetchZipForecast(zip).then(forecast => {
      this.setState({ forecast: forecast });
    });
  };

  _handleTextChange = event => {
    let zip = event.nativeEvent.text;
    this._getForecastForZip(zip);
  };

  render() {
    let content = null;
    if (this.state.forecast !== null) {
      content = (
        <Forecast
          main={this.state.forecast.main}
          description={this.state.forecast.description}
          temp={this.state.forecast.temp}
        />
      );
    }
    return (
      <View style={styles.container}>
        <Image
          source={require("./flowers.png")}
          resizeMode="cover"
          style={styles.backdrop}
        >
          <View style={styles.overlay}>
            <View style={styles.row}>
              <Text style={styles.mainText}>
                Current weather for
              </Text>
              <View style={styles.zipContainer}>
                <TextInput
                  style={[styles.zipCode, styles.mainText]}
                  onSubmitEditing={this._handleTextChange}
                  underlineColorAndroid="transparent"
                  defaultValue={this.state.zip}
                />
              </View>
            </View>
            {content}
          </View>
        </Image>
      </View>
    );
  }
}

const baseFontSize = 16;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", paddingTop: 30 },
  backdrop: { flex: 1, flexDirection: "column" },
  overlay: {
    paddingTop: 5,
    backgroundColor: "#000000",
    opacity: 0.5,
    flexDirection: "column",
    alignItems: "center"
  },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "flex-start",
    padding: 30
  },
  zipContainer: {
    height: baseFontSize + 10,
    borderBottomColor: "#DDDDDD",
    borderBottomWidth: 1,
    marginLeft: 5,
    marginTop: 3
  },
  zipCode: { flex: 1, flexBasis: 1, width: 50, height: baseFontSize },
  mainText: { fontSize: baseFontSize, color: "#FFFFFF" }
});

export default WeatherProject;
