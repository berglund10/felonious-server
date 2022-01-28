import PG from 'pg';

const Pool = PG.Pool;

const pool = new Pool({
    user: "postgres",
    password: "cspizza",
    host: "localhost",
    port: 5432,
    database: "felonious"
})

export default pool