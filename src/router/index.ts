import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import Login from '@/views/Login.vue'
import Employee from '@/views/Employee.vue'
import Post from '@/views/Post.vue'
import PostList from '@/views/PostList.vue'

// import Product from '@/views/Product.vue'
// import Order from '@/views/Order.vue'
// import Report from '@/views/Report.vue'
// import Setting from '@/views/Setting.vue'

const routes: Array<RouteRecordRaw> = [
      {
        path: '/',
        component: Login,
        meta: {
            title: 'Login',
            header: 'Login'
        }
      },
      {
        path: '/Defalut',
        name: 'Defalut',
        component: DefaultLayout,
        children: [
        {
          path: '/employee',
          name: 'Employee',
          component: Employee,
          meta: {
            title: 'Employee',
            header: 'Employee'
          }
        },
        {
          path: '/post',
          name: 'Post',
          component: Post,
          meta: {
            title: 'Post',
            header: 'Post'
          }
        }
        ,
        {
          path: '/postlist',
          name: 'PostList',
          component: PostList,
          meta: {
            title: 'PostList',
            header: 'PostList'
          }
        }
      ]
      }
      


      //   children: [
      //   //   {
      //   //     path: '/login',
      //   //     name: 'Login',
      //   //     component: Login,
      //   //     meta: {
      //   //       title: 'Login',
      //   //       header: 'Login'
      //   //     }
      //   //   },
      //     {
      //       path: '/home',
      //       name: 'Home',
      //       component: Home,
      //       meta: {
      //         title: 'Home',
      //         header: 'Home'
      //       }
      //     }
      //   ]
      //}
]


const router = createRouter({
    history: createWebHistory(import.meta.env.URL),
    routes
})

router.beforeEach((to, _, next) => {

    if(typeof(to.meta.title) == 'string'){
        document.title = to.meta.title
    }

    next()
})

export default router