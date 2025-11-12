
console.log("ЗАВДАННЯ 1");


let activities = [
    { 
        id: "id_001", 
        name: "ЦНАП", 
        department: "Департамент адмінпослуг", 
        gov_links_text: "Зв'язок через портал Дія та місцеві реєстри.",
        users_day1: 150,
        users_day2: 180,
        implementation_term: 12 
    },
    { 
        id: "id_002",
        name: "Містобудування та архітектура", 
        department: "Департамент архітектури", 
        gov_links_text: "Зв'язок з ДАБІ.",
        users_day1: 90,
        users_day2: 85,
        implementation_term: 36
    },
    { 
        id: "id_003",
        name: "Комунальна власність", 
        department: "Управління комун. власності", 
        gov_links_text: "Фонд держмайна, Міністерство юстиції.",
        users_day1: 110,
        users_day2: 120,
        implementation_term: 24
    },
    { 
        id: "id_004",
        name: "Цифрова трансформація", 
        department: "IT-відділ", 
        gov_links_text: "Мінцифри.",
        users_day1: 250,
        users_day2: 275,
        implementation_term: 12
    },
    { 
        id: "id_005",
        name: "Фінанси та бюджет", 
        department: "Фінансовий департамент", 
        gov_links_text: "Міністерство фінансів, ДКСУ.",
        users_day1: 75,
        users_day2: 70,
        implementation_term: 6
    },
    { 
        id: "id_006",
        name: "Соціальний захист", 
        department: "Департамент соцполітики", 
        gov_links_text: "Міністерство соціальної політики.",
        users_day1: 220,
        users_day2: 230,
        implementation_term: 24
    },
    { 
        id: "id_007",
        name: "Освіта, культура, спорт", 
        department: "Управління освіти і науки", 
        gov_links_text: "Міністерство освіти і науки.",
        users_day1: 130,
        users_day2: 140,
        implementation_term: 36
    },
    { 
        id: "id_008",
        name: "Інфраструктура та ЖКГ", 
        department: "Департамент ЖКГ", 
        gov_links_text: "Мінінфраструктури.",
        users_day1: 180,
        users_day2: 190,
        implementation_term: 48
    },
    { 
        id: "id_009",
        name: "Економічний розвиток", 
        department: "Департамент економіки", 
        gov_links_text: "Мінекономіки.",
        users_day1: 160,
        users_day2: 155,
        implementation_term: 24
    },
    { 
        id: "id_010",
        name: "Екологія та енергоефективність", 
        department: "Управління екології", 
        gov_links_text: "Міністерство захисту довкілля.",
        users_day1: 80,
        users_day2: 95,
        implementation_term: 48
    }
];


console.log("\n Впорядкування та середні значення");


let sortedActivities = [...activities].sort((a, b) => a.implementation_term - b.implementation_term);

console.log("Впорядковані напрями (за терміном реалізації):");
console.table(sortedActivities.map(a => ({ 
    Назва: a.name, 
    Термін_міс: a.implementation_term 
})));


function getAverageUsersByTerm(data) {
    const groups = {}; 
    
    
    for (let i = 0; i < data.length; i++) {
        const activity = data[i];
        const term = activity.implementation_term;
        
        if (!groups[term]) { // Якщо групи для такого терміну ще немає
            groups[term] = []; 
        }
        groups[term].push(activity);
    }

    const averages = {};
    
    for (const term in groups) {
        const group = groups[term]; 
        let totalUsersSum = 0;
        
        for (let j = 0; j < group.length; j++) {
            const item = group[j];
            const avgForOneItem = (item.users_day1 + item.users_day2) / 2;
            totalUsersSum += avgForOneItem;
        }
        
        const averageForGroup = totalUsersSum / group.length;
        
        averages[term] = {
            кількість_напрямів: group.length,
            середня_кількість_користувачів: Math.round(averageForGroup)
        };
    }
    return averages;
}

const termAverages = getAverageUsersByTerm(sortedActivities);
console.log("Середня кількість користувачів за терміном реалізації (у місяцях):");
console.dir(termAverages);


console.log("\n Напрям з макс. кількістю користувачів (доба 1)");

let maxUsersDay1 = 0;
let activityWithMaxUsers = null;

for (let i = 0; i < activities.length; i++) {
    if (activities[i].users_day1 > maxUsersDay1) {
        maxUsersDay1 = activities[i].users_day1;
        activityWithMaxUsers = activities[i];
    }
}

console.log(`Максимальна кількість користувачів за добу 1: ${maxUsersDay1}`);
console.log(`Відділ, що його реалізує: ${activityWithMaxUsers.department}`);


console.log("\n Додавання нового напряму");

function addActivity(activitiesList, newActivity) {
    
    let hasMissingInfo = false;
    for (const key in newActivity) {
        if (newActivity[key] === null || newActivity[key] === undefined || newActivity[key] === "") {
            hasMissingInfo = true;
            break; 
        }
    }
    
    let newList = [...activitiesList]; 

    if (hasMissingInfo) {
        newList.push(newActivity);
        console.log(`Додано новий напрям (ID: ${newActivity.name}) в КІНЕЦЬ списку (не вся інфо).`);
    } else {
        newList.unshift(newActivity);
        console.log(`Додано новий напрям (ID: ${newActivity.name}) на ПОЧАТОК списку (вся інфо).`);
    }
    return newList;
}

const fullActivity = { 
    id: "id_011", name: "Новий повний напрям", department: "Новий відділ", 
    gov_links_text: "Всі зв'язки", users_day1: 100, users_day2: 100, implementation_term: 6
};
let activities_v2 = addActivity(activities, fullActivity);

const partialActivity = { 
    id: "id_012", name: "Новий неповний напрям", department: null, // <-- Відсутня інфо
    gov_links_text: "Всі зв'язки", users_day1: 50, users_day2: 50, implementation_term: 3
};
let activities_v3 = addActivity(activities_v2, partialActivity);
console.log(`Загальна кількість напрямів: ${activities_v3.length}`);

console.log("\n Розрахунок тривалості проєкту");

function calculateTotalDuration(selectedActivities) {
    switch (selectedActivities.length) {
        case 0:
            return 0;
        case 1:
            return selectedActivities[0].implementation_term;
        default:
            let totalDuration = selectedActivities[0].implementation_term;
            
            for (let i = 1; i < selectedActivities.length; i++) {
                totalDuration += (selectedActivities[i].implementation_term * 1.1);
            }
            return totalDuration;
    }
}

const project1 = [activities[0]];
const project2 = [activities[0], activities[4], activities[1]]; 
console.log(`Тривалість проєкту 1 (1 напрям): ${calculateTotalDuration(project1)} міс.`);
console.log(`Тривалість проєкту 2 (3 напрями): ${calculateTotalDuration(project2)} міс.`);


// ==========================================================================
// OOP (Функція-конструктор замість Class)

console.log("\n ЗАВДАННЯ 2");

function UserFeedback(lastName, firstName, age, education, feedbackPurpose, requestDateTimeString) {
    this.lastName = String(lastName);
    this.firstName = String(firstName);
    this.age = Number(age);
    this.education = String(education);
    this.feedbackPurpose = String(feedbackPurpose);
    
    this._requestDate = new Date(requestDateTimeString);

    this.getFullName = function() {
        return `${this.lastName} ${this.firstName}`;
    }
    this.getRequestMonth = function() {
        return this._requestDate.getMonth();
    }
    this.getRequestTime = function() {
        return this._requestDate.toTimeString().split(' ')[0];
    }
    this.getRequestHour = function() {
        return this._requestDate.getHours();
    }
}

const users = [
    new UserFeedback("Петренко", "Іван", 35, "вища повна", "пропозиція", "2025-10-15T10:30:00"),
    new UserFeedback("Сидоренко", "Марія", 22, "вища неповна", "співпраця", "2025-10-20T14:15:00"),
    new UserFeedback("Ковальчук", "Олег", 45, "професійна", "скарга", "2025-11-01T09:05:00"),
    new UserFeedback("Іванова", "Анна", 28, "вища повна", "помилка", "2025-11-02T16:45:00"),
    new UserFeedback("Мельник", "Сергій", 52, "середня повна", "пропозиція", "2025-11-03T18:30:00"),
    new UserFeedback("Шевченко", "Оксана", 19, "середня неповна", "співпраця", "2025-10-15T10:30:00"), 
    new UserFeedback("Бондаренко", "Віталій", 60, "вища повна", "скарга", "2025-11-05T11:00:00"),
    new UserFeedback("Ткаченко", "Юлія", 31, "професійна", "пропозиція", "2025-11-06T15:20:00"),
    new UserFeedback("Захаренко", "Павло", 18, "без освіти", "помилка", "2025-11-07T22:10:00"),
    new UserFeedback("Григоренко", "Надія", 40, "вища повна", "співпраця", "2025-11-08T08:59:00")
];

console.log("Створено 10 користувачів:");
console.dir(users);


console.log("\n Фільтр за місяцем та часом");

function filterUsersByMonthAndTime(userList, month, timeString) {
    const filteredList = []; 
    
    for (let i = 0; i < userList.length; i++) {
        const user = userList[i];
        if (user.getRequestMonth() === month && user.getRequestTime() === timeString) {
            filteredList.push(user);
        }
    }
    return filteredList;
}

const filteredUsers = filterUsersByMonthAndTime(users, 9, "10:30:00"); 
console.log("Користувачі, що звернулись 15.10 о 10:30:00:");
console.dir(filteredUsers.map(u => u.getFullName())); // Використовуємо метод


console.log("\n Мінімальний вік та освіта");

let minAgeUser = users[0]; 

for (let i = 1; i < users.length; i++) {
    if (users[i].age < minAgeUser.age) {
        minAgeUser = users[i];
    }
}

console.log(`Мінімальний вік: ${minAgeUser.age} (Користувач: ${minAgeUser.getFullName()})`);
console.log(`Освіта: ${minAgeUser.education}`);


console.log("\n Класифікація користувачів");

let classHigherWorkTime = 0;
let classNoEdNonWorkTime = 0;
let classOthers = 0;

const WORK_START_HOUR = 9;
const WORK_END_HOUR = 17; 


for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const hour = user.getRequestHour();
    
    const isWorkingTime = (hour >= WORK_START_HOUR && hour < WORK_END_HOUR);
    const isHigherEd = user.education.includes("вища");
    const isNoEd = user.education === "без освіти";

    if (isHigherEd && isWorkingTime) {
        classHigherWorkTime++;
    } else if (isNoEd && !isWorkingTime) {
        classNoEdNonWorkTime++;
    } else {
        classOthers++;
    }
}

console.log(`Клас "З вищою освітою у робочий час": ${classHigherWorkTime}`);
console.log(`Клас "Без освіти у неробочий час": ${classNoEdNonWorkTime}`);
console.log(`Клас "Інші": ${classOthers}`);


console.log("\n Сортування та вивід мети");

const sortedUsers = [...users].sort((a, b) => {
    const lastNameA = a.lastName.toLowerCase();
    const lastNameB = b.lastName.toLowerCase();
    if (lastNameA < lastNameB) return -1;
    if (lastNameA > lastNameB) return 1;
    
    const firstNameA = a.firstName.toLowerCase();
    const firstNameB = b.firstName.toLowerCase();
    if (firstNameA < firstNameB) return -1;
    if (firstNameA > firstNameB) return 1;
    
    return 0;
});

console.log("Відсортований список користувачів та їх мета:");
let i = 0;
if (sortedUsers.length > 0) {
    do {
        const user = sortedUsers[i];
        console.log(`[${user.getFullName()}]: ${user.feedbackPurpose}`); 
        i++;
    } while (i < sortedUsers.length);
}

console.log("\n КІНЕЦЬ РОБОТИ");