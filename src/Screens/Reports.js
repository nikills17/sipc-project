import { View, Text,Button } from 'react-native'
import React,{useRef} from 'react'
import RBSheet from "react-native-raw-bottom-sheet";

const Reports = () => {
  const refRBSheet = useRef();
  return (
    <View style={{  flex: 1,
      justifyContent: "center",
      alignItems: "center",
      }}>
      <Button title="OPEN BOTTOM SHEET" onPress={() => refRBSheet.current.open()} />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        dragFromTopOnly={true}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000",
          }
        }}
       
      >
       <Text>Hiii</Text>
      </RBSheet>
    </View>
  )
}

export default Reports