import { Router } from "express";

import functionRoutes from "./function.routes";
import genreRoutes from "./genre.routes";
import movieRoutes from "./movie.routes";
import reservationRoutes from "./reservation.routes";
import roomRoutes from "./room.routes";
import userRoutes from "./user.routes";

const router: Router = Router();

router.use("/users", userRoutes);
router.use("/genres", genreRoutes);
router.use("/movies", movieRoutes);
router.use("/rooms", roomRoutes);
router.use("/functions", functionRoutes);
router.use("/reservations", reservationRoutes);

export default router;
