//this function is for viewing each node in the tree. normal console logs don't show the entire children array

interface jsonEmployee {
  name: string,
  jobTitle: string,
  boss: string,
  salary: string,
  descendant?: Array<jsonEmployee>
}


export default function logger(emp: jsonEmployee) {
  let string: string = '';
  function dfs(tree: jsonEmployee) {
      console.log(tree);
      if(tree.descendant === undefined) {
          return;
      }

      if(tree.descendant !== undefined) {
          for(let i = 0; i < tree.descendant.length; i++) {
              dfs(tree.descendant[i]);
          }
      }

      return tree;
  }

  dfs(emp);
}