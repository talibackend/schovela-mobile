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

export const createPost = (payload, callback, errorCallback) => {
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
        (err)=>{ errorCallback(err); }
    )
}

export const deletePost = (id, callback, errorCallback)=>{
    instance.executeSql(
        `DELETE FROM ${tableName} WHERE id=?`,
        [id],
        (result)=>{ callback(result) },
        (err)=>{ errorCallback(err) }
    );
}

export const getAllPosts = (callback, errorCallback)=>{
    instance.executeSql(
        `SELECT * FROM ${tableName} ORDER BY id DESC`,
        [],
        (result)=>{ 
            let length = result.rows.length;
            let data = [];
            for(let i = 0; i < length; i++){
                data.push(result.rows.item(i))
            }

            callback(data);
         },
        (err)=>{ errorCallback(err) }
    );
}

export const getPostById = (id, callback, errorCallback)=>{
    instance.executeSql(
        `SELECT * FROM ${tableName} WHERE id=?`,
        [id],
        (result)=>{ callback(result.rows.item(0) || null); },
        (err)=>{ errorCallback(err) }
    );
}

export const getCount = (callback, errorCallback)=>{
    instance.executeSql(
        `SELECT COUNT(*) AS row_count FROM ${tableName}`,
        [],
        (result)=>{ callback(result.rows.item(0).row_count); },
        (err)=>{ errorCallback(err); }
    );
}