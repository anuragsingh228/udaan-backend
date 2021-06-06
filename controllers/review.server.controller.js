const Review = require("../model/review");

exports.justChecking = (req, res) => {
    res.status(200).json({
        message: "Yup Working!"
      });
}


/*****************************  Get All Reviews ****************/

exports.getAllReview = (req, res, next) => {
    Review.find({}, function(err, reviews) {
      if(!err){
        res.status(200).json(reviews);  
      } else{
          console.log(err);
      }
    });
}

/**********************  Add new Review ********************************/

exports.addReview =  (req, res, next) => {
    const { bookName, content } = req.body;
    const createdBy = [req.user._id];
    try {
        const newReview = Review({
            createdBy,
            bookName,
            content,
          });
        console.log(newReview);
          newReview.save((err, review) => {
            if(!err){
              req.id=review._id;
              req.activity= req.user.email + " created the review";
              next();
              //res.status(200).json(review);
            } else {
                console.log(err);
            }
          });
    }catch (err) {
        return res.status(500).json({ errors: [{ msg: "Server Error" }] });
      }
}


/*************** Add activity to the review *******************/

exports.addActivity = (req, res, next) => {
  console.log("Trying to run");
	Review.updateOne({_id: req.id}, { $push: { activity: req.activity } },(err, review) => {
    if(!err){
      res.status(200).json(review);
    } else{
      console.log(err);
    }
  } );
};


/****************** Get all the reviews for a particular User  ************/

