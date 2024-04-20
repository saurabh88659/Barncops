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
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppColors} from '../../assests/AppColors';
import {getState, getYear} from '../../network/networkRequest/mainApiRequest';
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
import {setOfflineData} from '../../network/commonServices';
import {configureLayoutAnimationBatch} from 'react-native-reanimated/lib/typescript/reanimated2/core';
import {centeredLatitudeAndLongitude} from '../../utils/centeredLatitudeAndLongitudeData';

const HomeScreen = ({navigation}) => {
  const disPatch = useDispatch();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const states = useSelector(state => state.appData.states);
  const year = useSelector(state => state.appData.year);
  console.log('year-----------', year);
  console.log(
    'states++++++++++++++++++++++++++++++++((((((((((((((((((((((((99999999999999999',
    states,
  );
  const [selectetdState, setSelectedState] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [screenLoading, setScreenLoading] = useState('');
  const [filterJsonData, setFilteredData] = useState([]);
  const [selectedShowStateName, setSelectedShowStateName] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [initialRegion, setinitialRegion] = useState({
    latitude: 20.5937,
    longitude: 78.9629,
    latitudeDelta: 30,
    longitudeDelta: 30,
  });
  const [pcData, setPcData] = useState('');

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
    Promise.all([handleGetState(), handleGetYear()])
      .then((res, rej) => {
        setScreenLoading(false);
      })
      .catch(error => {
        console.error('Error occurred while fetching data:', error);
        setScreenLoading(false);
      });
  }, []);

  const handleGetState = async () => {
    const res = await getState();
    console.log(
      're of get state===========================11111111111111',
      res.data.data,
    );
    if (res.success) {
      disPatch(setStates(res.data.data));
    } else {
      console.log('error of handleGetState------', res.data);
    }
  };

  const handleGetYear = async () => {
    const res = await getYear();
    // console.log(
    //   're of get year===========================222222222222222222222',
    //   res.data.data,
    // );
    if (res.success) {
      const formattedYears = res.data.data.map(item => ({
        ...item,
        // year: parseInt(item.year),
        year: isNaN(parseInt(item.year)) ? null : parseInt(item.year),
      }));
      disPatch(setYear(formattedYears));
      // disPatch(setYear(res.data.data));
    } else {
      console.log('error of handleGetYear------', res.success);
    }
  };

  const getFiteredJson = async (geojsonData, stateName) => {
    // setSelectedState(TestState);
    const filteredFeatures = geojsonData.features.filter(
      feature => feature.properties.st_name === stateName,
    );
    setFilteredData({
      ...geojsonData,
      features: filteredFeatures,
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
                    }}>
                    <Image
                      style={{height: 80, width: 80}}
                      resizeMode="contain"
                      source={require('../../assests/images/IndiaMap.png')}
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
            <Text style={[styles.CardHeading, {marginBottom: 10}]}>
              SPARLIAMENTARY GENERAL ELECTION RESULTS
            </Text>
            <AppDropDown
              height={80}
              data={states}
              onChange={item => {
                getFiteredJson(IndiaJson, item.state_name);
                setSelectedState(item.state_name);
              }}
              value={selectetdState?.state_name}
              labelField="state_name"
              valueField="state_name"
              labelText="Select State"
              placeholder="--Select State--"
            />
          </View>

          <TouchableOpacity
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
          </TouchableOpacity>
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
              mapType={'none'}
              customMapStyle={[]}
              provider={PROVIDER_GOOGLE}
              zoomControlEnabled={true}
              style={{
                height: '100%',
                width: '100%',
                backgroundColor: 'transparent',
              }}
              initialRegion={initialRegion}>
              {selectetdState
                ? filterJsonData && (
                    <Geojson
                      geojson={filterJsonData}
                      strokeColor={AppColors.black}
                      fillColor={AppColors.primaryColor}
                      strokeWidth={0.5}
                      zIndex={9999}
                    />
                  )
                : selectetdState == '' && (
                    <Geojson
                      geojson={IndiaJson}
                      strokeColor={AppColors.black}
                      fillColor={AppColors.primaryColor}
                      strokeWidth={0.5}
                      zIndex={9999}
                    />
                  )}
            </MapView>
          </View>
          {selectetdState && (
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
                        style={{height: 70, width: 70}}
                        resizeMode="contain"
                        source={require('../../assests/images/IndiaMap.png')}
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
          )}
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
  container: {height: 100, backgroundColor: 'white'},
  text: {fontSize: 14, textAlign: 'center'},

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
