 import dotenv from 'dotenv';
 import mailer from './mailer';
 import reviewNotifierTemplate from './emailTemplates/reviewNotifierTemplate';

 dotenv.config();

 /**
  * @description function for sending notification email when a user's recipe gets a review
  * @function
  *
  * @param   {object} recipesModel     - Recipes model
  * @param   {object} usersModel       - Users model
  * @param   {number} recipeId         - ID of the recipe been reviewed
  * @param   {object} postedReview     - Object content of the review post
  *
  *@returns  {function}                - The nodemailer function that sends mail the user
  */
 const reviewNotifier = (recipesModel, usersModel, recipeId, postedReview) => {
   recipesModel.findOne({ where: { id: recipeId } })
     .then((recipe) => {
       usersModel.findOne({ where: { id: recipe.userId } })
         .then((user) => {
           const mailOptions = {
             from: `"More-Recipes" <${process.env.AUTHORIZED_EMAIL}>`,
             to: user.email,
             subject: `${recipe.title} has a new Review`,
             html: reviewNotifierTemplate(recipe, user.username, postedReview)
           };
           mailer(mailOptions);
         });
     });
 };

 export default reviewNotifier;