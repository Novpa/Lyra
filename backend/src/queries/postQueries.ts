export const POST_QUERIES = {
  GET_ALL_POST: `
        SELECT *, COUNT(p.id) OVER() AS totalData, CEIL(COUNT(p.id) OVER() / $1)  AS totalPage
        FROM posts AS p INNER JOIN users AS u 
        ON p."authorId" = u."id"
        ORDER BY p."createdAt" DESC
        LIMIT $2 OFFSET $3;
    `,
};
