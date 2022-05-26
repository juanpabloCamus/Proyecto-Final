const app = require('./src/server');
const { db } = require('./src/db');
const PORT = 3001;
const { loadDb } = require('./src/db')

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  db.sync({ force: false}).then(() => {
    console.log('Modelos sincronizados');
  })
  .then(async ()=>{await loadDb()})
});
