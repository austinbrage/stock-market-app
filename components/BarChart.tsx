import { BarChart as Bar } from "react-native-gifted-charts";
import { View, Text, StyleSheet, type StyleProp, type ViewStyle } from 'react-native'

type Props = {
    label: string;
    data: any[];
    color: string;
    style?: StyleProp<ViewStyle>
}

export function BarChart({ label, data, color, style }: Props) {
    const maxValue = Math.max(...data.map((i) => i.value));

    return (
        <View style={[styles.container, style]}>
            <Text style={styles.text}>{label}</Text>
            <Bar
                height={150}
                maxValue={maxValue * 1.5}
                barWidth={50}
                initialSpacing={0}
                noOfSections={5}
                rulesColor={"black"}
                barBorderRadius={4}
                frontColor={color}
                data={data}
                rotateLabel
                xAxisColor={"gray"}
                xAxisThickness={2}        
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 250,
    },
    text: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },
});