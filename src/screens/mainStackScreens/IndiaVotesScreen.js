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

            {candidateDataKeys.length > 0 && (
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
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default IndiaVotesScreen;

const styles = StyleSheet.create({});
