export const COMMENT_QUERIES = {
  GET_ALL_COMMENT_BY_POST_ID: `
    SELECT 
        c.id AS "commentId",
        p.id AS "postId",
        u.id AS "authorId",
        c.content,
        c."createdAt",
        u."firstName",
        u."lastName",
        u."avatar",
        COUNT(c.id) OVER() AS "totalData",
        CEIL(COUNT(c.id) OVER()) / $2 AS "totalPage"
    FROM comments AS c 
    INNER JOIN users as u
    ON c."authorId" = u.id
    INNER JOIN posts AS p
    ON p.id = c."postId"
    WHERE p."id" = $1
    ORDER BY c."createdAt" DESC
    LIMIT $3 OFFSET $4;
  `,
};
