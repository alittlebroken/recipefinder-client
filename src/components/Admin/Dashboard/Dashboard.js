import {
    Card,
    CardContent,
    CardHeader,
    Grid,
    Typography,
} from '@mui/material'

import {
    useDataProvider,
} from 'react-admin'

import {
    useEffect,
    useState
} from 'react'

import DashChart from './DashChart'
import DashTable from './DashTable'

export const Dashboard = () => {

    /* Alias any use methods */
    const dp = useDataProvider();

    /* Set the stata of this component */
    const [numRecipes, setNumRecipes] = useState()
    const [recipeGroupedByMonth, setRecipeGroupedByMonth] = useState([])
    const [recipeTopRated, setRecipeTopRated] = useState([])
    const [recentlyCreatedRecipes, setRecentlyCreatedRecipes] = useState([]) 
    const [numUsers, setNumUsers] = useState()
    const [userGroupedByMonth, setUserGroupedByMonth] = useState([])
    const [recentUsers, setRecentUsers] = useState([])
    const [numIngredients, setNumIngredients] = useState()

    /* Retrieve the dashboard data */
    useEffect(() => {

        /* Create an async function to get the data */
        const getData = async () => {
            const results = await dp.loadDashboard()
            let recipes = results.recipes
            let users = results.users
            let ingredients = results.ingredients

            setRecipeGroupedByMonth(recipes.groupedByMonth)
            setRecentlyCreatedRecipes(recipes.recentlyCreated)
            setRecipeTopRated(recipes.topRated)
            setNumRecipes(recipes.total)
            setNumIngredients(ingredients.total)
            setNumUsers(users.total)
            setUserGroupedByMonth(users.groupedByMonth)
            setRecentUsers(users.recentlyCreated)

        }

        getData()

    }, [dp])

    /* Prettify any numbers we display */
    const abbrNum = (number, decPlaces) => {
        // 2 decimal places => 100, 3 => 1000, etc
        decPlaces = Math.pow(10, decPlaces)
      
        // Enumerate number abbreviations
        var abbrev = ['k', 'm', 'b', 't']
      
        // Go through the array backwards, so we do the largest first
        for (var i = abbrev.length - 1; i >= 0; i--) {
          // Convert array index to "1000", "1000000", etc
          var size = Math.pow(10, (i + 1) * 3)
      
          // If the number is bigger or equal do the abbreviation
          if (size <= number) {
            // Here, we multiply by decPlaces, round, and then divide by decPlaces.
            // This gives us nice rounding to a particular decimal place.
            number = Math.round((number * decPlaces) / size) / decPlaces
      
            // Handle special case where we round up to the next abbreviation
            if (number == 1000 && i < abbrev.length - 1) {
              number = 1
              i++
            }
      
            // Add the letter for the abbreviation
            number += abbrev[i]
      
            // We are done... stop
            break
          }
        }
      
        return number
    }

    return (

        <Grid container spacing={1} margin={2}>
            
            <Grid item xs={12}>
                <Typography variant="h2">
                    Dashboard Overview
                </Typography>
            </Grid>
            <Grid item xs />
            <Grid item xs={3}>
                <Card>
                    <CardHeader title="Recipes" />
                    <CardContent sx={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <Typography variant="h2" >
                            {abbrNum(numRecipes,2)}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={3}>
                <Card>
                    <CardHeader title="Users" />
                    <CardContent sx={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <Typography variant="h2" >
                                {abbrNum(numUsers,2)}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={3}>
                <Card>
                    <CardHeader title="Ingredients" />
                    <CardContent sx={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <Typography variant="h2" >
                                {abbrNum(numIngredients,2)}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs />
            <Grid item xs={12} />
            <Grid item xs />
            <Grid item xs={5}>
                <DashChart 
                    title="New recipes by month"
                    data={recipeGroupedByMonth}
                    xAxisOpts={{ dataKey: "date" }}
                    yAxisOpts={{
                        dataKey: "count",
                        scale: "linear",
                        interval: "preserveStartEnd"
                    }}
                    dataOpts={{
                        dataKey: "count",
                        fill: "#8884d8",
                        height: 150,
                        width: 150
                    }}
                />
            </Grid>
            <Grid item xs={5}>
                <DashChart 
                    title="New users by month"
                    data={userGroupedByMonth}
                    xAxisOpts={{ dataKey: "date" }}
                    yAxisOpts={{
                        dataKey: "count",
                        scale: "linear",
                        interval: "preserveStartEnd"
                    }}
                    dataOpts={{
                        dataKey: "count",
                        fill: "#8884d8",
                        height: 150,
                        width: 150
                    }}
                />
            </Grid>
            <Grid item xs />
            <Grid item xs={12} />
            <Grid item xs />
            <Grid item xs={5}>
                <DashTable 
                    title="Latest recipes"
                    headers={['id', 'name', 'created']} 
                    data={recentlyCreatedRecipes} 
                />
            </Grid>
            <Grid item xs={5}>
            <DashTable 
                    title="Top Rated recipes"
                    headers={['id', 'name', 'rating']} 
                    data={recipeTopRated} 
                />
            </Grid>
            <Grid item xs />
            <Grid item xs={12} />
            <Grid item xs />
            <Grid item xs={10}>
                <DashTable 
                    title="Most recent users"
                    headers={['ID', 'Username', 'Email', 'Joined']}
                    data={recentUsers}
                />
            </Grid>
            <Grid item xs />

        </Grid>
    )
}
