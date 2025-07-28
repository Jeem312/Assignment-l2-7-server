// Add Here Router Code

import { Router } from "express";

const UserRoutes = Router();

UserRoutes.get("/", (req, res) => {
  res.send("All users list");
});



export default UserRoutes;
