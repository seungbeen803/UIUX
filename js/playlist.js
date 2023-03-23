// 페이지 로딩 후 실행될 수 있도록 onload에 함수지정
window.onload = init;
function init() {
  //곡 추가버튼
  let button = document.getElementById("addButton");
  button.onclick = handleAddButtonClick;

  // 곡 삭제버튼
  let button2 = document.getElementById("deleteButton");
  button2.onclick = function (e) {
    removeAll();
  };
  // 저장되어있는 곡 불러오는 함수
  loadPlaylist();
}

// 곡 삭제
function removeAll() {
  if(confirm("모두 지울까요?")) {
    localStorage.clear();
    let ul = document.getElementById("playlist");
    ul.innerHTML = "";
  }
}

// localStorage에 곡 추가
function handleAddButtonClick(e) {
  let songName = document.getElementById("songTextInput").value;
  
  if(songName == "") {
    alert("곡을 입력하세요.");
  }else{
    // localStorage에 넣기
    let playlistArray = getStoreArray("playlist");
    playlistArray.push(songName);
    localStorage.setItem("playlist", JSON.stringify(playlistArray));
    
    // 배열형태로 넘겨주기
    addSongList([songName]);

  }
  alert("songName : " + songName);
}

function loadPlaylist() {
  let playlistArray = getStoreArray("playlist");
  
  addSongList(playlistArray);

}

function addSongList(songList) {
  let ul = document.getElementById("playlist");
  for(let i = 0; i < songList.length; i++) {
    let li = document.createElement("li");
    li.innerHTML = songList[i];
    ul.appendChild(li);
  }
}

// return 값은 항상 배열로 나오게 해주기
function getStoreArray(key) {
  let playlistArray = localStorage.getItem(key);
  if(playlistArray == null || playlistArray == "") {
    // playlistArray의 값이 null이거나 ""이면 배열 타입이므로
    // 빈 배열로 만들어줌
    playlistArray = new Array();
  }else{
    // 현재 데이터 값이 string이므로 객체화 시켜줌
    // 배열 형태로 저장하기 위함
    playlistArray = JSON.parse(playlistArray);
  }
  return playlistArray;
}

// f12 => Application
// key값 value
// .setItem (key, value) : key값과 value형태로 localstorage안에 저장
// 쉽게 생각하면 key = value : localstorage안의 key라는 변수에 값을 저장한다고 생각하면 됨

// .getItem(key) : 해당 key값에 저장된 value를 가져옴
localStorage.setItem("key1", "value");
localStorage.getItem("key1");

// setItem으로 넣어줌
// playlist = JSON.stringify(playlistArray)