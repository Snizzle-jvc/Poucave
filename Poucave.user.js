// ==UserScript==
// @name        POUCAVE
// @author      Snizzle
// @version     2.2
// @downloadURL https://github.com/Snizzle-jvc/Poucave/raw/master/Poucave.user.js
// @updateURL   https://github.com/Snizzle-jvc/Poucave/raw/master/Poucave.user.js
// @supportURL  http://www.jeuxvideo.com/messages-prives/nouveau.php?all_dest=Snizzle,Snitchzzle
// @copyright   2018, Snizzle
// @licence     MIT
// @description Poucave à la modé n'a jamais été aussi simple
// @grant       none
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @match       *://www.jeuxvideo.com/forums/*
// @run-at      document-end
// ==/UserScript==
$(function(c) {
    c(".group-one").prepend("<div class='btn btn-actu-new-list-forum' id='poucave-save-topic' title='Enregistrer ce topic' style='margin-right: 10px; background-color: #3a83a9; border-color: #2e6e90;border-radius: 0; color: white;min-width: 10rem;' >enregistrer ce topic</div>");
    c(".bloc-date-msg a").html("Enregistrer ce message!");
    c(".col-right").prepend("<div class='panel panel-jv-forum panel-poucave' style='background:#e2e2e2'><div class='panel-body'><div class='scrollable'><div class='scrollable-wrapper'><div class='scrollable-content bloc-sous-forums'><ul class='liste-sous-forums'><li class='line-ellipsis'><div class='btn btn-actu-new-list-forum' id='poucave-mod' title='Topic de mod\u00e9ration choisi' style='background-color: #3a83a9;border-color: #2e6e90;border-radius: 0;color: white;min-width: 100%;'>Topic de mod\u00e9ration</div></li><li class='line-ellipsis'><div class='btn btn-actu-new-list-forum' id='poucave-clear' title='Vider la liste de signalements' style='background-color: #3a83a9;border-color: #2e6e90;border-radius: 0;color: white;min-width: 100%;'>Vider la liste de signalements</div></li><li class='line-ellipsis'><div class='btn btn-actu-new-list-forum' id='poucave-send-topic' title='Poucaaaave' style='margin-right: 10px; background-color: red; border-color: #c70b0b;border-radius: 0; color: white; min-width: 100%' >poucave</div></li></ul></div></div></div></div></div>");
    var e = window.location.href,
        g = JSON.parse(localStorage.getItem("Topic")) || [],
        h = JSON.parse(localStorage.getItem("Message")) || [],
        f = localStorage.getItem("Alias"),
        d = localStorage.getItem("Moderation");
    null === f && (f = "");
    if (null === d || 0 == d) d = "", alert("Vous n'avez pas sp\u00e9cifi\u00e9 de topic de Mod\u00e9ration");
    null !== localStorage.getItem("Topic") && localStorage.getItem("Topic").includes(e) && c("#poucave-save-topic").hide();
    c("#poucave-clear").click(function() {
        if (null !== localStorage.getItem("Topic") || null !==
            localStorage.getItem("Message")) 1 == confirm("Vider la liste de signalements ?") && (localStorage.removeItem("Topic"), localStorage.removeItem("Message"));
        else return alert("Liste d\u00e9j\u00e0 vide")
    });
    c("#poucave-save-topic").click(function() {
        var a = prompt("Raison du signalement", ""),
            b = "'''" + a + "'''";
        "" === a && (b = "");
        null === a ? alert("Le topic n'a pas \u00e9t\u00e9 enregistr\u00e9!") : (a = "[TOPIC] " + b + " : ", b = JSON.parse(localStorage.getItem("Topic")) || [], b.push(a + e + "\n"), localStorage.setItem("Topic", JSON.stringify(b)),
            c(this).hide())
    });
    c(".bloc-date-msg a").click(function(a) {
        a.preventDefault();
        a = "http://www.jeuxvideo.com" + c(this).attr("href");
        if (null !== localStorage.getItem("Message") && localStorage.getItem("Message").includes(a)) return c(this).hide(), alert("Message d\u00e9j\u00e0 signal\u00e9");
        var b = prompt("Raison du signalement", ""),
            d = "'''" + b + "'''";
        "" === b && (d = "");
        null === b ? alert("Le message n'a pas \u00e9t\u00e9 enregistr\u00e9!") : (b = "[MSG] " + d + " : ", d = JSON.parse(localStorage.getItem("Message")) || [], d.push(b + a +
            "\n"), localStorage.setItem("Message", JSON.stringify(d)), c(this).hide())
    });
    c("#poucave-mod").click(function() {
        var a = prompt("Collez le lien du topic de mod\u00e9ration", d);
        if (null !== a && "" !== a) {
            var b = prompt("Donnez un nom \u00e0 ce forum (par exemple : 18-25)");
            if (null === b || 0 == b) b = "";
            localStorage.setItem("Moderation", a);
            localStorage.setItem("Alias", b);
            location.reload()
        }
    });
    c("#poucave-mod").html("Topic de mod\u00e9 : " + f);
    c("#poucave-send-topic").click(function() {
        if (null === d || 0 == d) return alert("Vous n'avez pas sp\u00e9cifi\u00e9 de topic de Mod\u00e9ration");
        var a = JSON.parse(localStorage.getItem("Topic")) || [],
            b = JSON.parse(localStorage.getItem("Message")) || [];
        a = a.join("") + b.join("");
        "" === a ? alert("Rien \u00e0 poucave !") : 1 == confirm("Veux-tu poucave maintenant ?\n" + a) && window.open(d + "#pouc").focus()
    });
    e === d + "#pouc" && (c("#message_topic").focus().text(g.join("") + h.join("")), localStorage.removeItem("Topic"), localStorage.removeItem("Message"))
});
