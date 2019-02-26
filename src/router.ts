import Item from './pages/Item'
import Home from './pages/Home'
import About from './pages/About'
export const router=[
    {
        path:'/',
        component:Home
    },
    {
        path:'/home',
        component:Item
    },
    {
        path:'/about',
        components:About
    }
]