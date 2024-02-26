import React from 'react'

import {
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material'

const DashTable = (props) => {

    const {title, headers, data} = props
    
    return (
        <Card>
            <CardContent>
                <Typography variant="h3">{title}</Typography>
            </CardContent>
            <CardContent>
                <TableContainer component="Paper">
                    <Table>
                        <TableHead>
                            <TableRow>
                                {
                                    headers.map(header => (
                                        <TableCell>{header}</TableCell>
                                    ))
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map(row => (
                                <TableRow 
                                    key={row.id}
                                >
                                    {
                                        Object.keys(row).map(item => (
                                            <TableCell>{row[item]}</TableCell>
                                        ))
                                    }
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )
}

export default DashTable