window.addEventListener('load', async () => {
    if (!githubUser) return;

    axios
    .get(`https://api.github.com/users/${githubUser}`)
    .then(function (response) {
        // handle success
        console.log(response);

        const template = document.querySelector('template');
        const clone = template.content.cloneNode(true);

        if (profileImage) {
            clone.querySelector('.profile__portrait').src = `images/${profileImage}`;
        } else {
            clone.querySelector('.profile__portrait').src = `https://robohash.org/${githubUser}`;
        }

        clone.querySelector('.profile__heading').textContent = response.data.name;
        const login = document.createElement('span');
        login.textContent = response.data.login;
        login.classList.add('profile__lead');
        clone.querySelector('.profile__body').insertBefore(login, clone.querySelector('.profile__text'));
        
        clone.querySelector('.profile__body').querySelector('.profile__text').textContent = response.data.bio;

        const listData = {
            organization: response.data.company,
            location: response.data.location,
            email: response.data.email,
            link: response.data.blog
        };

        for (const [key, value] of Object.entries(listData)) {
            if (!value) continue;
            const li = document.createElement('li');
            const icon = document.createElement('img');
            icon.src = `images/${key}.svg`;
            li.classList.add('profile__list-item');
            li.textContent = value;
            li.prepend(icon);
            clone.querySelector('.profile__list').appendChild(li);
        }

        // listData.forEach(item => {
        //     if (!item) return;
        //     const li = document.createElement('li');
        //     li.textContent = item;
        //     clone.querySelector('.profile__list').appendChild(li);
        // });

        const body = document.querySelector('body');
        body.appendChild(clone);
        
        // response.data.blog
        // response.data.email
        // response.data.bio

        // response.data.public_repos

        // reponse.data.url

    })
    .catch(function (error) {
    // handle error
    console.log(error);
    })
    .then(function () {
    // always executed
    });

});