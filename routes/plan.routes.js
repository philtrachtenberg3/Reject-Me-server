const router = require('express').Router();
const Idea = require('../models/Idea.model')
const Challenge = require('../models/Challenge.model')
const Plan = require("../models/Plan.model")
const User = require("../models/User.model")
const Questionnaire = require("../models/Questionnaire.model")
const {isAuthenticated} = require("../middleware/jwt.middleware")
/* const fileUploader = require("../config/cloudinary.config"); */

router.post('/create-my-plan', isAuthenticated, async (req, res, next) => {
    try {
        let ideas = await Idea.find();

        let challengeArray = [];
        for (let i = 0; i <= 29; i++) {
            
            // bring in random idea
            /* let randomIdea = ideas[Math.floor(Math.random() * ideas.length)] || "no idea found"
            ideas.pop(randomIdea)
            console.log(ideas.length) */

            // bring in ideas in order
            let challenge = await Challenge.create({title: ideas[i].idea, day: i+1})
            challengeArray[i] = challenge._id
        }

        
        const plan = await Plan.create({challenges: challengeArray})
        const user = await User.findByIdAndUpdate(req.payload._id, {$push: {plans: plan._id}})
        
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

router.get('/create-my-plan/questionnaire', (req, res, next) => {
    Questionnaire.find()
    .then((questionnaire) => res.status(200).json(questionnaire))
})

router.post('/create-my-plan/questionnaire/:planId', async (req, res, next) => {
    try {
        const {tellAboutYourself, startDate, category, reward} = req.body;
        const {planId} = req.params;
    
        let createQuestionnaire = await Questionnaire.create({tellAboutYourself, startDate, category, reward});
        await Plan.findByIdAndUpdate(planId, {questionnaire: createQuestionnaire._id})
        res.status(200).json(createQuestionnaire)
        
    } catch (error) {
        
    }
    

})

router.get('/my-plans', isAuthenticated, (req, res, next) => {
    User.findById(req.payload._id)
    .populate('plans')
    .then((user) => res.status(200).json(user.plans))
    .catch((err) => res.json(err))
})


router.get('/my-plans/:planId', (req, res, next) => {
    const {planId} = req.params;
    Plan.findById(planId)
    .populate('challenges')
    .then((myPlan) => res.status(200).json(myPlan))
    .catch((err) => res.json(err))
})


router.get('/my-plans/:planId/:challengeId', (req, res, next) => {
    const {planId, challengeId} = req.params;
    const {title, day, date, video, journalEntry, comments, isCompleted, wasRejected} = req.body;

    Challenge.findById(challengeId)
    .then((challenge) => res.status(200).json(challenge))
    .catch((err) => console.log(err))


})

router.put('/my-plans/:planId/:challengeId/', (req, res, next) => {
    const {planId, challengeId} = req.params;
    const {title, day, date, video, journalEntry, comments, isCompleted, wasRejected} = req.body;

    
    Challenge.findByIdAndUpdate(challengeId, {title, day, date, video, journalEntry, comments, isCompleted, wasRejected})
    .then((updatedChallenge) => res.status(200).json(updatedChallenge))
})

router.put('/my-plans/:planId/:challengeId/edit', (req, res, next) => {
    const {planId, challengeId} = req.params;
    const {title, day, date, video, journalEntry, comments, isCompleted, wasRejected} = req.body;

    
    Challenge.findByIdAndUpdate(challengeId, {title, day, date, video, journalEntry, comments, isCompleted, wasRejected})
    .then((updatedChallenge) => res.status(200).json(updatedChallenge))
})

router.delete('/my-plans/:planId/delete', (req, res, next) => {
    const {planId} = req.params;

    Plan.findByIdAndDelete(planId)
    .then((plan) => res.status(200).json(plan))
    .catch((err) => console.log(err))
})






module.exports = router;