export const USER_QUERIES = {
  FIND_BY_EMAIL: `
    SELECT * 
    FROM users
    WHERE email = $1 AND "deletedAt" IS NULL
    limit 1;
  `,
};
