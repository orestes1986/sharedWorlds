////////
/// General HELPERS
////////

Template["navbar-plain"].rendered=function(){
  if(!Meteor.user()){
    $('.login-link-text').text("Sign Up/Sign In");
  }else{
    $('#login-buttons-open-change-password').before('<a href="/account" class="account-link button">My Account</a>');
  }
};


// Template["navbar-plain"].rendered=function(){
// // var addExtraHTML = function() {
//   var user = Meteor.user();
//   //check if user is signed in and that desired HTML element does not already exists
//   if (user && $('#idOfDesiredHTMLElement').length===0) {
// 	  console.log("asdasdsa dasdasfasdf asdf");
//     var newHTML = "<a href='#' class='btn btn-default btn-block' id='idOfDesiredHTMLElement'>Edit Account</a>";
// 	console.log(newHTML);
//     //Add desired HTML above the change password button
//     $('#login-buttons-open-change-password').before(newHTML);
//   }
//   this.next();
// };

// Router.onBeforeAction(addExtraHTML); //Injects HTML every time before the page loads