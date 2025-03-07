import { Player, Vector3 } from "alt-client";
import * as native from "natives";

class Raycast {
    static line(scale, flags, ignoreEntity) {
        this.rayCastFlag = flags;
        
        // Kamera-Position und Rotation holen
        const camPos = native.getGameplayCamCoord();
        const camRot = native.getGameplayCamRot(0);
        
        // Richtungsvektor aus Kamerarotation berechnen
        const direction = this.rotationToDirection(camRot);
        
        // Zielposition berechnen
        const targetPos = new Vector3(
            camPos.x + direction.x * scale,
            camPos.y + direction.y * scale,
            camPos.z + direction.z * scale
        );

        // Raycast durchführen
        let ray = native.startExpensiveSynchronousShapeTestLosProbe(
            camPos.x,
            camPos.y,
            camPos.z,
            targetPos.x,
            targetPos.y,
            targetPos.z,
            flags,
            ignoreEntity,
            4
        );

        return this.result(ray);
    }

    // Hilfsfunktion zur Umrechnung von Rotation in Richtungsvektor
    static rotationToDirection(rotation) {
        const z = rotation.z * (Math.PI / 180.0);
        const x = rotation.x * (Math.PI / 180.0);
        const num = Math.abs(Math.cos(x));

        return new Vector3(
            (-Math.sin(z) * num),
            (Math.cos(z) * num),
            Math.sin(x)
        );
    }

    static getTargetPos(entityVector, forwardVector) {
        return new Vector3(
            entityVector.x + forwardVector.x,
            entityVector.y + forwardVector.y,
            entityVector.z + forwardVector.z
        );
    }

    static result(ray) {
        let result = native.getShapeTestResultIncludingMaterial(
            ray,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined
        );

        let hitEntity = result[5];
        
        if (this.rayCastFlag === 1) {
            return {
                isHit: result[1],
                pos: new Vector3(result[2].x, result[2].y, result[2].z),
                hitEntity,
                entityType: native.getEntityType(hitEntity),
                entityHash: result[4],
                entityMaterial: result[4],
            };
        } else {
            return {
                isHit: result[1],
                pos: new Vector3(result[2].x, result[2].y, result[2].z),
                hitEntity,
                entityType: native.getEntityType(hitEntity),
                entityHash: native.getEntityModel(hitEntity),
                entityMaterial: result[4],
            };
        }
    }
}

export default Raycast;