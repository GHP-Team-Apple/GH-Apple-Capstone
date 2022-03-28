import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import Checkbox from 'expo-checkbox';
import { StatusBar } from 'expo-status-bar';


const userInterests = [
    { id: 1, type:'Music', isChecked: false },
    {id: 2, type: 'Business', isChecked: false },
    { id: 3, type:'Holiday', isChecked: false },
    { id: 4, type: 'Science', isChecked: false },
    { id: 5, type:'Tech', isChecked: false },
    { id: 6, type: 'Food & Drink', isChecked: false },
    { id: 7, type: 'Film & Media', isChecked: false },
    { id: 8, type:'Fashion', isChecked: false },
    { id: 9, type: 'Travel & Outdoor', isChecked: false },
    { id: 10, type: 'Home & Lifestyle', isChecked: false },
    { id: 11, type: 'School Activities', isChecked: false },
    { id: 12, type: 'Auto Boat & Air', isChecked: false },
    { id: 13, type: 'Other', isChecked: false },
    { id: 14, type: 'Spirituality', isChecked: false },
    { id: 15, type: 'Sports & Fitness', isChecked: false }, 
    { id: 16, type: 'Government', isChecked: false },
    { id: 17, type: 'Family & Education', isChecked: false },
    { id: 18, type: 'Charity & Causes', isChecked: false },
    { id: 19, type: 'Health', isChecked: false },
    { id: 20, type: 'Arts', isChecked: false },
    { id: 21, type: 'Hobbies', isChecked: false }]

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
  

export default function Interest () {
 const [isSelected, setSelection] = useState(userInterests);

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
       <SafeAreaView>
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
                  }}
                  style={{ alignSelf: 'center' }}
                />
                <Text>{item.type}</Text>
              </View>
            </View>
        )}
      />
       </SafeAreaView>
     );
  } 

  return (
          <View>
            <View style={{ flex: .5 }}>{selectInterest(isSelected)}</View>
            <Text>Selected </Text>
            <View style={{ flex: .5 }}>{selectInterest(selected)}</View>
          </View>
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