socket.emit("userConnected",username)

    socket.on("join",function(userObj){
        let joinDiv=document.createElement('div')
        joinDiv.classList.add('chat')
        joinDiv.classList.add('join')
        chatWindow.append(joinDiv)
        console.log(userObj.user)
        joinDiv.textContent=userObj.user+" has joined the chat"
        
        addToOnlineList(userObj);

        })

    socket.on("userLeft",function(leftUser){
        if(leftUser.user!=null){
            let leftDiv=document.createElement('div')
            leftDiv.classList.add('chat')
            leftDiv.classList.add('leave')
            chatWindow.append(leftDiv);
            leftDiv.textContent=leftUser.user+" has left the chat"
        }

        deletefromOnlineList(leftUser.id);
    })
    
    socket.on('chat',function(chatObj){
        let chatBod=document.createElement('div')
        chatBod.classList.add('chat')
        chatBod.classList.add('left')
        chatWindow.append(chatBod)
        chatBod.textContent=chatObj.username+" : "+chatObj.chat

    })

    socket.on('userJoin',function(userList){

            for(let i=0;i<userList.length;i++){
                if(userList[i].id!=socket.id){
                    let person =document.createElement('div');
                    person.setAttribute('id',userList[i].id);
                    person.classList.add('user')
                    onlineList.append(person);
                    person.innerHTML=`<img class="profile" src="https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"></img>
                    <div class="tex">${userList[i].user}</div>`
                }
            }
   
    });


    function addToOnlineList(userObj){
              let newNode=document.createElement('div');
              newNode.setAttribute("id",userObj.id)
              newNode.classList.add('user')
              onlineList.append(newNode);
              
              newNode.innerHTML=`<img class="profile" src="https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"></img>
              <div class="tex">${userObj.user}</div>`

    }


function deletefromOnlineList(id){
    
    document.querySelector(`#${id}`).remove();
}

