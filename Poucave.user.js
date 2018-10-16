// ==UserScript==
// @name        POUCAVE
// @author      Snizzle
// @version     3.1
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
$(function(a) {
  a(".group-one").prepend("<div class='btn btn-actu-new-list-forum' id='poucave-save-topic' title='Enregistrer ce topic' style='margin-right: 10px; background-color: #3a83a9; border-color: #2e6e90;border-radius: 0; color: white;min-width: 10rem;' >enregistrer ce topic</div>");
  a(".bloc-options-msg").prepend("<div class='btn btn-actu-new-list-forum save-msg' title='Enregistrer ce message' style='margin-right: 10px; background-color: #3a83a9; border-color: #2e6e90;border-radius: 0; color: white;min-width: 10rem;' >Enregistrer ce message</div>");
  var f = window.location.href, k = JSON.parse(localStorage.getItem("Topic")) || [], l = JSON.parse(localStorage.getItem("Message")) || [], e = localStorage.getItem("Alias"), c = localStorage.getItem("Moderation");
  null === localStorage.getItem("Topic") && localStorage.setItem("Topic", "0");
  null === localStorage.getItem("Message") && localStorage.setItem("Message", "0");
  var g = Object.keys(JSON.parse(localStorage.getItem("Message"))).length, h = Object.keys(JSON.parse(localStorage.getItem("Topic"))).length;
  a(".col-right").prepend("<div class='panel panel-jv-forum panel-poucave' style='background:#e2e2e2'><div class='panel-body'><div class='scrollable'><div class='scrollable-wrapper'><div class='scrollable-content bloc-sous-forums'><ul class='liste-sous-forums'><li class='line-ellipsis'><div class='btn btn-actu-new-list-forum' id='poucave-mod' title='Topic de mod\u00e9ration choisi' style='background-color: #3a83a9;border-color: #2e6e90;border-radius: 0;color: white;min-width: 100%;'>Topic de mod\u00e9ration :</div></li><li class='line-ellipsis'><div class='btn btn-actu-new-list-forum' id='poucave-clear' title='Vider la liste de signalements' style='background-color: #3a83a9;border-color: #2e6e90;border-radius: 0;color: white;min-width: 100%;'>Vider la liste de signalements</div></li><li class='line-ellipsis'style='border-bottom: 1px solid #c1c1c1;'><div class='btn btn-actu-new-list-forum' id='poucave-send-topic' title='Poucaaaave' style='margin-right: 10px; background-color: red; border-color: #c70b0b;border-radius: 0; color: white; min-width: 100%;margin-bottom: 20px;' >poucave</div></li><div class='poucave-count' style='color:black;margin-top: 15px;'><span id='topiccount'>" + 
  h + "</span> Topic(s)<br><span id='msgcount'>" + g + "</span> Message(s)</div></ul></div></div></div></div></div>");
  null === e && (e = "Non d\u00e9fini");
  if (null === c || 0 == c) {
    c = "", alert("Vous n'avez pas sp\u00e9cifi\u00e9 de topic de Mod\u00e9ration");
  }
  (null !== localStorage.getItem("Topic") && localStorage.getItem("Topic").includes(f) || a(".group-one").find(".btn-topic-resolu").length) && a("#poucave-save-topic").hide();
  a(".save-msg").each(function() {
    var b = "http://www.jeuxvideo.com" + a(this).parents().eq(1).find(".bloc-date-msg").children().attr("href"), d = a(this).parents().eq(1).children().html().trim(), c = a(".account-pseudo").html();
    (null !== localStorage.getItem("Message") && localStorage.getItem("Message").includes(b) || d == c) && a(this).hide();
  });
  a(".save-msg").click(function() {
    var b = "http://www.jeuxvideo.com" + a(this).parents().eq(1).find(".bloc-date-msg").children().attr("href");
    if (null !== localStorage.getItem("Message") && localStorage.getItem("Message").includes(b)) {
      return a(this).hide(), alert("Message d\u00e9j\u00e0 signal\u00e9");
    }
    var d = prompt("Raison du signalement", ""), c = "'''" + d + "'''";
    "" === d && (c = "");
    null === d ? alert("Le message n'a pas \u00e9t\u00e9 enregistr\u00e9!") : (d = "[MSG] " + c + " : ", c = JSON.parse(localStorage.getItem("Message")) || [], c.push(d + b + "\n"), localStorage.setItem("Message", JSON.stringify(c)), a("#msgcount").html(++g), a(this).hide());
  });
  a("#poucave-clear").click(function() {
    if ("0" !== localStorage.getItem("Topic") || "0" !== localStorage.getItem("Message")) {
      1 == confirm("Vider la liste de signalements ?") && (localStorage.setItem("Topic", "0"), localStorage.setItem("Message", "0"), a("#topiccount").html("0"), a("#msgcount").html("0"), location.reload());
    } else {
      return alert("Liste d\u00e9j\u00e0 vide");
    }
  });
  a("#poucave-save-topic").click(function() {
    var b = prompt("Raison du signalement", ""), d = "'''" + b + "'''";
    "" === b && (d = "");
    null === b ? alert("Le topic n'a pas \u00e9t\u00e9 enregistr\u00e9!") : (b = "[TOPIC] " + d + " : ", d = JSON.parse(localStorage.getItem("Topic")) || [], d.push(b + f + "\n"), localStorage.setItem("Topic", JSON.stringify(d)), a("#topiccount").html(++h), a(this).hide());
  });
  a("#poucave-mod").click(function() {
    var b = prompt("Collez le lien du topic de mod\u00e9ration", c);
    null !== b && "" !== b && 0 != b && (localStorage.setItem("Moderation", b), a.get(b, function(b) {
      b = a(b).find(".gameHeaderBanner__title").html() || a(b).find(".fil-ariane-crumb span").children().eq(2).html();
      localStorage.setItem("Alias", b);
      location.reload();
    }).fail(function() {
      alert("Veuillez renseigner une URL correcte");
      localStorage.setItem("Alias", "Non d\u00e9fini");
      a("#poucave-mod").html("Topic de mod\u00e9ration : Non d\u00e9fini");
    }));
  });
  a("#poucave-mod").html("Topic de mod\u00e9ration : " + e);
  a("#poucave-send-topic").click(function() {
    if (null === c || 0 == c || "Non d\u00e9fini" == e) {
      return alert("Vous n'avez pas sp\u00e9cifi\u00e9 de topic de Mod\u00e9ration");
    }
    var a = JSON.parse(localStorage.getItem("Topic")) || [], d = JSON.parse(localStorage.getItem("Message")) || [];
    a = a.join("") + d.join("");
    "" === a ? alert("Rien \u00e0 poucave !") : 1 == confirm("Veux-tu poucave maintenant ?\n" + a) && window.open(c + "#pouc").focus();
  });
  f === c + "#pouc" && (a("#message_topic").focus().text(k.join("") + l.join("")), localStorage.removeItem("Topic"), localStorage.removeItem("Message"), a(".js-post-message").click());
});
