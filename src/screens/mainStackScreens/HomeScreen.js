import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {AppColors} from '../../assests/AppColors';
import {
  getAllPartyData,
  getConstituencyData,
  getConstituencyElectorsData,
  getIndiaPCData,
  getState,
  getYear,
} from '../../network/networkRequest/mainApiRequest';
import {useDispatch} from 'react-redux';
import {setStates, setYear} from '../../features/reducers/data.reducer';
import {useSelector} from 'react-redux';
import AppDropDown from '../../components/AppDropDown';
import {useSafeAreaFrame} from 'react-native-safe-area-context';
import {routes} from '../../shells/routes';
import Svg, {Path} from 'react-native-svg';
import AppHeader from '../../components/AppHeader';
import MapView, {Geojson, PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import IndiaJson from '../../assests/MapJson/India.json';
import Carousel from 'react-native-snap-carousel';
import {BASE_URL, setOfflineData} from '../../network/commonServices';
import {configureLayoutAnimationBatch} from 'react-native-reanimated/lib/typescript/reanimated2/core';
import {centeredLatitudeAndLongitude} from '../../utils/centeredLatitudeAndLongitudeData';
import Phase from '../../components/Phase';
import {BarChart, PieChart} from 'react-native-gifted-charts';
import axios from 'axios';
import { FadeIn } from 'react-native-reanimated';

const HomeScreen = ({navigation}) => {
  const disPatch = useDispatch();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const states = useSelector(state => state.appData.states);
  const year = useSelector(state => state.appData.year);
  console.log(
    'year-----------YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY',
    year,
  );
  console.log(
    'states++++++++++++++++++++++++++++++++((((((((((((((((((((((((99999999999999999',
    states,
  );
  const [selectetdState, setSelectedState] = useState('');
  const [selectedYear, setSelectedYear] = useState(2019);
  const [screenLoading, setScreenLoading] = useState(true);
  const [filterJsonData, setFilteredData] = useState([]);
  const [selectedShowStateName, setSelectedShowStateName] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [indiaPCData,setIndiaPCData]=useState('');
  const [initialRegion, setinitialRegion] = useState({
    latitude: 20.5937,
    longitude: 78.9629,
    latitudeDelta: 30,
    longitudeDelta: 30,
  });
  const [pcData, setPcData] = useState('');
  const [allPartyData, setAllPartyData] = useState([]);
  const [electorsData, setElectorsData] = useState('');
  const [selectedFeature, setSelectedFeature] = useState(null);

  useEffect(() => {
    //changes
    if (selectetdState && centeredLatitudeAndLongitude[selectetdState]) {
      setRefresh(!refresh);
      setinitialRegion({
        latitude: centeredLatitudeAndLongitude[selectetdState]?.latitude,
        longitude: centeredLatitudeAndLongitude[selectetdState]?.longitude,
        latitudeDelta:
          centeredLatitudeAndLongitude[selectetdState]?.latitudeDelta,
        longitudeDelta:
          centeredLatitudeAndLongitude[selectetdState]?.longitudeDelta,
      });
    }
  }, [selectetdState]);

  const indianStates = [
    {
      state: 'Andhra Pradesh',

      image: require('../../assests/images/Maps/IN-AP.png'),
    },
    {
      state: 'Arunachal Pradesh',
      image: require('../../assests/images/Maps/IN-AR.png'),
    },
    {state: 'Assam', image: require('../../assests/images/Maps/IN-AS.png')},
    {state: 'Bihar', image: require('../../assests/images/Maps/IN-BR.png')},
    {
      state: 'Chhattisgarh',
      image: require('../../assests/images/Maps/IN-CT.png'),
    },
    {state: 'Delhi', image: require('../../assests/images/Maps/IN-DL.png')},
    {state: 'Goa', image: require('../../assests/images/Maps/IN-GA.png')},
    {state: 'Gujarat', image: require('../../assests/images/Maps/IN-GJ.png')},
    {state: 'Haryana', image: require('../../assests/images/Maps/IN-HR.png')},
    {
      state: 'Himachal Pradesh',
      image: require('../../assests/images/Maps/IN-HP.png'),
    },
    {
      state: 'Jammu and Kashmir',
      image: require('../../assests/images/Maps/IN-JK.png'),
    },
    {state: 'Jharkhand', image: require('../../assests/images/Maps/IN-JH.png')},
    {state: 'Karnataka', image: require('../../assests/images/Maps/IN-KA.png')},
    {state: 'Kerala', image: require('../../assests/images/Maps/IN-KL.png')},
    {
      state: 'Madhya Pradesh',
      image: require('../../assests/images/Maps/IN-MP.png'),
    },
    {
      state: 'Maharashtra',
      image: require('../../assests/images/Maps/IN-MH.png'),
    },
    {state: 'Manipur', image: require('../../assests/images/Maps/IN-MN.png')},
    {state: 'Meghalaya', image: require('../../assests/images/Maps/IN-ML.png')},
    {state: 'Mizoram', image: require('../../assests/images/Maps/IN-MZ.png')},
    {state: 'Nagaland', image: require('../../assests/images/Maps/IN-NL.png')},
    {state: 'Odisha', image: require('../../assests/images/Maps/IN-OR.png')},
    {
      state: 'Puducherry',
      image: require('../../assests/images/Maps/IN-PY.png'),
    },
    {state: 'Punjab', image: require('../../assests/images/Maps/IN-PB.png')},
    {state: 'Rajasthan', image: require('../../assests/images/Maps/IN-RJ.png')},
    {state: 'Sikkim', image: require('../../assests/images/Maps/IN-SK.png')},
    {
      state: 'Tamil Nadu',
      image: require('../../assests/images/Maps/IN-TN.png'),
    },
    {state: 'Telangana', image: require('../../assests/images/Maps/IN-TN.png')},
    {state: 'Tripura', image: require('../../assests/images/Maps/IN-TR.png')},
    {
      state: 'Uttar Pradesh',
      image: require('../../assests/images/Maps/IN-UP.png'),
    },
    {
      state: 'Uttarakhand',
      image: require('../../assests/images/Maps/IN-UT.png'),
    },
    {
      state: 'West Bengal',
      image: require('../../assests/images/Maps/IN-WB.png'),
    },
  ];

  const unionTerritories = [
    {
      state: 'Andaman & Nicobar Islands',
      image: require('../../assests/images/Maps/IN-AN.png'),
    },
    {
      state: 'Chandigarh',
      image: require('../../assests/images/Maps/IN-CH.png'),
    },
    {
      state: 'Dadra & Nagar Haveli',
      image: require('../../assests/images/Maps/IN-DN.png'),
    },
    {
      state: 'Daman & Diu',
      image: require('../../assests/images/Maps/IN-DD.png'),
    },
    {
      state: 'Lakshadweep',
      image: require('../../assests/images/Maps/IN-LD.png'),
    },
  ];

  // useEffect(() => {
  //   console.log(
  //     '+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++useeffect runnrun run++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
  //   );
  //   handleGetState();
  //   handleGetYear();
  // }, []);

  useEffect(() => {
    // ===================================================comment of f later=========================================
    // setSelectedState('');
    setScreenLoading(true);
    Promise.all([
      handleGetIndiaPCData(),
      handleGetState(),
      handleGetYear(),
      handleGetConstituencyElectorsData(),
      handleGetAllPartyData(),
    ])
      .then((res, rej) => {
          setScreenLoading(false);
      })
      .catch(error => {
          console.error('Error occurred while fetching data:', error);
          setScreenLoading(false); 
      });
  }, [selectedYear,selectetdState]);

  const handleGetState = async () => {
    const res = await getState();
    // console.log(
    //   're of get state===========================11111111111111',
    //   res.data.data,
    // );
    if (res.success) {
    //   const modifiedData = res.data.data.map(state => ({
    //     ...state,
    //     state_name: state.state_name.replace(/_/g, ' ') // Replace underscore with space
    // }));
      disPatch(setStates(res.data.data));
    } else {
      console.log('error of handleGetState------', res.data);
    }
  };

  const handleGetYear = async () => {
    const data={id:1}
    const res = await getYear(data);
    console.log(
      're of get year===========================222222222222222222222',
      res.data.data,
    );

    if (res.success) {
      // const formattedYears = res.data.data.map(item => ({
      //   ...item,
      //   // year: parseInt(item.year),
      //   year: isNaN(parseInt(item.year)) ? null : parseInt(item.year),
      // }));
      // disPatch(setYear(formattedYears));

      const formattedYears = res.data.data.map(item => ({
        ...item,
        year: item.year.toString(), // Convert year to string
      }));
      disPatch(setYear(formattedYears));
      // disPatch(setYear(res.data.data));
    } else {
      console.log('error of handleGetYear------', res.success);
    }
  };


  const getColor = (pcName, winnerParty) => {
    // Use the winner party to determine the fill color for each PC
    return partyColors[winnerParty] || '#CCCCCC'; // Default color if party color not found
  };

  const getColorIndia = (feature, pcData) => {
    const pcName = (feature.properties.pc_name.toUpperCase());
    const winnerParty = pcData[pcName]?.winner?.party;
    return partyColors[winnerParty] || '#CCCCCC';
  };
  
  // const getFiteredJson = async (geojsonData, stateName) => {
  //   // setSelectedState(TestState);
  //   const filteredFeatures = geojsonData.features.filter(
  //     feature => feature.properties.st_name === stateName,
  //   );
  //   setFilteredData({
  //     ...geojsonData,
  //     features: filteredFeatures,
  //   });
  // };

  const getFiteredJson = async (geojsonData, stateName) => {
    const filteredFeatures = geojsonData.features.filter(
      feature => feature.properties.st_name === stateName
    );
  
    // Colorize the filtered features based on PC winner party
    const colorizedFeatures = filteredFeatures.map(feature => {
      const pcName = (feature.properties.pc_name).toUpperCase();
      const winnerParty = indiaPCData[pcName]?.winner?.party || null; // Get winner party for current PC
      return {
        ...feature,
        properties: {
          ...feature.properties,
          fill: getColor(pcName, winnerParty) // Set fill color based on winner party
        }
      };
    });
  
    // Update state with colorized GeoJSON data
    setFilteredData({
      ...geojsonData,
      features: colorizedFeatures
    });
  };


  const getIndiaJson = async (geojsonData, stateName) => {
    // const filteredFeatures = geojsonData.features.filter(
    //   feature => feature.properties.st_name === stateName
    // );
  
    // Colorize the filtered features based on PC winner party
    const colorizedFeatures = filteredFeatures.map(feature => {
      const pcName = (feature.properties.pc_name).toUpperCase();
      const winnerParty = indiaPCData[pcName]?.winner?.party || null; // Get winner party for current PC
      return {
        ...feature,
        properties: {
          ...feature.properties,
          fill: getColor(pcName, winnerParty) // Set fill color based on winner party
        }
      };
    });
  
    // Update state with colorized GeoJSON data
    setFilteredData({
      ...geojsonData,
      features: colorizedFeatures
    });
  };
  // useEffect(() => {
  //   hanldeGetPcName();
  // }, [selectedYear, selectetdState]);
  // const hanldeGetPcName = async () => {
  //   const object = {
  //     state_name: selectetdState,
  //     year: selectedYear?.year,
  //   };
  //   console.log('object-----', object);
  //   if (selectetdState && selectedYear) {
  //     console.log('hello working logic');
  //     const res = await getPcName();
  //     if (res.success) {
  //       setPcData(res.data.data);
  //     } else {
  //       setPcData('');
  //     }
  //   }
  // };
  const [pcName,setPCName]=useState('')
  const indiaPCDataRef = useRef(indiaPCData);
  
  useEffect(() => {
    indiaPCDataRef.current = indiaPCData;
  }, [selectedYear]);

  // const handleFeaturePress = event => {
  //   // console.log(event.feature.properties.pc_name);
  //   // console.log(indiaPCData['AGRA'])
  //   const constituencyName = (event.feature.properties.pc_name).toUpperCase();
  //   setPCName(constituencyName);
  //   const data = indiaPCData[constituencyName];
  //   console.log(data,"=#$%#$%#$%#$%#$%#$%#$%#$%$#%#$%#$%$#%#$%#$%#$%#$%$#%#$%#$%#$%#$%#$%#$%#$%#$%#$%#$%#$%#$%#$%#$%#$%#$%#$%");
  //   setSelectedFeature(data);
  // };

  // const getFillColor = event => {
  //   console.log(event.feature.properties.pc_name,'=????????????#$#$?!#>!#!?!#>>!?!>!#!!?!!>@$?!$?!>!$?#>?$>>?#!>?$>?!#>?$>?!>#>$>!?!?$>?!>!?!>>!>!?!>>?!>?>?!>?$>?!>?$>?!>!!>?!!>?!>>!$>?#>$?##');
  //   const upperpcName=constituencyName.toUpperCase();

  //   const winnerParty = indiaPCData[upperpcName]?.winner?.party;
  //   // Define color mappings for parties
  //   return partyColors[winnerParty] || AppColors.black;
  // };
  ///


  const handleGetConstituencyElectorsData = async () => {
    const data = {year: selectedYear, state: selectetdState, id: 1};
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
  const pieDatavotes = allPartyData?.slice(0, 6)?.map((party, index) => {
    return {
      value: party?.Total_Votes,
      color: partyColors[party?.Party_Name] || '#000000',
      text: `${party?.Vote_Percentage.toFixed(2)}%`,
    };
  });

  const pieDatavotes1 = allPartyData?.slice(0, 6)?.map((party, index) => {
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

  const DotVotesDatas = allPartyData?.slice(0, 6)?.map((party, index) => {
    return {
      Partyname: party?.Party_Name,
      totalVotes: party?.Total_Votes,
      color: partyColors[party?.Party_Name] || '#000000',
      votesPercentage: `${party?.Vote_Percentage.toFixed(2)}%`,
    };
  });

  const handleGetAllPartyData = async () => {
    const data = {year: selectedYear, state: selectetdState, id: 1};
    // Alert.alert(selectedYear);
    const res = await getAllPartyData(data);
    // console.log('res of handleGetAllPartyData-----', res.data.data);
    if (res.success) {
      setAllPartyData(res.data.data);
      console.log(res.data.data,'66666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666')
    } else {
      setAllPartyData([]);
      // console.log('error of handleGetAllPartyData-----', res.data);
      console.log(res.data,'55555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555')
    }
  };

  const handleGetIndiaPCData = async () => {
    // Alert.alert('working')
    const data = { year: selectedYear };
    try {
      const res = await getIndiaPCData(data);
      if (res.success) {
        const latestData = res.data.data.constituency_data;
        // setIndiaPCData(null);
        setIndiaPCData(latestData);
      } else {
        setIndiaPCData('');
        // console.log('error of handleGetAllPartyData-----', res.data);
      }
    } catch (error) {
      console.error('Error occurred while fetching India PC data:', error);
      setIndiaPCData('');
    }
  };


  const selectedYearRef = useRef(selectedYear);


  const handleFeaturePress = event => {
    // Alert.alert('working');
    setSelectedFeature(null);
    const constituencyName = (event.feature.properties.pc_name).toUpperCase();
    setPCName(constituencyName);
    const data = indiaPCData[constituencyName];
    // Alert.alert(JSON.stringify(data));
    // Alert.alert(JSON.stringify(data));
    setSelectedFeature(data);
  };


  // const handleGetIndiaPCData = () => {
  //   // Alert.alert(selectedYear);
  //   axios.get(`${BASE_URL}data/india/?year=${selectedYear}`)
  //     .then(res => {
  //       const latestData = res.data.constituency_data;
  //       setIndiaPCData(prevData => {
  //         return latestData;
  //       });
  //       setTimeout(() => {
  //         setScreenLoading(false);
  //       }, 5000);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };
  
  // useEffect(() => {
  //   setScreenLoading(true);
  //   handleGetIndiaPCData();
  // }, [selectedYear]);

  return (
    <View style={{flex: 1, backgroundColor: AppColors.white}}>
      <StatusBar
        backgroundColor={AppColors.primaryColor}
        barStyle={'light-content'}
      />
      <AppHeader onPress={() => navigation.openDrawer()} />
      {screenLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={AppColors.primaryColor} size={35} />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{}}>
          <View style={{paddingTop: 20, paddingHorizontal: 10}}>
            <Carousel
              // autoplay
              data={year}
              sliderWidth={windowWidth - 20}
              itemWidth={windowWidth / 3}
              initialIndex={1}
              loop={true}
              renderItem={({item, index}) => (
                <View style={{alignItems: 'center'}}>
                  <TouchableOpacity
                    // onPress={() => {
                    //   console.log(item), setSelectedYear(item);
                    // }}
                    onPress={() => {
                      navigation.navigate(routes.Constituency_Screen, {
                        state: 'Uttar_Pradesh',
                        year: item.year,
                      });
                      console.log(item), setSelectedYear(item);
                    }}
                    style={{
                      height: 90,
                      width: 90,
                      backgroundColor: AppColors.white,
                      borderWidth: 3,
                      justifyContent: 'center',
                      borderRadius: 90 / 2,
                      borderColor: AppColors.primaryColor,
                      borderStyle: 'dashed',
                    }}>
                    <Image
                      style={{height: 80, width: 80, borderRadius: 80 / 2}}
                      resizeMode="contain"
                      source={require('../../assests/images/homeRoundCard.png')}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 18,
                      color: AppColors.black,
                    }}>
                    {item?.year}
                  </Text>
                </View>
              )}
            />
          </View>
          <View style={{marginTop: 15, paddingHorizontal: 15}}>
            <Text
              style={[
                styles.CardHeading,
                {marginBottom: 10, fontSize: 25, color: AppColors.primaryColor},
              ]}>
              Lok Sabha Elections 2024
            </Text>
            <Text style={[styles.CardHeading]}>
              28 States & 8 Union Territories
            </Text>
            <Text
              style={[
                styles.CardHeading,
                {
                  marginBottom: 20,
                  fontSize: 25,
                  color: '#3C9900',
                  textDecorationLine: 'underline',
                },
              ]}>
              Counting on June 04
            </Text>
            <Image
              style={{height: 450, width: '100%'}}
              resizeMode="contain"
              source={require('../../assests/images/2024.png')}
            />
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 5,
                rowGap: 10,
                marginBottom: 20,
                paddingHorizontal: 15,
              }}>
              <Phase phase={1} color={'#FCF38C'} />
              <Phase phase={2} color={'#6DCDF7'} />
              <Phase phase={3} color={'#AC90C3'} />
              <Phase phase={4} color={'#FEBD93'} />
              <Phase phase={5} color={'#FAA0C3'} />
              <Phase phase={6} color={'#6692D1'} />
              <Phase phase={7} color={'#BED85C'} />
            </View>
            <Text
              style={[styles.CardHeading, {marginBottom: 10, marginTop: 20}]}>
              Parliamentary General Election Results
            </Text>
            <AppDropDown
              height={80}
              data={states}
              onChange={item => {
                getFiteredJson(IndiaJson, item.state_name);
                setSelectedState(item.state_name.replace("_"," "));
              }}
              value={selectetdState?.state_name}
              labelField="state_name"
              valueField="state_name"
              labelText="Select State"
              placeholder={selectetdState?`${selectetdState.replace("_"," ")}`:"--Select State--"}
            />
            <AppDropDown
              style={{marginTop: 10}}
              height={80}
              data={year}
              onChange={item => {
                setScreenLoading(true);
                setSelectedYear(item?.year);
                setTimeout(() => {
                  setScreenLoading(false)
                }, 1000);
              }}
              value={selectedYear}
              labelField="year"
              valueField="year"
              labelText="Select Year"
              placeholder={`${selectedYear}`}
            />
          </View>
          {/* <TouchableOpacity
            onPress={() => getFiteredJson(IndiaJson)}
            style={{
              height: 44,
              width: '50%',
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: AppColors.black,
              marginVertical: 20,
            }}>
            <Text style={{color: AppColors.white}}>Apply</Text>
          </TouchableOpacity> */}
          {/* map======================== */}
          <View
            style={{
              height: 500,
              width: '100%',
              backgroundColor: AppColors.white,
              paddingHorizontal: 15,
              paddingVertical: 15,
            }}>
            <MapView
              key={refresh}
              loadingEnabled={true}
              loadingIndicatorColor={AppColors.primaryColor}
              mapType={'none'}
              customMapStyle={[]}
              provider={PROVIDER_GOOGLE}
              zoomControlEnabled={true}
              style={{
                height: '100%',
                width: '100%',
                backgroundColor: '#FFFFFF',
                borderRadius: 20,
                zIndex: 9,
              }}
              initialRegion={initialRegion}>
              {selectetdState
                ? filterJsonData && (
                    <Geojson
                      tappable
                      geojson={filterJsonData}
                      strokeColor={AppColors.black}
                      // fill={getFillColor}
                      strokeWidth={0.5}
                      zIndex={9999}
                      backgroundLayerColor="#ffffff"
                      onPress={handleFeaturePress}

                    />
                  )
                : selectetdState == '' && (
                    <Geojson
                      tappable
                      // geojson={IndiaJson}
                      strokeColor={AppColors.black}
                      // fill={getFillColor}
                      strokeWidth={0.5}
                      zIndex={9999}
                      backgroundLayerColor="#ffffff"
                      onPress={handleFeaturePress}
                      geojson={{
                        ...IndiaJson,
                        features: IndiaJson.features.map((feature) => ({
                          ...feature,
                          properties: {
                            ...feature.properties,
                            fill: getColorIndia(feature, indiaPCData)
                          }
                        }))
                      }}
                    />
                  )}
            </MapView>

            {selectedFeature && (
              <View style={{width:'100%',height:150, position: 'absolute',display:'flex',alignItems:'flex-start',justifyContent:'space-evenly', top: 20, left: 20, backgroundColor:AppColors.primaryColor, padding: 10,zIndex:999999,borderRadius:5 }}>
                <View style={{width:'100%',alignItems:'center',justifyContent:'space-between',flexDirection:'row'}}>
                <Text style={{fontWeight:700,color:AppColors.white,textDecorationLine:'underline'}}>{pcName}</Text>
                <Text onPress={()=>setSelectedFeature()}>✕</Text>
                </View>
                <View style={{width:'90%',display:'flex',alignItems:'center',justifyContent:'space-between',flexDirection:'row',}}>
                  <View style={{display:'flex',alignItems:'flex-start',justifyContent:'flex-start'}}>
                    <Text style={{fontWeight:700,color:AppColors.white,textDecorationLine:'underline'}}>Winner</Text>
                    <Text>PARTY: {selectedFeature.winner.party}</Text>
                    <Text>VOTES: {selectedFeature.winner.total_votes}</Text>
                    <Text>CANDIDATE NAME:</Text>
                    <Text style={{fontSize:12}}>{selectedFeature.winner.candidate_name}</Text>
                  </View>
                  <View style={{display:'flex',alignItems:'flex-start',justifyContent:'flex-start'}}>
                    <Text style={{fontWeight:700,color:AppColors.white,textDecorationLine:'underline'}}>Runner-up</Text>
                    <Text>PARTY: {selectedFeature.runner_up.party}</Text>
                    <Text>VOTES: {selectedFeature.runner_up.total_votes}</Text>
                    <Text>CANDIDATE NAME:</Text>
                    <Text style={{fontSize:12}}>{selectedFeature.runner_up.candidate_name}</Text>
                  </View>
                </View>
                
              </View>
              )}
          </View>

          {electorsData  && selectetdState && (
            <View
              style={{
                backgroundColor: AppColors.white,
                elevation: 2,
                paddingHorizontal: 10,
                borderRadius: 6,
                marginHorizontal: 15,
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
                tablekey={'UR :'}
                value={electorsData?.UR}
              />
              <TableKeyVauePair tablekey={'SC :'} value={electorsData?.SC} />
              <TableKeyVauePair tablekey={'ST :'} value={electorsData?.ST} />
            </View>
          )}

          {/* {--------------------------------DONE---------------------------------} */}
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

          {/* {--------------------------------DONE---------------------------------} */}
          {allPartyData&&<View
            style={{
              backgroundColor: AppColors.white,
              elevation: 5,
              alignItems: 'center',
              paddingVertical: 20,
              width: '93%',
              borderRadius: 6,
              alignSelf: 'center',
              marginBottom: 10,
              // marginHorizontal: 15,
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

              {pieDatavotes?.length > 0 && (
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
              {pieDatavotes && (
                <Text
                  style={{color: AppColors.black, marginTop: 10, fontSize: 17}}>
                  Total Votes
                </Text>
              )}
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
              {pieDatavotes1 && (
                <Text
                  style={{
                    color: AppColors.black,
                    marginTop: 10,
                    fontSize: 17,
                  }}>
                  Total Seats
                </Text>
              )}
            </View>
          </View>}
          {/* {selectetdState && (
            <View style={{paddingTop: 20, paddingHorizontal: 10}}>
              <Carousel
                // autoplay
                data={year}
                sliderWidth={windowWidth - 20}
                itemWidth={windowWidth / 3}
                initialIndex={1}
                loop={true}
                renderItem={({item, index}) => (
                  <View style={{alignItems: 'center'}}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate(routes.Constituency_Screen, {
                          state: selectetdState,
                          year: item.year,
                        });
                        console.log(item), setSelectedYear(item);
                      }}
                      style={{
                        height: 80,
                        width: 80,
                        backgroundColor: AppColors.white,
                        borderWidth: 3,
                        justifyContent: 'center',
                        borderRadius: 90 / 2,
                        borderColor: AppColors.primaryColor,
                      }}>
                      <Image
                        style={{height: 80, width: 80,borderRadius:80/2}}
                        resizeMode="contain"
                        source={require('../../assests/images/homeRoundCard.png')}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 18,
                        color: AppColors.black,
                      }}>
                      {item?.year}
                    </Text>
                  </View>
                )}
              />
            </View>
          )} */}
          {/* map======================== */}

          <View style={styles.stateCardContainer}>
            <Text style={styles.CardHeading}>
              GENERAL PARLIAMENT (LOK SABHA) & STATE LEGISLATIVE ASSEMBLY
              (VIDHAN SABHA)
            </Text>
            <View style={styles.cardRow}>
              {indianStates.map((item, index) => {
                console.log('item');
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(routes.Constituency_Screen, {
                        state: item.state,
                      })
                    }
                    key={index}
                    style={styles.stateCard}>
                    <Image
                      style={{
                        height: 90,
                        width: 90,
                        marginBottom: 10,
                      }}
                      resizeMode="contain"
                      source={item.image}
                    />
                    <Text
                      style={{
                        color: AppColors.black,
                        textAlign: 'center',
                        fontSize: 13,
                      }}>
                      {item?.state}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <View style={styles.unionTerritoriesCardContainer}>
            <Text style={styles.CardHeading}>UNION TERRITPRIES</Text>
            <View style={styles.cardRow}>
              {unionTerritories?.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(routes.Constituency_Screen, {
                        state: item.state,
                      })
                    }
                    key={index}
                    style={styles.territoriesCard}>
                    <Image
                      style={{
                        height: 90,
                        width: 90,
                        marginBottom: 10,
                      }}
                      resizeMode="contain"
                      source={item.image}
                    />
                    <Text
                      style={{
                        color: AppColors.black,
                        textAlign: 'center',
                        fontSize: 13,
                      }}>
                      {item.state}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  // container: {backgroundColor: 'white'},
  container: {
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 20,
    elevation: 2,
    borderRadius: 6,
    marginHorizontal: 15,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 5,
  },
  text: {fontSize: 14, textAlign: 'center'},

  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: AppColors.black,
    paddingVertical: 10,
    width: 90,
    textAlign: 'center',
  },
  cellText: {
    fontSize: 16,
    color: AppColors.black,
    paddingVertical: 10,
    width: 90,
    textAlign: 'center',
  },
  stateCardContainer: {
    backgroundColor: AppColors.white,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },

  unionTerritoriesCardContainer: {
    backgroundColor: AppColors.white,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },

  CardHeading: {
    fontSize: 20,
    fontWeight: '700',
    color: AppColors.black,
    textAlign: 'center',
  },
  cardRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },

  card: {
    padding: 10,
    height: 140,
    width: '31%',
    backgroundColor: AppColors.white,
    marginBottom: 10,
    borderRadius: 5,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  stateCard: {
    padding: 10,
    height: 140,
    width: '31%',
    backgroundColor: AppColors.white,
    marginBottom: 10,
    borderRadius: 5,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  territoriesCard: {
    padding: 5,
    height: 150,
    width: '31%',
    backgroundColor: AppColors.white,
    marginBottom: 10,
    borderRadius: 5,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
