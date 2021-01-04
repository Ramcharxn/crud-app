const express = require('express')
const articleRouter = require('./routes/articles')
const mongoose = require('mongoose')
const Article = require('./models/article')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb+srv://crud2:crud2@crud.eybhg.mongodb.net/crud?retryWrites=true&w=majority',{
    useCreateIndex:true,useNewUrlParser:true,useUnifiedTopology:true,
})

app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))

app.get('/',async(req,res) =>{
    const articles =await Article.find().sort({
        createdAt:'desc'
    })
    res.render('articles/index',{articles:articles})
})

app.use('/articles',articleRouter)

const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`listening to port:${port}`)
})

/*app.use(express.static(__dirname));

app.get('/',function(req,res){
    res.render('index');
})
app.listen(port,function(){
    console.log('running')
})

host online----not working*/