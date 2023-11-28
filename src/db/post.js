import instance from "./instance";

const tableName = 'posts';

instance.transaction(async (trx) => {
    // await trx.executeSql(`DROP TABLE ${tableName}`, [], () => { console.log('Table dropped') });

    await trx.executeSql(`CREATE TABLE IF NOT EXISTS ${tableName} (
        id INT,
        title VARCHAR(50),
        desc TEXT,
        attachment TEXT,
        attachment_ext VARCHAR(50),
        level VARCHAR(20),
        faculty TEXT,
        dept TEXT
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

export const createPost = async (payload) => {
    return await instance.executeSql(
        `INSERT INTO ${tableName}(id, title, desc, attachment, attachment_ext, level, faculty, dept)VALUES(?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            payload.id,
            payload.title,
            payload.desc,
            payload.attachment,
            payload.attachment_ext,
            payload.level,
            payload.faculty,
            payload.dept
        ]
    )
}

export const deletePost = async (id)=>{
    return await instance.executeSql(
        `DELETE FROM ${tableName} WHERE id=?`,
        [id]
    );
}

export const getAllPosts = async ()=>{
    let result = await instance.executeSql(
        `SELECT * FROM ${tableName} ORDER BY id DESC`,
        []
    );

    let length = result.rows.length;
    let data = [];
    for(let i = 0; i < length; i++){
        data.push(result[0].rows.item(i))
    }

    return data;
}

export const getPostById = async (id)=>{
    try{
        let result = await instance.executeSql(
            `SELECT * FROM ${tableName} WHERE id=?`,
            [id]
        );
        console.log(result);
        return result[0].rows.item(0) || null;
    }catch(error){
        console.log(error);
    }
}

export const getCount = async ()=>{
    let result = await instance.executeSql(
        `SELECT COUNT(*) AS row_count FROM ${tableName}`,
        []
    );

    return result[0].rows.item(0).row_count;
}