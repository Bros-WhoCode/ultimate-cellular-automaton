# The World of Automata [:rocket:](https://bros-whocode.github.io/ultimate-cellular-automaton/ "Bros' Cellular Automaton")
:gear: Made for [Timathon](https://twtcodejam.net/ "Timathon Code Jams") | Theme : Exploration

Simulate a world of tiny tiny cells, where you get to define the rules.  
Your rules may be simple, complex or something god-like, no restrictions for your imagination.  
Start your symphony and let the cells dance to it, make sure it is good.

Rules for creating rules is simple, Explore the world that you created.
> Even Simple Rules Can Bring Out Complex Behaviours  
> &ndash; No one

## Cellular Automaton
It is a collection of colored cells which evolve each time from the previous state defined by a set of predefined rules. These rules are defined based up the neighboring cells in the grid. 

[The Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life "Game of Life Wiki") is one among the popular cellular automatons.  
- Rules of Game of Life
  - Any live cell with two or three live neighbours survives.
  - Any dead cell with three live neighbours becomes a live cell.
  - All other live cells die in the next generation. Similarly, all other dead cells stay dead.

Based of these three very simple rules, complex behaviours evolved.  

More importantly Cellular Automaton also depends on the initial state of the grid. Changing the initial state may result in a completely different behaviour.

## Want to record a Symphony

Click on the rocket. Yaay !!!!

## How To

### World Grid

The Initial State can be set


### Rule / RuleList
![Rule Details](/images/rule-details.png)

The State of the current cell and their neighbors are selected in the 9x9 Grid, by default both the position and the state of the neighbors are matched against each cell in the world grid and then replaced by the state for the next generation.  

There is also a way to match the number of neighbors alive, instead of their positions with some relational operators to enhance the use of the rule.  

![Count Mode](/images/count-mode.png)

After the Count Mode is enabled, only the number of alive neighbors are going to be compared not their realtive position with the current cell. You can chose between the following relations `< | > | <= | >= | =` to compare each cell in the with the rule.

Priority is given to the top most rule if at all there are any clash with two or more rules.
