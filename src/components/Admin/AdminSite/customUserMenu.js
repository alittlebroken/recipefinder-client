import React from 'react'
import { UserMenu, MenuItemLink, Logout } from 'react-admin'
import SettingsIcon from "@mui/icons-material/Settings";
import Avatar from '@mui/material/Avatar';

/* Load a custom avatar image from lcoalStorage */
const AdminUserIcon = () => {

    /* get the profile data */
    const profile = JSON.parse(localStorage.getItem("adminUserProfile"))

    return (
        <Avatar 
            alt={profile.forename}
            sx={{
                height: 30,
                width: 30,
            }}
            src={JSON.parse(localStorage.getItem("adminAvatar"))}
        ></Avatar>
    )
}

export const CustomMenu = props => {
    return (
        <UserMenu {...props} icon={<AdminUserIcon />}>
            <MenuItemLink
                to="/admin/profile" 
                primaryText="My profile" 
                leftIcon={<SettingsIcon />}
            />
            <Logout />
        </UserMenu>
    )

}
