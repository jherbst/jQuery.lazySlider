jQuery.lazySlider.js
====================
A simple and elegant slider with more features to come. 

FEATURES
================
Easy to use. 
Lazy loads all html and images to increase speed at pageload. 
Loads 3 slides to start, then only 1 new slide every change.
Uses jquery.cssAnimate.js to take advantage of transitions when available and free up the main js thread.
options for transition interval and speed.


USAGE
======================================================================================================================

Method 1
--------
Using js to set the content of the slider  and call the $.lazySlider() function


<div class="lazySliderContainer"></div>


<script type="text/javascript">
        var slides = [
            {
                image: '/img/home/home-getstarted-bg.jpg',
                content:'<h1>Helping independent<br /> artists succeed <em>since 1946</em></h1>' +
                        '<div class="button-container">' +
                            '<a href="/quoter/confighandler.aspx" class="button primary-site-button">Let\'s get started</a> ' +
                        '</div> <!-- .button-container --> ' +
                        '<h4><a href="" title="">Not doing a music project?</a></h4>'
            },
            {
                image: '/img/home/home-contact-bg.jpg',
                content:
                    '<h1>Premium quality <em>packaging</em></h1>' +
                        '<div class="three column-container">' +
                            '<div class="column">' +
                                '<img src="/img/home/test-image.png" />' +
                               ' <h4>CDs</h4>' +
                                '<p class="description">' +
                                '1,000 CDs in 4-Panel Eco-Wallets now just $939' +
                                '</p>  <!-- .description -->' +
                            '</div> <!-- .column -->' +
                           ' <div class="column">' +
                               ' <img src="/img/home/test-image.png" />' +
                                '<h4>Vinyl</h4>' +
                               ' <p class="description">' +
                               ' 12" and 7" vinyl manufacturing now available' +
                               ' </p>  <!-- .description -->' +
                           ' </div> <!-- .column -->' +
                           ' <div class="column">' +
                              '  <img src="/img/home/test-image.png" />' +
                              '  <h4>DVDs</h4>' +
                              '  <p class="description">' +
                               ' 1,000 DVDs in 4-Panel DVDigipaks just $990 with coupon. <i>Limited time offer!</i>' +
                              '  </p>  <!-- .description -->' +
                           ' </div> <!-- .column -->' +
                        '</div> <!-- .three column-container -->' +
                       ' <h4><a href="" title="">View all of our disc packages</a></h4>'
            },
            {
                image: '/img/home/home-getstarted-bg.jpg',
                content: '<h1>Services you need to <em>succeed</em></h1>'+
           ' <div class="three column-container">'+
                '<div class="column">'+
                   ' <img src="/img/home/test-image.png" />'+
                   ' <h4>Distribution</h4>'+
                  '  <p class="description">'+
                 '   Worldwide distribution of your CDs, downloads, and streams'+
                '    </p>  <!-- .description -->'+
                '</div> <!-- .column -->'+
                '<div class="column">'+
                 '   <img src="/img/home/test-image.png" />'+
                 '   <h4>Mastering</h4>'+
                 '   <p class="description">'+
                 '       That huge sound you crave'+
                 '   </p>  <!-- .description -->'+
                '</div> <!-- .column -->'+
                '<div class="column">'+
                 '   <img src="/img/home/test-image.png" />'+
                '    <h4>Promotion</h4>'+
               '     <p class="description">'+
              '      Posters, Download Cards, Stickers and more'+
             '       </p>  <!-- .description -->'+
            '    </div> <!-- .column -->'+
           ' </div> <!-- .three column-container -->'
            },
            {
                image: '/img/home/home-contact-bg.jpg',
                content: '<div>Slide 4</div>'
            }
        ];


        $('.lazySliderContainer').lazySlider(slides);
</script>

================================================================================================

Method 2
--------
Place the slider mark up in a comment with in the container and call the $.reallyLazySlider() function


<section class="image-section lazySliderContainer" style="height: 500px;">
    <!--
            #lazySlide
               #lazyImage: /img/home/home-getstarted-bg.jpg
               #lazyContent:
                        <h1>Helping independent<br /> artists succeed <em>since 1946</em></h1>
                        <div class="button-container">
                            <a href="/quoter/confighandler.aspx" class="button primary-site-button">Let's get started</a>
                        </div>
                        <h4><a href="" title="">Not doing a music project?</a></h4>


            #lazySlide
               #lazyImage: /img/home/home-contact-bg.jpg
               #lazyContent:
                        <h1>Premium quality <em>packaging</em></h1>
            <div class="three column-container">
                <div class="column">
                    <img src="/img/home/test-image.png" />
                    <h4>CDs</h4>
                    <p class="description">
                        1,000 CDs in 4-Panel Eco-Wallets now just $939
                    </p>
                </div>
                <div class="column">
                    <img src="/img/home/test-image.png" />
                    <h4>Vinyl</h4>
                    <p class="description">
                        12" and 7" vinyl manufacturing now available
                    </p>
                </div>
                <div class="column">
                    <img src="/img/home/test-image.png" />
                    <h4>DVDs</h4>
                    <p class="description">
                        1,000 DVDs in 4-Panel DVDigipaks just $990 with coupon. <i>Limited time offer!</i>
                    </p>
                </div>
            </div>
            <h4><a href="" title="">View all of our disc packages</a></h4>

            #lazySlide
               #lazyImage: /img/home/home-getstarted-bg.jpg
               #lazyContent:

            <div id="turn-times-info" class="left forty-percent text-left">
                <h1>Turn times that <em>can't be beat</em></h1>
                <h3>CDs, DVDs, and Blu-rays in as fast as 1 day</h3>
                <h4><a href="" title="">Learn more</a></h4>
            </div>
            <div class="right sixty-percent">
                <img src="/img/home/test-image.png"/>
            </div>



        #lazySlide
               #lazyImage: /img/home/home-contact-bg.jpg
               #lazyContent:
            <h1>Get your discs into production <em>today</em></h1>
                <div class="button-container">
                    <a href="/quoter/confighandler.aspx" class="button primary-site-button">Get a quote</a>
                </div>
                <h4>Or call us to talk to a real, live human being: <a href="tel:8004689353">1-800-468-9353</a>.</h4>
                <h4>Outside the USA: <a href="tel:8004689353">+1-856-663-9030</a>.</h4>

            -->
</section>

<script type="text-javascript">

        $('.lazySliderContainer').reallyLazySlider();

</script>