import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppHeader from '../../components/AppHeader';
import {AppColors} from '../../assests/AppColors';
import {
  getConstituencyData,
  getPartyAndCandidateData,
  getPartyData,
} from '../../network/networkRequest/mainApiRequest';
import {BarChart, PieChart} from 'react-native-gifted-charts';

const IndiaVotesScreen = ({navigation, route}) => {
  const constituency_name = route.params.constituency_name;
  const year = route.params.year;
  const state = route.params.state;

  const [constituencyData, setConstituencyData] = useState('');
  const [patryData, setPartyData] = useState([]);
  const [candidateData, setCandidateData] = useState('');
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

  const partyColors = {
    BJP: '#FF6A00',
    INC: '#0061FE',
    TMC: '#515405',
    AIADMK: '#333333',
    DMK: '#B51900',
    BSP: '#012F7B',
    SP: '#263D0F',
    NCP: '#3B87FE',
    CPI: '#5C0702',
    'CPI (M)': '#FF6252',
    'JD(U)': '#36581B',
    LJP: '#52D6FC',
    RJD: '#B1DC8A',
    TDP: '#FDFC42',
    BRS: '#EF719E',
    AAP: '#016D90',
    NPP: '#F6EC00',
    BJD: '#97D35F',
    INLD: '#4D7928',
    SAD: '#FFAB02',
    YSRCP: '#381A94',
    'JD(S)': '#76BA3F',
    NPF: '#93E3FC',
    AIMIM: '#94E3FB',
  };

  //1st grapth data[-------------------------------------------------------]
  const pieDatavotes = patryData.slice(0, 6)?.map((party, index) => {
    return {
      value: party?.Total_Votes,
      color: partyColors[party?.Party_Name] || '#000000',
      text: `${party?.Vote_Percentage.toFixed(2)}%`,
    };
  });

  const pieDatavotes1 = patryData.slice(0, 6)?.map((party, index) => {
    return {
      value: party?.Total_Seats,
      frontColor: partyColors[party?.Party_Name] || '#000000',
      text: party?.Total_Seats,
      label: party?.Party_Name,
      topLabelComponent: () => (
        <Text style={{color: AppColors.black, fontSize: 16, marginBottom: 4}}>
          {party?.Total_Seats}
        </Text>
      ),
    };
  });

  const DotVotesDatas = patryData.slice(0, 6)?.map((party, index) => {
    return {
      Partyname: party?.Party_Name,
      totalVotes: party?.Total_Votes,
      color: partyColors[party?.Party_Name] || '#000000',
      votesPercentage: `${party?.Vote_Percentage.toFixed(2)}%`,
    };
  });

  const TableKeyVauePair = ({tablekey, value}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 10,
        }}>
        <Text style={{fontSize: 15, fontWeight: '700', color: AppColors.black}}>
          {tablekey}
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: '700',
            color: AppColors.dark_grey,
          }}>
          {value}
        </Text>
      </View>
    );
  };

  const renderItem = ({item}) => (
    // console.log('item of party data------------------------', item),
    <View
      style={{
        flexDirection: 'row',
        marginTop: 10,
      }}>
      <View
        style={{
          minWidth: 120,
          paddingVertical: 5,
          backgroundColor: AppColors.white,
          alignItems: 'center',
        }}>
        <Text style={{color: 'black'}}>
          {item?.Party_Name || '-'}
          {/* NAME */}
        </Text>
      </View>
      <View
        style={{
          minWidth: 120,
          paddingVertical: 5,
          backgroundColor: AppColors.white,
          alignItems: 'center',
        }}>
        <Text style={{color: 'black'}}>
          {item?.Total_Seats || '-'}
          {/* PROJECT */}
        </Text>
      </View>
      <View
        style={{
          minWidth: 120,
          paddingVertical: 5,
          backgroundColor: AppColors.white,
          alignItems: 'center',
        }}>
        <Text style={{color: 'black'}}>
          {item?.Total_Votes || '-'}
          {/* UNIT NO. */}
        </Text>
      </View>

      <View
        style={{
          width: 150,
          paddingVertical: 5,
          backgroundColor: AppColors.white,
          alignItems: 'center',
        }}>
        <Text style={{color: 'black'}}>
          {item?.Vote_Percentage + '%' || '-'}
          {/* UNIT NO. */}
        </Text>
      </View>
    </View>
  );

  const renderItem3 = ({item}) => {
    console.log('item of renderItem4====', item);
    return (
      <View>
        <FlatList
          data={item.data}
          renderItem={renderItem2}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  };

  const renderItem2 = ({item}) => (
    <View
      style={{
        flexDirection: 'row',
        marginTop: 10,
      }}>
      <View
        style={{
          minWidth: 200,
          paddingVertical: 5,
          backgroundColor: AppColors.white,
          alignItems: 'center',
        }}>
        <Text style={{color: 'black'}}>{item['Candidate Name'] || '-'}</Text>
      </View>
      <View
        style={{
          minWidth: 120,
          paddingVertical: 5,
          backgroundColor: AppColors.white,
          alignItems: 'center',
        }}>
        <Text style={{color: 'black'}}>
          {item['Party Name'] || '-'}

          {/* PROJECT */}
        </Text>
      </View>
      <View
        style={{
          minWidth: 120,
          paddingVertical: 5,
          backgroundColor: AppColors.white,
          alignItems: 'center',
        }}>
        <Text style={{color: 'black'}}>{item['Votes'] || '-'}</Text>
      </View>

      <View
        style={{
          width: 150,
          paddingVertical: 5,
          backgroundColor: AppColors.white,
          alignItems: 'center',
        }}>
        <Text style={{color: 'black'}}>
          {item['Vote Percentage'] + '%' || '-'}
          {/* UNIT NO. */}
        </Text>
      </View>
    </View>
  );

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
          <ScrollView
            contentContainerStyle={{paddingHorizontal: 5, paddingVertical: 20}}
            showsVerticalScrollIndicator={false}>
            {constituencyData && (
              <View
                style={{
                  backgroundColor: AppColors.white,
                  elevation: 6,
                  paddingHorizontal: 10,
                  borderRadius: 6,
                }}>
                <TableKeyVauePair
                  tablekey={'State :'}
                  value={constituencyData?.State || '-'}
                />
                <TableKeyVauePair
                  tablekey={'Year :'}
                  value={constituencyData?.Year || '-'}
                />
                <TableKeyVauePair
                  tablekey={'PC Name:'}
                  value={constituencyData?.PC_Name || '-'}
                />

                <TableKeyVauePair
                  tablekey={'Total ACs:'}
                  value={constituencyData?.AC_Names?.length?.toString() || '-'}
                />

                <TableKeyVauePair
                  tablekey={'Winner :'}
                  value={constituencyData?.Winner || '-'}
                />
                <TableKeyVauePair
                  tablekey={'Winning Party :'}
                  value={constituencyData?.Winning_Party || '-'}
                />
              </View>
            )}

            {patryData.length > 0 && (
              <ScrollView
                nestedScrollEnabled={true}
                style={{}}
                horizontal={true}>
                <View
                  style={{
                    backgroundColor: AppColors.white,
                    elevation: 2,
                    marginTop: 5,
                  }}>
                  <FlatList
                    contentContainerStyle={{
                      paddingHorizontal: 5,
                    }}
                    nestedScrollEnabled={true}
                    data={patryData.slice(0, 5)}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={() => (
                      <View style={{flexDirection: 'row', marginTop: 25}}>
                        <View
                          style={{
                            width: 120,
                            paddingVertical: 5,
                            backgroundColor: '#000',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              color: AppColors.white,
                              fontSize: 14,
                            }}>
                            PARTY NAME
                          </Text>
                        </View>
                        <View
                          style={{
                            width: 120,
                            paddingVertical: 5,
                            backgroundColor: '#000',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              color: AppColors.white,
                              fontSize: 14,
                            }}>
                            TOTAL SEATS
                          </Text>
                        </View>
                        <View
                          style={{
                            width: 120,
                            paddingVertical: 5,
                            backgroundColor: '#000',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              color: AppColors.white,
                              fontSize: 14,
                            }}>
                            TOTAL VOTES
                          </Text>
                        </View>
                        <View
                          style={{
                            width: 150,
                            paddingVertical: 5,
                            backgroundColor: '#000',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              color: AppColors.white,
                              fontSize: 14,
                            }}>
                            VOTES PERCENTAGE
                          </Text>
                        </View>
                      </View>
                    )}
                  />
                </View>
              </ScrollView>
            )}
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
                    donut
                    innerCircleBorderWidth={6}
                    innerCircleBorderColor="lightgray"
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
                  Total Votes
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
                    textSize={15}
                    barColor={'black'}
                    data={pieDatavotes1}
                    yAxisTextStyle={{color: 'black'}}
                    xAxisLabelTextStyle={{color: 'black', fontSize: 13}}
                  />
                )}
                <Text
                  style={{
                    color: AppColors.black,
                    marginTop: 10,
                    fontSize: 17,
                  }}>
                  Total Seats
                </Text>
              </View>
            </View>
            {/* {candidateDataKeys.length > 0 && (
              <ScrollView
                nestedScrollEnabled={true}
                style={{}}
                horizontal={true}>
                <View
                  style={{
                    backgroundColor: AppColors.white,
                    elevation: 2,
                    marginTop: 5,
                  }}>
                  <FlatList
                    data={candidateDataKeys.map(key => ({
                      title: key,
                      data: candidateData[key].Candidates,
                    }))}
                    renderItem={renderItem3}
                    keyExtractor={item => item.title}
                    // renderSectionHeader={renderHeader}
                    stickyHeaderIndices={[0]}
                    SectionSeparatorComponent={() => (
                      <View style={{height: 10}} />
                    )}
                    ListHeaderComponent={() => (
                      <View style={{flexDirection: 'row', marginTop: 25}}>
                        <View
                          style={{
                            width: 200,
                            paddingVertical: 5,
                            backgroundColor: '#000',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              color: AppColors.white,
                              fontSize: 14,
                            }}>
                            CANDIDATE NAME
                          </Text>
                        </View>
                        <View
                          style={{
                            width: 120,
                            paddingVertical: 5,
                            backgroundColor: '#000',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              color: AppColors.white,
                              fontSize: 14,
                            }}>
                            PARTY NAME
                          </Text>
                        </View>
                        <View
                          style={{
                            width: 120,
                            paddingVertical: 5,
                            backgroundColor: '#000',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              color: AppColors.white,
                              fontSize: 14,
                            }}>
                            VOTES
                          </Text>
                        </View>
                        <View
                          style={{
                            width: 150,
                            paddingVertical: 5,
                            backgroundColor: '#000',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              color: AppColors.white,
                              fontSize: 14,
                            }}>
                            VOTES PERCENTAGE
                          </Text>
                        </View>
                      </View>
                    )}
                  />
                </View>
              </ScrollView>
            )} */}
            <ScrollView nestedScrollEnabled={true} horizontal={false}>
              {Object.keys(candidateData).map(constituency => (
                <View
                  key={constituency}
                  style={{backgroundColor: '#fff', elevation: 2, padding: 10}}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      color: AppColors.black,
                    }}>
                    {constituency}
                  </Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      textAlign: 'center',
                      color: AppColors.black,
                    }}>
                    Total Votes: {candidateData[constituency]['Total Votes']}
                  </Text>
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
                            width: 250,
                            textAlign: 'center',
                            color: AppColors.white,
                            // backgroundColor: 'green',
                          }}>
                          CANDIDATE NAME
                        </Text>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            width: 100,
                            textAlign: 'center',
                            color: AppColors.white,
                            // backgroundColor: 'red',
                          }}>
                          PARTY NAME
                        </Text>

                        <Text
                          style={{
                            fontWeight: 'bold',
                            width: 100,
                            textAlign: 'center',
                            color: AppColors.white,
                          }}>
                          VOTES
                        </Text>

                        <Text
                          style={{
                            fontWeight: 'bold',
                            width: 150,
                            textAlign: 'center',
                            color: AppColors.white,
                          }}>
                          VOTES PERCENTAGE
                        </Text>
                      </View>
                      <View>
                        {candidateData &&
                          candidateData[constituency].Candidates.map(
                            (item, index) => {
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
                                      width: 250,
                                      textAlign: 'center',
                                      color: AppColors.black,
                                    }}>
                                    {item['Candidate Name'] || '-'}
                                  </Text>
                                  <Text
                                    style={{
                                      fontWeight: 'bold',
                                      width: 100,
                                      textAlign: 'center',
                                      color: AppColors.black,
                                    }}>
                                    {item['Party Name'] || '-'}
                                  </Text>
                                  <Text
                                    style={{
                                      fontWeight: 'bold',
                                      width: 100,
                                      textAlign: 'center',
                                      color: AppColors.black,
                                    }}>
                                    {item['Votes'] || '-'}
                                  </Text>
                                  <Text
                                    style={{
                                      fontWeight: 'bold',
                                      width: 150,
                                      textAlign: 'center',
                                      color: AppColors.black,
                                    }}>
                                    {item['Vote Percentage'] || '-'}
                                  </Text>
                                </View>
                              );
                            },
                          )}
                      </View>
                    </View>
                  </ScrollView>
                </View>
              ))}
            </ScrollView>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default IndiaVotesScreen;

const styles = StyleSheet.create({});
