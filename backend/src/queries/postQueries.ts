export const POST_QUERIES = {
  GET_ALL_POST: `
        SELECT 
          p.id AS "postId",
          p.content,
          p."createdAt",
          u.id AS "authorId",
          u."firstName",
          u."lastName",
          u.avatar,
          COUNT(p.id) OVER() AS total_data, 
          CEIL(COUNT(p.id) OVER() / $1)  AS total_page
        FROM posts p 
        INNER JOIN users u 
        ON p."authorId" = u."id"
        ORDER BY p."createdAt" DESC
        LIMIT $2 OFFSET $3;
    `,
};

/*

 "id": "068a9729-8bb9-45db-863a-172b35bc80c6",
        "authorId": "068a9729-8bb9-45db-863a-172b35bc80c6",
        "content": "This is my second post!",
        "createdAt": "2026-07-24T03:17:56.196Z",
        "updatedAt": "2026-07-24T03:17:56.196Z",
        "deletedAt": null,
        "firstName": "Novpa",
        "lastName": "Rodriguez",
        "gender": "MALE",
        "email": "agungnovpa@gmail.com",
        "avatar": null,
*/
