const express = require('express')
const router = express.Router()
const Homepage = require('../models/homepage')

// GET of Homepage data
router.get('/', async(req, res) => {

    try{
        const homepageData = await Homepage.findOne({})
        if(!homepageData){
            return res.status(404).json({message: "Homepage data not found."})
        }
        res.status(200).json(homepageData)
    }catch(error){
        console.log(error)
        res.status(500).json({message: "Server error."})
    }
})

// Create or update homepage data
router.post("/", async(req, res)=> {
    try{
    const homepageData = await Homepage.findOneAndUpdate({}, 
        {$set: req.body},
        {new: true, upsert:true}
    )
    res.json(homepageData)

    }catch(error){
        console.log(error)
        res.status(500).json({message: 'Server error'})
    }
})


module.exports = router;