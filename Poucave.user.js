// ==UserScript==
// @name        POUCAVE
// @author      Snizzle
// @version     1.0
// @downloadURL https://github.com/Snizzle-jvc/Poucave/raw/master/Poucave.user.js
// @updateURL   https://github.com/Snizzle-jvc/Poucave/raw/master/Poucave.user.js
// @supportURL  http://www.jeuxvideo.com/messages-prives/nouveau.php?all_dest=Snizzle,Snitchzzle
// @copyright   2018, Snizzle
// @licence     MIT
// @description Poucave à la modé n'a jamais été aussi simple
// @grant       none
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @match       *://www.jeuxvideo.com/forums/42-*
// @run-at      document-end
// ==/UserScript==
$(function(b){function g(a,b){var c=localStorage.getItem(a);null===c&&(c="");localStorage.setItem(a,c+b)}b(".group-one").prepend("<div class='btn btn-actu-new-list-forum' id='poucave-save-topic' title='Enregistrer ce topic' style='margin-right: 10px; background-color: blue; color: white' >enregistrer</div>");b(".group-one").prepend("<div class='btn btn-actu-new-list-forum' id='poucave-send-topic' title='Poucaaaave' style='margin-right: 10px; background-color: red; color: white' >poucave</div>");b(".bloc-date-msg a").html("Enregistrer ce message!");
b(".fil-ariane-crumb").prepend("<div class='btn btn-actu-new-list-forum' id='poucave-mod' title='Poucaaaave' style='margin-right: 10px; background-color: red; color: white' >topic mod\u00e9</div>");var h=window.location.href,e=localStorage.getItem("Topic"),f=localStorage.getItem("Message"),d=localStorage.getItem("Moderation");if("null"===d||""===d)d="",alert("Vous n'avez pas sp\u00e9cifi\u00e9 de topic de Mod\u00e9ration");null===e&&(e="");null===f&&(f="");""===e&&""===f?b("#poucave-send-topic").hide():
b("#poucave-send-topic").show();b("#poucave-mod").click(function(){var a=prompt("Collez le lien du topic de mod\u00e9ration");null!==a&&""!==a&&localStorage.setItem("Moderation",a)});b("#poucave-save-topic").click(function(){var a=prompt("Raison du signalement","");if(null===a)alert("Le topic n'a pas \u00e9t\u00e9 enregistr\u00e9!");else{b("#bloc-title-forum").html();var c=JSON.stringify(h);null===a&&(a="");g("Topic","[TOPIC] - "+a+" : "+c+"\n");b(this).hide()}});h===d+"#pouc"&&(b("#message_topic").focus().text(e+
f),localStorage.removeItem("Topic"),localStorage.removeItem("Message"));b("#poucave-send-topic").click(function(){1==confirm("Poucave maintenant ?")&&window.open(d+"#pouc").focus()});b(".bloc-date-msg a").click(function(a){a.preventDefault();a=prompt("Raison du signalement","");if(null===a)alert("Le message n'a pas \u00e9t\u00e9 enregistr\u00e9!");else{var c=b(this).attr("href");c=JSON.stringify("http://www.jeuxvideo.com"+c);null===a&&(a="");g("Message","[MSG] - "+a+" : "+c+"\n");b(this).hide()}})});
