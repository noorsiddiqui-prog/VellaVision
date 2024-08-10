import React, { useMemo } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { Box, useTheme } from '@mui/material';
import { useGetSalesQuery } from 'state/api/api';



const OverviewChart = ({ isDashboard = false, view }) => {
    const theme = useTheme();

    const { 
        data, 
        isLoading
     } = useGetSalesQuery();
    console.log("overviewChart", data);

    const [totalSalesLine, totalUnitsLine] = useMemo(() => {
        if (!data) return [];

        // const { monthlyData } = data[0];

        let monthlyData;

        for (let i of data) {
            console.log("loop", i.monthlyData);
            monthlyData = i.monthlyData;
        }
        const totalSalesLine = {
            id: "totalSales",
            color: theme.palette.secondary.main,
            data: [],
        };
        const totalUnitsLine = {
            id: "totalUnitsLine",
            color: theme.palette.secondary[600],
            data: [],
        };

        monthlyData && Object.values(monthlyData).reduce(
            (acc, { month, totalSales, totalUnits }) => {
                const curSales = acc.sales + totalSales;
                const curUnits = acc.units + totalUnits;

                totalSalesLine.data = [
                    ...totalSalesLine.data,
                    { x: month, y: curSales }
                ];
                totalUnitsLine.data = [
                    ...totalUnitsLine.data,
                    { x: month, y: curUnits }
                ];

                // console.log({ sales: curSales, units: curUnits });
                return { sales: curSales, units: curUnits }
            },
            { sales: 0, units: 0 }
        );
        console.log([[totalSalesLine], [totalUnitsLine]]);
        return [[totalSalesLine], [totalUnitsLine]];
    }, [data]);     // eslint-disable-line react-hooks/exhaustive-deps

    if (!data || isLoading) return "Loading...";




    return <ResponsiveLine
        // data={data}
        data={view === "sales" ? totalSalesLine : totalUnitsLine}

        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        theme={{
            axis: {
                domain: {
                    line: {
                        stroke: theme.palette.secondary[200]
                    }
                },
                legend: {
                    text: {
                        fill: theme.palette.secondary[200]
                    }
                },
                ticks: {
                    line: {
                        stroke: theme.palette.secondary[200],
                        strokeWidth: 1,
                    },
                    text: {
                        fill: theme.palette.secondary[200],
                    }
                },
                tooltip: {
                    container: {
                        color: theme.palette.primary.main,
                    }
                }
            }
        }}
        yFormat=" >-.2f"
        curve='catmullRom'
        enableArea={isDashboard}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            format: (v) => {
                        if (isDashboard) return v.slice(0, 3);
                        return v;
                    },
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? "" : "Month",
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickValues: 5,
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
           legend: isDashboard ? "" : `Total ${view === 'sales' ? "Revenue" : "Units"} for Year`,

            legendOffset: -60,
            legendPosition: 'middle'
        }}
        enableGridX={false}
        enableGridY={false}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={isDashboard ?[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 30,
                translateY: -40,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]: undefined}
    />
}

export default OverviewChart;





























// const OverviewChart = ({ isDashboard = false, view }) => {
//     const theme = useTheme();
//     const { 
//         data, 
//         isLoading
//      } = useGetSalesQuery();
//     console.log("overviewChart", data);

//     const [totalSalesLine, totalUnitsLine] = useMemo(() => {
//         if (!data) return [];

//         // const { monthlyData } = data[0];

//         let monthlyData;

//         for (let i of data) {
//             console.log("loop", i.monthlyData);
//             monthlyData = i.monthlyData;
//         }
//         const totalSalesLine = {
//             id: "totalSales",
//             color: theme.palette.secondary.main,
//             data: [],
//         };
//         const totalUnitsLine = {
//             id: "totalUnitsLine",
//             color: theme.palette.secondary[600],
//             data: [],
//         };

//         Object.values(monthlyData).reduce(
//             (acc, { month, totalSales, totalUnits }) => {
//                 const curSales = acc.sales + totalSales;
//                 const curUnits = acc.units + totalUnits;

//                 totalSalesLine.data = [
//                     ...totalSalesLine.data,
//                     { x: month, y: curSales }
//                 ];
//                 totalUnitsLine.data = [
//                     ...totalUnitsLine.data,
//                     { x: month, y: curUnits }
//                 ];

//                 // console.log({ sales: curSales, units: curUnits });
//                 return { sales: curSales, units: curUnits }
//             },
//             { sales: 0, units: 0 }
//         );
//         // console.log([[totalSalesLine], [totalUnitsLine]]);
//         return [[totalSalesLine], [totalUnitsLine]];
//     }, [data]);     // eslint-disable-line react-hooks/exhaustive-deps

//     if (!data || isLoading) return "Loading...";

//     return (
//         <div>

//             <Box>
//                 <ResponsiveLine
//                 // data={view === "sales" ? totalSalesLine : totalUnitsLine}
//                 data={}
//                 theme={{
//                     axis: {
//                         domain: {
//                             line: {
//                                 stroke: theme.palette.secondary[200]
//                             }
//                         },
//                         legend: {
//                             text: {
//                                 fill: theme.palette.secondary[200]
//                             }
//                         },
//                         ticks: {
//                             line: {
//                                 stroke: theme.palette.secondary[200],
//                                 strokeWidth: 1,
//                             },
//                             text: {
//                                 fill: theme.palette.secondary[200],
//                             }
//                         },
//                         tooltip: {
//                             container: {
//                                 color: theme.palette.primary.main,
//                             }
//                         }
//                     }
//                 }}
//                 margin={{ top: 50, right: 50, bottom: 50, left: 70 }}
//                 xScale={{ type: 'point' }}
//                 yScale={{
//                     type: 'linear',
//                     min: 'auto',
//                     max: 'auto',
//                     stacked: false,
//                     reverse: false
//                 }}
//                 yFormat=" >-.2f"
//                 curve="catmullRom"
//                 axisTop={null}
//                 axisRight={null}
//                 axisBottom={{
//                     format: (v) => {
//                         if (isDashboard) return v.slice(0, 3);
//                         return v;
//                     },
//                     orient: 'bottom',
//                     tickSize: 5,
//                     tickPadding: 5,
//                     tickRotation: 0,
//                     legend: isDashboard ? "" : "Month",
//                     legendOffset: 36,
//                     legendPosition: 'middle'
//                 }}
//                 axisLeft={{
//                     orient: 'left',
//                     tickSize: 5,
//                     tickPadding: 5,
//                     tickRotation: 0,
//                     legend: isDashboard ? "" : `Total ${view === 'sales' ? "Revenue" : "Units"} for Year`,
//                     legendOffset: -60,
//                     legendPosition: 'middle'
//                 }}
//                 enableGridX={false}
//                 enableGridY={false}
//                 pointSize={10}
//                 pointColor={{ theme: 'background' }}
//                 pointBorderWidth={2}
//                 pointBorderColor={{ from: 'serieColor' }}
//                 pointLabelYOffset={-12}
//                 useMesh={true}
//                 legends={isDashboard ? [
//                     {
//                         anchor: 'bottom-right',
//                         direction: 'column',
//                         justify: false,
//                         translateX: 30,
//                         translateY: -40,
//                         itemsSpacing: 0,
//                         itemDirection: 'left-to-right',
//                         itemWidth: 80,
//                         itemHeight: 20,
//                         itemOpacity: 0.75,
//                         symbolSize: 12,
//                         symbolShape: 'circle',
//                         symbolBorderColor: 'rgba(0, 0, 0, .5)',
//                         effects: [
//                             {
//                                 on: 'hover',
//                                 style: {
//                                     itemBackground: 'rgba(0, 0, 0, .03)',
//                                     itemOpacity: 1
//                                 }
//                             }
//                         ]
//                     }
//                 ] : undefined}
//             />
//             </Box>
//         </div>
//     )
// }
// export default OverviewChart


// const data = [
//     {
//         "id": "japan",
//         "color": "hsl(207, 70%, 50%)",
//         "data": [
//             {
//                 "x": "plane",
//                 "y": 140
//             },
//             {
//                 "x": "helicopter",
//                 "y": 214
//             },
//             {
//                 "x": "boat",
//                 "y": 252
//             },
//             {
//                 "x": "train",
//                 "y": 208
//             },
//             {
//                 "x": "subway",
//                 "y": 279
//             },
//             {
//                 "x": "bus",
//                 "y": 59
//             },
//             {
//                 "x": "car",
//                 "y": 257
//             },
//             {
//                 "x": "moto",
//                 "y": 237
//             },
//             {
//                 "x": "bicycle",
//                 "y": 54
//             },
//             {
//                 "x": "horse",
//                 "y": 219
//             },
//             {
//                 "x": "skateboard",
//                 "y": 226
//             },
//             {
//                 "x": "others",
//                 "y": 239
//             }
//         ]
//     },
//     {
//         "id": "france",
//         "color": "hsl(332, 70%, 50%)",
//         "data": [
//             {
//                 "x": "plane",
//                 "y": 184
//             },
//             {
//                 "x": "helicopter",
//                 "y": 217
//             },
//             {
//                 "x": "boat",
//                 "y": 91
//             },
//             {
//                 "x": "train",
//                 "y": 68
//             },
//             {
//                 "x": "subway",
//                 "y": 48
//             },
//             {
//                 "x": "bus",
//                 "y": 65
//             },
//             {
//                 "x": "car",
//                 "y": 250
//             },
//             {
//                 "x": "moto",
//                 "y": 177
//             },
//             {
//                 "x": "bicycle",
//                 "y": 90
//             },
//             {
//                 "x": "horse",
//                 "y": 175
//             },
//             {
//                 "x": "skateboard",
//                 "y": 154
//             },
//             {
//                 "x": "others",
//                 "y": 8
//             }
//         ]
//     },
//     {
//         "id": "us",
//         "color": "hsl(202, 70%, 50%)",
//         "data": [
//             {
//                 "x": "plane",
//                 "y": 194
//             },
//             {
//                 "x": "helicopter",
//                 "y": 180
//             },
//             {
//                 "x": "boat",
//                 "y": 174
//             },
//             {
//                 "x": "train",
//                 "y": 192
//             },
//             {
//                 "x": "subway",
//                 "y": 176
//             },
//             {
//                 "x": "bus",
//                 "y": 247
//             },
//             {
//                 "x": "car",
//                 "y": 293
//             },
//             {
//                 "x": "moto",
//                 "y": 265
//             },
//             {
//                 "x": "bicycle",
//                 "y": 9
//             },
//             {
//                 "x": "horse",
//                 "y": 193
//             },
//             {
//                 "x": "skateboard",
//                 "y": 51
//             },
//             {
//                 "x": "others",
//                 "y": 159
//             }
//         ]
//     },
//     {
//         "id": "germany",
//         "color": "hsl(192, 70%, 50%)",
//         "data": [
//             {
//                 "x": "plane",
//                 "y": 1
//             },
//             {
//                 "x": "helicopter",
//                 "y": 167
//             },
//             {
//                 "x": "boat",
//                 "y": 90
//             },
//             {
//                 "x": "train",
//                 "y": 29
//             },
//             {
//                 "x": "subway",
//                 "y": 164
//             },
//             {
//                 "x": "bus",
//                 "y": 124
//             },
//             {
//                 "x": "car",
//                 "y": 220
//             },
//             {
//                 "x": "moto",
//                 "y": 249
//             },
//             {
//                 "x": "bicycle",
//                 "y": 266
//             },
//             {
//                 "x": "horse",
//                 "y": 86
//             },
//             {
//                 "x": "skateboard",
//                 "y": 159
//             },
//             {
//                 "x": "others",
//                 "y": 298
//             }
//         ]
//     },
//     {
//         "id": "norway",
//         "color": "hsl(170, 70%, 50%)",
//         "data": [
//             {
//                 "x": "plane",
//                 "y": 65
//             },
//             {
//                 "x": "helicopter",
//                 "y": 149
//             },
//             {
//                 "x": "boat",
//                 "y": 94
//             },
//             {
//                 "x": "train",
//                 "y": 35
//             },
//             {
//                 "x": "subway",
//                 "y": 9
//             },
//             {
//                 "x": "bus",
//                 "y": 278
//             },
//             {
//                 "x": "car",
//                 "y": 161
//             },
//             {
//                 "x": "moto",
//                 "y": 264
//             },
//             {
//                 "x": "bicycle",
//                 "y": 62
//             },
//             {
//                 "x": "horse",
//                 "y": 238
//             },
//             {
//                 "x": "skateboard",
//                 "y": 161
//             },
//             {
//                 "x": "others",
//                 "y": 11
//             }
//         ]
//     }
// ]

