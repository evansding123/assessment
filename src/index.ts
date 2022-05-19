// Main code goes here

import employees from './employees.json';
import { generateCompanyStructure, hireEmployee, fireEmployee, promoteEmployee, demoteEmployee } from './manageEmployees';
import { getBoss, getSubordinates, findLowestEmployee } from './getEmployees';
import logger from './logger';


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


function main() {

    let array : Array<jsonEmployee> = employees.employees;
    let root: jsonEmployee = generateCompanyStructure(array);
    hireEmployee(root, test, test.boss);

    getBoss(root, 'Billy');
    getSubordinates(root, 'Alicia');
    fireEmployee(root, 'Xavier')
    promoteEmployee(root, 'Billy', 'promote');
    demoteEmployee(root, 'Alicia', 'Kelly');
    findLowestEmployee(root)

}

main()
