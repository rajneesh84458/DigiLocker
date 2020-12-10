import React, { useLayoutEffect, Fragment } from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import { globalStyle, color } from "../../utility";

export default ({ route, navigation }) => {
  const { params } = route;
  const { name, img, imgText } = params;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: <Text>{name}</Text>,
    });
  }, [navigation]);
  return (
    <Fragment>
      {img ? (
        <Image
          source={{ uri: img }}
          style={[globalStyle.flex1]}
          resizeMode="cover"
        />
      ) : (
        <View
          style={[
            globalStyle.containerCentered,
            { backgroundColor: color.BLACK },
          ]}
        >
          <Text style={styles.text}>{imgText}</Text>
        </View>
      )}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  text: { color: color.WHITE, fontSize: 200, fontWeight: "bold" },
});






// import React, { useLayoutEffect, Fragment } from "react";
// import { Image, Text, View, StyleSheet } from "react-native";
// import { globalStyle, color } from "../../utility";

// export default ({ route, navigation }) => {
//   const { params } = route;
//   const { name, img, imgText } = params;
//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerTitle: <Text>{name}</Text>,
//     });
//   }, [navigation]);
//   return (
//     <Fragment >
//       <View style={{flex:1,alignitems:'center'}}>

    
//       {img ? (
//         <Image
//           source={{ uri: img }}
//           style={{width:150,height:150,resizeMode:'cover',borderRadius:75}}
         
//         />
//       ) : (
//         <View
//           style={[
//             globalStyle.containerCentered,
//             { backgroundColor: color.BLACK },
//           ]}
//         >
//           <Text style={styles.text}>{imgText}</Text>
//         </View>
//       )}
//         </View>
//     </Fragment>
//   );
// };

// const styles = StyleSheet.create({
//   text: { color: color.WHITE, fontSize: 200, fontWeight: "bold" },
// });
