/**
 * Given an employee, will find the node above (if any).
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode}
 */

interface Employee {
  value: string;
  descendant: Array<Employee>;
}

function getBoss(boss: Employee) {
  //returns node above
}

/**
 * Given an employee, will find the nodes directly below (if any).
 * Notice how it returns possibly several subordinates.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode[]}
 */
function getSubordinates() {

}

/**
 * EXTRA CREDIT:
 * Finds and returns the lowest-ranking employee and the tree node's depth index.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode}
 */
function findLowestEmployee() {

}