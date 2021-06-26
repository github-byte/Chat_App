
let input=document.querySelector('.chat-input input');
let chatWindow=document.querySelector('.chat-window');
let onlineList=document.querySelector('.online-list');
let username=prompt("Enter name");

input.addEventListener('keypress',function(e){
            if(e.key=="Enter" && input.value){

                var chatDiv=document.createElement('div');
                chatDiv.classList.add('chat')
                chatDiv.classList.add('right')
                chatWindow.appendChild(chatDiv)
                socket.emit("chatMsg",{username,chat:input.value});
                chatDiv.textContent=username+" : "+input.value;
                input.value="";
            }
         
})



