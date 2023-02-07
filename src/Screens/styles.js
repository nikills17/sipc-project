import { Platform, StyleSheet, Dimensions } from "react-native";
import { responsiveScreenHeight, responsiveScreenWidth, responsiveScreenFontSize } from "react-native-responsive-dimensions";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



const Poppins = 'Poppins-Regular'
const Bold = 'Poppins-Bold'
const SemiBold = 'Poppins-SemiBold'

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const deviceWidth = Dimensions.get('window').width;
// const SCREEN_WIDTH = useWindowDimensions().width;
// const SCREEN_HEIGHT = useWindowDimensions().height;


const SIPCStyles = StyleSheet.create({
    //-------------------APP.js Bottom Bar Image-----------------------
    BottomImage: {
        height: Height / 25, width: Width / 13,
        resizeMode: "contain"
    },
    // =======================Fonts==================================
    NormalFont: {
        fontSize: responsiveScreenFontSize(1.8), fontFamily: Poppins,
    },
    lowFont: {
        fontSize: responsiveScreenFontSize(1.5), fontFamily: Poppins,
    },
    SemiBold: {
        fontSize: responsiveScreenFontSize(1.8),
        color: '#555555', fontFamily: SemiBold,
    },
    BoldFont: {
        fontSize: responsiveScreenFontSize(1.8),
        color: '#555555', fontFamily: Bold,
    },

    ValueFont: {
        fontSize: responsiveScreenFontSize(1.8),
        color: '#555555', fontFamily: Poppins,
    },

    AddNewText: {
        fontSize: responsiveScreenFontSize(2.5),
        fontFamily: Poppins, color: 'white',
    },
    checkboxFont:{
        fontSize: deviceWidth > 500 ? 28 : 16,
        fontFamily: Poppins,
    },

    // ------------------------Survey List ------------------------//
    // ------------------------ List Header------------------------//

    flex: {
        flex: 1,
    },
    headerSurface: {
        paddingVertical: 20,
        paddingHorizontal: 15,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },

    headerManImage: {
        height: Height / 18, width: Width / 11,
        resizeMode: "contain",
    },

    searchBar: {
        backgroundColor: '#f3fafe',
        height: Height / 18,
        alignSelf: 'center',
        alignItems: 'center',
        fontFamily: Poppins,
        marginHorizontal: 10,
        flex: 1,

    },
    //------------------------------Surface List Title------------------
    // SurfacePlusMinusCard: {
    //     backgroundColor: '#3a7fc4',
    //     alignItems: 'center',
    //     alignSelf: 'center',
    //     // height: Height / 15,
    //     // width: Width / 40,
    //     borderRadius: 100,
    // },

    ViewRowAlign: {
        flexDirection: 'row',
        alignItems: 'center',     
    },

    healthImageView: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',       
    },


    healthImage: {
        height: Height / 40,
        width: Width / 22,
        resizeMode: "contain"

    },
    PlusMinusImage: {
        height: Height / 34,
        width: Width / 21,
        resizeMode: "contain",
    },
    playImage: {
        height: Height / 18,
        width: Width / 9,
        marginTop: 5,
        resizeMode: "contain",
        alignSelf:'center'
    },

    SurfaceTitle: {
        color: 'black',
        paddingHorizontal: 8,
        fontFamily: Poppins,
        fontSize: responsiveScreenFontSize(1.9),
    },
    SurfaceType: {
        color: '#6d6d6d',
        fontFamily: Poppins,
        paddingLeft: 13,
        fontSize: responsiveScreenFontSize(1.7),
    },

    surfacePlayImageView: {
        borderWidth: 1,
        borderRadius: 100,
        borderColor: '#eaeaea',
        padding: 10,
        width: 45,
        height: 45,
        alignItems: 'center'
    },
    SurfacePlayImageText: {
        marginTop: 5,
        fontFamily: Poppins,
        textAlign: "center",
        color: '#6d6d6d',
        fontSize: responsiveScreenFontSize(1.5),
    },

    DescriptionHeading: {
        color: '#555555',
        fontFamily: Bold,
        marginTop: 10,
        fontSize: responsiveScreenFontSize(1.8)

    },
    DescriptionDetails: {
        color: '#101010',
        fontFamily: Poppins,
        paddingHorizontal: 10,
        flex: 1,
        marginTop: 10,
        fontSize: responsiveScreenFontSize(1.8)
    },

    // ------------------------INSPECTIONS List ------------------------//

    MainBuilding: {
        height: Height / 40,
        width: Width / 20,
        resizeMode: 'contain'
    },

    inspectionScore:{
        fontSize: responsiveScreenFontSize(1.8),
        fontFamily: Bold
    },
    OrangeColor: {
        fontSize: responsiveScreenFontSize(1.8),
        color: '#ffa543', fontFamily: Bold,
    },
    GreenColor: {
        fontSize: responsiveScreenFontSize(1.8),
        color: '#55bd55', fontFamily: Bold,
    },
    RedColor: {
        fontSize: responsiveScreenFontSize(1.8),
        color: '#d85c53', fontFamily: Bold,
    },
    textSuccess:{
        color: "#00d97e"
    },
    textWarning:{
        color: "#f6c343"
    },
    textDanger:{
        color: "#e63757"
    },

    //-----------------------------Work Orders --------------------------------
    //----------dropDownContainerStyle
    dropDownContainerStyle: {
        // backgroundColor:'#dfdfdf',
        borderColor: '#dedede',
        borderWidth: 1,
        zIndex: 999,
        padding: 10,
        width: Width /1,
        height: Height /5
    },
    textSize: {
        fontSize: responsiveScreenFontSize(1.5),
        fontFamily: Poppins,
    },
    DropDownPicker: {
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: '#dedede',
        borderWidth: 1,
        width: Width / 1,
        height: Height / 14
    },
    //-------------------------------ADD New Work Order---------------
    //------------------Dropdown style

    DropDownPicker1: {
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: '#dedede',
        borderWidth: 1,
        //  width:Width/1.5,
        height: Height / 14,
    },
    placeholderStyle: {
        color: '#2f2f2f',
        fontSize: responsiveScreenFontSize(2),
        fontFamily: Poppins,
    },

    dropDownContainerStyle1: {
        // backgroundColor:'#dfdfdf',
        borderColor: '#dedede',
        borderWidth: 1,
        zIndex: 999,
        padding: 10,
        position: 'relative',
        top: 0,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
    },

    CameraImageCard: {
        marginHorizontal: 20,
        marginVertical: 15,
        backgroundColor: 'white',
        borderRadius: 10
        // width: Width / 1.1,
        // height: Height / 14,
    },

    cameraImage: {
        margin: 15,
        width: Width / 10,
        height: Height / 24,
        resizeMode: "contain",
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    CameraClickImage: {
        margin: 15,
        width: Width / 5,
        height: Height / 10,
        resizeMode: "contain",
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius:5
    },
    crossImage:{
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor:'red',
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    imageStyle: {
        width: Width / 3,
        height: Height / 8,
        marginLeft: 20,
        borderRadius: 10,
        // backgroundColor: 'red',
    },
    multipleImg: {
        width: Width / 5,
        height: Height / 12,
        marginLeft: 20,
        borderRadius: 10,
        // backgroundColor:'red'
    },
    TextInput: {
        fontSize: responsiveScreenFontSize(1.6),
        fontFamily: Poppins,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ccc',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    TextInput1: {
        fontSize: responsiveScreenFontSize(1.5),
        fontFamily: Poppins,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#cccccc',
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
    },

    // -------------------START INSPECTIONS
    modalView1: {
        paddingBottom: 20,
        paddingHorizontal: 20,
        backgroundColor: '#f2f1f6',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 0,
    },
    DropDownPicker2: {
        backgroundColor: 'white',
        // borderRadius: 10,
        borderColor: '#dedede',
        borderWidth: 1,
        //  width:Width/1,
        height: Height / 14,
    },
    placeholderStyle: {
        color: '#2f2f2f',
        fontSize: responsiveScreenFontSize(2),
        fontFamily: Poppins,
    },

    dropDownContainerStyle2: {
        // backgroundColor:'#dfdfdf',
        borderColor: '#dedede',
        borderWidth: 1,
        zIndex: 999,
        padding: 10,
        position: 'relative',
        top: 0,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        // width: Width / 1,
        height: Height / 5
    },

    CleaningItems: {
        height: hp('4%'), width: wp('8%'),
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',

    },
    CheckboxView: {
        marginTop: 20,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        flexDirection: 'row',
        borderRadius: 10,
        height: hp('8%'),
        // minWidth:Width > 400 ? '45%' : '90%',             
    },
    CheckBox: {
        // flexDirection: 'row',
        // minWidth:Width > 400 ? '45%' : '90%',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderRadius: 10,
    },
    commentImage: {
        width: Width / 18,
        height: Height / 30,
         marginHorizontal: 15,
        resizeMode: 'contain',
        alignSelf: 'center',
        // flex:.5
    },

    //---------------------------------ASSIGNMENT--------------
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginHorizontal:10,
        backgroundColor:'white',
        height:Height/13
    },
    AddNEwStaffContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginHorizontal:30,
        marginBottom:20,
        backgroundColor:'white',
        height:Height/13
      },
      textInputs: {
        flex: 1,
        marginLeft: 10,
        backgroundColor:'white',
        fontSize: responsiveScreenFontSize(1.8),
      },
      AssignmentTextInput:{
        fontSize: responsiveScreenFontSize(1.6),
        fontFamily: Poppins,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ccc',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        // width: deviceWidth > 500 ? '45%' : '100%',
         marginTop: 10,
        //  marginHorizontal: 30 ,
         height:Height/14

      },


})



export default SIPCStyles;




