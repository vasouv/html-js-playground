class User {
    constructor(id, name, username, email) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
    }
}

// json placeholder url
const placeholderURL = "https://jsonplaceholder.typicode.com";
const usersURL = `${placeholderURL}/users`;

const usersDiv = document.querySelector("#usersDiv");

let fakeUsers = [];
findAllUsers();

// runs after the page loads
window.addEventListener("load", () => {

    console.log(fakeUsers);

    fakeUsers.forEach((user, index) => {

        const userDiv = document.createElement("div");
        userDiv.className = "card";

        const userHeader = document.createElement("header");
        userHeader.className = "card-header";

        const userTitle = document.createElement("p");
        userTitle.className = "card-header-title";
        userTitle.innerText = user.name;

        const userContent = document.createElement("div");
        userContent.className = "card-content";

        const userDivContent = document.createElement("div");
        userDivContent.className = "content";
        userDivContent.innerText = `Email: ${user.email} Username: ${user.username}`;

        userContent.appendChild(userDivContent);

        userHeader.appendChild(userTitle);
        usersDiv.appendChild(userHeader);
        usersDiv.appendChild(userContent);

    });

});

async function findAllUsers() {
    let response = await fetch(usersURL);
    let json = await response.json();
    fakeUsers = json;
}