const search = document.getElementById('search');
const result = document.getElementById('result');
let userList = [];
let filterList = [];

function getUsers(element) {
  fetch('https://randomuser.me/api/?gender=female&results=30')
    .then(response => response.json())
    .then(data => {
      userList = data.results;
      const el = createUserList(userList);
      element.appendChild(el);
  });
}

function createUserList(users) {
  result.className = 'userlist';
  const renderedUserList = result;

  for (let i = 0; i < users.length; i++) {
    const userDiv = document.createElement('div');
    userDiv.className = "user";
    userDiv.appendChild(createUserNameHeader(users[i]));
    userDiv.appendChild(createUserImage(users[i]));
    renderedUserList.appendChild(userDiv);
  }

  return renderedUserList;  
}

function createUserNameHeader(user) {
  const userHeading = document.createElement('h2');
  userHeading.textContent = `${user.name.title} ${user.name.first} ${user.name.last}`
  return userHeading;
}

function createUserImage(user) {
  const userImage = document.createElement('img');
  userImage.src = `${user.picture.thumbnail}`;
  return userImage;
} 

document.addEventListener('DOMContentLoaded', () => {
  const mainElement = document.querySelector('#result');
  getUsers(mainElement);
});

var filterUsers = function(event){
  keyword = search.value.toLowerCase();
  const filtered_users = userList.filter(user => {
    const name = user.name.title + ' ' + user.name.first + ' ' + user.name.last;
    return name.toLowerCase().indexOf(keyword) > -1;
  });

  const old = document.querySelector('.userlist');
  old.innerHTML = "";
  createUserList(filtered_users);
}

search.addEventListener('input', filterUsers);