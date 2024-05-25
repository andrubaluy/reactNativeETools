import { StyleSheet } from 'react-native';
import { colors } from './colors';

export default StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.transparentBackground,
    },
    modalView: {
        margin: 20,
        backgroundColor: colors.color400,
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        color: colors.color200
    },
    counterContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    counterButton: {
        fontSize: 30,
        paddingHorizontal: 20,        
        color: colors.color200
    },
    counterText: {
        fontSize: 20,
        marginHorizontal: 10,
        color: colors.color200
    },
    modalButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
});