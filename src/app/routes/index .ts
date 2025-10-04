import { Router } from "express"
import { AuthRouter } from "../modules/auth/auth.route"
import { ProjectRouter } from "../modules/projects/project.route"
import { BlogRoutes } from "../modules/blog/blog.route"

export const router = Router()

const moduleRoutes = [
    {
        path: "/auth",
        route: AuthRouter
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