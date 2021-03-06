import React, {FunctionComponent} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Duration} from '../core/maps/Duration';
import {brittishPalette} from '../styles/colors';

type Props = {
  duration: Duration;
  distance: number;
};

export const RecordActivityInformation: FunctionComponent<Props> = props => {
  return (
    <>
      <View style={STYLE.container}>
        <View style={STYLE.textBox}>
          <Text style={STYLE.header}>Afstand:</Text>

          <Text style={STYLE.amounts}>{props.distance.toFixed(2)} km</Text>
        </View>
        <View style={STYLE.textBox}>
          <Text style={STYLE.header}>Tijd:</Text>

          <Text style={STYLE.amounts}>{props.duration.getHMS()}</Text>
        </View>
        <View style={STYLE.textBox}>
          <Text style={STYLE.header}>Snelheid:</Text>

          <Text style={STYLE.amounts}>
            {(
              props.distance /
              (props.duration.current / 1000 / 60 / 60)
            ).toFixed(2)} km/u
          </Text>
        </View>
      </View>
    </>
  );
};

const STYLE = StyleSheet.create({
  textBox: {
    minWidth: '45%',
    alignItems: 'center',
  },
  header: {
    fontSize: 15,
    color: brittishPalette.gray,
  },
  amounts: {
    fontSize: 30,
    color: brittishPalette.darkgray,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 50,
    paddingBottom: 50,
  },
});
