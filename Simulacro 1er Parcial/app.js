let selectedUserId = null;
let selectedUserName = null;

const renderBtnUsers = async () => {
    const users = await getUsers();
    
    users.forEach(user => {
        const { name, id } = user;

        const userList = document.getElementById('user-list');
        const listItem = document.createElement('li');
        const btnUsers = document.createElement('button');

        btnUsers.type = 'button';
        btnUsers.textContent = name;
        btnUsers.name = name;
        btnUsers.className = 'btn btn-dark';
        btnUsers.classList.add('btn-users');
        btnUsers.onclick = () => {
            selectedUserId = id;
            selectedUserName = name;
        }

        listItem.appendChild(btnUsers);
        userList.appendChild(listItem);
    });
}

const renderOptions = () => {
    const navTabs = document.getElementById('navTabs');
    const tabs = navTabs.querySelectorAll('.nav-link');

    navTabs.addEventListener('click', (event) => {
        if (event.target.classList.contains('nav-link')) {
            tabs.forEach(tab => tab.classList.remove('active'));
            event.target.classList.add('active');
        }
    });        
}

const handlerUserInfo = async (tabname) => {
    switch(tabname) {
        case 'Todos':
            await showTasks(selectedUserId, selectedUserName );
            break;
        case 'Posts':
            await showPosts(selectedUserId, selectedUserName);
            break;
        case 'Albums':
            await showAlbums(selectedUserId, selectedUserName);
            break;
        default:
            console.log('Tab no reconocida');
    }
}

const showPosts = async (userId, userName) => {
    const posts = await getPosts();
    
    const userPosts = posts.filter((post) => post.userId === userId);
    const containerPosts = document.getElementById('render-posts');
    const title = document.createElement('p');

    title.textContent = `Usuario seleccionado: ${userName}`;
    containerPosts.appendChild(title);
    const postList = document.getElementById('post-list');
    containerPosts.appendChild(postList); 

    userPosts.forEach(post => {
        const listItem = document.createElement('li');
        listItem.className = 'post-item';
        
        const postTitle = document.createElement('button');
        postTitle.textContent = post.title;
        postTitle.className = 'post-title btn btn-link';
        
        const postBody = document.createElement('div');
        postBody.textContent = post.body;
        postBody.className = 'post-body';
        postBody.style.display = 'none';  

        postTitle.addEventListener('click', () => {
            const isHidden = postBody.style.display === 'none';
            postBody.style.display = isHidden ? 'block' : 'none';
        });

        listItem.appendChild(postTitle);
        listItem.appendChild(postBody);
        postList.appendChild(listItem);
    });
}




const showTasks = async (userId) => {
    const todos = await getTodos();

}
 
const showAlbums = async (userId) => {
    const albums = await getAlbums();
    
}

document.addEventListener('DOMContentLoaded', async () => {
    await renderBtnUsers();
    renderOptions();
})