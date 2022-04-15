import React from "react";
import { ResponsivePie } from "@nivo/pie";

export default function Pie({
  data,
  colors,
  innerRadius,
  marginTop,
  marginBottom,
  valueFormat,
}) {
  return (
    <ResponsivePie
      data={data}
      margin={{ top: marginTop, right: 80, bottom: marginBottom, left: 80 }}
      innerRadius={innerRadius}
      valueFormat={valueFormat}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={5}
      activeInnerRadiusOffset={3}
      borderWidth={1}
      colors={colors}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      sortByValue
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
  );
}
