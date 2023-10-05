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
    })
]