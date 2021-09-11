const express = require("express");
const mongoose = require("mongoose");
const Task = require("./models/task")


mongoose.connect("mongodb://localhost/teste", {useNewUrlParser:true, useUnifiedTopology: true})
const db = mongoose.connection
db.on("error", console.error.bind(console, "MongoDB deu erro"))

const app = express();
const port = 5000;
//const rotaFuncionarios = require("./rotas/funcionarios")

//app.use(rotaFuncionarios)
//app.set("view engine", "ejs");


app.get("/create", async (req, res) => {
      const task = await Task.create({ name: "comprar arroz" })

      res.json({ task})
    //res.send("Testando banco de dados mongoose")
    //res.render("index", {text: "Dizolele Pedro"}) 
})

app.get("/read", async (req, res) => {
    const task = await Task.find({})

    res.json({ task })
})  

app.get("/read/:id", async (req, res) => {
    const task = await Task.findById(req.params.id)

    res.json({ task })
})

app.get("/update/:id", async (req, res) => {
    const task = await Task.findById(req.params.id)
    
    task.name = "fazer exercicio"
    task.status = true

    await task.save()

    res.send({ task })
})

app.get("/delete/:id", async (req, res) => {
    await Task.deleteOne({ _id: req.params.id }, () => {
        console.log("Deleted from mongo!")
    })

    res.send("Deleted")
})




app.listen(port, () => {
    console.log(`Rodando o servidor express no localhost porta ${port}`)
});