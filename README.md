# Reject Me

<br>

## Description

This is a website for people to track their progress on a 30 day rejection challenge. The goal is to get rejected every day for 30 days and document your progress... all the while overcoming a fear of rejection and failure!

## User Stories

-  **404:** As a user I get to see a 404 page with a feedback message if I try to reach a page that does not exist so that I know it's my fault.
-  **Signup:** As an anonymous user I can sign up on the platform so that I can start creating my 30 day plan and view others' progress.
-  **Login:** As a user I can login to the platform so that I can access my plan, track my progress, and view inspiration
-  **Logout:** As a logged in user I can logout from the platform so no one else can use it.
-  **Create Plan**: As a logged in user I can click to create my 30 day plan so that I can see my pre-set list of activities and edit a daily plan.
-  **Questionnaire**: As a logged in user, after I click to create my plan, I want to answer a few questions about myself so that I get a more personalized 30 day plan.
-  **Edit Daily Plan**: As a logged in user, I can edit the pre-set plan for any given day so that I can perform a different task than the one assigned.
-  **Track Progress**: As a logged in user with a plan created, I can track my progress by uploading a video and documenting my experience so that I can hold myself honest to my plan & move on to the next day's task.
-  **View Ideas**: As a user I can view a list of rejection ideas so that I can use them as inspiration for my own plan.
-  **View Others Plans**: As a user I can view the plans of other users so that I can gain inspiration for myself and encourage their journey.





# Client / Frontend

## React Router Routes (React App)

| Path                         | Component            | Permissions                | Behavior                                                  |
| ---------------------------- | -------------------- | -------------------------- | --------------------------------------------------------- |
| `/login`                     | LoginPage            | anon only `<AnonRoute>`    | Login form, navigates to home page after login.           |
| `/signup`                    | SignupPage           | anon only  `<AnonRoute>`   | Signup form, navigates to home page after signup.         |
| `/`                          | HomePage             | public `<Route>`           | Home page.                                                |
| `/create-my-plan`              | CreatePlan          | user only `<PrivateRoute>` | Page to create user's 30 day plan (follows the questionnaire)             |
| `/create-my-plan/questionnaire`              | CreatePlan          | user only `<PrivateRoute>` | Initial questionnaire to determine a user's pre-set 30 day plan.             |
| `/create-my-plan/edit/:id`         | CreatePlanDetails      | user only `<PrivateRoute>` | Edit a day's plan while setting up your plan.  
| `/create-my-plan/ideas`         | CreatePlanIdeas      | user only `<PrivateRoute>` | A list of ideas users can select from to replace a pre-set item.                                    |
| `/my-plan`           | MyPlan | user only `<PrivateRoute>` | Once my plan has been created, view of all tasks in my 30 day challenge.                               |
| `/my-plan/:id`               | MyPlanDetails   | user only `<PrivateRoute>` | A view of your task for a given day, with title, video, and journal experience.                                         |
| `/my-plan/edit/:id`               | MyPlanDetails   | user only `<PrivateRoute>` | Ability to edit the details for a given day's plan.                                         |
| `/my-plan/:id/comment/:commentId` | Comment | user only `<PrivateRoute>` | Ability to comment on a user's daily activity. |                                 |
| `/view-ideas`    | ViewIdeas         | user only `<PrivateRoute>` | A page to view a list of rejection ideas, grouped by difficulty level.                                 |
| `/all-rejection-plans`    | ViewAllRejectionPlans         | user only `<PrivateRoute>` | A page to show all other people's plans in the system.                                 |
| `/all-rejection-plans/:userId`    | ViewSingleRejectionPlan         | user only `<PrivateRoute>` | A page to show one person's 30 day plan.                                 |
| `/all-rejection-plans/:userId/:planId`    | ViewSingleRejectionPlanDay         | user only `<PrivateRoute>` | A page to show a single day view for somebody else's 30 day plan.                                 |




## Components

Pages:

- LoginPage

- SignupPage

- HomePage

- CreatePlanDetails

- CreatePlanIdeas

- MyPlan

- MyPlanDetails

- Comment

- ViewIdeas

- ViewAllRejectionPlans
- ViewSingleRejectionPlan
- ViewSingleRejectionPlanDay

  

Components:

- Navbar
- DayCard (on the "my plan" page)
- EditDayCard (on the "my plan" page)
- ViewPlanCard (on the "view all rejections" page)






# Server / Backend


## Models

**User model**

```javascript
{
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  challenges: [{ type: Schema.Types.ObjectId, ref:'Challenge' }],
  comments: [{type: Schema.Types.ObjectId, ref: 'Comments'}],
  questionnaire: [{type: Schema.Types.ObjectId, ref: 'Questionnaire'}]
}
```

**Questionnaire model**

```javascript
 {
   username: {type: Schema.Types.ObjectId, ref: 'User'},
   challengeId: {type: Schema.Types.ObjectId, ref: 'Challenge'},
   tellAboutYourself: {type: String, required: true},
   startDate: {type: Date, required: true},
   category: {type: String, enum: ['Social Rejection','Failure','Pushing outside your comfort zone']},
   reward: {type: String, required: true}
 }
```

**Challenge model**

```javascript
 {
   title: { type: String, required: true },
   day: {type: Number, required: true},
   date: {type: Date, required: true},
   video: {type: String},
   journalEntry: {type: String},
   comments: {type: []},
   isCompleted: {type: boolean},
   wasRejected: {type: boolean}
 }
```
**Ideas model**

```javascript
 {
   idea: { type: String, required: true },
   difficultyLevel: {type: String, enum: ['anxiety-inducing','stressful af', 'mt everest of rejection'], required: true},
   category: {type: String, enum: ['Social Rejection','Failure','Pushing outside your comfort zone']}
 }
```

**Comments model**

```javascript
 {
   username: { type: String, required: true },
   comment: {type: String, required: true},
   timestamp: {type: DateTime, required: true}
 }
```




<br>


## API Endpoints (backend routes)

| HTTP Method | URL                    | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | ---------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/profile    `    | Saved session                | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | `/auth/signup`         | {name, email, password}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`          | {username, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/logout`         |                              | 204            | 400          | Logs out the user                                            |
| GET         | `/create-my-plan`     |                              |                | 400          | Bring the page with all 30 day cards (following questionnaire)                                         |
| GET         | `/create-my-plan/questionnaire` |                              |                |              | Bring the questionnaire page                                     |
| POST        | `/create-my-plan/questionnaire`     | { questionnaireCategory }       | 201            | 400          | Submit the questionnaire and return a plan                             |
| GET         | `/create-my-plan/edit/:id` |        | 200            | 400          | show form to edit a daily plan                                              |
| PUT         | `/create-my-plan/edit/:id` |        | 200            | 400          | edit a daily plan while creating plan                                              |
| GET      | `/my-plan` |                              | 201            | 400          | page to display your 30 day plan (once finalized)                                            |
| GET      | `/my-plan/:id` |                              | 201            | 400          | display one day of plan                                            |
| PUT      | `/my-plan/:id` |                              | 201            | 400          | edit details on one day of plan                                            |
| POST      | `/my-plan/:id/comment/:commentId` |                              | 201            | 400          | submit a comment
| PUT      | `/my-plan/:id/comment/:commentId` |                              | 201            | 400          | edit a comment
| DELETE      | `/my-plan/:id/comment/:commentId` |                              | 201            | 400          | delete a comment
| GET      | `/view-ideas` |                              | 201            | 400          | view list of all rejection ideas                                            |
| GET      | `/all-rejection-plans` |                              | 201            | 400          | view list of other people's rejection plans                                            |
| GET      | `/all-rejection-plans/:userId` |                              | 201            | 400          | view one person's rejection plan                                            |
| GET      | `/all-rejection-plans/:userId/:planId` |                              | 201            | 400          | view one day of one person's rejection plan                                            |
| GET      | `/all-rejection-plans/:id/comment/:commentId` |                              | 201            | 400          | ability to comment on a user's activity                                            |
| POST      | `/all-rejection-plans/:id/comment/:commentId` |                              | 201            | 400          | submit a comment
| PUT      | `/all-rejection-plans/:id/comment/:commentId` |                              | 201            | 400          | edit a comment
| DELETE      | `/all-rejection-plans/:id/comment/:commentId` |                              | 201            | 400          | delete a comment


<br>

## API's

 - https://zenquotes.io/api/random
 - Ideas DB

<br>

## Packages

- Cloudinary

<br>


## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/PBqtkUFX/curasan) or a picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/screeeen/project-client)

[Server repository Link](https://github.com/screeeen/project-server)

[Deployed App Link](http://heroku.com)

### Slides

[Slides Link](http://slides.com) - The url to your *public* presentation slides

### Contributors

FirstName LastName - <github-username> - <linkedin-profile-link>

FirstName LastName - <github-username> - <linkedin-profile-link>