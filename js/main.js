import postcss from "postcss";
import "../scss/main.scss";
import swiper from "./swiper";

// movies : 영화 Search 데이터들만 뽑아낸다 배열로
let Search;
let page = 1;
let movies = [];
let searchButton = document.querySelector(".search-btn");
let moreButton = document.querySelector(".more-btn");

// api부르는 함수 movies에 영화정보들이 저장되어 있다.
const getMovie = async () => {
  try {
    let url = new URL(
      `https://www.omdbapi.com?apikey=7035c60c&s=frozen&page=1`
    );

    let response = await fetch(url);
    let data = await response.json();
    if (!response.status.ok) {
      movies = data.Search;
      render();
    } else {
      throw new Error(data.Error);
    }
    // console.log("dat??", data);
    // console.log(movies);
  } catch (error) {
    alert(data.Error);
  }
};

moreButton.addEventListener("click", async () => {
  page += 1;
  let url = new URL(
    `https://www.omdbapi.com?apikey=7035c60c&s=${Search}&page=${page}`
  );
  console.log("url", url);
  let response = await fetch(url);
  let data = await response.json();
  console.log(movies);
  // data.Search 전개연산자 이용!!

  movies.push(...data.Search);
  console.log("move???", data.Search);
  render();
});

async function getSearch() {
  Search = document.getElementById("search-input").value;
  console.log("Searc!h!", Search);
  let url = new URL(
    `https://www.omdbapi.com?apikey=7035c60c&s=${Search}&page=${page}`
  );
  let response = await fetch(url);
  let data = await response.json();
  movies = data.Search;
  render();
}

// render에서 영화정보(movies)를 불러준다
const render = () => {
  let moviesHTML = "";
  console.log("movies???", movies[0]);
  console.log("movies!!?", movies[movies.length - 1]);
  moviesHTML = movies
    .map((item) => {
      return `
    <div class="movies">
    <img
      src="${item.Poster === "N/A" ? "./images/images.png" : item.Poster}"
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

searchButton.addEventListener("click", getSearch);

getMovie();
getSearch();
