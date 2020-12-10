import { StyleSheet } from "react-native";
import { color } from "../../utility";
import Colors from "../../constants/colors";

export default StyleSheet.create({
  cardStyle: {
    backgroundColor:'#f4f5f6',
    borderBottomWidth:0.5,
    // borderColor: color.SILVER,
  },
  cardItemStyle: {
    backgroundColor: color.SEMI_TRANSPARENT,
  },

  logoContainer: {
    height: 60,
    width: 60,
    borderColor:Colors.white,
    borderWidth: 0.5,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:'white',
  },
  thumbnailName: { fontSize: 30, color: color.WHITE, },
  profileName: { fontSize: 20, color: color.WHITE, },
});
