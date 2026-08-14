export const CHAT_QUERIES = {
  /*
    GET_ALL_CONTACT_CHAT_HISTORY:
      $1 senderId
      $2 limit
      $3 offset
  */

  GET_ALL_CONTACT_CHAT_HISTORY: `
  SELECT DISTINCT ON 
    (CASE
        WHEN "receiverId" = $1 THEN "senderId"
        ELSE "receiverId"
    END)     
    CASE
      WHEN m."receiverId" = $1 THEN m."senderId"
      ELSE m."receiverId"
    END AS "contactId",
    u."firstName",
    u."lastName",
    u.avatar,
    m.content,
    m."createdAt"
  FROM messages as m
  INNER JOIN users as u
  ON u.id = (CASE
        WHEN m."receiverId" = $1 THEN m."senderId"
        ELSE m."receiverId"
      END)
  WHERE m."receiverId" = $1 OR m."senderId" = $1
  ORDER BY "contactId", m."createdAt" DESC
  LIMIT $2 OFFSET $3;
  `,
};
