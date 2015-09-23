<?php
  $path = get_bloginfo('stylesheet_directory');
  $title = ' | '. get_bloginfo('name');
  $url = get_posturl();
  $description = '';
  $ogimg = '';
  $ogtype = 'website';
?>
<!DOCTYPE html>
<html>
  <head>
<?php
  include 'head.php';
?>
  </head>
  <body>
    <div class="page">
      <div class="contents">
        <div class="main">
          <div class="article">
            <header class="article-header">
              <h1 class="article-title">
                記事タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル
              </h1>
              <p class="article-data">
                Post: <span class="article-post-date">2015/12/31</span>
                Category: <a href="" class="aritcle-category"></a>
              </p>
            </header>
            
            <div class="article-body">

<p>ウェブサイト制作のコーディングというものを僕がはじめたとき、最初に学習したのはhtmlとcssでした。JavaScriptに真剣に手をつけはじめたのもこのブログを始めた2年半前くらい、加えてJavaScript以外のプログラム言語をまったく知らなかったので、最初からプログラマだった人たちのよく口にする「クラス」や「インスタンス」というものをうまく理解できないまま、最近までやってきました。</p>

<p>それでもjQueryのようなライブラリやJavaScript自体の柔軟性に助けられこれまで実業務をこなすことができましたが、canvasアニメをやり始めてからそのやり方にも限界を感じていました。1つのオブジェクトを動かすだけならまだなんとかなりますが、不特定多数のオブジェクトをある一定規則で生み出し動かそうとすると、どのように書けば円滑にいくのかがわからなくなる。  行き詰まり、よい方法はないかと検索をかけていてまた目の前に立ちはだかってきたのが、「クラス」と「インスタンス」でした。</p>

<p>結論から言えば、感覚的に理解することもままならなかったそれらを、実際にcanvasアニメを書くことを通して、少なくとも最初の片鱗くらいには理解できたのではないかと思います。その感覚をつかむことができてから演出方法にも幅が出てきはじめ、ページのデザインへの活かし方も具体的に想像できるようになってきました。</p>

<p>同じような苦労を味わっている方も多いと思いますので、その一助となるべく自分なりに内容をまとめておこうと思います。</p>


<div class="rectangle-banner">
<script src="http://adm.shinobi.jp/s/391092be09782b6f1113040fa7e542e5"></script>
</div><!-- /.rectangle-banner -->

<h2>クラスとインスタンスという単語の意味を調べる。</h2>

<p>まずそもそもの単語の意味をWikipediaから以下に引用します。</p>

<blockquote>
  <p>クラス（class）は、クラスベースのオブジェクト指向においてオブジェクトの設計図にあたるもの。抽象データ型の一つ。クラスから生成したオブジェクトのことをインスタンスという。</p>
</blockquote>

<p>今でこそこの説明で内容を理解できますが、JavaScriptを学習してすぐの頃にはこれではチンプンカンプンでした。
オブジェクトって何回言うねん、という感じでしょうか。</p>

<h2>「人間」を例にして、クラスとインスタンスを当てはめてみる。</h2>

<p><div class="img-center">
<a href="http://www.amazon.co.jp/gp/product/B00JA4KQ6U/ref=as_li_qf_sp_asin_il?ie=UTF8&amp;camp=247&amp;creative=1211&amp;creativeASIN=B00JA4KQ6U&amp;linkCode=as2&amp;tag=docchi04-22"><img border="0" src="http://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&amp;ASIN=B00JA4KQ6U&amp;Format=_SL250_&amp;ID=AsinImage&amp;MarketPlace=JP&amp;ServiceVersion=20070822&amp;WS=1&amp;tag=docchi04-22" ></a><img src="http://ir-jp.amazon-adsystem.com/e/ir?t=docchi04-22&amp;l=as2&amp;o=9&amp;a=B00JA4KQ6U" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</div><!-- /.img-center --></p>

<p>kindleで販売している「オブジェクト指向と哲学」という書籍を最近読みました。この書籍はJavaScriptの解説書ではありませんでしたが、そこで書かれていたクラスとインスタンスの説明は非常にわかりやすいものでした。「鶏」と「本」に例えてこれらの概念を説明しています。それをそのまま引用するのもアレなので、自分なりに噛み砕いて書き残そうと思います。</p>

<h3>「人間」をベースにした場合のクラスとインスタンス</h3>

<p>「人間」をベースにすると、クラスとインスタンスはそれぞれどのように表現できるでしょうか。以下のようにまとめてみます。</p>

<table>
<tr>
<th>クラス</th>
<td>戸籍で管理される「個人」というフォーマット</td>
</tr>
<tr>
<th>クラスに定義されたデータ</th>
<td>名前、性別、国籍、年齢、住所、顔、身長、体重など。</td>
</tr>
<tr>
<th>インスタンス</th>
<td>実際に存在している個々人。</td>
</tr>
</table>

<p>これを実際にJavaScriptで書くと、以下のようになるでしょうか。</p>

<pre><code>var Person = function(name, gender) {
  this.name = name;
  this.gender = gender;
  this.age = 0;
  this.birthday = new Date();
};

Person.prototype.takeOld = function() {
  this.age += 1;
};

var ykob = new Person('yoichi kobayashi', 'man');

ykob.takeOld();
</code></pre>

<p>このコードにより「yoichi kobayashi」という名前の個人（インスタンス）が人間というフォーマット（クラス）にもとづいて生成されたことになります。個々人が持つ名前や性別、年齢、誕生日などの属性は、クラスに定義された各データの値として設定されます。</p>

<h2>プログラミング言語に限った考え方ではない。</h2>

<p>この例を最初に読んで思い出したのは、htmlの文書構造を学習したときのことでした。
数年前に読んだ「セマンティックHTML/XHTML」という書籍の内容です。</p>

<p><div class="img-center">
<a href="http://www.amazon.co.jp/gp/product/483993195X/ref=as_li_qf_sp_asin_il?ie=UTF8&amp;camp=247&amp;creative=1211&amp;creativeASIN=483993195X&amp;linkCode=as2&amp;tag=docchi04-22"><img border="0" src="http://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&amp;ASIN=483993195X&amp;Format=_SL250_&amp;ID=AsinImage&amp;MarketPlace=JP&amp;ServiceVersion=20070822&amp;WS=1&amp;tag=docchi04-22" ></a><img src="http://ir-jp.amazon-adsystem.com/e/ir?t=docchi04-22&amp;l=as2&amp;o=9&amp;a=483993195X" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</div><!-- /.img-center --></p>

<p>htmlにはメタ情報が存在します。head内に書かれたtitleやdescriptionだけでなく、最近ではmicrodataなどの構造化データによってbody内の各要素も細かくメタ情報として管理することができます。メタ情報によってユーザーや検索エンジンのクローラはそのページの内容を詳細に解釈することができます。</p>

<p>この考え方はそのまま、上述したクラスとインスタンスにも通用します。まずフォーマットが存在し、それに沿って各属性の値を設定された個々のオブジェクトが存在するという関係性です。htmlのメタ情報については僕も感覚的に捉えることができていたので、それと関連付けることができたことで、クラスとインスタンスについての理解も急速に進んでいきました。</p>

<p>「オブジェクト指向と哲学」で書かれていたことによれば、哲学には「存在論」という思想があり、オブジェクト指向もそれに準じているということでした。個人的にはメタデータも同様と考えています。プログラム言語としての学習と捉えてしまうと習得が進まないことでも、実在するモノや、他の考え方と絡めて考えてみると理解が進むものと思います。</p>

<p>もしも僕と同じように、マークアップから学びプログラミングの習得に手こずっている人がいるとすれば、一度視点を広げてこのような考え方で再度チャレンジしてみてはいかがでしょうか。</p>

            </div>
          </div>
          
          <ul class="adjacent-link">
            <li class="preview">
              <a href="">
                前の記事 「」
              </a>
            </li>
            <li class="next">
              <a href="">
                次の記事 「」
              </a>
            </li>
          </ul>
          
          <p class="blogtop">
            <a href="/">トップページにもどる</a>
          </p>
        </div>
        
<?php
  include 'sub.php';
?>
      </div>
      
      <div class="global-header">
        <p class="website-title">
          <img src="/img/logo.svg" alt="jstarted.com">
        </p>
        <p class="website-summary">
          フロントエンドエンジニアによるJavaScript/HTML/CSSのノウハウや覚書を掲載しています。
        </p>
        <div class="gmenu-rss">
          <a href="">
            RSS
          </a>
        </div>
      </div>
      
<?php
  include 'footer.php';
?>
    </div>
  </body>
</html>
