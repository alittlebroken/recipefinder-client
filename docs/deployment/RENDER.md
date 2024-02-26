# Deploying the app to Render

## Assumptions
- You already have an account on render.com and are logged in
- You have cloned this repo locally

This guide was created on Windows 11 using Windows powershell as well as using the free tier on render.com

## Installation

- Click on the button labelled "New +"
- Select Static Site from the drop down
- Select the recipefinder-client entry and click the button labelled "Connect"
- Set the Name field to recipeFinder Client
- From the Region drop down, select the entry closest to you
- Select the Free tier
- Add the following Environment variables

| Name | Value | Comments |
| ---- | ----- | -------- |
| REACT_APP_API_URL | | This is the URI you were given when you deployed the API backend on render.com |
| REACT_APP_TOKEN_REFRESH_RATE | 300 | This is set in seconds|
| REACT_APP_ENV | production | |

- Click on the button labelled "Create Static Site"
