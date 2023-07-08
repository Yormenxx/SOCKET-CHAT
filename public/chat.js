const socket = io()



const $name = document.getElementById("Name"),
    $message = document.getElementById("Message"),
    $send = document.getElementById("send"),
    $output = document.querySelector(".output"),
    $userIdName = document.getElementById("username"),
    $joinUser = document.getElementById("joinUser"),
    $chat = document.querySelector(".chat"),
    $exitChat = document.querySelector(".exit"),
    $typing = document.querySelector(".typing"),
    $containerSection = document.querySelector(".container--section")


socket.on("Users",(usr)=>{

    let nodeDiv = document.createElement("div")

    nodeDiv.setAttribute("class","update")

    nodeDiv.innerHTML =`${usr} ha ingresado al chat`

    $output.appendChild(nodeDiv)
})

    
socket.on("exitUsers",(usrLeave)=>{

    let nodeDiv = document.createElement("div")

    nodeDiv.setAttribute("class","updateExit")

    nodeDiv.innerHTML =`${usrLeave} se ha ido del chat`

    $output.appendChild(nodeDiv)
})

let userName ;

$joinUser.addEventListener("click",(e)=>{

    e.preventDefault();

    

    if($userIdName.length== 0){

        return;

    }else{

        userName = $userIdName.value;

        socket.emit("Users",userName);

        $chat.querySelector(".container-join-section").classList.add("active")
        $chat.querySelector(".container--section").classList.remove("active")
    }



});


$send.addEventListener("click",(e)=>{

     e.preventDefault();

    let messageUser = $message.value

    if(messageUser.length == 0){

        return;

    }else{
        


        let msg = {
            userName:$userIdName.value,
            messageUser: $message.value
        }

        renderMessage("my",msg)

        

        scroll()

        socket.emit("messages",msg)

        $message.value = " "

        console.log(msg);
    }

    



});


socket.on('messages',(msg)=>{


    console.log(msg);

    renderMessage("other",msg);

    scroll();
   
})

function scroll() {
    $output.scrollTop = $output.scrollHeight
}

function renderMessage(type,message){

    if(type == "my"){

        const dateMesagge = new Date().toLocaleTimeString()

        let nodeDiv = document.createElement("div")

        let className = type
        
        $typing.innerHTML=""

        nodeDiv.setAttribute("class",className)

        nodeDiv.innerHTML +=`

                        <div class="container-info-my">
                            <div class="name">Tú<span> ${dateMesagge} </span> </div>
                            <div class="text">${message.messageUser}</div>
                        </div>

        `

        
        
        $output.appendChild(nodeDiv)

    }else if(type =="other"){

        const dateMesagge = new Date().toLocaleTimeString()
        
        $typing.innerHTML=""
        
        let nodeDiv = document.createElement("div")

        nodeDiv.setAttribute("class","other")

        nodeDiv.innerHTML =`

                        <div class="container-info-other">
                            <div class="name">${message.userName} <span>${dateMesagge} </span></div>
                            <div class="text">${message.messageUser}</div>
                        </div>

        `

        $output.appendChild(nodeDiv)
     }
     
    //else if(type =="update"){


    //     let nodeDiv = document.createElement("div")

    //     nodeDiv.setAttribute("class","update")

    //     nodeDiv.innerHTML =message

    //     $output.appendChild(nodeDiv)
    // }

}


$exitChat.addEventListener("click",()=>{

    socket.emit("exitUsers",userName);
        

    window.location.href = window.location.href;

})


$message.addEventListener("keypress",()=>{

    socket.emit("typing", userName)

    

})

socket.on("typing",(userName)=>{

    

    $typing.innerHTML=`${userName} esta escribiendo `
   
})




// $send.addEventListener("click",(e)=>{
//     e.preventDefault();

//     if($name.value && $message.value){

//         socket.emit("messages",{
//             $name:$name.value,
//             $message:$message.value
//         })
//         console.log($name.value, $message.value)

//     }else{
//         console.log("no valores ingresados")
//     }

// })

// socket.on("messages",(msg)=>{
//     console.log(msg)
//     $output.innerHTML += `<p>${msg.$name} : ${msg.$message} </p>`
// })


