import { rest } from 'msw'

import { users, tokens } from './data'

export const handlers = [
    rest.get('http://localhost:5000/categories', (req, res, ctx) => {
        
        return res(
            ctx.status(200),
            ctx.json({
                results: 
                    [
                        { id: 1, name: 'Vegetarian'},
                        { id: 2, name: 'Dairy Free'},
                        { id: 3, name: 'Gluten Free'},
                        { id: 4, name: 'Vegan'},
                    ]
            })
        )
    }),
    rest.get('http://localhost:5000/recipes', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                {
                    results: [
                        {
                            id: 9,
                            userId: 3,
                            name: 'Beans on Toast',
                            description: "World's tastiest snack",
                            servings: 1,
                            calories_per_serving: 246,
                            prep_time: 5,
                            cook_time: 10,
                            rating: null,
                            ingredients: [
                                { id: 67, name: 'Bread', amount: 2, amount_type: 'slices'},
                                { id: 68, name: 'Baked beans', amount: 400, amount_type: 'grams'}
                            ],
                            cookbooks: [
                                { id: 2, name: "My Favourite recipes"},
                            ],
                            steps: [
                                { id: 38, stepNo: 1, content: "Toast the bread in a toaster or grill"},
                                { id: 39, stepNo: 2, content: "Place the beans in a saucepan and simmer on a low heat for 3 to 4 minutes"},
                                { id: 40, stepNo: 3, content: "Place toast on a palte and pour the cooked beans on top"},
                            ],
                            categories: [
                                { id: 6, name: "Breakfast"},
                                { id: 7, name: "Lunch"},
                                { id: 8, name: "Snack"},
                            ],
                            images: [
                                { id: 36, source: '/images/1.png', title: "Pot of baked beans", alt: "Pot of baked beans" },
                                { id: 37, source: '/images/2.png', title: "Slices of bread", alt: "Slices of bread" },
                            ],
                        }
                    ]
                }
            )
        )
    }),
    rest.post('http://localhost:5000/auth/login', ( req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                {
                    accessToken: tokens.accessToken
                }
            ),
            ctx.cookie('jwt', tokens.refreshToken)
        )
    }),
    rest.post('http://localhost:5000/auth/register', (req,res,ctx) => {
        return res(
            ctx.status(201),
            ctx.json({
                status: 201,
                success: true,
                username: req.username,
                forename: req.forename,
                surname: req.surname,
                email: req.email,
                roles: 'Customer'  
            })
        )
    }),
    rest.get('http://localhost:5000/auth/profile', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                {
                    status: 200,
                    success: true,
                    data: {
                        id: 12,
                        username: 'twallaby@australia.net',
                        forename: 'Terry',
                        surname: 'Wallaby',
                        roles: 'Customer',
                        created_at: '2022-11-15 13:15:45'
                    },
                    message: null
                }
            )
        )
    }),
    rest.post('http://localhost:5000/auth/profile', (req,res,ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                status: 200,
                success: true,
                message: 'Profile successfully updated',
                data: {
                    id: 12,
                    username: 'twallaby@australia.net',
                    forename: 'Terry',
                    surname: 'Wallaby',
                    roles: 'Customer',
                    created_at: '2022-11-15 13:15:45'
                }
            })
        )
    }),
    rest.get('http://localhost:5000/ingredients', (req, res, ctx) => {
        
        let filter = JSON.parse(req.url.searchParams.get('filter'))

        /* If a filter has been set for testing then send a reduced set of results, otherwise send the fullset 
         * NOTE: The filter param has been passed through JSON.strinfigy so at thgis point it is actually a string
         * and not an object
         */

        if(filter.name !== undefined){

            /* Check for the term we are filtering on, as we use one term to test for no records returned back */
            if(filter.name === "butterkist"){
                
                return res(
                    ctx.status(200),
                    ctx.json({
                        results: []
                    })
                )

            } else {

                return res(
                    ctx.status(200),
                    ctx.json({
                        results: [
                            { id: 2, name: 'Eggs'}
                        ]
                    })
                )

            }
            
        } else {
            return res(
                ctx.status(200),
                ctx.json({
                    results: [
                        { id: 1, name: 'Flour'},
                        { id: 2, name: 'Eggs'},
                        { id: 3, name: 'Butter' },
                        { id: 4, name: 'Milk' },
                        { id: 5, name: 'Sugar' },
                        { id: 6, name: 'Strawberry Jam' }
                    ],
                    totalPages: 1,
                    totalRecords: 6,
                    currentPage: 1
                })
            )
        }
    }),
    rest.get('http://localhost:5000/users/:id/cookbooks', (req, res, ctx) => {

       /* Get the cookbook id we want to look at */
       const id = req.params.id
       
       /* Check if we have a valid cookbook id */
       if(!id || id === undefined || typeof id != 'number') {
        return res(
            ctx.status(400),
            ctx.json({
                status: 400,
                success: false,
                message: 'You must supply a valid user id'
            })
        )
       }

       /* Display a list of the users cookbooks */
       return res(
        ctx.status(200),
        ctx.json({
            status: 200,
            success: true,
            message: '',
            results: [
                { id: 1, userId: 1, name: 'My Cookbooks', description: 'Your default cook book for storing your favourite recipes.'},
                { id: 2, userId: 1, name: 'Vegan recipes', description: 'My curated list of vegan recipes I have tried and love.'},
                { id: 3, userId: 1, name: 'Next meal ideas', description: 'Interesting recipes I have yet to try.'}
            ],
            totalPages: 1,
            totalRecords: 3,
            currentPage: 1
        })
       )

    }),
    rest.get('http://localhost:5000/uploads', (req, res, ctx) => {

        /* Extract the request parameters */
        let filter = JSON.parse(req.url.searchParams.get('filter'))
        let resource = filter['resource']
        let userId = filter['userid']
        let resourceId = filter['resourceid']

        /* image data */
        let data = [
            //{ id: 1, userId: 1, src: '', title: '', alt: '', resource: '', resourceid: ''},
            { id: 1, userId: 1, src: '/cookbook_default.png', title: 'Generic cookbook with list of recipes', alt: 'Generic cookbook with list of recipes', resource: 'Cookbook', resourceid: 1},
            { id: 2, userId: 1, src: '/cookbook_vegan.png', title: 'Picture of a cookbook next to vegan ingredients', alt: 'Picture of a cookbook next to vegan ingredients', resource: 'Cookbook', resourceid: 2},
            { id: 3, userId: 1, src: '/cookbook_next.png', title: 'Cookbook atop pile of flour', alt: 'Cookbook atop pile of flour', resource: 'Cookbook', resourceid: 3},
        ]

        /* Filter out the images to return */
        let filtered = data.filter( cbk => cbk.userId === userId && cbk.resource === resource && cbk.resourceId === resourceId )

        /* Returned the found image(s) */
        return res(
            ctx.status(200),
            ctx.json({
                status: 200,
                success: true,
                message: '',
                results: filtered,
                pagination: {
                    total: Math.ceil(filtered.length/10),
                    records: filtered.length,
                    current: 1
                }
            })
        )

    }),
    rest.get('http://localhost:5000/cookbooks/:id', (req, res, ctx) => {

        return res(
            ctx.status(200),
            ctx.json([
                { 
                    id: 1, 
                    userId: 1, 
                    name: "My Favourites",
                    description: "Plethora of my favourite recipes",
                    image:  "favourite_cookbooks.png"
                }
            ])

        )

    }),
    rest.get('http://localhost:5000/cookbooks/:id/recipes', (req, res, ctx) => {

        return res(
            ctx.status(200),
            ctx.json({
                results: [
                    {
                        id: 1,
                        name: "Spaghetti Bolognaise",
                        description: "A delicious and simple Spaghettit Bolognaise",
                        rating: 5,
                        categories: [
                            { categoryId: 1, name: "Dinner", recipeId: 1}
                        ],
                        images: [
                            { 
                                imageId: 1,
                                imageUser: 1,
                                imageSrc: 'spagbol.png',
                                imageTitle: 'Spaghetti Bolognaise',
                                imageAlt: 'Image of a bowl of Spaghetti Bolognaise'
                            }
                        ]
                    }
                ],
                totalPages: 1,
                totalRecords: 1,
                currentPage: 1
            })
        )

    })
]