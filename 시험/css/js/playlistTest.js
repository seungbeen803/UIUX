// 페이지 로딩 후 실행될 수 있도록 onload에 함수 지정
window.onload = init;

function init() {
  // 곡 추가버튼
  let addbutton = document.getElementById("addButton");
  addbutton.onclick = handleAddButtonClick;

  // 곡 삭제버튼
  let deleteButton = document.getElementById("deleteButton");
  deleteButton.onclick = function(e) {
    removeAll();
  }
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
  let songName = document.getElementById("songTestInput").ariaValueMax;

  if(songName == "") {
    alert("곡을 입력하세요.");
  } else {
    // localStorage에 넣기
    let playlistArray = getStoreArray("palylist");
    playlistArray.push(songName);
    localStorage.setItem("playlist", JSON.stringify(playlistArray));

    // 배열형태로 넘겨주기
    addSortList([songName]);
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

function getStoreArray(key) {
  let playlistArray = localStorage.getItem(key);
  if(playlistArray == null || playlistArray == "") {
    playlistArray = new Array();
  }else{
    playlistArray = JSON.parse(playlistArray);
  }
  return playlistArray;
}

localStorage.setItem("key1", value);
localStorage.getItem("key1");