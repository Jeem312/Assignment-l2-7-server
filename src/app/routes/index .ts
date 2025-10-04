import { Router } from "express"
import { ProjectRouter } from "../modules/projects/project.route"
import { BlogRoutes } from "../modules/blog/blog.route"
import { UserRoutes } from "../modules/user/user.route"

export const router = Router()

const moduleRoutes = [
    {
        path: "/user",
        route: UserRoutes
    },
    {
        path: "/projects",
        route: ProjectRouter
    },
    {
        path: "/blogs",
        route: BlogRoutes
    }
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

// router.use("/user", UserRoutes)
// router.use("/tour", TourRoutes)
// router.use("/division", DivisionRoutes)
// router.use("/booking", BookingRoutes)
// router.use("/user", UserRoutes)