import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
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

const HomeScreen = ({navigation}) => {
  const states = useSelector(state => state.appData.states);
  // const year = useSelector(state => state.appData.year);
  const [selectetdState, setSelectedState] = useState('');
  const [screenLoading, setScreenLoading] = useState('');
  const disPatch = useDispatch();

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

  useEffect(() => {
    handleGetState();
    handleGetYear();
  }, []);

  useEffect(() => {
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
    if (res.success) {
      disPatch(setStates(res.data.data));
    } else {
      console.log('error of handleGetState------', res.success);
    }
  };
  const handleGetYear = async () => {
    const res = await getYear();
    if (res.success) {
      disPatch(setYear(res.data.data));
    } else {
      console.log('error of handleGetYear------', res.success);
    }
  };

  // const indiaStateData = require('../../assests/MapJson/India.json');
  // const {features} = indiaStateData;
  // console.log('features-----------------------------', features);

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
          <View style={{marginTop: 20, paddingHorizontal: 15}}>
            <Text style={styles.CardHeading}>
              SPARLIAMENTARY GENERAL ELECTION RESULTS
            </Text>
            <AppDropDown
              height={80}
              data={states}
              onChange={item => {
                //   console.log(item.state_name)
                setSelectedState(item);
              }}
              value={selectetdState?.state_name}
              labelField="state_name"
              valueField="state_name"
              labelText="Select State"
              placeholder="--Select State--"
            />
          </View>
          <View style={styles.stateCardContainer}>
            <Text style={styles.CardHeading}>
              GENERAL PARLIAMENT (LOK SABHA) & STATE LEGISLATIVE ASSEMBLY
              (VIDHAN SABHA)
            </Text>
            <View style={styles.cardRow}>
              {indianStates.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(routes.Constituency_Screen, {
                        data: item,
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
                        data: item,
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
