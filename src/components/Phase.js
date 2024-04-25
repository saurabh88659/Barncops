import { View, Text } from 'react-native'
import React from 'react'
import { AppColors } from '../assests/AppColors'

const Phase = ({phase,color}) => {
  return (
	<View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',gap:3}}>
	  <View style={{width:10,height:10,borderRadius:10/2,backgroundColor:color}}/>
	  <Text style={{color:AppColors.black,fontWeight:700,fontSize:18}}>{phase} Phase</Text>
	</View>
  )
}

export default Phase