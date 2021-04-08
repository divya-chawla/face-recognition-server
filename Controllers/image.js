const Clarifai = require('clarifai');

//API Key to access Clarifai - ec5efd9965b94c758b67c9f60a0e9e7a
const app = new Clarifai.App({
    apiKey: CLARIFAI_API
});

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data)
        })
        .catch(err =>  res.status(400).json("Unable to work with API"))
}

const handleImage = (req, res, db) => {
    const {id} = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            if(entries.length > 0){
                res.json(entries[0])
            }
            else{
                res.status(400).json("User not found!")
            }
        })    
}

module.exports = {
    handleImage : handleImage,
    handleApiCall: handleApiCall
}
