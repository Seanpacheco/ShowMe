const Todo = require('../models/Todo')
const fetch = import("node-fetch");

module.exports = {
    getLists: async (req,res)=>{
        console.log(req.user)
        try{
            const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
            const todaysDate = new Date()
            const dateInput = todaysDate.toLocaleDateString('en-CA', options)
            console.log(dateInput)
            const scheduleFetch = await fetch(`https://api.tvmaze.com/schedule/web?date=${dateInput}&country=US`)
            const schedule = await scheduleFetch.json()
            console.log(schedule)
            const watchListItems = await Todo.find({userId:req.user.id})
            const itemsLeft = await Todo.countDocuments({userId:req.user.id})
            res.render('todos.ejs', {watchList: watchListItems, left: itemsLeft, user: req.user, schedule})
        }catch(err){
            console.log(err)
        }
    },
    // getTodaysSchedule: async (req,res)=>{
    //     console.log(req.user)
    //     try{
    //         const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    //         const todaysDate = new Date()
    //         const dateInput = todaysDate.toLocaleDateString('en-CA', options)
    //         console.log(dateInput)
    //         const scheduleFetch = await fetch(`https://api.tvmaze.com/search/shows?q=${dateInput}&country=US`)
    //         const schedule = await scheduleFetch.json()
    //         console.log(schedule)
    //         res.send(schedule)
    //     }catch(err){
    //         console.log(err)
    //     }
    // },
    searchShows: async(req,res)=>{
        console.log(req.user)
        try{
            const name = req.body.name
            console.log(name)
            const searchResult = await fetch(`https://api.tvmaze.com/search/shows?q=${name}`)
            const data = await searchResult.json()
            console.log(data)
            res.render('results.ejs',{data})
        } catch(error){
            console.error(error)
        }
    },
    addToWatchList: async(req,res)=>{
        console.log(req.user)
        try{
            await Todo.create({tvShowName: req.body.showName,tvShowId: req.body.showId, userId: req.user.id,showImg: req.body.showPic, showSum: req.body.showSummary, watched: false})
            // stops the browser from constantly loading.
            res.status(204).send()
        } catch(error){
            console.error(error)
        }
    },
    createTodo: async (req, res)=>{
        try{
            await Todo.create({todo: req.body.todoItem, completed: false, userId: req.user.id})
            console.log('Todo has been added!')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                watched: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                watched: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteShow: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    