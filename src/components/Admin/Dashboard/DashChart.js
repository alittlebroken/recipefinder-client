import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend
} from 'recharts'

import {
    Card,
    CardContent,
    CardHeader,
    Grid,
    Typography
} from '@mui/material'

import { React }  from 'react'

const DashChart = (props) => {
    
    const {
        data,
        title,
        xAxisOpts,
        yAxisOpts,
        dataOpts
    } = props

    /* Holds the final chart data */
    let chartData = []

    /* We need to format the date a little better for each item */
    data.forEach(item => {
            
        let itemDate = new Date(item.date)
            
        let itemDay
        if(itemDate.getDate() < 10){
            itemDay = `0${itemDate.getDate()}`
        } else {
            itemDay = itemDate.getDate()
        }

        let itemMonth
        if((itemDate.getMonth() + 1) < 10){
            itemMonth = `0${itemDate.getMonth() + 1}`
        } else {
            itemMonth = (itemDate.getMonth() + 1)
        }

        let data = {
            date: `${itemDay}-${itemMonth}-${itemDate.getFullYear()}`,
            count: item.count
        }
            
        chartData.push(data)
    })

    return (

            <Card>
                <CardHeader title={title} />
                <CardContent>
                    <BarChart
                    data={chartData}
                    height={dataOpts.height} width={dataOpts.width}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={xAxisOpts.dataKey} />
                        <YAxis dataKey={yAxisOpts.dataKey} scale={xAxisOpts.scale} interval={xAxisOpts.interval} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey={dataOpts.dataKey} fill={dataOpts.fill} />
                    </BarChart>
                </CardContent>
            </Card>

    )
}

export default DashChart