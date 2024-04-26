import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  ActivityIndicator,
  Touchable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppColors} from '../../assests/AppColors';
import AppDropDown from '../../components/AppDropDown';
import {useSelector} from 'react-redux';
import {
  BarChart,
  LineChart,
  PieChart,
  PopulationPyramid,
} from 'react-native-gifted-charts';
import {
  getAllPartyData,
  getAllPcNameDataTable,
  getConstituencyElectorsData,
  getFilterSearchData,
  getNdaAllianceData,
  getUpaAllianceData,
} from '../../network/networkRequest/mainApiRequest';
import AppHeader from '../../components/AppHeader';
import AppTextInputWithLabel from '../../components/AppTextInputWithLabel';
import {Icon} from '../../components/AppIcon';
import AppTextInpuWithoutIcon from '../../components/AppTextInpuWithoutIcon';
import {routes} from '../../shells/routes';

const ConstituencyScreen = ({navigation, route}) => {
  const year = useSelector(state => state.appData.year);
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@year===============>>>', year);
  const yearRoute = route.params.year;

  // console.log(year);
  const state = route.params.state;
  console.log(
    'state ##############################################################@@@@@@@2222222222222222222222222222222222222=============22',
    state,
  );
  const [selectetYear, setSelectedYear] = useState(yearRoute || 2019);
  // const [selectetYear, setSelectedYear] = useState(2019);

  console.log(
    'year########################################################11111111111111111111111111111111111111111111',
    selectetYear,
  );
  // console.log('selected year', selectetYear);

  const [Constituency, setConstituency] = useState('1');
  const [electorsData, setElectorsData] = useState('');
  const [allPartyData, setAllPartyData] = useState([]);
  const [allPcNameTableData, setAllPcNameTableData] = useState([]);
  const [ndaData, setNdaData] = useState('');
  const [upaData, SetUpaData] = useState('');
  const [screenLoading, setScreenLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [CandidateSearch, SetCandidateSearch] = useState('');
  const [marginPercentagSearch, SetMarginPercentagSearch] = useState('');
  const [marginSearch, SetMarginSearch] = useState('');
  const [turnoutPercentagSearch, SetTurnoutPercentagSearch] = useState('');
  const [votesSearch, SetVotesSearch] = useState('');
  const [electorsSearch, SetElectorsSearch] = useState('');
  const [partySearch, SetPartySearch] = useState('');
  const [constituencyTypeSearch, SetConstituencyTypeSearch] = useState('');
  const [constituencyNoSearch, SetConstituencyNoSearch] = useState('');
  const [constituencyNameSearch, SetConstituencyNameSearch] = useState('');

  useEffect(() => {
    setScreenLoading(true);
    Promise.all([
      handleGetConstituencyElectorsData(),
      handleGetAllPartyData(),
      handleGetNdaAllianceData(),
      handleGetUpaAllianceData(),
      handlegetAllPcNameDataTable(),
    ])
      .then((res, rej) => {
        setScreenLoading(false);
      })
      .catch(error => {
        console.error('Error occurred while fetching data:', error);
        setScreenLoading(false);
      });
    // setScreenLoading(true);
    // handleGetConstituencyElectorsData();
    // handleGetAllPartyData();
    // handleGetNdaAllianceData();
    // handleGetUpaAllianceData();
    // handlegetAllPcNameDataTable();
    // setScreenLoading(false);
  }, [Constituency, state, selectetYear]);

  const handleGetConstituencyElectorsData = async () => {
    const data = {year: selectetYear, state: state, id: Constituency};
    const res = await getConstituencyElectorsData(data);
    // console.log(
    //   'res of handleGetConstituencyElectorsData---------',
    //   res.data.data[0],
    // );
    if (res.success) {
      setElectorsData(res.data.data[0]);
    } else {
      setElectorsData('');
      // console.log(
      //   'error of handleGetConstituencyElectorsData----',
      //   res.data.data,
      // );
    }
  };

  const handleGetAllPartyData = async () => {
    const data = {year: selectetYear, state: state, id: Constituency};
    const res = await getAllPartyData(data);
    // console.log('res of handleGetAllPartyData-----', res.data.data);
    if (res.success) {
      setAllPartyData(res.data.data);
    } else {
      setAllPartyData([]);
      // console.log('error of handleGetAllPartyData-----', res.data);
    }
  };

  const handleGetNdaAllianceData = async () => {
    const data = {year: selectetYear, state: state, id: Constituency};
    const res = await getNdaAllianceData(data);
    // console.log('res of NdaAllianceData---------------------', res.data.data);
    if (res.success) {
      setNdaData(res.data.data);
    } else {
      setNdaData('');
      console.log('error of handlegetNdaAllianceData-----', res.data);
    }
  };

  const handleGetUpaAllianceData = async () => {
    const data = {year: selectetYear, state: state, id: Constituency};
    const res = await getUpaAllianceData(data);
    // console.log('res of UpaAllianceData------------------', res.data.data);
    if (res.success) {
      SetUpaData(res.data.data);
    } else {
      SetUpaData('');
      console.log('error of handleGetUpaAllianceData-----', res.data);
    }
  };

  const handlegetAllPcNameDataTable = async () => {
    const data = {year: selectetYear, state: state,id: Constituency};
    const res = await getAllPcNameDataTable(data);
    // console.log(
    //   'res of handlegetAllPcNameDataTable--------%%%%%%%%%%%%%%%%% ',
    //   res.data.data,
    // );
    if (res.success) {
      setAllPcNameTableData(res.data.data);
    } else {
      setAllPcNameTableData([]);
      // console.log(
      //   'error of handlegetAllPcNameDataTable-------------------',
      //   res.data,
      // );
    }
  };

  const oncancelfilter = () => {
    handlegetAllPcNameDataTable();
  };

  const handleGetFilterSearchData = async () => {
    setModalVisible(!modalVisible);
    const paramObject = {
      state_name: state,
      year: selectetYear,
      candidate: CandidateSearch,
      margin_percentage: marginPercentagSearch,
      margin: marginSearch,
      turnout_percentage: turnoutPercentagSearch,
      votes: votesSearch,
      electors: electorsSearch,
      party: partySearch,
      constituency_type: constituencyTypeSearch,
      constituency_no: constituencyNoSearch,
      constituency_name: constituencyNameSearch,
    };
    console.log('objecyt------------', paramObject);
    const res = await getFilterSearchData(paramObject);
    console.log('res of handleGetFilterSearchData----------', res.success);
    if (res.success) {
      setAllPcNameTableData(res?.data?.data);
    } else {
      setAllPcNameTableData([]);
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
            color: AppColors.primaryColor,
          }}>
          {value}
        </Text>
      </View>
    );
  };

  // Fixed colors for top 6 parties
  const partyColors = {
    'BJP': '#FF6A00',
    'INC': '#0061FE',
    'TMC': '#515405',
    'AIADMK': '#333333',
    'DMK': '#B51900',
    'BSP': '#012F7B',
    'SP': '#263D0F',
    'NCP': '#3B87FE',
    'CPI': '#5C0702',
    'CPI (M)': '#FF6252',
    'JD(U)': '#36581B',
    'LJP': '#52D6FC',
    'RJD': '#B1DC8A',
    'TDP': '#FDFC42',
    'BRS': '#EF719E',
    'AAP': '#016D90',
    'NPP': '#F6EC00',
    'BJD': '#97D35F',
    'INLD': '#4D7928',
    'SAD': '#FFAB02',
    'YSRCP': '#381A94',
    'JD(S)': '#76BA3F',
    'NPF': '#93E3FC',
    'AIMIM': '#94E3FB'
  };

  //1st grapth data[-------------------------------------------------------]
  const pieDatavotes = allPartyData.slice(0, 6)?.map((party, index) => {
    return {
      value: party?.Total_Votes,
      color: partyColors[party?.Party_Name] || '#000000',
      text: `${party?.Vote_Percentage.toFixed(2)}%`,
    };
  });

  const pieDatavotes1 = allPartyData.slice(0, 6)?.map((party, index) => {
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

  const DotVotesDatas = allPartyData.slice(0, 6)?.map((party, index) => {
    return {
      Partyname: party?.Party_Name,
      totalVotes: party?.Total_Votes,
      color: partyColors[party?.Party_Name] || '#000000',
      votesPercentage: `${party?.Vote_Percentage.toFixed(2)}%`,
    };
  });
  //1st grapth data[-------------------------------------------------------]

  //2nd grapth data[-------------------------------------------------------]
  const PieChartColors2 = ['#177AD5', '#79D2DE'];

  const combineData = [
    {
      partyName: ndaData?.Alliance,
      Votes_percentage: ndaData?.Votes_percentage,
      Seats: ndaData?.Seats,
      Contested_Voteshare: ndaData?.Contested_Voteshare,
    },
    {
      partyName: upaData?.Alliance,
      Votes_percentage: upaData?.Votes_percentage,
      Seats: upaData?.Seats,
      Contested_Voteshare: upaData?.Contested_Voteshare,
    },
  ];

  const pieDataSeat = combineData.slice(0, 6)?.map((party, index) => {
    console.log('pieDataSeat1111111111111111111111111111', party);
    return {
      value: party?.Seats,
      color: PieChartColors2[index],
      text: party?.Seats,
    };
  });

  const pieDataseat1 = combineData?.slice(0, 6)?.map((party, index) => {
    return {
      value: party?.Contested_Voteshare,
      frontColor: PieChartColors2[index],
      text: party?.Total_Seats,
      label: party?.partyName,
      topLabelComponent: () => (
        <Text style={{color: AppColors.black, fontSize: 16, marginBottom: 4}}>
          {party?.Total_Seats}
        </Text>
      ),
    };
  });

  const DotSeatDatas = combineData.slice(0, 6)?.map((party, index) => {
    return {
      Partyname: party?.partyName,
      color: PieChartColors2[index],
      Contested_Voteshare: party?.Contested_Voteshare,
      Votes_percentage: party?.Votes_percentage,
      seats: party?.Seats,
    };
  });

  //2nd grapth data[-------------------------------------------------------]
  return (
    <View style={{flex: 1, backgroundColor: AppColors.white}}>
      <StatusBar
        backgroundColor={AppColors.primaryColor}
        barStyle={'light-content'}
      />
      <AppHeader
        onPress={() => navigation.goBack()}
        isDrawer={false}
        title=""
      />

      {screenLoading ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <ActivityIndicator color={AppColors.primaryColor} size={35} />
        </View>
      ) : (
        <ScrollView>
          <View style={{paddingHorizontal: 15, paddingVertical: 10}}>
            {/* <Text
              style={{
                fontSize: 25,
                color: AppColors.black,
                fontWeight: '700',
                alignSelf: 'center',
                marginVertical: 20,
              }}>
              {state.replace("_"," ")}
            </Text> */}

            {/* <Text
              style={{
                fontSize: 25,
                color: AppColors.black,
                fontWeight: '700',
                alignSelf: 'center',
                marginVertical: 20,
              }}>
              {selectetYear}
            </Text> */}
            {/* <Text
              style={{
                fontSize: 25,
                color: AppColors.black,
                fontWeight: '700',
                alignSelf: 'center',
                marginVertical: 20,
              }}>
              Lok Sabha Elections 2024
            </Text> */}
            <AppDropDown
              style={{marginTop: 10}}
              height={80}
              data={year}
              onChange={item => {
                setSelectedYear(item?.year);
              }}
              value={selectetYear}
              labelField="year"
              valueField="year"
              labelText="Select Year"
              placeholder="--Select Year--"
            />

            <View style={{alignItems: 'center', paddingVertical: 25}}>
              <TouchableOpacity
                onPress={() => setConstituency('1')}
                style={{
                  height: 40,
                  width: '70%',
                  backgroundColor:
                    Constituency == 1 ? '#ff8000' : AppColors.grey,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 20,
                  borderRadius:10,
                  shadowColor: Constituency == 1 ? AppColors.primaryColor:AppColors.grey,
                  shadowOffset: {
                    width: 0,
                    height: 10,
                  },
                  shadowOpacity: 0.5,
                  shadowRadius: 4.65,

                  elevation: 7,
                }}>
                <Text style={{color: AppColors.white, fontWeight: '800'}}>
                  Parliamentary Constituency
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setConstituency('2')}
                style={{
                  height: 40,
                  width: '70%',
                  backgroundColor:
                    Constituency == 2 ? '#ff8000' : AppColors.grey,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius:10,
                  shadowColor: Constituency == 2 ? AppColors.primaryColor:AppColors.grey,
                  shadowOffset: {
                    width: 0,
                    height: 10,
                  },
                  shadowOpacity: 0.5,
                  shadowRadius: 4.65,

                  elevation: 7,
                }}>
                <Text style={{color: AppColors.white, fontWeight: '800'}}>
                  Assembly Constituency
                </Text>
              </TouchableOpacity>
            </View>

            {electorsData && (
              <View
                style={{
                  backgroundColor: AppColors.white,
                  elevation: 2,
                  paddingHorizontal: 10,
                  borderRadius: 6,
                }}>
                <TableKeyVauePair
                  tablekey={'ELECTORS :'}
                  value={electorsData?.Electors}
                />
                <TableKeyVauePair
                  tablekey={'VOTES POLLE :'}
                  value={electorsData?.Votes_Polled}
                />
                <TableKeyVauePair
                  tablekey={'TURNOUT:'}
                  value={electorsData?.Turnout}
                />
                <TableKeyVauePair
                  tablekey={'PARLIAMENTARY CONSTITUENCIES :'}
                  value={electorsData?.Parliamentary_Constituencies}
                />
                <TableKeyVauePair
                  tablekey={'GENERAL :'}
                  value={electorsData?.GENERAL}
                />
                <TableKeyVauePair tablekey={'SC :'} value={electorsData?.SC} />
                <TableKeyVauePair tablekey={'ST :'} value={electorsData?.ST} />
              </View>
            )}

            {allPartyData && allPartyData.length > 0 && (
              <View style={styles.container}>
                <View style={styles.tableHeader}>
                  <Text style={styles.headerText}>PARTY</Text>
                  <Text style={styles.headerText}>SEATS</Text>
                  <Text style={styles.headerText}>VOTES%</Text>
                </View>
                {allPartyData &&
                  allPartyData?.slice(0, 6).map((party, index) => (
                    <View key={index} style={styles.tableRow}>
                      <Text style={styles.cellText}>{party?.Party_Name}</Text>
                      <Text style={styles.cellText}>{party?.Total_Seats}</Text>
                      <Text style={styles.cellText}>
                        {party?.Vote_Percentage}
                      </Text>
                    </View>
                  ))}
              </View>
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
                    }}>
                    ALLIANCE
                  </Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      width: 90,
                      textAlign: 'center',
                      color: AppColors.black,
                    }}>
                    SEATS
                  </Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      width: 90,
                      textAlign: 'center',
                      color: AppColors.black,
                    }}>
                    VOTES%
                  </Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      width: 200,
                      textAlign: 'center',
                      color: AppColors.black,
                    }}>
                    CONTESTED VOTESHARE
                  </Text>
                </View>
                {ndaData && (
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        width: 100,
                        textAlign: 'center',
                        color: AppColors.black,
                        fontSize: 16,
                      }}>
                      {ndaData?.Alliance}
                    </Text>
                    <Text
                      style={{
                        // fontWeight: 'bold',
                        textAlign: 'center',
                        width: 90,
                        fontSize: 16,
                        color: AppColors.black,
                      }}>
                      {ndaData?.Seats}
                    </Text>
                    <Text
                      style={{
                        width: 90,
                        // fontWeight: 'bold',
                        textAlign: 'center',
                        color: AppColors.black,
                        fontSize: 16,
                      }}>
                      {ndaData?.Votes_percentage}
                    </Text>
                    <Text
                      style={{
                        width: 200,
                        // fontWeight: 'bold',
                        textAlign: 'center',
                        color: AppColors.black,
                        fontSize: 16,
                      }}>
                      {ndaData?.Contested_Voteshare}
                    </Text>
                  </View>
                )}
                {upaData && (
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 8,
                    }}>
                    <Text
                      style={{
                        width: 100,
                        textAlign: 'center',
                        color: AppColors.black,
                        fontSize: 16,
                      }}>
                      {upaData?.Alliance}
                    </Text>
                    <Text
                      style={{
                        // fontWeight: 'bold',
                        textAlign: 'center',
                        width: 90,
                        fontSize: 16,
                        color: AppColors.black,
                      }}>
                      {upaData?.Seats}
                    </Text>
                    <Text
                      style={{
                        width: 90,
                        // fontWeight: 'bold',
                        textAlign: 'center',
                        color: AppColors.black,
                        fontSize: 16,
                      }}>
                      {upaData?.Votes_percentage}
                    </Text>
                    <Text
                      style={{
                        width: 200,
                        // fontWeight: 'bold',/
                        textAlign: 'center',
                        color: AppColors.black,
                        fontSize: 16,
                      }}>
                      {upaData?.Contested_Voteshare}
                    </Text>
                  </View>
                )}
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
                {DotSeatDatas.length > 0 && (
                  <View
                    style={{
                      justifyContent: 'space-between',
                      // paddingHorizontal: 10,
                      marginBottom: 20,
                    }}>
                    {DotSeatDatas?.map((item, index) => {
                      return (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 5,
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
                          <Text style={{color: AppColors.black}}>
                            {item?.Partyname}
                          </Text>
                          <Text
                            style={{color: AppColors.black, marginLeft: 10}}>
                            {item?.seats}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                )}

                {pieDataSeat.length > 0 && (
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
                    data={pieDataSeat}
                    showValuesAsLabels
                  />
                )}
                <Text
                  style={{color: AppColors.black, marginTop: 10, fontSize: 17}}>
                  Total Seats
                </Text>
              </>
              <View
                style={{
                  marginTop: 30,
                  alignItems: 'center',
                }}>
                {pieDatavotes1.length > 0 && (
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
                  Contested Voteshare
                </Text>
              </View>
            </View>

            <View></View>
            <View style={{flexDirection: 'row', marginBottom: 3}}>
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
                style={{
                  height: 40,
                  width: 90,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'green',
                  marginTop: 20,
                }}>
                <Text
                  style={{
                    color: AppColors.white,
                    fontSize: 16,
                    fontWeight: '700',
                  }}>
                  Filter
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => oncancelfilter()}
                style={{
                  height: 40,
                  width: 120,
                  marginLeft: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: AppColors.white,
                  marginTop: 20,
                  elevation: 2,
                }}>
                <Text
                  style={{
                    color: AppColors.black,
                    fontSize: 16,
                    fontWeight: '700',
                  }}>
                  Clear Filter
                </Text>
              </TouchableOpacity>
            </View>

            {allPcNameTableData.length > 0 ? (
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
                      AC NAME
                    </Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        width: 40,
                        textAlign: 'center',
                        color: AppColors.white,
                        // backgroundColor: 'red',
                      }}>
                      NO
                    </Text>

                    <Text
                      style={{
                        fontWeight: 'bold',
                        width: 100,
                        textAlign: 'center',
                        color: AppColors.white,
                      }}>
                      TYPE
                    </Text>

                    <Text
                      style={{
                        fontWeight: 'bold',
                        width: 150,
                        textAlign: 'center',
                        color: AppColors.white,
                      }}>
                      STATE
                    </Text>

                    {/* 1==new added */}
                    <Text
                      style={{
                        fontWeight: 'bold',
                        width: 150,
                        textAlign: 'center',
                        color: AppColors.white,
                      }}>
                      DISTRICT
                    </Text>
                    {/* new added */}

                    {/*2== new added */}
                    <Text
                      style={{
                        fontWeight: 'bold',
                        width: 150,
                        textAlign: 'center',
                        color: AppColors.white,
                      }}>
                      SUB REGION
                    </Text>
                    {/* new added */}

                    <Text
                      style={{
                        fontWeight: 'bold',
                        width: 250,
                        textAlign: 'center',
                        color: AppColors.white,
                      }}>
                      WINNING CANDIDATE
                    </Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        width: 80,
                        textAlign: 'center',
                        color: AppColors.white,
                      }}>
                      PARTY
                    </Text>

                    {/*3== new added */}
                    <Text
                      style={{
                        fontWeight: 'bold',
                        width: 80,
                        textAlign: 'center',
                        color: AppColors.white,
                      }}>
                      AGE
                    </Text>
                    {/* new added */}

                    {/*4== new added */}
                    <Text
                      style={{
                        fontWeight: 'bold',
                        width: 80,
                        textAlign: 'center',
                        color: AppColors.white,
                      }}>
                      GENDER
                    </Text>
                    {/* new added */}
                    {/*5== new added */}
                    <Text
                      style={{
                        fontWeight: 'bold',
                        width: 150,
                        textAlign: 'center',
                        color: AppColors.white,
                      }}>
                      EDUCATION
                    </Text>
                    {/* new added */}

                    {/*6== new added */}
                    <Text
                      style={{
                        fontWeight: 'bold',
                        width: 150,
                        textAlign: 'center',
                        color: AppColors.white,
                      }}>
                      PROFESSION
                    </Text>
                    {/* new added */}

                    <Text
                      style={{
                        fontWeight: 'bold',
                        width: 150,
                        textAlign: 'center',
                        color: AppColors.white,
                      }}>
                      ELECTORS
                    </Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        width: 110,
                        textAlign: 'center',
                        color: AppColors.white,
                      }}>
                      VOTES
                    </Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        width: 90,
                        textAlign: 'center',
                        color: AppColors.white,
                      }}>
                      TURNOUT
                    </Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        width: 100,
                        textAlign: 'center',
                        color: AppColors.white,
                      }}>
                      MARGIN
                    </Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        width: 80,
                        textAlign: 'center',
                        color: AppColors.white,
                      }}>
                      MARGIN%
                    </Text>
                  </View>

                  <View>
                    {allPcNameTableData &&
                      allPcNameTableData.map((item, index) => {
                        console.log('item>>>>>>>>>>>>>>', item);
                        return (
                          <View
                            style={{
                              flexDirection: 'row',
                              // justifyContent: 'space-between',
                              marginBottom: 15,
                              paddingVertical: 10,
                            }}>
                            <TouchableOpacity
                              onPress={() =>
                                navigation.navigate(routes.PCIndiaVotes_Screen, {
                                  constituency_name: item?.constituency_name,
                                  year: selectetYear,
                                  state: state,
                                })
                              }
                              style={{}}>
                              <Text
                                style={{
                                  fontWeight: 'bold',
                                  width: 250,
                                  textAlign: 'center',
                                  color: AppColors.oxfordBlue,
                                  textDecorationLine: 'underline',
                                  // backgroundColor: 'green',
                                }}>
                                {item?.constituency_name}
                              </Text>
                            </TouchableOpacity>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                width: 40,
                                textAlign: 'center',
                                color: AppColors.black,
                                // backgroundColor: 'red',
                              }}>
                              {item.constituency_no?.replace(
                                /(\d+)\.0\b/g,
                                '$1',
                              )}
                            </Text>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                width: 100,
                                textAlign: 'center',
                                color: AppColors.black,
                              }}>
                              {item.candidate_Type || '-'}
                            </Text>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                width: 150,
                                textAlign: 'center',
                                color: AppColors.black,
                              }}>
                              {item?.state_name.replace((/_/g, " "))}
                            </Text>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                width: 150,
                                textAlign: 'center',
                                color: AppColors.black,
                              }}>
                              {/* {item.state_name} */}-{/* district */}
                              {item.district?.replace((/_/g, " "))}
                            </Text>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                width: 150,
                                textAlign: 'center',
                                color: AppColors.black,
                              }}>
                              {/* {item.state_name} */}-{/* SubRegion */}
                              {item.sub_region?.replace((/_/g, " "))}
                            </Text>

                            <Text
                              style={{
                                fontWeight: 'bold',
                                width: 250,
                                textAlign: 'center',
                                color: AppColors.black,
                              }}>
                              {item.candidate}
                            </Text>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                width: 80,
                                textAlign: 'center',
                                color: AppColors.black,
                              }}>
                              {item.party}
                            </Text>

                            <Text
                              style={{
                                fontWeight: 'bold',
                                width: 80,
                                textAlign: 'center',
                                color: AppColors.black,
                              }}>
                              {item?.age || '-'}
                              {/* age */}
                            </Text>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                width: 80,
                                textAlign: 'center',
                                color: AppColors.black,
                              }}>
                              {item?.sex||item?.gender}
                              {/* gender */}
                            </Text>

                            <Text
                              style={{
                                fontWeight: 'bold',
                                width: 150,
                                textAlign: 'center',
                                color: AppColors.black,
                              }}>
                              {item?.education}
                              {/* EDUCATION */}
                            </Text>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                width: 150,
                                textAlign: 'center',
                                color: AppColors.black,
                              }}>
                              {item?.prof_main||item?.profession}
                              {/* PROFFESION */}
                            </Text>

                            <Text
                              style={{
                                fontWeight: 'bold',
                                width: 150,
                                textAlign: 'center',
                                color: AppColors.black,
                              }}>
                              {item.electors}
                            </Text>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                width: 110,
                                textAlign: 'center',
                                color: AppColors.black,
                              }}>
                              {item.votes}
                            </Text>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                width: 90,
                                textAlign: 'center',
                                color: AppColors.black,
                              }}>
                              {item.turnout_percentage}
                            </Text>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                width: 100,
                                textAlign: 'center',
                                color: AppColors.black,
                              }}>
                              {item.margin}
                            </Text>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                width: 80,
                                textAlign: 'center',
                                color: AppColors.black,
                              }}>
                              {item.margin_percentage}
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
          </View>
        </ScrollView>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: AppColors.white,
            paddingVertical: 20,
          }}>
          <ScrollView contentContainerStyle={{paddingBottom: 20}}>
            <View style={{paddingHorizontal: 20}}>
              <AppTextInpuWithoutIcon
                leftIconColor={AppColors.black}
                value={CandidateSearch}
                onChangeText={text => SetCandidateSearch(text)}
                placeholder={'Enter your Candidate'}
                labelText="Candidat:"
                style={styles.input}
                maxLength={10}
              />
              <AppTextInpuWithoutIcon
                leftIconColor={AppColors.black}
                value={marginPercentagSearch}
                onChangeText={text => SetMarginPercentagSearch(text)}
                placeholder={'Enter your Margin Percentage'}
                labelText="Margin Percentage"
                style={styles.input}
                maxLength={10}
              />
              <AppTextInpuWithoutIcon
                leftIconColor={AppColors.black}
                value={marginSearch}
                onChangeText={text => SetMarginSearch(text)}
                placeholder={'Enter your Margin'}
                labelText="Margin"
                style={styles.input}
                maxLength={10}
              />
              <AppTextInpuWithoutIcon
                leftIconColor={AppColors.black}
                value={turnoutPercentagSearch}
                onChangeText={text => SetTurnoutPercentagSearch(text)}
                placeholder={'Enter your Turnout Percentage'}
                labelText="Turnout Percentage"
                style={styles.input}
                maxLength={10}
              />
              <AppTextInpuWithoutIcon
                leftIconColor={AppColors.black}
                value={votesSearch}
                onChangeText={text => SetVotesSearch(text)}
                placeholder={'Enter your Votes'}
                labelText="Votes"
                style={styles.input}
                maxLength={10}
              />
              <AppTextInpuWithoutIcon
                leftIconColor={AppColors.black}
                value={electorsSearch}
                onChangeText={text => SetElectorsSearch(text)}
                placeholder={'Enter your Electors'}
                labelText="Electors"
                style={styles.input}
                maxLength={10}
              />
              <AppTextInpuWithoutIcon
                leftIconColor={AppColors.black}
                value={partySearch}
                onChangeText={text => SetPartySearch(text)}
                placeholder={'Enter your Party'}
                labelText="Party"
                style={styles.input}
                maxLength={10}
              />

              <AppTextInpuWithoutIcon
                leftIconColor={AppColors.black}
                value={constituencyTypeSearch}
                onChangeText={text => SetConstituencyTypeSearch(text)}
                placeholder={'Enter your Constituency Type'}
                labelText="Constituency Type"
                style={styles.input}
                maxLength={10}
              />
              <AppTextInpuWithoutIcon
                leftIconColor={AppColors.black}
                value={constituencyNoSearch}
                onChangeText={text => SetConstituencyNoSearch(text)}
                placeholder={'Enter your Constituency No'}
                labelText="Constituency No"
                style={styles.input}
                maxLength={10}
              />
              <AppTextInpuWithoutIcon
                leftIconColor={AppColors.black}
                value={constituencyNameSearch}
                onChangeText={text => SetConstituencyNameSearch(text)}
                placeholder={'Enter your Constituency Name'}
                labelText="Constituency Name"
                style={styles.input}
                maxLength={10}
              />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                }}>
                <TouchableOpacity
                  onPress={handleGetFilterSearchData}
                  style={{
                    height: 45,
                    width: 150,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'green',
                    alignSelf: 'center',
                    marginTop: 10,
                  }}>
                  <Text
                    style={{
                      color: AppColors.white,
                      fontSize: 17,
                      fontWeight: '600',
                    }}>
                    Search
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                  style={{
                    height: 45,
                    width: 150,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'red',
                    alignSelf: 'center',
                    marginTop: 10,
                  }}>
                  <Text
                    style={{
                      color: AppColors.white,
                      fontSize: 17,
                      fontWeight: '600',
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default ConstituencyScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 20,
    elevation: 2,
    borderRadius: 6,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 5,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: AppColors.black,
    paddingVertical: 10,
    width: 90,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },

  cellText: {
    fontSize: 16,
    color: AppColors.black,
    paddingVertical: 10,
    width: 90,
    textAlign: 'center',
  },
});
