export default async function usersQuery(_, params, { db }) {
  const [users] = await db.execute(`
  SELECT
    BIN_TO_UUID(id) id, email, password
  FROM
    users
  `);

  return users;
}
