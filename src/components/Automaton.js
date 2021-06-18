export const Cellular = (worldState, rows, cols) => {

    let rand_i = Math.floor(Math.random() * rows)
    let rand_j = Math.floor(Math.random() * cols)
    console.log(rand_i, rand_j);
    worldState[rand_i][rand_j].state = !worldState[rand_i][rand_j].state;
    return worldState;

}