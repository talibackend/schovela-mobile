import instance from "./instance";

const tableName = 'posts';

instance.transaction(async (trx) => {
    await trx.executeSql(`DROP TABLE ${tableName}`, [], () => { console.log('Table dropped') });

    await trx.executeSql(`CREATE TABLE IF NOT EXISTS ${tableName} (
        id INT,
        title VARCHAR(50),
        desc TEXT,
        attachment TEXT,
        attachment_ext VARCHAR(50)
    );`,
        [],
        (trx, results) => {
            console.log('Table created!');
        },
        (error) => {
            console.log('Error creating table:', error);
        }
    );
});

export const createPost = async (payload, callback) => {
    instance.executeSql(
        `INSERT INTO ${tableName}(id, title, desc, attachment, attachment_ext)VALUES(?, ?, ?, ?, ?)`,
        [
            payload.id,
            payload.title,
            payload.desc,
            payload.attachment,
            payload.attachment_ext
        ],
        (result)=>{ callback(result); },
        (err)=>{ callback(err); }
    )
}