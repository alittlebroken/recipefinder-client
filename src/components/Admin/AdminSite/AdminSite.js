import { 
  Admin, 
  Resource, 
  CustomRoutes,
  Login,
  ListGuesser,
  EditGuesser,
  ShowGuesser
} from 'react-admin'
import { Route } from "react-router-dom";
import authProvider from  '../authProvider/authProvider'
import dataProvider from '../../../providers/dataProvider'

/* Build supporting components */


/* Import the various components */

/* Categories */
import { CategoryList } from '../categories/categoriesList'
import { CategoryEdit } from '../categories/categoriesEdit'
import { CategoryCreate } from '../categories/categoriesCreate'
import { CategoryShow } from '../categories/categoriesShow'

/* Cookbooks */
import CookbookList from '../cookbooks/cookbookList'
import { CookbookEdit } from '../cookbooks/cookbookEdit'
import { CookbookCreate } from '../cookbooks/cookbookCreate'
import { CookbookShow } from '../cookbooks/cookbookShow'

/* Ingredients */
import { IngredientList } from '../ingredients/ingredientList'
import { IngredientEdit } from '../ingredients/ingredientEdit'
import { IngredientCreate } from '../ingredients/ingredientCreate'
import { IngredientShow } from '../ingredients/ingredientShow'

/* Recipes */
import { RecipeList } from '../recipes/recipeList'
import { RecipeEdit } from '../recipes/recipeEdit'
import { RecipeCreate } from '../recipes/recipeCreate'
import { RecipeShow } from '../recipes/recipeShow'

/* Steps */
import { StepList } from '../steps/stepsList'
import { StepEdit } from '../steps/stepsEdit'
import { StepShow } from '../steps/stepsShow'
import { StepCreate } from '../steps/stepsCreate'

/* Users */
import { UserList } from '../users/usersList'
import { UserEdit } from '../users/usersEdit'
import { UserShow } from '../users/usersShow'
import { UserCreate } from '../users/usersCreate'

/* Pantries */
import { PantryList } from '../pantries/pantryList'
import { PantryEdit } from '../pantries/pantryEdit'
import { PantryShow } from '../pantries/pantryShow'

/* Uploads */
import { UploadList } from '../uploads/uploadList'
import { UploadEdit } from '../uploads/uploadEdit'
import { UploadShow } from '../uploads/uploadShow'
import { UploadCreate } from '../uploads/uploadCreate'

/* Import icons to use for the various resources */
import UserIcon from "@mui/icons-material/Group";
import CookbookIcon from '@mui/icons-material/MenuBook';
import RecipeIcon from '@mui/icons-material/BrunchDining';
import IngredientIcon from '@mui/icons-material/EggAlt';
import PantryIcon from '@mui/icons-material/Kitchen';
import StepIcon from '@mui/icons-material/ListAlt';
import CategoryIcon from '@mui/icons-material/Label';
import TopicIcon from '@mui/icons-material/Topic';

import { ProfileEdit } from '../Profile/profileEdit'

import { CustomLayout } from './customLayout'

import { Dashboard }  from '../Dashboard/Dashboard'

/* Custom login page */
const CustomLoginPage = () => {
  return (
      <Login
          // A random image that changes everyday
          backgroundImage="https://source.unsplash.com/random/1600x900/daily"
      />
  )
}

export const AdminSite = () => {
    return (
        <Admin 
        title="RecipeFinder Admin" 
        basename="/admin" 
        authProvider={authProvider} 
        dataProvider={dataProvider} 
        layout={CustomLayout}
        loginPage={CustomLoginPage}
        dashboard={Dashboard}
        >
          <Resource name="users" icon={UserIcon} list={UserList} edit={UserEdit} show={UserShow} create={UserCreate} />
          <Resource name="categories" icon={CategoryIcon} list={CategoryList} edit={CategoryEdit} create={CategoryCreate} show={CategoryShow} />
          <Resource name="cookbooks" icon={CookbookIcon} list={CookbookList} edit={CookbookEdit} create={CookbookCreate} show={CookbookShow} />
          <Resource name="ingredients" icon={IngredientIcon} list={IngredientList} edit={IngredientEdit} create={IngredientCreate} show={IngredientShow} />
          <Resource name="recipes" icon={RecipeIcon} list={RecipeList} edit={RecipeEdit} create={RecipeCreate} show={RecipeShow} />
          <Resource name="steps" icon={StepIcon} list={StepList} edit={StepEdit} show={StepShow} create={StepCreate} />
          <Resource name="pantries" icon={PantryIcon} list={PantryList} edit={PantryEdit} show={PantryShow} />
          <Resource name="uploads" icon={TopicIcon} list={UploadList} edit={UploadEdit} show={UploadShow} create={UploadCreate} />
          <CustomRoutes>
            <Route path="/profile" element={<ProfileEdit />} />
          </CustomRoutes>
        </Admin>
    )
}