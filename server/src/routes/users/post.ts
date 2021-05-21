import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';


interface User {
  id: string;
  email: string;
  password: string;
}

interface UserBody {
  email: string;
  password: string;
}

export default async function postUser(req: Request, res: Response) {
  try {

    const userId: string = uuidv4();

    const user: User = {
      ...body,
      id: userId,
    };

    await ctx.db.execute(`
    INSERT INTO
      users (
        id, 
        email, 
        password
      )
      values(
        UUID_TO_BIN("${user.id}"),
        "${user.email}",
        "${user.password}"
      )
    `);

    await ctx.db.execute(`
    INSERT INTO
      items (
        id, 
        name, 
        userId
      )
      values(
        UUID_TO_BIN("${uuidv4()}"), 
        "new item", 
        UUID_TO_BIN("${user.id}")
      )
    `);

    const [rows] = await ctx.db.execute(`
    SELECT
      user.id, user.email, user.password, item.id, item.name
    FROM
      users user
    INNER JOIN
      items item
    ON
      user.id = item.userId
    WHERE
      user.id=(UUID_TO_BIN("${user.id}"))
    `);

    console.log('r', rows);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}
