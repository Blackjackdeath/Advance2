class Human {
    constructor(name, weight, year) {
        this.name = name;
        this.weight = weight;
        this.year = year;
    };
    walk() {
        console.log(`${this.name} is walk`);
    };
    speak() {
        console.log(`${this.name} is speak`);
    };
    eat() {
        console.log(`${this.name} is eat`);
    };
};

class Man extends Human {
    _gender = 'male';
    get gender() {
        return this._gender;
    }
    constructor(name, weight, year) {
        super(name, weight, year);
    };
};

class Woman extends Human {
    _gender = 'female';
    get gender() {
        return this._gender;
    }
    constructor(name, weight, year) {
        super(name, weight, year);
    };
};

class Librarian extends Woman {
    constructor(name, weight, year, degree, object) {
        super(name, weight, year);
        this.degree = degree;
        this.object = object;
    };
    study() {
        console.log(`${this.name} study ${this.object}`);
    };
};

class Nurse extends Woman {
    constructor(name, weight, year, specialization) {
        super(name, weight, year);
        this.specialization = specialization;
    }
    medicine() {
        console.log(`${this.name} medicine ${this.specialization}`);
    }
};

class Hunter extends Man {
    constructor(name, weight, year, experience) {
        super(name, weight, year);
        this.experience = experience;
    };
};

class Workers extends Man {
    constructor(name, weight, year, specialization) {
        super(name, weight, year);
        this.specialization = specialization;
    }
    work() {
        console.log(`${this.name} work in aviary ${this.specialization}`);
    }
};

class Animal {
    constructor(nickname, weight, skin, liberty) {
        this.name = nickname;
        this.weight = weight;
        this.skin = skin;
        this.liberty = liberty
    };
    walk() {
        console.log(`${this.name} is walk`);
    };
    eat() {
        console.log(`${this.name} is eat`);
    };
};

class Herbivorous extends Animal {
    _herbivorous = true;
    get herbivorous() {
        return this._herbivorous;
    }
    constructor(nickname, weight, skin, liberty) {
        super(nickname, weight, skin, liberty);
    };
};

class Predator extends Animal {
    _herbivorous = false;
    get herbivorous() {
        return this._herbivorous;
    }
    constructor(nickname, weight, skin, liberty) {
        super(nickname, weight, skin, liberty);
    };
};

class Deer extends Herbivorous {
    _kind = 'deer';
    get kind() {
        return this._kind;
    }
    constructor(nickname, weight, skin, liberty) {
        super(nickname, weight, skin, liberty);
    };
};

class Boar extends Herbivorous {
    _kind = 'boar';
    get kind() {
        return this._kind;
    }
    constructor(nickname, weight, skin, liberty) {
        super(nickname, weight, skin, liberty);
    };
};

class Tiger extends Predator {
    _kind = 'tiger';
    get kind() {
        return this._kind;
    }
    constructor(nickname, weight, skin, liberty) {
        super(nickname, weight, skin, liberty);
    };
};

class Wolf extends Predator {
    _kind = 'wolf';
    get kind() {
        return this._kind;
    }
    constructor(nickname, weight, skin, liberty) {
        super(nickname, weight, skin, liberty);
    };
};

class WorkerFactory {
    static list = {
        lib: Librarian,
        nur: Nurse,
        hunt: Hunter,
        work: Workers
    }
    create(work) {
        const workerType = WorkerFactory.list[work] || WorkerFactory.list.work;
        const worker = new workerType();
        if (work === 'lib' || work === 'nur') {
            worker.name = womanNameArr[Math.floor(Math.random() * 5)];
            if (work === 'lib') {
                worker.degree = degree[Math.floor(Math.random() * 4)]
            }
            else {
                worker.specialization = specializationArr[Math.floor(Math.random() * 4)];
            }
        }
        if (work === 'hunt' || work === 'work') {
            worker.name = manNameArr[Math.floor(Math.random() * 5)];
            if (work === 'hunt') {
                worker.experience = experienceArr[Math.floor(Math.random() * 5)]
            }
            else {
                worker.specialization = specializationArr[Math.floor(Math.random() * 4)];
            }
        }
        worker.weight = Math.floor(Math.random() * 100) + 30;
        worker.year = Math.floor(Math.random() * 50) + 18;
        return worker;
    }
};

class AnimalFactory {
    static list = {
        deer: Deer,
        boar: Boar,
        tiger: Tiger,
        wolf: Wolf
    }
    create() {
        let type = animalTypeArr[Math.floor(Math.random() * 4)]
        const animalType = AnimalFactory.list[type];
        const animal = new animalType();
        if (Math.random() > .5) {
            animal.liberty = true;
        }
        else {
            animal.liberty = false;
        }
        if (animal.liberty) {
            animal.name = 'none';
        }
        else {
            animal.name = animalNickname[Math.floor(Math.random() * 10)]
        }
        animal.weight = Math.floor(Math.random() * 100) + 50;
        animal.skin = skinColor[Math.floor(Math.random() * 5)];
        return animal;
    }

};

class Zoo {
    kill=false;
    constructor() {
        this.worker = [];
        this.animal = [];
    };
    hiring(search, type) {
        this.worker.push(search.create(type));
    }
    info() {
        console.log(this.worker);
        console.log(this.animal);
    }
    task(search, animal) {
        animal.forEach(element => {
            if (!element.liberty) {
                this.hiring(search, 'lib');
                this.worker[this.worker.length - 1].object = element.kind;
                this.worker[this.worker.length - 1].study();
                this.hiring(search, 'work');
                this.worker[this.worker.length - 1].specialization = element.kind;
                this.worker[this.worker.length - 1].work();
                this.animal.push(element);
            }
            else {
                if (element.herbivorous) {
                    this.hiring(search, 'hunt');
                    while (!this.catch(this.worker[this.worker.length - 1], element)) { };
                    this.hiring(search, 'lib');
                    this.worker[this.worker.length - 1].object = element.kind;
                    this.worker[this.worker.length - 1].study();
                    this.hiring(search, 'work');
                    this.worker[this.worker.length - 1].specialization = element.kind;
                    this.worker[this.worker.length - 1].work();
                    this.hiring(search, 'nur');
                    this.worker[this.worker.length - 1].specialization = element.kind;
                    this.worker[this.worker.length - 1].medicine();
                    element.nickname = animalNickname[Math.floor(Math.random() * 10)];
                    this.animal.push(element);
                }
                else {
                    this.hiring(search, 'hunt');
                    while(!this.hunt(this.worker[this.worker.length - 1], element)){
                       if (this.kill){
                           break;
                       };
                    };
                    if(!this.kill){
                        this.hiring(search, 'lib');
                        this.worker[this.worker.length - 1].object = element.kind;
                        this.worker[this.worker.length - 1].study();
                        this.hiring(search, 'work');
                        this.worker[this.worker.length - 1].specialization = element.kind;
                        this.worker[this.worker.length - 1].work();
                        this.hiring(search, 'nur');
                        this.worker[this.worker.length - 1].specialization = element.kind;
                        this.worker[this.worker.length - 1].medicine();
                        element.nickname = animalNickname[Math.floor(Math.random() * 10)];
                        this.animal.push(element);
                    }
                    else{
                        this.kill=false;
                    }
                }
            }
        });
    }
    catch(hunter, animal) {
        if (Math.random() > 0.5) {
            console.log(`${hunter.name} catch ${animal.kind}`);
            return true;
        }
        else {
            console.log(`${hunter.name} not find ${animal.kind}`);
            return false;
        }
    }
    hunt(hunter, animal) {
        if (Math.random() > 0.8) {
            console.log(`${hunter.name} kill ${animal.kind}`);
            this.kill=true;
            return false;
        }
        if (Math.random() > 0.4) {
            console.log(`${hunter.name} catch  ${animal.kind}`);
            return true;
        }
        else {
            console.log(`${hunter.name} not find ${animal.kind}`);
            return false;
        }
    }
}
let manNameArr = ['Dan', 'Stan', 'Jack', 'Mike', 'Sam'];
let womanNameArr = ['Marie', 'Jane', 'Sali', 'Kate', 'Sasha'];
let degree = ['bachelor', 'master', 'docent', 'doctor'];
let specializationArr = ['Deer', 'Boar', 'Tiger', 'Wolf'];
let experienceArr = ['novice', 'apprentice', 'specialist', 'expert', 'master'];
let workerArr = [];
let animalTypeArr = ['deer', 'boar', 'tiger', 'wolf'];
let animalNickname = ['Jack', 'Suzi', 'Doll', 'Flower', 'Andi', 'Black', 'Sendi', 'Rose', 'Baron', 'Henri'];
let skinColor = ['black', 'red', 'yellow', 'brown', 'grey'];
let animalArr = [];
const factoryW = new WorkerFactory;
const factoryA = new AnimalFactory;
const palagonija = new Zoo;
function initZoo() {
    animalArr.push(factoryA.create());
    animalArr.push(factoryA.create());
    animalArr.push(factoryA.create());
    animalArr.push(factoryA.create());
    animalArr.push(factoryA.create());
    palagonija.task(factoryW, animalArr);
    palagonija.info();
    console.log(animalArr);
};
initZoo();
