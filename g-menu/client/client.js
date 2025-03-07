import * as alt from "alt-client";
import * as game from "natives";
import Raycast from "./includes/raycast.js";
import { vehicles as VehicleList } from "./includes/vehicles.js";

let view = null;
let targetEntity = null;
let menuVisible = false;

// WebView erstellen
function createView() {
  if (!view) {
    view = new alt.WebView("http://resource/client/html/index.html");
    view.focus();

    // Event-Handler für UI-Aktionen
    view.on("performAction", handleAction);
  }
}

function toggleMenu() {
  if (!targetEntity) return;

  if (!menuVisible) {
    if (!view) createView();
    view.emit("setMenuState", true); // ← WICHTIG
    view.emit("showMenu");
    alt.showCursor(true);
    alt.toggleGameControls(false);
  } else {
    view.emit("setMenuState", false); // ← WICHTIG
    view.emit("hideMenu");
    alt.showCursor(false);
    alt.toggleGameControls(true);
  }
  menuVisible = !menuVisible;
}

// Tastendruck-Handler
alt.on("keyup", (key) => {
  if (key === 71) {
    // 71 = G
    toggleMenu();
  }
});

// Aktions-Handler für UI-Interaktionen
function handleAction(action) {
  if (!targetEntity) return;

  const targetPlayer = alt.Player.getByScriptID(targetEntity);
  if (!targetPlayer) return;

  switch (action) {
    case "give-money":
      alt.emitServer("g-menu:giveMoney", targetPlayer);
      break;
    case "trade":
      alt.emitServer("g-menu:trade", targetPlayer);
      break;
    case "shake-hands":
      alt.emitServer("g-menu:shakeHands", targetPlayer);
      break;
    case "open-documents":
      // Schließe das Hauptmenü und öffne das Dokumentenmenü
      view.emit("hideMenu");
      view.emit("openDocumentRing");
      break;
    // Weitere Aktionen hier implementieren
  }
}

// Bestehender Raycast-Code
alt.everyTick(() => {
  const raycastResult = Raycast.line(10, 4, alt.Player.local.scriptID);

  if (raycastResult.isHit && raycastResult.entityType === 1) {
    targetEntity = raycastResult.hitEntity;
    const targetPos = game.getEntityCoords(targetEntity, false);
    drawCircle(targetPos, 0.5, 5, [68, 0, 97, 90]);
  } else {
    if (targetEntity === null) return;
    targetEntity = null;
    if (menuVisible) toggleMenu();
  }
});

function drawCircle(position, radius, thickness, color) {
  const numSegments = 128; // Verdoppelt die Segmentanzahl für Glätte
  const step = (Math.PI * 2) / numSegments;
  const verticalOffset = -0.95; // Grundhöhe über dem Boden
  
  // Neue Parameter für die Linienoptimierung
  const radiusStep = 0.0; // Vergrößerter Radius-Schritt
  const thicknessMultiplier = 3.5; // Dichte der Überlappung
  const heightStep = 0.0005; // Neue Variable
  
  for (let t = 0; t < thickness * thicknessMultiplier; t++) {
    const currentRadius = radius + t * radiusStep;
    const currentHeight = position.z + verticalOffset + t * 0.001;
    
    for (let i = 0; i < numSegments; i++) {
      const angle1 = step * i;
      const angle2 = step * (i + 1);

      // Punkte für das aktuelle Segment berechnen
      const x1 = position.x + Math.cos(angle1) * currentRadius;
      const y1 = position.y + Math.sin(angle1) * currentRadius;
      
      const x2 = position.x + Math.cos(angle2) * currentRadius;
      const y2 = position.y + Math.sin(angle2) * currentRadius;

      // Linie mit angepasster Höhe zeichnen
      game.drawLine(
        x1, y1, currentHeight,
        x2, y2, currentHeight,
        color[0], color[1], color[2],
        Math.max(180, color[3] - t * 1) // Alpha-Anpassung für Tiefenwirkung
      );
      
      // Zusätzliche überlappende Linien für Lückenschluss
      if (i % 3 === 0) {
        const midAngle = (angle1 + angle2) / 2;
        const x3 = position.x + Math.cos(midAngle) * currentRadius;
        const y3 = position.y + Math.sin(midAngle) * currentRadius;
        
        game.drawLine(
          x1, y1, currentHeight,
          x3, y3, currentHeight,
          color[0], color[1], color[2],
          color[3] * 0.7
        );
      }
    }
  }
}
