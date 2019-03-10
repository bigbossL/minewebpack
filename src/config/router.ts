import Resever from '../pages/Resever'
import Home from './../pages/Home'
import ReseverList from '../pages/ReserverList';
export const router=[
    {
        path:'/home/:json',
        component:Home
    },
    {
        path:'/resever',
        component:Resever
    },
    {
        path:'/list',
        component:ReseverList
    }
   
]