import { rootCertificates } from 'tls';
import employees from './employees.json';


class TreeNode {

    name: string;
    jobTitle: string;
    boss: string;
    salary: string;
    descendant?: Array<jsonEmployee>

    constructor(name: string, jobTitle: string, boss:string, salary: string, descendant: Array<Object>) {
        this.name = name
        this.descendant = []
    }
}



/**
 * Normalizes the provided JSON file and generates a tree of employees.
 *
 * @param {Object[]} employees array of employees
 * @returns {TreeNode}
 */


interface jsonEmployee {
    name: string,
    jobTitle: string,
    boss: string,
    salary: string,
    descendant?: Array<jsonEmployee>
}

interface map {
    [index: string]: number
}

export function generateCompanyStructure(data: Array<jsonEmployee>) : jsonEmployee {
    console.log('Normalizing JSON file...');
    console.log('Generating employee tree...');
    const mapping : map = {};
    //want to map the current employees to their indexes for fast retreival when we look to find each employees boss
    for(let i: number = 0; i < data.length; i++) {
        let currName : string = data[i].name;

        if(currName.indexOf('@') !== -1) {
            currName = currName.slice(0, currName.indexOf('@'));
            let nameArray: Array<string> = currName.split('');
            nameArray[0] = nameArray[0].toUpperCase();
            currName = nameArray.join('');
            data[i].name = currName;
        }

        mapping[currName] = i;
    }

    let root: jsonEmployee | null;

    for(let element of data) {
        if(element.boss === null) {
            root = element;
            continue;
        }

        const parent : jsonEmployee = data[mapping[element.boss]];
        //this is mostly correct, but the names and emails are messed up so this doesnt run
        parent.descendant = [...(parent.descendant || []), element];
    }

    //console.log(root);

    return root;

}

/**
 * Adds a new employee to the team and places them under a specified boss.
 *
 * @param {TreeNode} tree
 * @param {Object} newEmployee
 * @param {string} bossName
 * @returns {void}
 */
export function hireEmployee(currentEmployees: jsonEmployee, newEmployee: jsonEmployee, bossName: string) {
    function dfs(tree : jsonEmployee) : jsonEmployee {
        if(tree.name === bossName) {
            if(tree.descendant !== undefined) {
                tree.descendant.push(newEmployee);
            } else {
                tree.descendant = [newEmployee];
            }

            return tree;
        }

        if(tree.descendant !== undefined) {
            for(let i: number = 0; i < tree.descendant.length; i++) {
                dfs(tree.descendant[i])
            }
        }

        return tree;
     }


     dfs(currentEmployees);
     console.log(`[hireEmployee]: Added new employee ${newEmployee.name} with ${bossName} as their boss`)
}

/**
 * Removes an employee from the team by name.
 * If the employee has other employees below them, randomly selects one to take their place.
 *
 * @param {TreeNode} tree
 * @param {string} name employee's name
 * @returns {void}
 */
export function fireEmployee(currentEmployees:jsonEmployee, name: string) {
    let replacement:jsonEmployee;
    function dfs(tree : jsonEmployee, parent: jsonEmployee, index: number) : jsonEmployee {
        if(tree.name === name) {
            if(tree.descendant !== undefined) {
                let rand: number = Math.floor(Math.random() * tree.descendant.length);
                tree.descendant[rand].boss = tree.boss;
                replacement = tree.descendant[rand];
                parent.descendant.push(tree.descendant[rand]);

                parent.descendant.splice(index, 1)

            } else {
                parent.descendant.splice(index, 1)
            }

            return;
        }

        if(tree.descendant !== undefined) {
            for(let i: number = tree.descendant.length - 1; i >= 0; i--) {

                dfs(tree.descendant[i], tree, i)
            }
        }

        return tree;
     }


     dfs(currentEmployees, currentEmployees, 0);
     console.log(`[fireEmployee]: Fired ${name} and replaced with ${replacement.name}`)
}

/**
 * Promotes an employee one level above their current ranking.
 * The promoted employee and their boss should swap places in the hierarchy.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {void}
 */
export function promoteEmployee(currentEmployees: jsonEmployee, name: string, type:string) {
    let bossName:string;
    function dfs(tree : jsonEmployee, parent: jsonEmployee, index: number) : jsonEmployee {
        if(tree.name === name) {
            bossName = parent.name;
            let temp: string | null = parent.boss;
            parent.boss = tree.name;
            tree.boss = temp;

            parent.descendant.splice(index, 1);
            if(tree.descendant !== undefined) {
                tree.descendant.push({...parent});
            } else {
                tree.descendant = [];
                tree.descendant.push({...parent});
            }
            // i was pushing a reference here, which was why it was circular

            parent.name = tree.name;
            parent.jobTitle = tree.jobTitle;
            parent.salary = tree.salary;
            parent.boss = tree.boss;
            parent.descendant = tree.descendant;

            return;
        }

        if(tree.descendant !== undefined) {
            for(let i: number = tree.descendant.length - 1; i >= 0; i--) {

                dfs(tree.descendant[i], tree, i)
            }
        }

    }

    dfs(currentEmployees, currentEmployees, 0);
    if(type === 'promote') {
        console.log(`[promoteEmployee]: Promoted ${name} and made ${bossName} the subordinate`)
    }


}

/**
 * Demotes an employee one level below their current ranking.
 * Picks a subordinat and swaps places in the hierarchy.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName the employee getting demoted
 * @param {string} subordinateName the new boss
 * @returns {void}
 */
export function demoteEmployee(currentEmployees:jsonEmployee, employeeName: string, subordinate: string) {

    promoteEmployee(currentEmployees, subordinate, 'demote');

    console.log(`[demoteEmployee]: Demoted employee (demoted ${employeeName} and replaced with ${subordinate})`)


}




