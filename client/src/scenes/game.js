import Card from '../helpers/card';
import Zone from '../helpers/zone';
import { config } from '../index';
import io from 'socket.io-client';

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
         * SERVER
         */
        // create a connection to 3000
        // this.socket = io('http://localhost:3000');
        this.socket = io('http://localhost:3000', {transports: ['websocket', 'polling', 'flashsocket']}); // had to add 'transports' to get it to work

        this.socket.on('connect', function () {
           console.log('Connected!');
        });

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

        // create the 'DEAL CARDS' text that functions similar to a button -- deals cards onto the screen when clicked
        this.dealText = this.add.text(22, verticallyCenteredDealTextHeight, ['DEAL CARDS']).setFontSize(42).setFontFamily('Arial').setFontStyle('bold').setColor('#ced7e6').setPadding(2).setInteractive();

        /**
         * dealText FUNCTIONALITY
         */
        // executes dealCards() when 'dealText' is clicked (pointer down)
        this.dealText.on('pointerdown', function () {
            self.dealCards();
        })
        // changes color of 'dealText' on hover (pointer over) -- shows user that this text is clickable
        this.dealText.on('pointerover', function () {
            // self.dealText.setColor('#b6c4d9');
            self.dealText.setColor('#ced7e6b6');
            self.dealText.setScale(.97);
            self.dealText.setX(25);
        })
        // resets the color of 'dealText' after hover (pointer out)
        this.dealText.on('pointerout', function () {
            self.dealText.setColor('#ced7e6');
            self.dealText.setScale(1);
            self.dealText.setX(22);
        })

        /**
         * 'card highlights' when selected FUNCTIONALITY
         */
        // highlights the outer edges of a card when it's dragged to inform the user that they've selected it
        this.input.on('dragstart', function (pointer, gameObject) {
            gameObject.setTint(0x5bfff1);
            // allows the highlight to render over other objects in the scene
            self.children.bringToTop(gameObject);
        })
        // un-highlights the outer edges of a card when it's dropped (no longer being dragged)
        this.input.on('dragend', function (pointer, gameObject, dropped) {
            // removes the tint
            gameObject.setTint();

            // if card isn't dropped in a drop zone, return it to its origin
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        })

        /**
         * enables dragable FUNCTIONALITY
         */
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            // when a gameObject is dragged, the X and Y coordinates of that gameObject should be equal to the X and Y coordinates of the dragging event
            gameObject.x = dragX;
            gameObject.y = dragY;
        })

        /**
         * dropZone FUNCTIONALITY
         */
        this.input.on('drop', function (pointer, gameObject, dropZone) {
            // calculate the row index
            var rowIndex = Math.floor(dropZone.data.values.cards / 4);
            // calculate the column index
            var colIndex = dropZone.data.values.cards % 4;
        
            // increment the card value within the drop zone data
            dropZone.data.values.cards++;
        
            // center the cards (x/y coordinates) inside the drop zone
            gameObject.x = (dropZone.x - 265) + (colIndex * 175);
            gameObject.y = dropZone.y + (rowIndex * 110);

            // decrease the y-coordinate of the first row to vertically center the cards within the drop zone
            if (rowIndex === 0) {
                gameObject.y -= 113;
            }

            gameObject.disableInteractive();
        })
    }

    // **unused** -- game logic doesn't depend on it (good for platformer games, or other games that might spend a lot of time in the update function)
    update() {

    }
}