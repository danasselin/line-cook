var RecipePreview = function(data){
  this.title = data.Title;
  this.stars = data.StarRating;
  this.imageUrl = data.ImageURL;
  this.id = data.RecipeID;
  this.isBookmark = data.IsBookmark;
}

RecipePreview.prototype.filter = function() {
  var noImageLink = "http://redirect.bigoven.com/pics/recipe-no-image.jpg"
  return (this.isBookmark || this.imageUrl == noImageLink)
}

var Ingredient = function(data){
  this.name = data.Name;
  this.quantity = data.Quantity;
  this.unit = data.Unit;
}

var Recipe = function(data){
  this.title = data.Title;
  this.ingredients = [];
  this.instructions = [];
  this.prepTime = data.TotalMinutes;
  this.yieldNumber = data.YieldNumber;
  this.yieldUnit = data.YieldUnit;
  this.stars = data.StarRating;
  this.imageUrl = data.ImageURL;
  this.id = data.RecipeID
}

var Instruction = function(data){
  this.content = data;
}