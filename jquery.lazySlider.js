
; (function ($, window, document, undefined) {
    //====================================================================================================
    //	a jQuery lazy loading slider for images and content
    //
    //====================================================================================================

    jQuery.fn.lazySlider = function (slides, options) {



        //return this for jquery chaining
        return this.each(function () {
            var lazySlider = {};

            options = options || {};
            options = getDefaultOptions(options);

            currentOptions = slides[0].options;

            var $lazySliderParent = $(this).append('<div class="lazySlider"></div>'),
                $lazySlider = $lazySliderParent.find('.lazySlider'),
                n = slides.length, //the number of slides
                current = 0, //the current slide 
                int1 = setInterval(next, currentOptions.interval); //set the interval


            $lazySlider.append(
                '<div class="lazySlide left" style="background-image: url(' + slides[1].image + ');"><div class="lazySlideContent ' + (slides[1].options.contentTransition) + '">' + slides[1].content + '</div></div>' +
                '<div class="lazySlide" style="background-image: url(' + slides[0].image + ');"><div class="lazySlideContent ' + (slides[0].options.contentTransition) + '">' + slides[0].content + '</div></div>' +
                '<div class="lazySlide right" style="background-image: url(' + slides[n - 1].image + ');"><div class="lazySlideContent ' + (slides[n - 1].options.contentTransition) + '">' + slides[n - 1].content + '</div></div>'
            );
            $lazySlider.append(options.prevButton).children().last().addClass('prev-lazySlide');
            $lazySlider.append(options.nextButton).children().last().addClass('next-lazySlide');

            

            setLazyHeight();


            function setLazyHeight() {
                if (options.resizeHeight) {
                    var height = 0,
                        slideHeight = 0;
                    $lazySlider.find('.lazySlide').each(function () {
                        $(this).find('.lazySlideContent').children().each(function () {
                            slideHeight += $(this).height();
                        });
                        height = slideHeight > height ? slideHeight : height;
                    });
                    $lazySlider.height(height);
                }
                else {
                    $lazySlider.height($lazySliderParent.height());
                }
            }


            function next() { //go to the next image

                $lazySlider.find('.next-lazySlide, .prev-lazySlide').addClass('disabled');
                current++;
                if (current >= n) {
                    current = 0;
                }
                var x = 0;
                $lazySlider.find('.lazySlide').each(function () {
                    var $slide = $(this),
                        where = 100;
                    if ($slide.hasClass('right')) {
                        where = 200;
                    } else if ($slide.hasClass('left')) {
                        where = 0;
                    }

                    currentOptions = slides[current].options;
                    reintervaln();

                    $slide.cssAnimate({
                        left: where + '%'
                    }, currentOptions.speed);
                    setTimeout(function () {

                        if ($slide.hasClass('left')) {
                            $slide.removeClass('left');
                        }
                        else if ($slide.hasClass('right')) {
                            $slide.removeClass('right').addClass('left');
                            $slide.cssAnimate({ 'left': '-100%' }, 0);

                            if (current + 1 >= n) {
                                loadSlide($slide, 0);
                            }

                            else {
                                loadSlide($slide, current + 1);
                            }
                        }
                        else {
                            $slide.addClass('right');
                        }
                        setTimeout(function () {
                            $lazySlider.find('.next-lazySlide, .prev-lazySlide').removeClass('disabled');
                        }, currentOptions.speed);

                    }, currentOptions.speed);
                });

            };

            function prev() { //go to previous image

                $lazySlider.find('.next-lazySlide, .prev-lazySlide').addClass('disabled');

                current--;
                if (current < 0) {
                    current = n - 1;
                }
                $lazySlider.find('.lazySlide').each(function () {
                    var $slide = $(this),
                        where = -100;
                    if ($slide.hasClass('right')) {
                        where = 0;
                    } else if ($slide.hasClass('left')) {
                        where = -200;
                    }

                    currentOptions = slides[current].options;

                    if (options.reverse) {
                        reintervalp();
                    }
                    else {
                        reintervaln();
                    }


                    $slide.cssAnimate({
                        left: where + '%'
                    }, currentOptions.speed);
                    setTimeout(function () {
                        if ($slide.hasClass('right')) {
                            $slide.removeClass('right');
                        }
                        else if ($slide.hasClass('left')) {
                            $slide.removeClass('left').addClass('right');
                            $slide.cssAnimate({ 'left': '100%' }, 0);

                            if (current <= 0) {
                                loadSlide($slide, n - 1);
                            }

                            else {
                                loadSlide($slide, current - 1);
                            }
                        }
                        else {
                            $slide.addClass('left');
                        }
                        setTimeout(function () {
                            $lazySlider.find('.next-lazySlide, .prev-lazySlide').removeClass('disabled');
                        }, currentOptions.speed);
                    }, currentOptions.speed + 200);
                });

            };

            function loadSlide($slide, x) {
                var $slideContent = $slide.find('.lazySlideContent');
                $slide.css({ 'background-image': 'url(' + slides[x].image + ')' });
                $slideContent.html(slides[x].content).attr('class', 'lazySlideContent ' + slides[x].options.contentTransition || options.contentTransition);
                setLazyHeight();
            }


            function reintervaln() { //reset the interval after each click
                clearTimeout(int1);
                int1 = setTimeout(next, currentOptions.interval + currentOptions.speed);
            };
            function reintervalp() { //reset the interval after each click
                clearTimeout(int1);
                int1 = setTimeout(prev, currentOptions.interval + currentOptions.speed);
            };

            function nextButton(e) {
                var $target = $(e.target || e.srcElement);

                e.preventDefault();
                e.stopPropagation();
                if (!$target.hasClass('disabled')) {

                    next();
                }
                return false;
            };

            function prevButton(e) { //unbind nav-buttons
                var $target = $(e.target || e.srcElement);

                e.preventDefault();
                e.stopPropagation();
                if (!$target.hasClass('disabled')) {
                    prev();
                }
                return false;
            };


            //initial bindings

            $lazySlider.find('.next-lazySlide').click(nextButton);
            $lazySlider.find('.prev-lazySlide').click(prevButton);
            $(window).on('resize', setLazyHeight);
        });
    };

    jQuery.fn.reallyLazySlider = function () {
        var options = {};

        options = getDefaultOptions(options);
        return this.each(function () {
            var $lazySliderParent = $(this),
                slides = [],
                content = $lazySliderParent.html(),
                rawSlides = content.replace(/-->\s*$/, '').split(/#lazy[sS]lide:?/),
                slideLength = rawSlides.length,
                s = 0,
                x = 0,
                currentSlide = {},
                rawAttr = [],
                attrName = '',
                attrVal = '',
                optionsRegEx = /^lazy[oO]ptions:?/,
                imageRegEx = /^lazy[iI]mage:?/,
                contentRegEx = /^lazy[cC]ontent:?/;

            String.prototype.splitOnce = function (regex) {
                var match = this.match(regex);
                if (match) {
                    var match_i = this.indexOf(match[0]);

                    return [this.substring(0, match_i),
                    this.substring(match_i + match[0].length)];
                }
                else { return [this, ""]; }
            }


            for (s = 0; s < slideLength; s++) {

                currentSlide = { options: getDefaultOptions(options), image: '', content: '' };
                rawAttr = rawSlides[s].trim().split(/(^#)|((\n|\r)\s*#)/);

                for (x = 0; x < rawAttr.length; x++) {
                    if (typeof rawAttr[x] != 'undefined') {
                        attrName = rawAttr[x].trim().splitOnce(/\s+/)[0];
                        attrVal = rawAttr[x].trim().splitOnce(/\s+/)[1];

                        if (optionsRegEx.test(attrName)) {
                            addOptions();
                        }
                        if (imageRegEx.test(attrName)) {
                            currentSlide.image = attrVal;
                        }
                        if (contentRegEx.test(attrName)) {
                            currentSlide.content = attrVal;
                        }
                        function addOptions() {
                            x++;
                            for (x++; x < rawAttr.length; x++) {
                                
                                if (typeof rawAttr[x] != 'undefined') {
                                    attrName = rawAttr[x].trim().splitOnce(/\s+/)[0];
                                    attrVal = rawAttr[x].trim().splitOnce(/\s+/)[1];
                                    if (imageRegEx.test(attrName) || contentRegEx.test(attrName) || optionsRegEx.test(attrName)) {
                                        break;
                                    }
                                    if (s == 0) {
                                        options[attrName] = getValue(attrVal, attrName);
                                    }

                                    currentSlide.options[attrName] = getValue(attrVal, attrName);
                                }
                            }

                        }

                        function getValue(attrVal, attrName) {
                            switch (attrName) {
                                case 'reverse':
                                case 'resizeHeight':
                                    return attrVal == 'true';
                                    break;
                                case 'interval':
                                case 'speed':
                                    return (parseInt(attrVal) || null);
                                    break;
                                default:
                                    return attrVal;
                                    break;
                            }
                        }


                    }
                }
                if (currentSlide.image != '' || currentSlide.content != '') {
                    slides.push(currentSlide);
                }
            }

            $lazySliderParent.html('').lazySlider(slides, options);

        });
    };
    function getDefaultOptions(theseOptions) {
        theseOptions = theseOptions || {};
        theseOptions.reverse = theseOptions.reverse || true;
        theseOptions.backgroundWidth = theseOptions.backgroundWidth || '100%';
        theseOptions.contentWidth = theseOptions.contentWidth || 'auto';
        theseOptions.height = theseOptions.height || 'auto';
        theseOptions.backgroundTransition = theseOptions.backgroundTransition || 'slide-right';
        theseOptions.contentTransition = theseOptions.contentTransition || 'fade-up';
        theseOptions.speed = theseOptions.speed || 1000;
        theseOptions.interval = theseOptions.interval || 7000;
        theseOptions.prevButton = theseOptions.prevButton || '<div class="default-prev"><</div>';
        theseOptions.nextButton = theseOptions.nextButton || '<div class="default-next">></div>';
        theseOptions.resizeHeight = theseOptions.resizeHeight || false;
        return theseOptions;
    }

})(jQuery, window, document);
