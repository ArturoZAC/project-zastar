ALTER TABLE "functions" ADD CONSTRAINT "base_price_positive" CHECK ("functions"."base_price" > 0);--> statement-breakpoint
ALTER TABLE "functions" ADD CONSTRAINT "vip_surcharge_non_negative" CHECK ("functions"."vip_surcharge" >= 0);--> statement-breakpoint
ALTER TABLE "movies" ADD CONSTRAINT "title_not_empty" CHECK (length("movies"."title") > 0);--> statement-breakpoint
ALTER TABLE "movies" ADD CONSTRAINT "duration_positive" CHECK ("movies"."duration_minutes" > 0);--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payment_amount_positive" CHECK ("payments"."amount" > 0);--> statement-breakpoint
ALTER TABLE "reservation_seats" ADD CONSTRAINT "reservation_seat_price_positive" CHECK ("reservation_seats"."price" > 0);--> statement-breakpoint
ALTER TABLE "rooms" ADD CONSTRAINT "total_seats_positive" CHECK ("rooms"."total_seats" > 0);--> statement-breakpoint
ALTER TABLE "seats" ADD CONSTRAINT "seat_number_positive" CHECK ("seats"."number" > 0);--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "first_name_not_empty" CHECK (length("users"."first_name") > 0);--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "last_name_not_empty" CHECK (length("users"."last_name") > 0);