import pg from "pg";
const { Pool } = pg;

let pool;
function getPool() {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    pool = new Pool({
      connectionString,
      application_name: "",
      max: 1,
    });
  }
  return pool;
}

// Chats
export async function getChats(user_id) {
  const res = await getPool().query(
    `
  SELECT * FROM chats WHERE user_id = $1
  ORDER BY timestamp DESC
  `,
    [user_id]
  );
  return res.rows;
}

export async function createChat(name, user_id, username) {
  const res = await getPool().query(
    `
  INSERT INTO chats (name, user_id, username)
  VALUES ($1, $2, $3)
  RETURNING *
  `,
    [name, user_id, username]
  );
  return res.rows[0];
}

export async function deleteChat(id) {
  // delelte child table
  const child = await getPool().query(
    `
    DELETE FROM messages
    WHERE chat_id = $1
    RETURNING *
    `,
    [id]
  );
  // delete parent
  const parent = await getPool().query(
    `
  DELETE FROM chats
  WHERE id = $1
  RETURNING *
  `,
    [id]
  );
  return parent.rows[0];
}

export async function editChat(id, name) {
  const res = await getPool().query(
    `
    UPDATE chats SET name = $1
    WHERE id = $2
    RETURNING *
    `,
    [name, id]
  );
  return res.rows[0];
}

// Messages
export async function getMessages(chat_id) {
  const res = await getPool().query(
    `
    SELECT * FROM messages WHERE chat_id = $1
    ORDER BY timestamp
    `,
    [chat_id]
  );
  return res.rows;
}

export async function createMessage(chat_id, user_id, username, content, reply) {
  const res = await getPool().query(
    `
    INSERT INTO messages (chat_id, user_id, username, content, reply)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
    [chat_id, user_id, username, content, reply]
  );
  return res.rows[0];
}

export async function deleteMessage(id) {
  const res = await getPool().query(
    `
    DELETE FROM messages
    WHERE id = $1
    RETURNING *
    `,
    [id]
  );
  return res.rows[0];
}

export async function editMessage(id, content) {
  const res = await getPool().query(
    `
    UPDATE messages SET content = $1
    WHERE id = $2
    RETURNING *
    `,
    [content, id]
  );
  return res.rows[0];
}
