// npm i -D html-webpack-plugin html 파일 가져오기
const HtmlPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
// export
module.exports = {
  entry: "./js/main.js",
  output: {
    clean: true,
    // clean: true 을 통해 기존에 만들었던 build를 삭제해주고 다시 결과물을 만들수 있다.
    // output 은 nodejs에서 요구하는 절대경로를 명시해줘야 한다.
  },
  // loader style css
  module: {
    rules: [
      {
        // scss , css 파일 모두 매치(.s?css$)
        test: /\.s?css$/,
        use: [
          "style-loader",
          "css-loader",
          // css-loader 는 자바스크립트에서 css파일을 해석하는 용도로 실제로 html 부분에 사용한다.
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.js$/,
        use: ["babel-loader"],
      },
    ],
  },

  plugins: [
    new HtmlPlugin({
      template: "./index.html",
    }),
    new CopyPlugin({
      patterns: [{ from: "static" }],
    }),
  ],
  devServer: {
    host: "localhost",
  },
};
