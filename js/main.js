import "../scss/main.scss";
import swiper from "./swiper";

// movies : 영화 Search 데이터들만 뽑아낸다 배열로
let movies = [];
let searchButton = document.querySelector(".search-btn");
let moreButton = document.querySelector(".more-btn");

// api부르는 함수 movies에 영화정보들이 저장되어 있다.
const getMovie = async () => {
  let url = new URL(`https://www.omdbapi.com?apikey=7035c60c&s=frozen&page=1`);
  let response = await fetch(url);
  let data = await response.json();
  // console.log("dat??", data);
  movies = data.Search;
  // console.log(movies);
  render();
};

const getSearch = async function () {
  try {
    let Search = document.getElementById("search-input").value;
    let url = new URL(
      `https://www.omdbapi.com?apikey=7035c60c&s=${Search}&page=1`
    );
    let response = await fetch(url);
    let data = await response.json();
    if (response.status !== 401) {
      movies = data.Search;
      render();
    } else {
      throw new Error(data.Error);
    }
  } catch {
    errRender();
  }
};

// const getMore = async () => {
//   let more = document.getElementById("search-input").value;
//   let url = new URL(`https://www.omdbapi.com?apikey=7035c60c&s=${more}&page=1`);
//   let response = await fetch(url);
//   let data = await response.json();
//   movies = data.Search;
//   render();
// };

// render에서 영화정보(movies)를 불러준다
const render = () => {
  let moviesHTML = "";
  moviesHTML = movies
    .map((item) => {
      return `
    <div class="movies">
    <img
      src="${
        item.Poster ||
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
      }"
    />
    <div class="movies-info">
      <h3>${item.Title}</h3>
      <span>${item.Year}</span>
    </div>
  </div>`;
    })
    .join("");
  document.getElementById("movies-board").innerHTML = moviesHTML;
};

// 에러 구문...  왜안될까..
// const errRender = () => {
//   let errorHTML = `<div>${검색결과없음}</div>`;
//   document.getElementById("movies-board").innerHTML = errorHTML;
// };

searchButton.addEventListener("click", getSearch);
// moreButton.addEventListener("click", getMore);
getMovie();
getSearch();
// getMore();
