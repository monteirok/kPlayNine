import { config } from '../index';

export default class Zone {
    constructor(scene) {
        this.renderZone = () => {
            // store the value of the height of the scene
            const sceneHeight = config.height;
            // '700' & 'sceneHeight / 2' = the x/y coordinates of origin of the dropZone, and '900' & '250' = the width/height of the dropZone
            let dropZone = scene.add.zone(700, sceneHeight / 2, 900, 250).setRectangleDropZone(900, 250);
            dropZone.setData({ cards: 0 }); // refer to Phaser docs

            return dropZone;
        };

        // creates an outline around the dropZone
        this.renderOutline = (dropZone) => {
            let dropZoneOutline = scene.add.graphics();
            dropZoneOutline.lineStyle(4, 0xFF7043, 0.5);
            dropZoneOutline.strokeRoundedRect(dropZone.x - dropZone.input.hitArea.width / 2, dropZone.y - dropZone.input.hitArea.height / 2, dropZone.input.hitArea.width, dropZone.input.hitArea.height, 8);

            return dropZoneOutline;
        }
    }
}