import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Mapview from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

function Main() {
  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const location = await getCurrentPositionAsync();
      }
    }

    loadInitialPosition();
  }, []);

  return <Mapview style={styles.map} />
}
const styles = StyleSheet.create({
  map: {
    flex: 1
  },
})

export default Main;
