//   **********    Dependencies    ******************
// eslint-disable-next-line no-undef
const express = require('express');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');


// **********   PORT declaraion   *******************
const PORT = process.env.PORT || 3001;
const app = express();

// ************   MIDDLEWARE    **********************
//  Let's express recognize incoming request Obj as string or arrays
app.use(express.urlencoded({ extended: true}));
// express.json tells server to recognize incoming data as JSON obj
app.use(express.json());


// ************** API ROUTES    **********************
app.use('./api', apiRoutes);

// ************ Catch all for non-routes    **********
app.use((req, res) => {
  res.status(404)
  .end();
});

// *********** db Errors handling and PORT listening to Start server ********
db.connect(err => {
  if (err) throw err;
  console.log('Database Connected.');

  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
});