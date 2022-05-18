// Main code goes here

import employees from './employees.json';
import { generateCompanyStructure, hireEmployee, fireEmployee, promoteEmployee } from './manageEmployees';




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

const test: jsonEmployee = {
    "name": "Billy",
    "jobTitle": "Janitor",
    "boss": "Rick",
    "salary": "100000",
    descendant: []
}

function logger(emp: jsonEmployee) {
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

function main() {
    console.log('main')
    let array : Array<jsonEmployee> = employees.employees;
    let root: jsonEmployee = generateCompanyStructure(array);
    hireEmployee(root, test, test.boss);
    //logger(root);
    promoteEmployee(root, 'Alicia');
    //console.log(root);
    logger(root);
    //fireEmployee(root, 'Maria');
    //console.log(root);
    //logger(root);
}

main()
