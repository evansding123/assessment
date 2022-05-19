1. Install yarn, node and typescript with npm install. Run index.js with 'yarn start' command.

2. Went for recursion and DFS as opposed to iterative. Recursion is more familiar to most, and in this case, it would be faster
because I saw that I would have to implement findLowestEmployee, and DFS is better for that because the lowest employee would be the deepest in the tree.

I also decided to implement a functional based approach, and imported all the functions into the index file to call them there. I tried to make the index.js file look as simple as possible.

3. If I had more time I would probably name my types and interfaces better, and utilize a more object-oriented approach instead.

4. The time complexity, worst case scenario, is O(v), v being number of nodes.

5. I ended up merging promote employees and demote employees. The explanation for them was basically the same - it looked like one of the parameters for demoteEmployee included the person being promoted as well, so I just included that person in the promote Employee function and changed the console log a bit to listen to the parameters.