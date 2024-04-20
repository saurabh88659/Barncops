import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppHeader from '../../components/AppHeader';
import {AppColors} from '../../assests/AppColors';
import {
  getConstituencyData,
  getPartyAndCandidateData,
  getPartyAndCandidatePCData,
  getPartyData,
} from '../../network/networkRequest/mainApiRequest';
import { BarChart, PieChart } from 'react-native-gifted-charts';
import { routes } from '../../shells/routes';

const PCIndiaVotesScreen = ({navigation, route}) => {
  const constituency_name = route.params.constituency_name;
  const year = route.params.year;
  const state = route.params.state;

  const [constituencyData, setConstituencyData] = useState('');
  const [patryData, setPartyData] = useState([]);
  const [candidateData, setCandidateData] = useState('');
  const [data, setData] = useState('');
  const [screenLoading, setScreenLoading] = useState(false);
  // const [count, setCount] = useState('');

  // setCount(10);

  const candidateDataKeys = Object.keys(candidateData);
  //   console.log('candidateDataKeys===========', candidateDataKeys);

  useEffect(() => {
    setScreenLoading(true);
    Promise.all([
      handleGetConstituencyData(),
      handleGetPatryData(),
      handleGetPartyAndCandidateData(),
      handleGetPartyAndCandidatePCData(),

    ])
      .then((res, rej) => {
        setScreenLoading(false);
      })
      .catch(error => {
        console.error('Error occurred while fetching data:', error);
        setScreenLoading(false);
      });
  }, []);

  const handleGetConstituencyData = async () => {
    const object = {
      state: state,
      year: year,
    };
    const res = await getConstituencyData(object);
    // console.log('res  of handleGetConstituencyData1111===>>', res.data.data);
    if (res.success) {
      setConstituencyData(res.data.data[0]);
    } else {
      setConstituencyData('');
      console.log('error of handleGetConstituencyData');
    }
  };

  const handleGetPatryData = async () => {
    const object = {
      state: state,
      year: year,
    };
    const res = await getPartyData(object);
    // console.log('res  of PatryData 22222====>>>', res.data.data);
    if (res.success) {
      setPartyData(res.data.data);
    } else {
      setPartyData('');
      console.log('error of handleGetPatryData');
    }
  };

  const handleGetPartyAndCandidateData = async () => {
    const object = {
      state: state,
      year: year,
      constituency_name: constituency_name,
    };
    const res = await getPartyAndCandidateData(object);
    // console.log(
    //   'res  of handleGetPartyAndCandidateDta3333333333333333333333===>>',
    //   JSON.stringify(res.data.data),
    // );
    if (res.success) {
      setCandidateData(res.data.data);
    } else {
      setCandidateData([]);
      console.log('error of handleGetPartyAndCandidateDta');
    }
  };

  const handleGetPartyAndCandidatePCData = async () => {
    const object = {
      state: state,
      year: year,
      constituency_name: constituency_name,
    };
    const res = await getPartyAndCandidatePCData(object);
    // console.log(
    //   'res  of handleGetPartyAndCandidateDta3333333333333333333333===>>',
    //   JSON.stringify(res.data.data),
    // );
    if (res.success) {
      setData(res.data.data);
    } else {
      setData([]);
      console.log('error of handleGetPartyAndCandidateDta');
    }
  };

  const PieChartColors = [
    '#177AD5',
    '#79D2DE',
    '#ED6665',
    '#F4B400',
    '#06A77D',
    '#B83A87',
  ];

  //1st grapth data[-------------------------------------------------------]
  const pieDatavotes =  data&&data.slice(0, 6)?.map((party, index) => {
    return {
      value: party?.votes,
      color: PieChartColors[index],
      text: party?.votes,
    };
  });

  const pieDatavotes1 = data&&data.slice(0, 6)?.map((party, index) => {
    return {
      value: party?.vote_percentage,
      frontColor: PieChartColors[index],
      text: `${party?.vote_percentage.toFixed(2)}%`,
      label: party?.party_name,
      topLabelComponent: () => (
        <Text style={{color: AppColors.black, fontSize: 16, marginBottom: 4}}>
          {party?.vote_percentage}
        </Text>
      ),
    };
  });

  const DotVotesDatas = data&&data.slice(0, 6)?.map((party, index) => {
    return {
      Partyname: party?.party_name,
      totalVotes: party?.votes,
      color: PieChartColors[index],
      votesPercentage:party?.votes,
    };
  });
  return (
    <View style={{flex: 1, backgroundColor: AppColors.white}}>
      <StatusBar
        backgroundColor={AppColors.primaryColor}
        barStyle={'light-content'}
      />
      <AppHeader
        onPress={() => navigation.goBack()}
        isDrawer={false}
        title={'India Votes'}
      />

      {screenLoading ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <ActivityIndicator color={AppColors.primaryColor} size={35} />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            paddingHorizontal: 15,
            backgroundColor: AppColors.white,
          }}>
            <Text
              style={{
                fontSize: 25,
                color: AppColors.black,
                fontWeight: '700',
                alignSelf: 'center',
                marginVertical: 20,
              }}>
              {`${state.replace("_"," ")}, ${constituency_name.replace("_"," ")}`}
            </Text>
          <ScrollView
            contentContainerStyle={{paddingHorizontal: 5, paddingVertical: 20}}
            showsVerticalScrollIndicator={false}>
           
             <ScrollView horizontal contentContainerStyle={{}}>
              <View
                style={{
                  padding: 10,
                  backgroundColor: AppColors.white,
                  paddingVertical: 20,
                  marginVertical: 20,
                  elevation: 6,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 15,
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      width: 100,
                      textAlign: 'center',
                      color: AppColors.black,
                      borderBottomWidth:1,
                      borderBottomColor:'black'
                    }}>
                    POSITITON
                  </Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      width: 250,
                      textAlign: 'center',
                      color: AppColors.black,
                      borderBottomWidth:1,
                      borderBottomColor:'black'
                    }}>
                    CANDIDATE NAME
                  </Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      width: 120,
                      textAlign: 'center',
                      color: AppColors.black,
                      borderBottomWidth:1,
                      borderBottomColor:'black'
                    }}>
                    PARTY NAME
                  </Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      width: 100,
                      textAlign: 'center',
                      color: AppColors.black,
                      borderBottomWidth:1,
                      borderBottomColor:'black'
                    }}>
                    VOTES
                  </Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      width: 100,
                      textAlign: 'center',
                      color: AppColors.black,
                      borderBottomWidth:1,
                      borderBottomColor:'black'
                    }}>
                    VOTE PERCENTAGE
                  </Text>
                </View>
                {data && (data.slice(0,5).map(item=>(
                  <View
                    style={{
                      flexDirection: 'row',
                      marginBottom:5
                    }}>
                    <Text
                      style={{
                        width: 100,
                        textAlign: 'center',
                        color: AppColors.black,
                        fontSize: 16,
                      }}>
                      {item?.position}
                    </Text>
                    <Text
                      style={{
                        // fontWeight: 'bold',
                        textAlign: 'center',
                        width: 250,
                        fontSize: 16,
                        color: AppColors.black,
                      }}>
                      {item?.candidate_name}
                    </Text>
                    <Text
                      style={{
                        width: 120,
                        // fontWeight: 'bold',
                        textAlign: 'center',
                        color: AppColors.black,
                        fontSize: 16,
                      }}>
                      {item?.party_name}
                    </Text>
                    <Text
                      style={{
                        width: 100,
                        // fontWeight: 'bold',
                        textAlign: 'center',
                        color: AppColors.black,
                        fontSize: 16,
                      }}>
                      {item?.votes}
                    </Text>
                    <Text
                      style={{
                        width: 100,
                        // fontWeight: 'bold',
                        textAlign: 'center',
                        color: AppColors.black,
                        fontSize: 16,
                      }}>
                      {item?.vote_percentage}
                    </Text>
                  </View>
                )))}
              </View>
            </ScrollView>

            <View
              style={{
                backgroundColor: AppColors.white,
                elevation: 5,
                alignItems: 'center',
                paddingVertical: 20,
                width: '100%',
                borderRadius: 6,
              }}>
              <>
                {DotVotesDatas && DotVotesDatas.length > 0 && (
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      paddingHorizontal: 10,
                      marginBottom: 20,
                    }}>
                    {DotVotesDatas.map((item, index) => {
                      return (
                        <View
                          style={{
                            justifyContent: 'center',
                            marginBottom: 10,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              width: 120,
                              marginRight: 20,
                            }}>
                            <View
                              style={{
                                height: 10,
                                width: 30,
                                borderRadius: 1,
                                backgroundColor: item.color,
                                marginRight: 5,
                              }}
                            />
                            <Text style={{color: AppColors.black, width: 50}}>
                              {item.Partyname}
                            </Text>
                            <Text
                              style={{color: AppColors.black, marginLeft: 10}}>
                              {item.votesPercentage}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                )}
                {pieDatavotes.length > 0 && (
                  <PieChart
                    isAnimated={true}
                    animationDuration={1}
                    // showText
                    textColor="black"
                    shadowWidth={2}
                    shadow={'red'}
                    radius={150}
                    textSize={15}
                    textBackgroundRadius={26}
                    data={pieDatavotes}
                    showValuesAsLabels
                  />
                )}
                <Text
                  style={{color: AppColors.black, marginTop: 10, fontSize: 17}}>
                  Votes
                </Text>
              </>
              <View
                style={{
                  marginTop: 30,
                  alignItems: 'center',
                }}>
                {pieDatavotes1 && pieDatavotes1.length > 0 && (
                  <BarChart
                    height={300}
                    textColor="black"
                    shadowWidth={2}
                    shadow={'red'}
                    textSize={1}
                    barColor={'black'}
                    data={pieDatavotes1}
                    yAxisTextStyle={{color: 'black'}}
                    xAxisLabelTextStyle={{color: 'black', fontSize: 1}}
                  />
                )}
                <Text
                  style={{
                    color: AppColors.black,
                    marginTop: 10,
                    fontSize: 17,
                  }}>
                  Votes Percentage
                </Text>
              </View>
            </View>


            {data.length > 0 ? (
              <ScrollView horizontal contentContainerStyle={{}}>
                <View
                  style={{
                    // padding: 10,
                    backgroundColor: AppColors.white,
                    paddingBottom: 20,
                    elevation: 6,
                    paddingTop: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 15,
                      backgroundColor: '#000',
                      paddingVertical: 10,
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        width: 100,
                        textAlign: 'center',
                        color: AppColors.white,
                        // backgroundColor: 'green',
                      }}>
                      POSITION
                    </Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        width: 120,
                        textAlign: 'center',
                        color: AppColors.white,
                        // backgroundColor: 'red',
                      }}>
                      CONSTITUENCY
                    </Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        width: 250,
                        textAlign: 'center',
                        color: AppColors.white,
                      }}>
                      CANDIDATE
                    </Text>

                    <Text
                      style={{
                        fontWeight: 'bold',
                        width: 150,
                        textAlign: 'center',
                        color: AppColors.white,
                      }}>
                      PARTY
                    </Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        width: 80,
                        textAlign: 'center',
                        color: AppColors.white,
                      }}>
                      VOTES
                    </Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        width: 100,
                        textAlign: 'center',
                        color: AppColors.white,
                      }}>
                      VOTES PERCENTAGE
                    </Text>
                  </View>

                  <View>
                    {data &&
                      data.map((item, index) => {
                        console.log('item>>>>>>>>>>>>>>', item);
                        return (
                          <View
                            style={{
                              flexDirection: 'row',
                              // justifyContent: 'space-between',
                              marginBottom: 15,
                              paddingVertical: 10,
                            }}>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                width: 100,
                                textAlign: 'center',
                                color: AppColors.black,
                                // backgroundColor: 'red',
                              }}>
                              {item.position || '-'}
                            </Text>
                            <TouchableOpacity
                              onPress={() =>
                                navigation.navigate(routes.IndiaVotes_Screen, {
                                  constituency_name: item?.constituency_name,
                                  year: year,
                                  state: state,
                                })
                              }
                              style={{}}>
                              <Text
                                style={{
                                  fontWeight: 'bold',
                                  width: 120,
                                  textAlign: 'center',
                                  color: AppColors.oxfordBlue,
                                  textDecorationLine: 'underline',
                                  // backgroundColor: 'green',
                                }}>
                                {item.constituency_name.replace('_',' ') || '-'}
                              </Text>
                            </TouchableOpacity>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                width: 250,
                                textAlign: 'center',
                                color: AppColors.black,
                              }}>
                              {item.candidate_name || '-'}
                            </Text>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                width: 150,
                                textAlign: 'center',
                                color: AppColors.black,
                              }}>
                              {item.party_name || '-'}
                            </Text> 
                            <Text
                              style={{
                                fontWeight: 'bold',
                                width: 80,
                                textAlign: 'center',
                                color: AppColors.black,
                              }}>
                              {item.votes || '-'}
                            </Text>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                width: 100,
                                textAlign: 'center',
                                color: AppColors.black,
                              }}>
                              {item.vote_percentage|| '-'}
                            </Text>                     
                          </View>
                        );
                      })}
                  </View>
                </View>
              </ScrollView>
            ) : (
              <View style={{alignItems: 'center', paddingVertical: 20}}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '800',
                    color: AppColors.dark_grey,
                    opacity: 0.8,
                  }}>
                  NO DATA FOUND!
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default PCIndiaVotesScreen;

const styles = StyleSheet.create({});
