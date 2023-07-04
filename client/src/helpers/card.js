export default class Card {
    constructor(scene) {
        // renders the sprite (in this case, the card) at the specified X and Y coordinates
        this.render = (x, y, sprite) => {
            // create a new sprite object (card object) and sets its position at the specified X and Y coordinates
            let card = scene.add.image(x, y, sprite).setScale(0.28, 0.28).setInteractive();
            scene.input.setDraggable(card);

            return card;
        }
    }
}