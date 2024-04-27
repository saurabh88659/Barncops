import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {AppColors} from '../assests/AppColors';

const TopFivePatryCard = ({
  CandidateName = 'CandidateName',
  TotalVotes,
  party,
}) => {
  return (
    <TouchableOpacity style={styles.stateCard}>
      {/* <View
        style={{
          height: 70,
          width: 70,
          borderRadius: 120 / 2,
          backgroundColor: '#ff8000',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          resizeMode="contain"
          style={{height: 45, width: 45}}
          source={require('../assests/images/partyLogo/bjp.png')}
        />
      </View> */}
      <Text
        style={{
          color: AppColors.black,
          textAlign: 'center',
          fontSize: 15,
          fontWeight: '800',
          marginTop: 5,
        }}>
        {party}
      </Text>
      <View
        style={{
          height: 2,
          width: '80%',
          backgroundColor: AppColors.white,
          marginVertical: 15,
        }}></View>
      <View
        style={{
          alignSelf: 'center',
          width: '100%',
          paddingHorizontal: 5,
        }}>
        <View
          style={{
            // flexDirection: 'row',
            alignItems: 'flex-center',
            justifyContent:'center',
            width: '100%',
            marginBottom: 5,
          }}>
          <Text
            style={{
              color: AppColors.black,
              textAlign: 'center',
              fontSize: 13,
              fontWeight: '500',
            }}>
            Candidate:
          </Text>
          <Text
            style={{
              color: AppColors.black,
              textAlign: 'center',
              fontSize: 12,
              fontWeight: '800',
            }}>
            {CandidateName}
          </Text>
        </View>

        <View
          style={{
            // flexDirection: 'row',
            alignItems: 'flex-center',
            justifyContent:'center',
            width: '100%',
          }}>
          <Text
            style={{
              color: AppColors.black,
              textAlign: 'center',
              fontSize: 13,
              fontWeight: '500',
            }}>
            Total Votes
          </Text>
          <Text
            style={{
              color: AppColors.black,
              textAlign: 'center',
              fontSize: 13,
              fontWeight: '800',
            }}>
            {TotalVotes}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TopFivePatryCard;

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
