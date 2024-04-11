import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppColors} from '../../assests/AppColors';
import AppDropDown from '../../components/AppDropDown';
import {useSelector} from 'react-redux';
import {getTopFivePatry} from '../../network/networkRequest/mainApiRequest';
import TopFivePatryCard from '../../components/TopFivePatryCard';
import WinnerAndRunnerUpComponent from '../../components/WinnerAndRunnerUpComponent';
import AppHeader from '../../components/AppHeader';

const ElectionOveviewScreen = ({navigation}) => {
  const states = useSelector(state => state.appData.states);
  const year = useSelector(state => state.appData.year);
  const [selectetdState, setSelectedState] = useState('');
  const [selectetYear, setSelectedYear] = useState('');
  const [topFivePartyData, setTopFivePartyData] = useState([]);
  const [screenLoading, setScreenLoading] = useState();
  const [noData, setNodata] = useState('');

  useEffect(() => {
    handleTopFivePatries();
  }, [selectetdState, selectetYear]);

  const handleTopFivePatries = async () => {
    setScreenLoading(true);
    const data = {
      year: selectetYear.year,
      state: selectetdState.state_name,
    };
    const res = await getTopFivePatry(data);
    if (res.success) {
      setNodata(false);
      setScreenLoading(false);
      setTopFivePartyData(res?.data?.data?.state_data);
    } else {
      setScreenLoading(false);
      setTopFivePartyData('');
      setNodata(true);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: AppColors.white,
      }}>
      <StatusBar
        backgroundColor={AppColors.primaryColor}
        barStyle={'light-content'}
      />
      <AppHeader
        onPress={() => navigation.openDrawer()}
        isDrawer={true}
        title="Election Overview"
      />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: '10%',
          paddingVertical: 20,
          paddingHorizontal: 15,
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            color: AppColors.black,
            alignSelf: 'center',
          }}>
          National Level Election Overview (India)
        </Text>

        <View style={{marginTop: 20, paddingHorizontal: 5}}>
          <AppDropDown
            height={80}
            data={states}
            onChange={item => {
              setSelectedState(item);
            }}
            value={selectetdState.state_name}
            labelField="state_name"
            valueField="state_name"
            labelText="Select State"
            placeholder="--Select State--"
          />

          <AppDropDown
            style={{marginTop: 10}}
            height={80}
            data={year}
            onChange={item => {
              setSelectedYear(item);
            }}
            value={selectetYear?.year}
            labelField="year"
            valueField="year"
            labelText="Select Year"
            placeholder="--Select Year--"
          />
        </View>

        {screenLoading ? (
          <View style={{marginTop: '40%'}}>
            <ActivityIndicator color={AppColors.primaryColor} size={30} />
          </View>
        ) : noData ? (
          <View
            style={{
              height: 300,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: AppColors.dark_grey,
                fontWeight: '700',
                fontSize: 17,
                opacity: 0.8,
              }}>
              NO DATA FOUND
            </Text>
          </View>
        ) : (
          <View>
            <View
              style={{
                paddingVertical: 5,
                marginVertical: 25,
                elevation: 5,
                backgroundColor: AppColors.white,
                marginHorizontal: 5,
              }}>
              <View
                style={{
                  borderBottomWidth: 0.5,
                  borderColor: AppColors.grey,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    color: AppColors.black,
                  }}>
                  TOP 5 PARTIES
                </Text>
              </View>

              <View style={styles.cardRow}>
                <TopFivePatryCard
                  CandidateName={topFivePartyData?.winner?.candidate_name}
                  TotalVotes={topFivePartyData?.winner?.total_votes}
                  party={topFivePartyData?.winner?.party}
                />

                <TopFivePatryCard
                  CandidateName={topFivePartyData?.runner_up?.candidate_name}
                  TotalVotes={topFivePartyData?.runner_up?.total_votes}
                  party={topFivePartyData?.runner_up?.party}
                />
                <TopFivePatryCard
                  CandidateName={
                    topFivePartyData?.third_position?.candidate_name
                  }
                  TotalVotes={topFivePartyData?.third_position?.total_votes}
                  party={topFivePartyData?.third_position?.party}
                />
                <TopFivePatryCard
                  CandidateName={
                    topFivePartyData?.fourth_position?.candidate_name
                  }
                  TotalVotes={topFivePartyData?.fourth_position?.total_votes}
                  party={topFivePartyData?.fourth_position?.party}
                />
                <TopFivePatryCard
                  CandidateName={
                    topFivePartyData?.fifth_position?.candidate_name
                  }
                  TotalVotes={topFivePartyData?.fifth_position?.total_votes}
                  party={topFivePartyData?.fifth_position?.party}
                />
              </View>
            </View>

            <View
              style={{
                paddingVertical: 5,
                elevation: 2,
                elevation: 10,
                backgroundColor: AppColors.white,
                marginHorizontal: 5,
              }}>
              <View
                style={{
                  borderBottomWidth: 0.5,
                  borderColor: AppColors.grey,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    color: AppColors.black,
                  }}>
                  ELECTION RESULT ANALYSIS
                </Text>
              </View>

              <View style={styles.ELECTION_RESULT_ANALYSIS_cardRow}>
                <WinnerAndRunnerUpComponent
                  WinnerPatry={topFivePartyData?.winner?.party}
                  Votes={topFivePartyData?.winner?.total_votes}
                />
                <WinnerAndRunnerUpComponent
                  WinnerPatry={topFivePartyData?.runner_up?.party}
                  Votes={topFivePartyData?.runner_up?.total_votes}
                />
              </View>

              <Text
                style={{
                  color: AppColors.black,
                  textAlign: 'center',
                  fontSize: 13,
                  fontWeight: '700',
                  marginBottom: 10,
                }}>
                Winning Margin Votes : {topFivePartyData?.winner?.total_votes}
                (%)
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ElectionOveviewScreen;

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
