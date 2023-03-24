import React from 'react'
import { Layout } from 'react-admin'
import { CustomAppBar } from './customAppBar'

export const CustomLayout = props => <Layout {...props} appBar={CustomAppBar} />