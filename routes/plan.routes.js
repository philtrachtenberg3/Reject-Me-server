const router = require('express').Router();
const Idea = require('../models/Idea.model')
const Challenge = require('../models/Challenge.model')
const Plan = require("../models/Plan.model")

router.post('/create-my-plan', async (_req, res, next) => {
    try {
        let ideas = await Idea.find();

        let challengeArray = [];
        for (let i = 0; i <= 29; i++) {
            
            // bring in random idea
            /* let randomIdea = ideas[Math.floor(Math.random() * ideas.length)] || "no idea found"
            ideas.pop(randomIdea)
            console.log(ideas.length) */

            // bring in ideas in order
            let challenge = await Challenge.create({title: ideas[i].idea, day: i +1})
            challengeArray[i] = challenge._id
          
        }

        const plan = await Plan.create({challenges: challengeArray})
        res.status(201).json(plan)
    } catch (error) {
        next(error)
    }
})

router.put('/create-my-plan/edit/:id', (req, res, next) => {
    const {id} = req.params;
    const {title} = req.body;

    Challenge.findByIdAndUpdate(id, {title})
    .then((updatedChallenge) => res.status(200).json(updatedChallenge))
    .catch((err) => res.json(err))
}) 

router.get('/my-plan/:planId', (req, res, next) => {
    const {planId} = req.params;
    Plan.findById(planId)
    .populate('challenges')
    .then((myPlan) => res.status(200).json(myPlan))
    .catch((err) => res.json(err))
})

router.put('/my-plan/:challengeId', (req, res, next) => {
    const {challengeId} = req.params;
    const {title, day, date, video, journalEntry, comments, isCompleted, wasRejected} = req.body;

    
    Challenge.findByIdAndUpdate(challengeId, {title, day, date, video, journalEntry, comments, isCompleted, wasRejected})
    .then((updatedChallenge) => res.status(200).json(updatedChallenge))
})



/* router.post('/my-plan', (req, res, next) => {

})

router.post('/plan/edit') */






module.exports = router;