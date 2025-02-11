
// Configuração do jogo Phaser
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }, // Sem gravidade para jogo visto de cima
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
let player;
let keys;
let obstacles;

function preload() {
    this.load.image('background', 'assets/mapa.png');
    this.load.image('obstacle', 'assets/obstaculo.png');
    this.load.spritesheet('player', 'assets/player_spritesheet.png', { frameWidth: 48, frameHeight: 46 });
}

function create() {
    // Adiciona o fundo
    this.add.image(400, 300, 'background');

    //grupo de obstáculos
        obstacles = this.physics.add.staticGroup({
            key: 'obstacle',
            setXY: { x: 400, y: 300, stepX: 15000}
        });

        obstacles.children.iterate(function (obstacle) {
            obstacle.setSize(32, 32).setOrigin(0.5);
        });

        // Jogador
    player = this.physics.add.sprite(400, 300, 'player');
    player.setScale(1.4);
    player.setCollideWorldBounds(true);

     // Colisão entre o jogador e os obstáculos
    this.physics.add.collider(player, obstacles);

    // Animações para o jogador
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 8, end: 11 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('player', { start: 12, end: 15 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    // Controles do teclado (WASD)
    keys = this.input.keyboard.addKeys({
        W: Phaser.Input.Keyboard.KeyCodes.W,
        A: Phaser.Input.Keyboard.KeyCodes.A,
        S: Phaser.Input.Keyboard.KeyCodes.S,
        D: Phaser.Input.Keyboard.KeyCodes.D
    })
}

function update() {
    player.setVelocity(0);

    if (keys.A.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    } else if (keys.D.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
    }

    if (keys.W.isDown) {
        player.setVelocityY(-160);
        player.anims.play('up', true);
    } else if (keys.S.isDown) {
        player.setVelocityY(160);
        player.anims.play('down', true);
    }

    if (!keys.W.isDown && !keys.A.isDown && !keys.S.isDown && !keys.D.isDown) {
        player.anims.stop();
    }
}