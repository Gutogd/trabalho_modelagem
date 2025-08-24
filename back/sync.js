const db = require('./db/Conn')

async function sinc(){
    try {
       await db.sync({force: true})
        console.log('deu')
    } catch (err) {
        console.error('erro')
    }
    finally{
        db.close()
    }
}

sinc()