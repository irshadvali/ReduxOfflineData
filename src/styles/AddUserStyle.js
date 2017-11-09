import { StyleSheet } from "react-native";
const DEVICE_WIDTH = Dimensions.get("window").width;
import Dimensions from "Dimensions";

const AddUserStyle = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#dddddd",
    },

    InputStyle: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 20,
        height: 50,
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomWidth: 1,
        color: "#000000",
        backgroundColor: "#ffffff",
        borderRadius: 3
    },

    Buttonstyle: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 20,
        height: 50,
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomWidth: 1,
        color: "white",
        backgroundColor: "#182d4c",
        borderRadius: 3,
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
    },

    textstyle: {
        color: "white",
        fontSize: 14
    },

    textHeaderstyle: {
        color: "#000000",
        fontSize: 18,
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        marginLeft: 15,
        marginRight: 15,
        marginTop: 20,
    }
});

export default AddUserStyle;
