// Configuração do jogo Phaser
const config = {
    type: Phaser.AUTO, // Tipo de renderização: AUTOMÁTICA (usando WebGL ou Canvas)
    width: 800, // Largura da tela do jogo
    height: 600, // Altura da tela do jogo
    physics: {
        default: "arcade", // Tipo de física utilizada no jogo
        arcade: {
            gravity: { y: 0 }, // Sem gravidade para um jogo visto de cima
            debug: false, // Desabilita a visualização de debug das colisões
        },
    },
    scene: {
        preload: preload, // Função chamada para carregar os recursos
        create: create, // Função chamada para criar os objetos do jogo
        update: update, // Função chamada a cada quadro para atualizar o estado do jogo
    },
};

const game = new Phaser.Game(config); // Criação do jogo com as configurações fornecidas
let player; // Variável que representará o jogador
let keys; // Variável para os controles de teclado
let table; // Variável não utilizada no código atual

// Função chamada para carregar os recursos do jogo
function preload() {
    this.load.image("background", "assets/mapa.png"); // Carrega a imagem do fundo
    this.load.image("obstacle", "assets/maquina-salgadinho.png"); // Carrega a imagem dos obstáculos
    this.load.spritesheet("player", "assets/player_spritesheet.png", { // Carrega a spritesheet do jogador
        frameWidth: 48, // Largura de cada quadro da spritesheet
        frameHeight: 46, // Altura de cada quadro da spritesheet
    });
}

// Função chamada para criar os objetos do jogo
function create() {
    // Adiciona o fundo à cena e ajusta a escala
    this.add.image(400, 300, "background").setScale(1.5);

    // Cria um grupo de obstáculos estáticos
    obstacles = this.physics.add.staticGroup({
        key: "obstacle", // Define o tipo de obstáculo
        setXY: { x: 200, y: 300, stepX: 15000 }, // Define a posição inicial e espaçamento entre os obstáculos
    });

    // Ajusta a posição, tamanho e escala de cada obstáculo
    obstacles.children.iterate(function (obstacle) {
        obstacle.setSize(42, 66).setOrigin(0.5, 0.4).setScale(1.2);
    });

    // Cria o jogador
    player = this.physics.add.sprite(400, 300, "player");
    player.setScale(1.4); // Ajusta a escala do jogador
    player.setSize(22, 12).setOrigin(0.5, 1); // Define o tamanho e a origem do jogador
    player.setOffset(14, 32); // Ajusta o offset do jogador para alinhar corretamente
    player.setCollideWorldBounds(true); // Impede que o jogador saia dos limites da tela

    // Adiciona colisões entre o jogador e os obstáculos
    this.physics.add.collider(player, obstacles);

    // Criação das animações para o jogador
    this.anims.create({
        key: "left", // Nome da animação
        frames: this.anims.generateFrameNumbers("player", { start: 4, end: 7 }), // Quais quadros da spritesheet usar
        frameRate: 10, // Velocidade da animação
        repeat: -1, // Repete a animação indefinidamente
    });

    this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("player", { start: 8, end: 11 }),
        frameRate: 10,
        repeat: -1,
    });

    this.anims.create({
        key: "up",
        frames: this.anims.generateFrameNumbers("player", { start: 12, end: 15 }),
        frameRate: 10,
        repeat: -1,
    });

    this.anims.create({
        key: "down",
        frames: this.anims.generateFrameNumbers("player", { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1,
    });

    // Mapeamento das teclas do teclado (WASD)
    keys = this.input.keyboard.addKeys({
        W: Phaser.Input.Keyboard.KeyCodes.W,
        A: Phaser.Input.Keyboard.KeyCodes.A,
        S: Phaser.Input.Keyboard.KeyCodes.S,
        D: Phaser.Input.Keyboard.KeyCodes.D,
    });
}

// Função chamada para atualizar o estado do jogo a cada quadro
function update() {
    player.setVelocity(0); // Reseta a velocidade do jogador a cada atualização

    // Movimentos do jogador para a esquerda e direita
    if (keys.A.isDown) {
        player.setVelocityX(-160); // Move o jogador para a esquerda
        player.anims.play("left", true); // Executa a animação "left"
    } else if (keys.D.isDown) {
        player.setVelocityX(160); // Move o jogador para a direita
        player.anims.play("right", true); // Executa a animação "right"
    }

    // Movimentos do jogador para cima e para baixo
    if (keys.W.isDown) {
        player.setVelocityY(-160); // Move o jogador para cima
        player.anims.play("up", true); // Executa a animação "up"
    } else if (keys.S.isDown) {
        player.setVelocityY(160); // Move o jogador para baixo
        player.anims.play("down", true); // Executa a animação "down"
    }

    // Se nenhuma tecla de direção for pressionada, para a animação
    if (!keys.W.isDown && !keys.A.isDown && !keys.S.isDown && !keys.D.isDown) {
        player.anims.stop(); // Para a animação
    }

    // Impede que o jogador ultrapasse o limite superior da tela (y < 150)
    if (player.y < 150) {
        player.setY(150); // Ajusta a posição do jogador para não ultrapassar 150 de y
    }

    // Impede que o jogador ultrapasse o limite inferior da tela (y > 490)
    if (player.y > 490) {
        player.setY(490); // Ajusta a posição do jogador para não ultrapassar 490 de y
    }
}
