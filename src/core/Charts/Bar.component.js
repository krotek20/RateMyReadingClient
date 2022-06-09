import React from "react";
import { ResponsiveBar } from "@nivo/bar";

export default function Bar({ data, marginTop, marginBottom, leftAxisText }) {
  return (
    <ResponsiveBar
      data={data}
      keys={["count"]}
      indexBy="difficulty"
      margin={{ top: marginTop, right: 120, bottom: marginBottom, left: 60 }}
      padding={0.5}
      valueScale={{ type: "linear" }}
      valueFormat=">-.3"
      indexScale={{ type: "band", round: true }}
      colorBy="indexValue"
      colors={[...data.map((x) => x.color)]}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: leftAxisText,
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor="#fff"
      legends={[
        {
          dataFrom: "indexes",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
}
