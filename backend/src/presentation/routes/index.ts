import { Router } from "express";

import { FunctionRoutes } from "./function.routes";
import { GenreRoutes } from "./genre.routes";
import { MovieRoutes } from "./movie.routes";
import { ReservationRoutes } from "./reservation.routes";
import { RoomRoutes } from "./room.routes";
import { UserRoutes } from "./user.routes";

const router: Router = Router();

router.use("/users", new UserRoutes().router);
router.use("/genres", new GenreRoutes().router);
router.use("/movies", new MovieRoutes().router);
router.use("/rooms", new RoomRoutes().router);
router.use("/functions", new FunctionRoutes().router);
router.use("/reservations", new ReservationRoutes().router);

export default router;
