import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {AppColors} from '../assests/AppColors';

const WinnerAndRunnerUpComponent = ({WinnerPatry, Votes}) => {
  return (
    <TouchableOpacity style={styles.ELECTION_RESULT_ANALYSIS_Card}>
      <View
        style={{
          height: 45,
          width: '100%',
          backgroundColor: '#ff8000',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              color: AppColors.white,
              textAlign: 'center',
              fontSize: 15,
              fontWeight: '800',
              marginTop: 5,
              marginRight: 5,
            }}>
            Winner :
          </Text>
          <Text
            style={{
              color: AppColors.white,
              textAlign: 'center',
              fontSize: 15,
              fontWeight: '800',
              marginTop: 5,
            }}>
            {WinnerPatry}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '100%',
          paddingHorizontal: 15,
          paddingVertical: 10,
        }}>
        <View
          style={{
            height: 70,
            width: 70,
            borderRadius: 120 / 2,
            backgroundColor: '#ff8000',
            marginRight: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            resizeMode="contain"
            style={{height: 45, width: 45}}
            source={require('../assests/images/partyLogo/bjp.png')}
          />
        </View>

        <View style={{alignItems: 'flex-start'}}>
          <Text
            style={{
              color: AppColors.black,
              textAlign: 'center',
              fontSize: 13,
              fontWeight: '900',
              marginBottom: 5,
              marginRight: 5,
            }}>
            Votes
          </Text>
          <Text
            style={{
              color: AppColors.black,
              textAlign: 'center',
              fontSize: 13,
              fontWeight: '700',
            }}>
            {Votes}(%)
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default WinnerAndRunnerUpComponent;

const styles = StyleSheet.create({
  cardRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  stateCard: {
    height: 200,
    width: '48%',
    backgroundColor: AppColors.grey,
    backgroundColor: '#d7d7d7',

    marginBottom: 10,
    borderRadius: 2,
    elevation: 5,
    alignItems: 'center',
    paddingVertical: 10,
  },

  ELECTION_RESULT_ANALYSIS_Card: {
    width: '90%',
    backgroundColor: '#d7d7d7',
    marginBottom: 10,
    borderRadius: 2,
    elevation: 5,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  ELECTION_RESULT_ANALYSIS_cardRow: {
    alignSelf: 'center',
    width: '100%',
  },
});
