import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import styles from "./style";

class Mondrian extends Component {
  render() {
    return (
      <View style={styles.parent}>
        <View style={styles.topBlock}>
          <View style={styles.leftCol}>
            <View style={[styles.cellOne, styles.base]}>
              <Text> One </Text>
            </View>
            <View style={[styles.base, styles.cellTwo]}>
              <Text> Two </Text>
            </View>
          </View>
          <View style={[styles.cellThree, styles.base]}>
            <Text> Three </Text>
          </View>
        </View>
        <View style={styles.bottomBlock}>
          <View style={[styles.cellFour, styles.base]}>
            <Text> Four </Text>
          </View>
          <View style={[styles.cellFive, styles.base]}>
            <Text> Five </Text>
          </View>
          <View style={styles.bottomRight}>
            <View style={[styles.cellSix, styles.base]}>
              <Text> Six </Text>
            </View>
            <View style={[styles.cellSeven, styles.base]}>
              <Text> Seven </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default Mondrian;
