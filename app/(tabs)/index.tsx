import { Button } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text, View } from "@/components/Themed";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useRef, useState, useMemo } from "react";

export default function TabOneScreen() {
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [items, setItems] = useState<string[]>([]);
  // const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);
  const [isOpen, setIsOpen] = useState(false);

  const toggleBottomSheet = useCallback(() => {
    if (isOpen) {
      bottomSheetRef.current?.close();
    } else {
      bottomSheetRef.current?.expand();
    }
    setIsOpen(!isOpen);
  }, [isOpen]);

  const addItem = useCallback(() => {
    setItems((prev) => [...prev, `Item ${prev.length + 1}`]);
  }, []);

  const removeItem = useCallback((index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const styles = {
    container: {
      flex: 1,
      marginBottom: insets.bottom,
      backgroundColor: "#d1d1d1",
    },
    contentContainer: {
      alignItems: "center",
      padding: 24,
      paddingBottom: 10,
    },
  };

  return (
    <View style={styles.container}>
      <Button title="Toggle BottomSheet" onPress={toggleBottomSheet} />
      <Button title="Add Item" onPress={addItem} />
      <BottomSheet ref={bottomSheetRef} onChange={handleSheetChanges}>
        <BottomSheetView style={styles.contentContainer}>
          <Text style={{ marginBottom: 10 }}>
            Not so Awesome demo by ROFI 🥲
          </Text>
          {items.map((item, index) => (
            <View
              key={`item-${index}`}
              style={{
                backgroundColor: "#d1d1d1",
                width: "100%",
                padding: 10,
                marginBottom: 5,
                borderRadius: 5,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text>{item}</Text>
              <Button title="Remove" onPress={() => removeItem(index)} />
            </View>
          ))}
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}
