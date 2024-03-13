const express = require('express')
const router = express.Router()

const {addMovie, addReview, deleteMovie, deleteReview, getMovie, getReview} = require("../controllers/add")

router.route('/addmovie').post(addMovie)
router.route('/addreview').post(addReview)
router.route('/deletemovie/:movieName').delete(deleteMovie)
router.route('/deletereview/:id').delete(deleteReview)
router.route('/getmovie').get(getMovie)
router.route('/getreview/:movieName').post(getReview)

module.exports = router  