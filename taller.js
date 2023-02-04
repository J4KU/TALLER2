const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 5000;
let db;

app.use(express.json());
app.use(cors());

app.get("/api/a", async (req, res) => {
  try {
    const result = await db
      .collection("companies")
      .find({ email_address: { $regex: "@twiter.com" } })
      .limit(15)
      .toArray();
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(200).json({
      ok: false,
      message: error.message,
    });
  }
});

app.get ("/api/b", async (req, res) => {
  try{
    const result = await db
    .collection("companies")
    .find({founded_year: {
      $gte: (2005),
      $lte: (2008),

    }})
    .limit(15)
    .toArray();
    res.status(200).json({
      ok: true,
      data: result
    })
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

app.get("/api/c", async (req, res) => {
  try{
    const result = await db
    .collection("companies")
    .find({
      name: { $regex: "Technorati"}
    })
    .limit(15)
    .toArray();

    res.status(200).json({
      ok: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      ok:false,
      message: error.message,
    });
  }
});

app.get("/api/d", async (req, res) => {
  try{
    const result = await db
    .collection("companies")
    .find({ $and: [{founded_year: 2002}, { category_code: "advertising"}]
      })
      .limit(15)
      .toArray();

      res.status(200).json({
        ok:true,
        data: result,
      });
    } catch (error){
      res.status(400).json({
        ok: false,
        message: error.message,
      });
    }
    });

    app.get("/api/e", async (req, res) => {
      try{
        const result = await db
        .collection("companies")
        .find({
          $or: [
            {category_code: {$regex: "messaging"}},
            {category_code: {$regex: "games-video"}},            
          ],
        })
         .sort({founded_year: 1}) 
          .limit(150)
          .toArray();
          
          res.status(200).json({
            ok: true,
            data: result
          })
      } catch (error){
        res.status(400).json({
          ok: false,
          message: error.message
        })
      }

    });

/* Realizar los siguientes ejercicios usando la base de datos llamada sample_training y colección llamada companies.

A Crear una API que traiga resultados de los correos electrónicos que tengan dominio @twitter.com.
B Crear una API que traiga resultados de las compañías que fueron fundadas entre el año 2005 y 2008.
C Crear una API que traiga todos los resultados de la compañía llamada “Technorati”
D Crear una API que traiga resultados de las compañias que sean de categoría advertising y estén fundadas en el año 2002.
F Crear una API que traiga resultados de forma ascendente por año de fundación  de las compañías que sean de categoría messaging o games_video.
G Crear una API que filtre por parametros URL usando el método GET las compañías cuyo año de fundación sea 2006	.
H Crear una API que filtre por medio del body usando el método POST las compañías cuyo año de fundación sea 2006	.

 */







mongoose
  .connect(
    "mmongodb+srv://ABC1234:ABC1234@cluster0.qvyzed2.mongodb.net/sample_training?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Mongo DB Connected!");
    db = mongoose.connection.db;
  })
  .catch(() => {
    console.log("Connection Failed!");
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
