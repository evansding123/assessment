/**
 * Given an employee, will find the node above (if any).
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode}
 */

import { count } from "console";


interface jsonEmployee {
  name: string,
  jobTitle: string,
  boss: string,
  salary: string,
  descendant?: Array<jsonEmployee>
}

export function getBoss(currentEmployees: jsonEmployee, employeeName: string) : jsonEmployee {
  //returns node above
  let result : jsonEmployee;
  function dfs(tree : jsonEmployee, parent: jsonEmployee) : jsonEmployee {
    if(tree.name === employeeName) {
      result = parent;
      return;
    } else if(tree == undefined) {
      return;
    }

    if(tree.descendant !== undefined) {
        for(let i: number = 0; i < tree.descendant.length; i++) {
            dfs(tree.descendant[i], tree)
        }
    }

    return result;
 }


 dfs(currentEmployees, currentEmployees);
 console.log(`[getBoss]: ${employeeName}'s boss is ${result.name}`);
 return result;
}

/**
 * Given an employee, will find the nodes directly below (if any).
 * Notice how it returns possibly several subordinates.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode[]}
 */
export function getSubordinates(currentEmployees:jsonEmployee, name:string) {

  let result :Array<jsonEmployee>;
  let resultString :string = '';
  function dfs(tree : jsonEmployee) : Array<jsonEmployee> {
    if(tree.name === name) {
      result = [...tree.descendant];
      return;
    } else if(tree == undefined) {
      return;
    }

    if(tree.descendant !== undefined) {
        for(let i: number = 0; i < tree.descendant.length; i++) {
            dfs(tree.descendant[i])
        }
    }

    return result;

 }

 dfs(currentEmployees);
 for(let employees of result) {
   resultString += `${employees.name} `;
 }

 console.log(`[getSubordinate]: ${name}'s employees are ${resultString}`)
 return result;
}

/**
 * EXTRA CREDIT:
 * Finds and returns the lowest-ranking employee and the tree node's depth index.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode}
 */
export function findLowestEmployee(currentEmployees:jsonEmployee): Array<number | jsonEmployee> {

  let max:number = -99999;
  let lowestEmployee:jsonEmployee;

  function dfs(tree:jsonEmployee, level:number) {

    if(level > max) {
      max = level;
      lowestEmployee = {...tree};
    }
    if(tree.descendant === undefined) {
      return;
    }

    if(tree.descendant !== undefined) {
        for(let i: number = 0; i < tree.descendant.length; i++) {
            dfs(tree.descendant[i], level + 1)
        }
    }



 }

 dfs(currentEmployees, 0);
 console.log(`[findLowestEmployee]: The lowest level is ${max} and the lowest level employee is ${lowestEmployee.name}. But only for now...`)
 return [max, lowestEmployee];

}