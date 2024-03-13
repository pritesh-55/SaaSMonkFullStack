const MovieModel = require("../database/movieModel")
const ReviewModel = require("../database/reviewModel")

async function addMovie(req,res){    
    try{
        const {movieName,date,avgRating} = req.body
        const movie = new MovieModel({
            movieName :movieName, 
            date : date,                
            avgRating : 0
        })
        await movie.save()
        res.status(201).json("New movie has been added")
    }
    catch(err){
        res.status(500).json(`Movie can not be added due to ${err}`)
    }   
}

async function deleteMovie(req,res){    
    try{
        const movieName = req.params.movieName
        await MovieModel.deleteOne({ movieName: movieName })
        await ReviewModel.deleteMany({ movieName: movieName })
        res.status(201).json("Movie has been deleted")
    }
    catch(err){
        res.status(500).json(`Movie can not be deleted due to ${err}`)
    }   
}

async function getMovie(req,res){    
    try{
        const data = await MovieModel.find({})
        res.status(201).json({data})
    }
    catch(err){
        res.status(404).send(`API data can not be fetched due to ${err}`)
    }   
}

async function addReview(req,res){    
    try{
        const {movieName,userName,rating,comments} = req.body
        const review = new ReviewModel({
            movieName :movieName, 
            userName : userName,                
            rating : rating,
            comments : comments
        })
        await review.save()
        const resultrev = await ReviewModel.aggregate([
            { $match: { movieName: movieName } },
            { $group: { _id: "$movieName", averageRating: { $avg: "$rating" } } }
          ])
        await MovieModel.findOneAndUpdate(
           { movieName: movieName },
           { $set: { avgRating: Number(resultrev[0].averageRating.toFixed(1)) } },
           { new: true } 
        )
        res.status(201).json("Thank You for your Review")
    }
    catch(err){
        res.status(500).json(`Cannot send your review due to ${err}`)
    }   
}

async function deleteReview(req,res){    
    try{
        const id = req.params.id
        await ReviewModel.findByIdAndDelete(id)
        res.status(201).json("Review has been deleted")
    }
    catch(err){
        res.status(500).json(`Cannot delete your review due to ${err}`)
    }   
}

async function getReview(req,res){    
    try{
        const movieName = req.params.movieName
        const data = await ReviewModel.find({ movieName: movieName })
        if(data) res.status(201).json({data})
        else res.status(201).send("There are no reviews available for this movie")
    }
    catch(err){
        res.status(404).send(`API data can not be fetched due to ${err}`)
    }  
}

module.exports = {addMovie,addReview,deleteMovie,deleteReview,getMovie,getReview}