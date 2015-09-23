<?php
  $path = get_bloginfo('stylesheet_directory');
  $title = ' | '. get_bloginfo('name');
  $url = get_post_type_archive_link();
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
      <div class="global-header">
        <h1 class="website-title">
          <img src="/img/logo.svg" alt="jstarted.com">
        </h1>
        <p class="website-summary">
          フロントエンドエンジニアによるJavaScript/HTML/CSSのノウハウや覚書を掲載しています。
        </p>
        <div class="gmenu-rss">
          <a href="">
            RSS
          </a>
        </div>
      </div>
      
      <div class="contents">
        <div class="main">
          
        </div>
        
<?php
  include 'sub.php';
?>
      </div>
      
<?php
  include 'footer.php';
?>
    </div>
  </body>
</html>
