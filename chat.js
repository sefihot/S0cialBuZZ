const firebaseConfig = {
    apiKey: "AIzaSyD9CVN9tEdpxdMRLOKe0VRN4HfNtq-7RHM",
    authDomain: "kwitter1-ab28e.firebaseapp.com",
    databaseURL: "https://kwitter1-ab28e-default-rtdb.firebaseio.com",
    projectId: "kwitter1-ab28e",
    storageBucket: "kwitter1-ab28e.appspot.com",
    messagingSenderId: "238332878503",
    appId: "1:238332878503:web:66a16153aae03e984e8582"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const nomeUsuario = localStorage.getItem("nomeUsuario");
  const nomeSala = localStorage.getItem("nomeSala");

  inicializar();

  function inicializar() {
    document.getElementById("nomeSala").textContent = '#'  + nomeSala;

    getData();
  }
  function getData(){
    const output = document.getElementById("output");
    firebase.database()
        snapshot.forEach(childSnapshot => {
            const childKey = childSnapshot.key;
            if(childKey != "purpose") {
                const childMsg = childSnapshot.val();
                const nome = childMsg.nome;
                const msg = childMsg.mensagem;
                const likes = childMsg.likes;


                const chatCard = document.createElement("div");
                chatCard.className = "chatCard";
                const chatNome = document.createElement("h4");
                chatNome.className = "chatNome";
                chatNome.textContent = nome;
                chatCard.appendChild(chatNome);
                const row = document.createElement("div");
                row.className = "row";
                chatCard.appendChild(row);
                const col = document.createElement("div");
                col.className = "col";
                row.appendChild(col);
                const chatMsg = document.createElement("h5");
                chatMsg.className = "chatMsg";
                chatMsg.textContent = msg;
                col.appendChild(chatMsg);
                const colAuto = document.createElement("div");
                colAuto.className = "col-auto";
                row.appendChild(colAuto);
                const botaoLike = document.createElement("button");
                botaoLike.className = "btn btn-info";
                botaoLike.id = childKey;
                botaoLike.value = likes;
                botaoLike.setAttribute("onclick", "likeMsg(this.id)");
                botaoLike.innerHTML = '<i class="fa-regular fa-thumbs-up"></i> ' + likes;
                colAuto.appendChild(botaoLike);
                output.appendChild(chatCard);
            }
        });
    };
function send(){
  const txtMsg = document.getElementById("msg");
  const msg = txtMsg.value;
  if(msg.trim()) {
    firebase.database().ref('/'+ nomeSala).push({
      nomeUsuario,
      mensagem: msg,
      likes: 0
    });
    txtMsg.value = "";

    }
  }
function likeMsg(btnId)
{
  let Likes = Number(document.getElementById(btnId).value);
  Likes++;
  firebase.database().ref('/' + nomeSala).child(btnId).update({likes: Likes})
}
