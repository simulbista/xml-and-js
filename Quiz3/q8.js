const users = [
    { username: `user1`, email: `user1@email.com` },
    { username: `user2`, email: `user2@email.com` }
    ];
    

    const getUser = (username) => {
        return new Promise((resolve) =>{
            for(let i=0;i<users.length;i++){
                if(username===Object.values(users)[i].username) {
                    resolve(Object.values(users)[i]);
                }
            }
        })
    }

    const getUsers = (userNames) => {
        let finalObj = [];
        userNames.forEach(item => {
            finalObj.push(getUser(item));
        });
        return new Promise((resolve) =>{
            resolve(finalObj);
        })
    }

    const main = async () => {
        const userNames = [`user1`, `user2`];    
        const users = await getUsers(userNames).then((data) =>  {return data});     
        console.log(users);
    };

    main();