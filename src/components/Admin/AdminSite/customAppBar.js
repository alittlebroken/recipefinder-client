import React from 'react'
import { AppBar } from 'react-admin'
import { CustomMenu } from './customUserMenu'

export const CustomAppBar = (props) => {
    return (
        <AppBar {...props} userMenu={<CustomMenu />} />
    )
}