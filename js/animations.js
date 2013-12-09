$(function(){

    // container is the DOM element;
    // userText is the textbox
    
    var mainAnimation = $("#mainAnimation")
    var mainAnimation1 = $("#mainAnimation1")
    var mainAnimation2 = $("#mainAnimation2")
    var mainAnimation3 = $("#mainAnimation3")
    var mainAnimation4 = $("#mainAnimation4")            
    var mainAnimation5 = $("#mainAnimation5") 
    var mainAnimation6 = $("#mainAnimation6")
    var mainAnimation7 = $("#mainAnimation7") 
    var mainAnimation8 = $("#mainAnimation8")            
    var mainAnimation9 = $("#mainAnimation9") 
    var mainAnimation10 = $("#mainAnimation10")
    var mainAnimation11 = $("#mainAnimation11")     
    var mainAnimation12 = $("#mainAnimation12")
    var mainAnimation13 = $("#mainAnimation13")

    var secondaryAnimation1 = $("#secondaryAnimation1")
    var secondaryAnimation2 = $("#secondaryAnimation2") 
    var secondaryAnimation3 = $("#secondaryAnimation3")           

    // Shuffle the contents of container
    setTimeout(function(){
        mainAnimation.css("opacity",1).shuffleLetters();},0
    );

    setTimeout(function(){
        mainAnimation1.css("opacity",1).shuffleLetters();},500
    );

    setTimeout(function(){
        mainAnimation2.css("opacity",1).shuffleLetters();},500
    );

    //i am a
    setTimeout(function(){
        mainAnimation3.css("opacity",1).shuffleLetters();},1000
    );

    setTimeout(function(){
        secondaryAnimation1.animate({opacity:1},500);},1000
    );

    setTimeout(function(){
        mainAnimation4.css("opacity",1).shuffleLetters();},1000
    );

    setTimeout(function(){
        mainAnimation5.css("opacity",1).shuffleLetters();},1000
    );     
    setTimeout(function(){
        mainAnimation6.css("opacity",1).shuffleLetters();},1500
    );     
    setTimeout(function(){
        mainAnimation7.css("opacity",1).shuffleLetters();},1500
    );

    setTimeout(function(){
        mainAnimation8.css("opacity",1).shuffleLetters();},1500
    ); 

    setTimeout(function(){
        secondaryAnimation2.animate({opacity:1},500);},1500
    );

    setTimeout(function(){
        mainAnimation9.css("opacity",1).shuffleLetters();},2000
    );     
    setTimeout(function(){
        mainAnimation10.css("opacity",1).shuffleLetters();},2000
    );     
    setTimeout(function(){
        mainAnimation11.css("opacity",1).shuffleLetters();},2000
    );
    setTimeout(function(){
        mainAnimation12.css("opacity",1).shuffleLetters();},2000
    );
    setTimeout(function(){
        mainAnimation13.css("opacity",1).shuffleLetters();},2000
    );

    setTimeout(function(){
        secondaryAnimation3.animate({opacity:1},500);},2000
    );        



    //hover

    $('.rollover').hover(function() {
        var currentImg = $(this).attr('src');
        $(this).attr('src', $(this).attr('hover'));
        $(this).attr('hover', currentImg);
    }, function() {
        var currentImg = $(this).attr('src');
        $(this).attr('src', $(this).attr('hover'));
        $(this).attr('hover', currentImg);
    });

    //focus (changes opacity)

    var $container  = $('#mainType'),
        $articles   = $container.children('section'),
        timeout;
    
    $articles.on( 'mouseenter', function( event ) {
            
        var $article    = $(this);
        clearTimeout( timeout );
        timeout = setTimeout( function() {
            
            if( $article.hasClass('active') ) return false;
            
            $articles.not( $article.removeClass('translucent').addClass('active') )
                     .removeClass('active')
                     .addClass('translucent');
            
        }, 65 );
        
    });
    
    $container.on( 'mouseleave', function( event ) {
        
        clearTimeout( timeout );
        $articles.removeClass('active translucent');
        
    });    


    $(".articleLink").click(function(){
        $(".underlay").fadeIn(200);
        setTimeout(function(){$("#underlayWrapper").addClass("blurry");},0);
    });

    $(".closeButton").click(function(){
        $("#underlayWrapper").removeClass("blurry");
        setTimeout(function(){$(".underlay").fadeOut(300);},0);
        
        $('.overlay, .overlayFixed').each(function() {
            $(this).fadeOut(0);
        });


    });

    $("#vincentChanLink").click(function(){       
        $("#aboutMe").fadeIn(500);
    });

    // $("#designLink, #developmentLink").click(function(){       
    //     $("#design").fadeIn(500);
    // });    

    $("#brandsLink").click(function(){       
        $("#brands").fadeIn(500);
    });      
})

(function($){
    
    $.fn.letterShuffler = function(prop){
        
        var options = $.extend({
            "step"      : 16,           // How many times should the letters be changed
            "fps"       : 40,           // Frames Per Second
            "text"      : "",           // Use this text instead of the contents
            "callback"  : function(){}  // Run once the animation is complete
        },prop)
        
        return this.each(function(){
            
            var el = $(this),
                str = "";


            // Preventing parallel animations using a flag;

            if(el.data('animated')){
                return true;
            }
            
            el.data('animated',true);
            
            
            if(options.text) {
                str = options.text.split('');
            }
            else {
                str = el.text().split('');
            }
            
            // The types array holds the type for each character;
            // Letters holds the positions of non-space characters;
            
            var types = [],
                letters = [];

            // Looping through all the chars of the string
            
            for(var i=0;i<str.length;i++){
                
                var ch = str[i];
                
                if(ch == " "){
                    types[i] = "space";
                    continue;
                }
                else if(/[a-z]/.test(ch)){
                    types[i] = "lowerLetter";
                }
                else if(/[A-Z]/.test(ch)){
                    types[i] = "upperLetter";
                }
                else {
                    types[i] = "symbol";
                }
                
                letters.push(i);
            }
            
            el.html("");            

            // Self executing named function expression:
            
            (function shuffle(start){
            
                // This code is run options.fps times per second
                // and updates the contents of the page element
                    
                var i,
                    len = letters.length, 
                    strCopy = str.slice(0); // Fresh copy of the string
                    
                if(start>len){
                    
                    // The animation is complete. Updating the
                    // flag and triggering the callback;
                    
                    el.data('animated',false);
                    options.callback(el);
                    return;
                }
                
                // All the work gets done here
                for(i=Math.max(start,0); i < len; i++){

                    // The start argument and options.step limit
                    // the characters we will be working on at once
                    
                    if( i < start+options.step){
                        // Generate a random character at thsi position
                        strCopy[letters[i]] = randomChar(types[letters[i]]);
                    }
                    else {
                        strCopy[letters[i]] = "";
                    }
                }
                
                el.text(strCopy.join(""));
                
                setTimeout(function(){
                    
                    shuffle(start+1);
                    
                },1000/options.fps);
                
            })(-options.step);
            

        });
    };
    
    function randomChar(type){
        var pool = "";
        
        if (type == "lowerLetter"){
            pool = "abcdefghijklmnopqrstuvwxyz0123456789";
        }
        else if (type == "upperLetter"){
            pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        }
        else if (type == "symbol"){
            pool = ",.?/\\(^)![]{}*&^%$#'\"";
        }
        
        var arr = pool.split('');
        return arr[Math.floor(Math.random()*arr.length)];
    }
    
})(jQuery);