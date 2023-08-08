import { StyleSheet, View, Text } from "react-native";
import { Svg, Circle } from "react-native-svg";

const PieChart = ({ size = 200, strokeWidth = 15, data, colors }) => {

  const center = size / 2;
  const radius = ((size - strokeWidth) / 2) - 10;
  const circumference = 2 * Math.PI * radius;

  const generatePieChartData = () => {
    const total = data.reduce((a, b) => a + b, 0), config = [];
    for (let i = 0, angle = 0; i < data.length; i++) {
      const percent = data[i] / total;
      config.push({
        angle,
        percent,
        color: colors[i],
      });
      angle += percent * 360;
    }
    return config;
  };

  const arr = generatePieChartData();

  return (
    <View style={{flex: 1}}>
      <Svg viewBox={`0 0 ${size} ${size}`}>
        {arr.map((item, idx) => (
          <Circle
            key={idx}
            cy={center}
            cx={center}
            r={radius}
            strokeWidth={strokeWidth}
            stroke={item.color}
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - item.percent)}
            originX={center}
            originY={center}
            rotation={item.angle} />
        ))}

        {/* You are telling the circle element here to shift the pattern specified in strokeDashArray by the strokeDashOffset */}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    alignSelf: 'center',
    paddingBottom: 20,
    fontSize: 18,
    fontWeight: '700',
  },
});



export default PieChart;