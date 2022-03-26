// import { View, Text, StyleSheet, Image } from 'react-native'
// import React, { useEffect } from 'react'
// import { theme } from '../../utils'
// import { onAuthStateChanged } from 'firebase/auth'
// import {auth} from './firebase' 

// export default function LandingPage({navigation}) {
//     const [currUser, setCurrUser] = useState(null)
//     useEffect(()=>{
//         const unsubscribe = onAuthStateChanged(auth, user => {
//                   setLoading(false)
//                   if(user){
//                     setCurrUser(user)
//                   }
//                 })
//                 return () => unsubscribe()
//     }, [])

//     function NavigateToAuthOrHome(){
//         setTimeout(function (){
//             if(currUser)
//         })
//     }

//   return (
//     <View style={{ flex: 1, justifyContent:'center', alignItems: 'center'}}>
//       <Image style={{alignSelf:'center'}} source={{uri:'https://cdn.logojoy.com/wp-content/uploads/2018/05/30163918/1241-768x591.png'}}/>
//     </View>
//   )
// }