import Card from '../helpers/card';
import Zone from '../helpers/zone';
import { config } from '../index';

// exporting (creating) a new class called 'Game' that extends the 'scene' class that already exists within Phaser
export default class Game extends Phaser.Scene {
    // defines a constructor with a reference to the 'super'
    constructor() {
        super({
            // when Phaser accesses this class, it knows the key for this class is 'Game'
            key: 'Game'
        });
    }

    /**
     * FUNCTIONS:
     *     - preload(): preloads everything necessary to make the game work (i.e., assets)
     *     - create(): called at the beginning of the game and is what populates most of the stuff in the game
     *     - update(): updated every frame, important for detecting input, or do things that happen all throughout
     *                 the game, or, i.e., you want the computer to be watching for actions throughout the course of the game
     */
    preload() {
        // load card assets
        this.load.image('cyanCardFront', 'src/assets/CyanCardFront.png');
        this.load.image('cyanCardBack', 'src/assets/CyanCardBack.png');
        this.load.image('magentaCardFront', 'src/assets/MagentaCardFront.png');
        this.load.image('magentaCardBack', 'src/assets/MagentaCardBack.png');
    }

    create() {
        // allows access to 'this' (the game scene) within the other functions (don't have to worry about the scope of those functions)
        let self = this;

        // create a new instance of the 'dropZone' class and pass it to the scene (this)
        this.zone = new Zone(this);
        // render the dropZone
        this.dropZone = this.zone.renderZone();
        // render an outline for the dropZone
        this.outline = this.zone.renderOutline(this.dropZone);

        /**
         * dealCards() Function
         */
        this.dealCards = () => {
            // deals out 8 cards
            for (let i = 0; i < 8; i++) {
                // assign a new instance of the 'Card' class to 'playerCard' and pass it to 'this', which is the scene 
                let playerCard = new Card(this);
                // render cards 100px apart from each other
                playerCard.render(275 + (i*100), 650, 'cyanCardFront');
            }
        }

        // store the value of the height of the scene
        const sceneHeight = config.height;
        // the expression 'sceneHeight / 2 - (32 / 2)' vertically centers 'dealText', where '32' is the value of the its font size
        const verticallyCenteredDealTextHeight = sceneHeight / 2 - (32 / 2);
        // create the 'DEAL CARDS' text that functions similar to a button -- allows the user to deal cards onto the screen
        this.dealText = this.add.text(20, verticallyCenteredDealTextHeight, ['DEAL CARDS']).setFontSize(32).setFontFamily('Arial').setFontStyle('bold').setColor('#c6c6c6e8').setInteractive();

        // executes dealCards() when 'dealText' is clicked (pointer down)
        this.dealText.on('pointerdown', function () {
            self.dealCards();
        })

        // changes color of 'dealText' on hover (pointer over) -- shows user that this text is clickable
        this.dealText.on('pointerover', function () {
            self.dealText.setColor('#9e9e9e');
            self.dealText.setScale(.98);
            self.dealText.setX(22);
        })

        // resets the color of 'dealText' after hover (pointer out)
        this.dealText.on('pointerout', function () {
            self.dealText.setColor('#c6c6c6e8');
            self.dealText.setScale(1);
            self.dealText.setX(20);
        })

        // highlights the outer edges of a card when it's dragged to inform the user that they've selected it
        this.input.on('dragstart', function (pointer, gameObject) {
            gameObject.setTint(0xFF7043);
            // allows the highlight to render over other objects in the scene
            self.children.bringToTop(gameObject);
        })

        // un-highlights the outer edges of a card when it's dropped (no longer being dragged)
        this.input.on('dragend', function (pointer, gameObject) {
            // removes the tint
            gameObject.setTint();
        })

        // enable the draggable functionality for the cards
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            // when a gameObject is dragged, the X and Y coordinates of that gameObject should be equal to the X and Y coordinates of the dragging event
            gameObject.x = dragX;
            gameObject.y = dragY;
        })
    }

    // **unused** -- game logic doesn't depend on it (good for platformer games, or other games that might spend a lot of time in the update function)
    update() {

    }
}