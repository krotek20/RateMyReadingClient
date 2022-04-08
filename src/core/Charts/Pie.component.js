import React from "react";
import { ResponsivePie } from "@nivo/pie";

export default function Pie({
  data,
  colors,
  innerRadius,
  marginTop,
  marginBottom,
}) {
  return (
    <ResponsivePie
      data={data}
      margin={{ top: marginTop, right: 80, bottom: marginBottom, left: 80 }}
      innerRadius={innerRadius}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      colors={colors}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor="#fff"
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateY: 50,
          itemsSpacing: 0,
          itemWidth: 80,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 12,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
    // <ResponsivePie
    //   data={data}
    //   keys={["Număr de chestionare"]}
    //   indexBy="nivel"
    //   margin={{ right: 100, bottom: 70, left: 100 }}
    //   padding={0.5}
    //   layout="horizontal"
    //   valueScale={{ type: "linear" }}
    //   indexScale={{ type: "band", round: true }}
    //   colors={color.primary}
    //   borderColor={{
    //     from: "color",
    //     modifiers: [["darker", 1.6]],
    //   }}
    //   axisTop={null}
    //   axisRight={null}
    //   axisBottom={{
    //     tickSize: 5,
    //     tickPadding: 5,
    //     tickRotation: 0,
    //     legend: "Număr de chestionare",
    //     legendPosition: "middle",
    //     legendOffset: 32,
    //   }}
    //   axisLeft={{
    //     tickSize: 5,
    //     tickPadding: 5,
    //     tickRotation: 0,
    //     legend: "Nivel de dificultate",
    //     legendPosition: "middle",
    //     legendOffset: -70,
    //   }}
    //   enableGridX={true}
    //   labelSkipWidth={12}
    //   labelSkipHeight={12}
    //   labelTextColor={getTextColor(color.primary)}
    //   role="application"
    //   ariaLabel="Chart for number of quizzes"
    // />
  );
}
