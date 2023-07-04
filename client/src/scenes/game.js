import Card from '../helpers/card';

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

        // create 'deal cards' text that functions similar to a button -- allows the user to deal cards onto the screen
        this.dealText = this.add.text(75, 350, ['DEAL CARDS']).setFontSize(32).setFontFamily('Arial').setFontStyle('bold').setColor('#EE6C4D').setInteractive();

        // executes dealCards() when 'dealText' is clicked (pointer down)
        this.dealText.on('pointerdown', function () {
            self.dealCards();
        })

        // changes color of 'dealText' on hover (pointer over) -- shows user that this text is clickable
        this.dealText.on('pointerover', function () {
            self.dealText.setColor('#F39882');
        })

        // resets the color of 'dealText' after hover (pointer out)
        this.dealText.on('pointerout', function () {
            self.dealText.setColor('#EE6C4D');
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