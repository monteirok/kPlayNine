import Phaser from 'phaser';
import Game from './scenes/game';

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1280,
    height: 780,
    backgroundColor: '#1C222D',
    scene: [
        Game
    ]
};

const game = new Phaser.Game(config);

// export the 'config' object so the values of it's variables can be accessed within other files
export { config };