import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Checkbox from 'expo-checkbox';
import { StatusBar } from 'expo-status-bar';
import { auth, db } from '../../firebase'
import { updateProfile } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

const userInterests = [
  { id: 1, label: 'Concert', value: "concert", isChecked: false },
  { id: 2, label: 'Theater', value: "theater", isChecked: false },
  { id: 3, label: 'Comedy', value: "comedy", isChecked: false },
  { id: 4, label: 'Dance', value: "dance_performance_tour", isChecked: false },
  { id: 5, label: 'Classical', value: "classical", isChecked: false },
  { id: 6, label: 'Broadway', value: "broadway_tickets_national", isChecked: false },
  { id: 7, label: 'Sports', value: "sports", isChecked: false }, 
  { id: 8, label: 'Family', value: "family", isChecked: false },
  { id: 9, label: 'Film', value: "film", isChecked: false },
  { id: 10, label: 'Literacy', value: "literacy", isChecked: false },
  { id: 11, label: 'Tech', value: "tech" , isChecked: false },
  { id: 12, label: 'Food & Drink', value: "food & drink", isChecked: false },
  { id: 13, label: 'Business', value: "business", isChecked: false },
  { id: 14, label: 'Travel & Outdoor', value: "travel & outdoor", isChecked: false },
  { id: 15, label: 'Fashion', value: "fashion", isChecked: false },
  { id: 16, label: 'Social Activities', value: "social activities", isChecked: false }
]

function Item ({ item }) {
    const [isSelected, setSelection] = useState(userInterests);
	
    return (
    <View style={{flexDirection: 'row',marginBottom: 20,}}>
        <Checkbox disabled={false} value={isSelected} onValueChange={setSelection}
            style={{ alignSelf: 'center', }}/>
            <Text style={{ margin: 8, }}>
                {item}
            </Text>
    </View>
  )};
  

export default function Interest (props) {
 const [isSelected, setSelection] = useState(userInterests);
//  const [currUserData, setCurrUserData] = useState(auth.currentUser)
	const user = props.user;

	// async function handlePress() {
	// 	const user = auth.currentUser;
	// 	const userData = {
	// 		interest: [],	
	// 	};

	// 	const ThePromise = await Promise.all([
	// 		updateProfile(user, userData),
	// 		setDoc(doc(db, 'Users', user.uid), { ...userData, uid: user.uid }),
			
	// 	]);
	// 	setCurrUserData({ ...userData, uid: user.uid })
	// 	console.log('hje', ThePromise)
	// }
	
 const handleChange = (id) => {
    let temp = isSelected.map((select) => {
      if (id === select.id) {
        return { ...select, isChecked: !select.isChecked };
      }
      return select;
    });
    setSelection(temp);
  };

  let selected = isSelected.filter((selects) => selects.isChecked);

  const selectInterest = (renderData) => {
      return (
		<View>
		<FlatList
	   data={renderData}
	   numColumns={3}
	   renderItem={({ item }) => (
		   <View style={{ marginTop: 20}} >
			 <View
			   style={{
				 flexDirection: 'row',
				 flex: 1,
				   margin: 2,
			   }}>
			   <Checkbox
				 value={item.isChecked}
				 onValueChange={() => {
				   handleChange(item.id);
				//    handlePress(item.id);
				 }}
				 style={{ alignSelf: 'center' }}
			   />
			   <Text>{item.label}</Text>
			 </View>
		   </View>
	   )}
	 />
	  </View>
	);
 } 

  return (
          <SafeAreaView>
            <View style={{ padding: 5 }}>{selectInterest(isSelected)}</View>
            <Text style={{ paddingTop: 10 }}>Selected </Text>
            <View style={{ paddingTop: 3 }} >{selectInterest(selected)}</View>
          </SafeAreaView>
        );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 12,
  },
});




// function Item ({ userInterest }) {
//     return (
//         <View style={{
//             		    flexDirection: 'row',
//             		    marginBottom: 20,
//             				}}>
//             				<Checkbox
//             					disabled={false}
//             					value={isSelected}
//             					onValueChange={()=>}
//             					style={{
//             						alignSelf: 'center',
//             					}}
//             				/>
//             				<Text
//             					style={{
//             						margin: 8,
//             					}}
//             				>
//             					{userInterest.type}
//             				</Text>
//             				</View>
// )}


// export default function Interest() {
//     const [isSelected, setSelection] = useState(userInterests);

//     const handleChange = (id) => {
//         let temp = isSelected.map((selected) => {
//           if (id === selected.id) {
//             return { ...selected, isChecked: !selected.isChecked };
//           }
//           return selected;
//         });
//         setSelection(temp);
//       };
   
  
    // return (
    //     <FlatList data={userInterests} />

    // <View style={{
    //     flexDirection: 'column',
    //     marginBottom: 5,
    //     flex: 2
    //         }}> 
    //   <View
	// 	style={{
	// 		    flexDirection: 'column',
	// 		    marginBottom: 5,
    //             flexWrap:'wrap'
	// 				}}
	// 			>{
    //                 userInterests.map((userInterest,index)=>{
    //                     return(

    //             <View style={{
    //                 flexDirection: 'row',
    //                 marginBottom: 5,
    //                 flexWrap: 'wrap'
    //                     }} key={index}>
	// 				<Checkbox
	// 					disabled={false}
	// 					value={isSelected}
	// 					onValueChange={setSelection}
	// 					style={{
	// 						alignSelf: 'center',
	// 					}}
	// 				/>
	// 				<Text
	// 					style={{
	// 						margin: 8,
	// 					}}
	// 				>
	// 					{userInterest}
	// 				</Text>
	// 				</View>
    //                     )
    //                 })
    //             }
	// 				{/* 
    //            <View style={{
	// 		    flexDirection: 'row',
	// 		    marginBottom: 20,
	// 				}}>
	// 				<Checkbox
	// 					disabled={false}
	// 					value={isSelected}
	// 					onValueChange={setSelection}
	// 					style={{
	// 						alignSelf: 'center',
	// 					}}
	// 				/>
	// 				<Text
	// 					style={{
	// 						margin: 8,
	// 					}}
	// 				>
	// 					Art
	// 				</Text>
	// 				</View>
	// 				<View style={{
	// 		    flexDirection: 'row',
	// 		    marginBottom: 20,
	// 				}}>
	// 				<Checkbox
	// 					disabled={false}
	// 					value={isSelected}
	// 					onValueChange={setSelection}
	// 					style={{
	// 						alignSelf: 'center',
	// 					}}
	// 				/>
	// 				<Text
	// 					style={{
	// 						margin: 8,
	// 					}}
	// 				>
	// 					Business
	// 				</Text>
	// 				</View>
	// 				<View style={{
	// 		    flexDirection: 'row',
	// 		    marginBottom: 20,
	// 				}}>
	// 				<Checkbox
	// 					disabled={false}
	// 					value={isSelected}
	// 					onValueChange={setSelection}
	// 					style={{
	// 						alignSelf: 'center',
	// 					}}
	// 				/>
	// 				<Text
	// 					style={{
	// 						margin: 8,
	// 					}}
	// 				>
						
	// 				</Text>
	// 				</View>
    //                 <View  style={{
	// 		    flexDirection: 'row',
	// 		    marginBottom: 20,
	// 				}}>
	// 				<Checkbox
	// 					disabled={false}
	// 					value={isSelected}
	// 					onValueChange={setSelection}
	// 					style={{
	// 						alignSelf: 'center',
	// 					}}
	// 				/>
	// 				<Text
	// 					style={{
	// 						margin: 8,
	// 					}}
	// 				>
	// 					18 & Over?
	// 				</Text>
    //                 </View>
    //                 <View style={{
	// 		    flexDirection: 'row',
	// 		    marginBottom: 20,
	// 				}}>
	// 				<Checkbox
	// 					disabled={false}
	// 					value={isSelected}
	// 					onValueChange={setSelection}
	// 					style={{
	// 						alignSelf: 'center',
	// 					}}
	// 				/>
	// 				<Text
	// 					style={{
	// 						margin: 8,
	// 					}}
	// 				>
	// 					18 & Over?
	// 				</Text>
    //                 </View>
    //                 <View style={{
	// 		    flexDirection: 'row',
	// 		    marginBottom: 20,
	// 				}}>
	// 				<Checkbox
	// 					disabled={false}
	// 					value={isSelected}
	// 					onValueChange={setSelection}
	// 					style={{
	// 						alignSelf: 'center',
	// 					}}
	// 				/>
	// 				<Text
	// 					style={{
	// 						margin: 8,
	// 					}}
	// 				>
	// 					18 & Over?
	// 				</Text>
    //                 </View>
	// 			</View>
    //   <View
	// 	style={{
	// 		    flexDirection: 'column',
	// 		    marginBottom: 20,
	// 				}}
	// 			><View style={{
    //                 flexDirection: 'row',
    //                 marginBottom: 20,
    //                     }}>
	// 				<Checkbox
	// 					disabled={false}
	// 					value={isSelected}
	// 					onValueChange={setSelection}
	// 					style={{
	// 						alignSelf: 'center',
	// 					}}
	// 				/>
	// 				<Text
	// 					style={{
	// 						margin: 8,
	// 					}}
	// 				>
	// 					18 & Over?
	// 				</Text>
	// 				</View>
	// 				<View style={{
	// 		    flexDirection: 'row',
	// 		    marginBottom: 20,
	// 				}}>
	// 				<Checkbox
	// 					disabled={false}
	// 					value={isSelected}
	// 					onValueChange={setSelection}
	// 					style={{
	// 						alignSelf: 'center',
	// 					}}
	// 				/>
	// 				<Text
	// 					style={{
	// 						margin: 8,
	// 					}}
	// 				>
	// 					18 & Over?
	// 				</Text>
	// 				</View>
	// 				<View style={{
	// 		    flexDirection: 'row',
	// 		    marginBottom: 20,
	// 				}}>
	// 				<Checkbox
	// 					disabled={false}
	// 					value={isSelected}
	// 					onValueChange={setSelection}
	// 					style={{
	// 						alignSelf: 'center',
	// 					}}
	// 				/>
	// 				<Text
	// 					style={{
	// 						margin: 8,
	// 					}}
	// 				>
	// 					18 & Over?
	// 				</Text>
	// 				</View>
	// 				<View style={{
	// 		    flexDirection: 'row',
	// 		    marginBottom: 20,
	// 				}}>
	// 				<Checkbox
	// 					disabled={false}
	// 					value={isSelected}
	// 					onValueChange={setSelection}
	// 					style={{
	// 						alignSelf: 'center',
	// 					}}
	// 				/>
	// 				<Text
	// 					style={{
	// 						margin: 8,
	// 					}}
	// 				>
	// 					18 & Over?
	// 				</Text>
	// 				</View>
    //                 <View  style={{
	// 		    flexDirection: 'row',
	// 		    marginBottom: 20,
	// 				}}>
	// 				<Checkbox
	// 					disabled={false}
	// 					value={isSelected}
	// 					onValueChange={setSelection}
	// 					style={{
	// 						alignSelf: 'center',
	// 					}}
	// 				/>
	// 				<Text
	// 					style={{
	// 						margin: 8,
	// 					}}
	// 				>
	// 					18 & Over?
	// 				</Text>
    //                 </View>
    //                 <View style={{
	// 		    flexDirection: 'row',
	// 		    marginBottom: 20,
	// 				}}>
	// 				<Checkbox
	// 					disabled={false}
	// 					value={isSelected}
	// 					onValueChange={setSelection}
	// 					style={{
	// 						alignSelf: 'center',
	// 					}}
	// 				/>
	// 				<Text
	// 					style={{
	// 						margin: 8,
	// 					}}
	// 				>
	// 					18 & Over?
	// 				</Text>
    //                 </View>
    //                 <View style={{
	// 		    flexDirection: 'row',
	// 		    marginBottom: 20,
	// 				}}>
	// 				<Checkbox
	// 					disabled={false}
	// 					value={isSelected}
	// 					onValueChange={setSelection}
	// 					style={{
	// 						alignSelf: 'center',
	// 					}}
	// 				/>
	// 				<Text
	// 					style={{
	// 						margin: 8,
	// 					}}
	// 				>
	// 					18 & Over?
	// 				</Text>
    //                 </View> */}
	// 			</View>
    // </View>
//   )
// }
