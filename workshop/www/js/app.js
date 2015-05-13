var serverUrl = "http://10.0.2.210:3000"

// BigOver single recipe call
function BigOvenGetRecipeJson(recipeId) {
  clearBinds();
  $('.content-container').off('click', '#cook-button');

  var currentRecipe;
  var apiKey = "dvx7zJ0x53M8X5U4nOh6CMGpB3d0PEhH";
  var url = "https://api.bigoven.com/recipe/" + recipeId + "?api_key="+apiKey;

  $.ajax({
    type: "GET",
    dataType: 'json',
    cache: false,
    url: url
  }).then(function(data) {
    return renderSingleRecipe(data);
  }).then(function(data) {
    openEarsSetup(data);
  })
}

// BigOven recipe search
function BigOvenRecipeSearchJson(query) {
  $(document).off("receivedHypothesis")
  var apiKey = "dvx7zJ0x53M8X5U4nOh6CMGpB3d0PEhH";
  var titleKeyword = query;
  var url = "https://api.bigoven.com/recipes?pg=1&rpp=25&title_kw="
            + titleKeyword
            + "&api_key="+apiKey;
  $.ajax({
    type: "GET",
    dataType: 'json',
    cache: false,
    url: url
  }).then(function(data) {
    return filterRecipes(data);
  }).then(function(data) {
    return groupRecipes(data);
  }).then(function(data) {
    renderRecipes(data);
  })
}

var clearBinds = function() {
  $(document).off("receivedHypothesis");
  $(document).off("finishedSpeaking");
  $('.content-container').off('click', '.backup-start');
  $('.content-container').off('click', '.backup-next');
  $('.content-container').off('click', '.backup-repeat');
  $('.content-container').off('click', '.backup-off');
};

$.fn.stars = function() {
  return $(this).each(function() {
    $(this).html($('<span />').width(Math.max(0, (Math.min(5, parseFloat($(this).html())))) * 16));
  });
}

$(document).ready(function() {
  renderSplash('#home-page-logged-in', '#home-page-logged-out', '.container')
  $(document).on("deviceready", function() {
    Ears = cordova.plugins.OpenEars;
    Ears.startAudioSession();

    recipeSearchEvent(BigOvenRecipeSearchJson);
    getRecipeEvent(BigOvenGetRecipeJson);

    goBackSearchResultsEvent();
    goBackRecipeEvent();

    goHomeEvent();
    getUserProfileEvent(serverUrl);

    getSignUpFormEvent();
    signOutEvent();
    signUpEvent(serverUrl);
    signInEvent(serverUrl);

    addFavorite(serverUrl);

  });
});