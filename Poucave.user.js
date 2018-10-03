// ==UserScript==
// @name        POUCAVE
// @author      Snizzle
// @version     1.0
// @downloadURL link
// @updateURL   link
// @supportURL  http://www.jeuxvideo.com/messages-prives/nouveau.php?all_dest=Snizzle,Snitchzzle
// @copyright   2018, Snizzle
// @licence     MIT
// @description Poucave à la modé n'a jamais été aussi simple
// @grant       none
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @match       *://www.jeuxvideo.com/forums/42-*
// @run-at      document-end
// ==/UserScript==
$(function(a) {
    function f(a, c) {
        var b = localStorage.getItem(a);
        null === b && (b = "");
        localStorage.setItem(a, b + c)
    }
    a(".group-one").prepend("<div class='btn btn-actu-new-list-forum' id='poucave-save-topic' title='Enregistrer ce topic' style='margin-right: 10px; background-color: blue; color: white' >enregistrer</div>");
    a(".group-one").prepend("<div class='btn btn-actu-new-list-forum' id='poucave-send-topic' title='Poucaaaave' style='margin-right: 10px; background-color: red; color: white' >poucave</div>");
    a(".bloc-date-msg a").html("Enregistrer ce message!");
    var g = window.location.href,
        d = localStorage.getItem("Topic"),
        e = localStorage.getItem("Message");
    null === d && (d = "");
    null === e && (e = "");
    //changer le lien du topic de modération 
    "" === d && "" === e || "http://www.jeuxvideo.com/forums/42-51-56060699-1-0-1-0-mode-les-chefs-des-cas-sociaux.htm" != window.location.href ? a("#poucave-send-topic").hide() : a("#poucave-send-topic").show();
    a("#poucave-save-topic").click(function() {
        if (1 == confirm("Enregistrer ce topic ?")) {
            var b = prompt("Raison du signalement", "");
            a("#bloc-title-forum").html();
            var c = JSON.stringify(g);
            null ===
                b && (b = "");
            f("Topic", "[TPC] - " + b + " : " + c + "\n");
            a(this).hide()
        }
    });
    a("#poucave-send-topic").click(function() {
        1 == confirm("Poucave maintenant ?") && (a("#message_topic").focus().text(d + e), localStorage.removeItem("Topic"), localStorage.removeItem("Message"))
    });
    a(".bloc-date-msg a").click(function(b) {
        b.preventDefault();
        if (1 == confirm("Enregistrer ce message ?")) {
            b = prompt("Raison du signalement", "");
            var c = a(this).attr("href");
            c = JSON.stringify("http://www.jeuxvideo.com" + c);
            null === b && (b = "");
            f("Message", "[MSG] - " +
                b + " : " + c + "\n");
            a(this).hide()
        }
    })
});
