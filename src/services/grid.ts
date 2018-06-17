export class GridService{

    setGrid(){
        var grid = [];
        for (var i = 0; i < 10; i++) {
          grid[i] = [];
          for (var j = grid[i].length; j < 10; j++) {
            grid[i].push({
              value: i * 10 + j,
              color: "",
              help: "",
            });
          }
        }
        return grid;
      }

      setSteps() {
        var steps = [];
        for (var i = 0; i < 20; i++) {
          steps.push("");
        }
        return steps;
      }
}