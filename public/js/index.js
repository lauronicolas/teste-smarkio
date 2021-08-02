function sendComment(){
    event.preventDefault();
    const xhttp = new XMLHttpRequest();
    xhttp.onload = () => {
        getComments();
    }
    xhttp.open("POST", "http://localhost:3000/comment", true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify({
        "comment" : $("#textComment").val()
    }));
}

function getComments(){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = () => {
        $(".listComments").html("");
        JSON.parse(xhttp.response).map((comment) => {
            $(".listComments").append(`
                <li>
                    <p>
                    ${comment.comment}
                    </p>
                    <button class='play' onClick='playAudio("${comment.comment}")'>
                        Ouvir
                    </button>
                </li>
            `)
        })
    }
    xhttp.open("GET", "http://localhost:3000/comment");
    xhttp.send();
}

function playAudio(comment){
    const xhttp = new XMLHttpRequest();
    
    xhttp.responseType = "json"
    xhttp.onload = () => {
        if(xhttp.response.path){
            $("#audio").attr('src', xhttp.response.path)
        }else{
            alert(xhttp.response.message)
        }
    }
    xhttp.open("POST", `http://localhost:3000/comment/play`);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(JSON.stringify({comment}));
}


getComments()