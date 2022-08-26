const router = require('express').Router();
const Idea = require('../models/Idea.model')
const Challenge = require('../models/Challenge.model')
const Plan = require("../models/Plan.model")

/* router.get('/create-my-plan', (req, res, next) => {
    res.json('create my plan')
    Idea.find()
    .then((response) => {

    })
}) */

router.post('/my-plan', async (_req, res, next) => {
    try {
        let ideas = await Idea.find();

        let challengeArray = [];
        for (let i = 0; i <= 7; i++) {
            /* let randomIdea = ideas[Math.floor(Math.random() * ideas.length)] || "no idea found"
            ideas.pop(randomIdea)
            console.log(ideas.length) */

            let challenge = await Challenge.create({title: ideas[i].idea, day: i +1})
            challengeArray[i] = challenge._id
          
        }

        const plan = await Plan.create({challenges: challengeArray})
        res.status(201).json(plan)
    } catch (error) {
        next(error)
    }
})

/* router.post('/my-plan', (req, res, next) => {

})

router.post('/plan/edit') */






module.exports = router;