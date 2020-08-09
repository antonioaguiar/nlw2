import convertHourToMinutes from "../utils/convertHoursToMinutes";
import db from "../database/connection";
import { Request, Response } from "express";

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesController {
  async index(req: Request, res: Response) {
    const filters = req.query;
    console.log(filters);

    if (!filters.week_day || !filters.subject || !filters.time) {
      return res.status(400).json({
        error: "Filters not found!",
      });
    }

    const timesInMinutes = convertHourToMinutes(filters.time as string);
    const subject = filters.subject as string;
    const week_day = filters.week_day;

    const classes = await db("classes")
      .whereExists(function () {
        this.select("class_schedule.*")
          .from("class_schedule")
          .whereRaw("`class_schedule`.`class_id` = `classes`.`id`")
          .whereRaw("`class_schedule`.`week_day` = ??", [Number(week_day)])
          .whereRaw("`class_schedule`.`from` <= ??", [timesInMinutes])
          .whereRaw("`class_schedule`.`to` > ??", [timesInMinutes]);
      })
      .where("classes.subject", "=", subject)
      .join("users", "classes.user_id", "=", "users.id")
      .select(["classes.*", "users.*"]);

    res.json(classes);
  }

  async list(req: Request, res: Response) {
    const user_id = req.params.id;
    console.log(user_id);

    if (!user_id) {
      return res.status(400).json({
        error: "Filters not found!",
      });
    }

    const users = await db("users")
      .innerJoin("classes", "classes.user_id", "users.id")
      .innerJoin("class_schedule", "class_schedule.class_id", "classes.id")
      .where({ "users.id": [Number(user_id)] })
      .select([
        "users.id",
        "users.name",
        "users.avatar",
        "users.whatsapp",
        "users.bio",
        "classes.subject",
        "classes.cost",
        "class_schedule.week_day",
        "class_schedule.from",
        "class_schedule.to",
      ]);

    res.json(users);
  }

  async create(req: Request, res: Response) {
    const { name, avatar, whatsapp, bio, subject, cost, schedule } = req.body;
    //gerar uma transação
    const trx = await db.transaction();

    try {
      const insertedUsersIDs = await trx("users").insert({
        name,
        avatar,
        whatsapp,
        bio,
      });
      const user_id = insertedUsersIDs[0];

      const insertedClassesIDs = await trx("classes").insert({
        subject,
        cost,
        user_id,
      });
      const class_id = insertedClassesIDs[0];

      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to),
        };
      });

      await trx("class_schedule").insert(classSchedule);

      //commit em todas as tabelas...
      await trx.commit();

      console.log({ name, user_id });

      return res.status(201).json({ name, user_id });
    } catch (err) {
      console.log(err);

      // await trx.rollback;

      return res.status(400).json({
        error: "Unexpected error while creating new class",
      });
    }
  }
}
