import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql";

const app = express();
const port = 3000;

// Fichier SQL BDD -> site_mh.sql
const dbConnection = mysql.createConnection({
  host: "",
  user: "",
  password: "",
  database: "",
  multipleStatements: true // pour faire plusieurs requêtes en une
});

app.use(bodyParser.json());
app.use("/", express.static("public"));

// GET
app.get("/api/creatures", (req, res) => {
  res.json(creatures);
});

app.get("/api/monsters", (req, res) => {
  const query = "SELECT * FROM monster";
  dbConnection.query(query, (error, results, fields) => {
    if(error) throw error;
    console.log(results);
    res.json(results);
  });
});

app.get("/api/info", (req, res) => {
  const query = `SELECT * FROM monster;
                 SELECT * FROM game;
                 SELECT * FROM type;
                 SELECT * FROM element;
                 SELECT * FROM ailment;
                 SELECT * FROM weakness;`
  dbConnection.query(query, (error, results, fields) => {
    if(error) throw error;
    console.log(results);
    res.json(results);
  });
});

app.get("/api/monsters/:name", (req, res) => {
  const query = `SELECT * FROM monster
                WHERE m_name = ?;
                
                SELECT game.*, monster_game.* FROM game
                INNER JOIN monster_game ON mg_fk_game_id = g_id
                INNER JOIN monster ON m_id = mg_fk_monster_id
                WHERE m_name = ?;
                
                SELECT type.* FROM type
                INNER JOIN monster ON m_fk_type_id = t_id
                WHERE m_name = ?;
                
                SELECT element.* FROM element
                INNER JOIN monster_element ON me_fk_element_id = e_id
                INNER JOIN monster ON m_id = me_fk_monster_id
                WHERE m_name = ?;
                
                SELECT ailment.* FROM ailment
                INNER JOIN monster_ailment ON ma_fk_ailment_id = a_id
                INNER JOIN monster ON m_id = ma_fk_monster_id
                WHERE m_name = ?;
                
                SELECT weakness.* FROM weakness
                INNER JOIN monster_weakness ON mw_fk_weakness_id = w_id
                INNER JOIN monster ON m_id = mw_fk_monster_id
                WHERE m_name = ?;`;
  const value = [
    req.params.name,
    req.params.name,
    req.params.name,
    req.params.name,
    req.params.name,
    req.params.name
  ];
  dbConnection.query(query, value, (error, results, fields) => {
    if(error) throw error;
    // else if (!results[0].length)
    //   res.sendStatus(404);
    console.log(results);
    res.json(results);
  });
});

app.get("/api/games", (req, res) => {
  const query = "SELECT * FROM game";
  dbConnection.query(query, (error, results, fields) => {
    if(error) throw error;
    // console.log(results);
    res.json(results);
  });
});

app.get("/api/games/:name", (req, res) => {
  const query = `SELECT monster.* FROM game
                 INNER JOIN monster_game ON mg_fk_game_id = g_id
                 INNER JOIN monster on m_id = mg_fk_monster_id
                 WHERE g_name = ?`;
  const value = [req.params.name];
  dbConnection.query(query, value, (error, results, fields) => {
    if (error) throw error;
    // console.log(results);
    res.json(results);
  });
});

// POST
app.post("/api/login", (req, res) => {
  const query = `SELECT * FROM user
                 WHERE u_login = ?
                 AND u_password = MD5(?)`
  const value = [req.body.username, req.body.password]
  dbConnection.query(query, value, (error, results, fields) => {
    if (error)
      throw error;
    else if (!results.length)
      res.sendStatus(400);
    if (results.length)
      res.sendStatus(200);
      console.log(results);
  });
});

app.post("/api/addmonster", (req, res) => {
  const checkMonsterQuery = `SELECT * FROM monster WHERE ?`;
  const checkMonsterValue = [req.body.name];
  dbConnection.query(checkMonsterQuery, checkMonsterValue, (checkError, checkResults, checkFields) => {
    console.log(checkResults);
    // if (checkResults)
    //   console.log(checkResults)
    if (checkResults.length == 0){
      const query = `INSERT INTO monster (m_name, m_is_large) VALUES (?, ?)`;
      const value = [req.body.name, req.body.size, req.body.type];
      dbConnection.query(query, value, (error, results, fields) => {
        if (error) throw error;
        // console.log(results);
        res.sendStatus(200);
      });
    }
    else {
      res.sendStatus(409);
    }
  });
});

// DELETE
app.delete("/api/delete/monster/:id", (req, res) => {
  const query = `DELETE FROM monster WHERE m_id = ?`;
  const value = [ req.params.id ];
  dbConnection.query(query, value, (error, results, fields) => {
    if (error) throw error;
    console.log(results);
    res.sendStatus(200);
  });
});


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
