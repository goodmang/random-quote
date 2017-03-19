// This is our Javascript file to call our Quote API
$(document).ready(function() {
    function ggstrip(html) {
        var tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }

    function getTheQuote() {  
        var quoteText = "Oops, no quote today.";
        var quoteAuthor = "-Anonymous";

        $.ajax({
            url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
            success: function(data) {
                var post = data.shift(); // The data is an array of posts. Grab the first one.
                quoteAuthor = post.title;
                quoteText = post.content;
                $('#quoteAuthor').text(quoteAuthor);
                $('#quoteText').html(quoteText);

                //tweetHtml = '<a class="twitter-share-button" id="twitterLink" href="https://twitter.com/share" data-text="';
                var tweetText = quoteText;

                if (quoteAuthor.length > 0) {
                    tweetText += ' -' + quoteAuthor;
                }

                //tweetHtml += '">Share on Twitter</a>';

                var newLink = document.createElement("a");
                var node = document.createTextNode("Share on Twitter");
                newLink.appendChild(node);
                newLink.className = "twitter-share-button";
                newLink.id = "twitterLink";
                newLink.href = "https://twitter.com/share";
                newLink.dataset.text = ggstrip(tweetText);
                // newLink.dataset.text = tweetText;


                var elems = document.getElementsByClassName('twitter-share-button');
                elems[0].parentNode.replaceChild(newLink, elems[0]);
                if (elems.length > 1) {
                    elems[1].parentNode.removeChild(elems[1]);
                }

                //                elem = document.getElementById('twitterLink');
                //                elem.parentNode.removeChild(elem);
                //$('#twitter-share-button').html(tweetHtml);
                twttr.widgets.load();
            },
            cache: false
        });

        /*        $.getJSON("https://andruxnet-random-famous-quotes.p.mashape.com/", function(json) {

                    if (json) {
                        quoteText = json.quote;
                        quoteAuthor = "-" + json.author;
                    }
                    $("#quoteText").html(quoteText);
                    $("#quoteAuthor").html(quoteAuthor);  
        */

    }

    getTheQuote();
    $("#getQuote").on("click", getTheQuote);

});
//});
