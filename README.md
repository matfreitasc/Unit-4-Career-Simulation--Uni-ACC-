# Getting Started

run `npm install` to install all the dependencies.

run `npm start` to start the server.

## Endpoints

### GET / Is the root endpoint which returns a the docs for the API

## Built With

-   [Node.js](https://nodejs.org/en/) - The web framework used
-   [Express.js](https://expressjs.com/) - The web framework used
-   [PostgreSQL](https://www.postgresql.org/) - The database used

## Database

`npm run db:create` to create the database
`npm run db:seed` to seed the database

// create a table to track the progress

| Due          | User Role  |                                                    Task                                                    |     Completed      |                         Route                          |
| ------------ | :--------: | :--------------------------------------------------------------------------------------------------------: | :----------------: | :----------------------------------------------------: |
| Feb 29, 2024 | Logged Out |                 Access the website via the internet so I can browse and purchase products.                 | :heavy_check_mark: |                                                        |
| Feb 29, 2024 | Logged Out |                                        View all available products.                                        | :heavy_check_mark: |                    `/api/products/`                    |
| Feb 29, 2024 |   Admin    |                                        View a list of all products.                                        | :heavy_check_mark: |  `/api/products/` JWT verify will if admin than display all |
| Feb 29, 2024 |  Engineer  | Have a well-seeded database so that I can simulate several different scenarios for the user stories below. | :heavy_check_mark: |                   `npm run db:seed`                    |
| Mar 4, 2024  | Logged Out |      View the details for an individual product, including product descriptions, photos, price, etc.       | :heavy_check_mark: | `/api/products/` if single product `/api/products/:id` |
| Mar 4, 2024  |   Admin    |                                      Add, edit, and remove products.                                       | :heavy_check_mark: |                                                        |
| Mar 4, 2024  |   Admin    |                                         View a list of all users.                                          | :heavy_check_mark: | `/api/products/` JWT Verify will take care of the admin|
| Mar 14, 2024 | Logged In  |                                         Add a product to my cart.                                          |                    |                                                        |
| Mar 14, 2024 | Logged In  |                                     Edit my cart if I change my mind:                                      |                    |                                                        |
| Mar 14, 2024 | Logged In  |                       "Check out" the items in my cart, i.e., purchase the products.                       |                    |                                                        |
| Mar 18, 2024 | Logged Out |                              If I do not have an account, create an account.                               | :heavy_check_mark: |                  `/api/auth/register`                  |
| Mar 18, 2024 | Logged Out |                               If I do have an account, log into my account.                                | :heavy_check_mark: |                   `/api/auth/login`                    |
| Mar 18, 2024 | Logged In  |                      Have a persistent cart to revisit and pick up where I left off.                       | :heavy_check_mark: |                                                        |
| Mar 18, 2024 |  Engineer  |               Have secured user data so that no one can unrightfully manipulate information.               | :heavy_check_mark: |                                                        |

![Schema](https://github.com/matfreitasc/lock-37-Unit-4-Career-Simulation/assets/71300699/e9c1367d-9c31-4991-b0ae-db3e224aaebe)
