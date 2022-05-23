const app = require('./src/server');
const { db } = require('./src/db');
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  db.sync({ force: true }).then(() => {
    console.log('Modelos sincronizados');
  });
});