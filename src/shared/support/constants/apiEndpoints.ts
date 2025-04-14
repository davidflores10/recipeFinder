const searchRecipe = "search.php";

function factory() {
  return {
    get searchRecipe() {
      return `${searchRecipe}`;
    },
  };
}

export default factory();
