# jstarted.com

JavaScript/HTML/CSSのノウハウや覚書を掲載するブログ。

http://www.jstarted.com/

## npm install

```
npm i --save-dev browser-sync browserify gulp gulp-ruby-sass gulp-sequence require-dir vinyl-source-stream watchify 
npm i --save sass-mediaqueries normalize.css
```

## mediaqueries set

基準値は以下を参照している。

1. iPhone6 Plus Portrait
2. iPad Portrait
3. iPad Landscape
4. WXGA (Wide XGA)

```
$range-mobile: 414px;
$range-tablet: 768px;
$range-screen-small: 1024px;
$range-screen-large: 1280px;


@include max-screen($range-mobile) {
  ...
}
@include screen($range-mobile, $range-tablet) {
  ...
}
@include screen($range-tablet, $range-screen-small) {
  ...
}
@include screen($range-screen-small, $range-screen-large) {
  ...
}
@include min-screen($range-screen-large) {
  ...
}
```
