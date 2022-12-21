import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";
import { failureScan, loadingScan, successScan } from "../Store/ScanSlice";
import { useAppDispatch, useAppSelector } from "../Store";

import { RootStackScreenProps } from "../types";
import { api } from "../app.json";
import { useEffect } from "react";

interface ListScanCodeProp {}

export default function ListScanCode({}: ListScanCodeProp) {
  const dispatch = useAppDispatch();
  
  const scanList = useAppSelector(state => state.scan.scanList);

  const fetchData = async () => {
    dispatch({type : loadingScan.type})
    try{
      const transactionResult = await fetch(api.startScan, {
        headers: {
          api_key: api.scanApiKey,
          external_reference_id: api.external_reference_id,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          store_number: "1",
        }),
      });
      const { transaction_id } = await transactionResult.json();
      const scannedResult = await fetch(
        `${api.getScan}?transaction_id=${transaction_id}`,
        {
          headers: {
            api_key: api.scanApiKey,
            external_reference_id: api.external_reference_id,
            transaction_id,
          },
        }
      );
      const data = await scannedResult.json();
      dispatch({ type : successScan.type, payload : {transaction_id, scanList: data.lines}})
    } catch (error) {
      console.error(error);
      dispatch({type : failureScan.type})
    }
    
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <View style={styles.container}>
          <ScrollView style={{ width: '100%'}} >
            {scanList.map(item => <ScanListItem item={item} key={item?.line_id}  />)}    
          </ScrollView>
        </View>;
}

const ScanListItem = ({ item }: {item: any}) => {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: item?.article?.active_selling_price?.price?.currency,
    
  }).format(item?.article?.active_selling_price?.price?.amount || 0);

  return <View style={styles.MainListContainer}>
      <View style={styles.listContainer}>
      <Text style={[styles.textStyle, {flex: .1}]}>{item.quantity}</Text>
      <Text style={[styles.textStyle, {flex: .6}]}>{item?.article?.description}</Text>
      <Text style={[styles.textStyle, {flex: .3}]}>{formattedAmount}</Text>
    </View>
    <View style={styles.divider} />
  </View>
  
}
const styles = StyleSheet.create({
  divider:{
    marginHorizontal: 8,
    backgroundColor: "#ddd",
    height: 1,
  },
  listContainer: {
    flexDirection: "row",
    backgroundColor: '#fff',
    paddingVertical: 12,
  },
  MainListContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    width: "100%",
    
  },
  textStyle: {
    color : '#000',
    fontFamily: 'PlusJakartaSans',
    textAlign: "center",
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    backgroundColor: "#fff",
    width: "100%",
  },
});
