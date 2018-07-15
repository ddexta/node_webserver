const express=require('express')
const hbs=require('hbs')
const app=express()
const fs=require('fs')

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine','hbs')


app.use((req,res,next)=>{
    let now=new Date().toString()
    let log=`${now}: ${req.method} ${req.url}`
    console.log(log)
    fs.appendFileSync('server.log',log + '\n')

    next()
})
// app.use((req,res,next)=>{
//     res.render('maintenance.hbs')
// })

app.use(express.static(__dirname+'/public'))


hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase()
})

app.get('/',(req,res)=>{
    // res.send('<h1>Hello Express!</h1>')
    res.render('home.hbs',{
        welcomeMessage:'welcome to this page',
        pageTitle:'Home Page',
    })
})
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About Page',
    })
})
// app.get('/bad',(req,res)=>{
//     res.send({
//         error:'Error handling request'
//     })
// })

app.listen(3000)