import * as alt from "alt-server";

// Geld geben
alt.onClient("g-menu:giveMoney", (player, targetPlayer) => {
  // Implementiere hier die Logik für Geldtransfer
  // Beispiel:
  // if (player.cash >= amount) {
  //     player.cash -= amount;
  //     targetPlayer.cash += amount;
  // }
});

// Handel starten
alt.onClient("g-menu:trade", (player, targetPlayer) => {
  // Implementiere hier die Handels-Logik
  alt.emitClient(targetPlayer, "g-menu:tradeRequest", player);
});

// Hände schütteln Animation
alt.onClient("g-menu:shakeHands", (player, targetPlayer) => {
  // Implementiere hier die Animation
  alt.emitClient(player, "playAnimation", "handshake");
  alt.emitClient(targetPlayer, "playAnimation", "handshake");
});

// Weitere Server-seitige Event-Handler hier implementieren
