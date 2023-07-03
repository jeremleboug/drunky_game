var config = {
  type: Phaser.AUTO,
  width: 500,
  height: 300,
  parent: 'jeu-video',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 500 }, // Définissez la valeur de gravité souhaitée
      debug: false // Activez le mode débogage si nécessaire
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);
var intro_key = false; 
var imageBiere1; 
var imageBiere2; 
var imageBiere3; 
var i = 0;
var j = 0;
var temps_debut_de_jeu = Date.now();
var nombre_de_biere = 0;
var nombre_de_biere_remplie = 0;
var nombre_de_saut=0;
var boule1_x= 0;
var boule2_x= 0;
var perso_sol_x = 0;
var perso_sol_y = 0;
var cursors;
var jumpKey;
var pausekey;
var escKeyPressed = false;
var jeu_en_pause = false;
function preload() {
  this.load.image('background', 'image/background.png');
  this.load.image('background_intro', 'image/background_intro.png');
  this.load.image('perso', 'image/perso.png');
  this.load.image('perso_gauche', 'image/perso_gauche.png');
  this.load.image('easter_egg1', 'image/easter-egg1.png');
  this.load.image('plateforme1', 'image/plateforme1.png');
  this.load.image('plateforme2', 'image/plateforme2.png');
  this.load.image('plateforme3', 'image/plateforme3.png');
  this.load.image('plateforme4', 'image/plateforme4.png');
  this.load.image('plateforme5', 'image/plateforme5.png');
  this.load.image('depart', 'image/depart.png');
  this.load.image('fleche', 'image/fleche.png');
  this.load.image('fleche_haut', 'image/fleche_haut.png');
  this.load.image('pause', 'image/pause.png');
  this.load.image('boule1', 'image/boule1.png');
  this.load.image('biere', 'image/biere.png');
  this.load.image('biere_remplie', 'image/biere_remplie.png');
  //-----polices---------
  this.load.bitmapFont('Ysabeau', 'font/YsabeauInfant-Regular.ttf');
//------musiques------
this.load.audio('musique', 'musique/bess.mp3');
this.load.audio('musique_intro', 'musique/finaldrunk.mp3');
}
function pauseGame(duration) {
  // Mettre le jeu en pause
  this.game.pause();

  // Attendre la durée spécifiée en millisecondes
  setTimeout(() => {
    // Reprendre le jeu
    this.game.resume();
  }, duration);
}
function create_biere() {
  biere_remplie.create(1071, 66, 'biere_remplie');
  biere_remplie.create(1426, 1217, 'biere_remplie');
  biere.create(-917, 1266, 'biere');
  biere.create(-807, 1209, 'biere');
  biere.create(-230, 1018, 'biere');
  biere.create(1396, 116, 'biere');
  biere.create(1516, 116, 'biere');
}
function ramasserBiere(perso, biere) {
  nombre_de_biere++;
  biere.destroy();
}
function affichage_biere_remplie(perso, biere_remplie) {
  imageBiere1.setPosition(440, 20).setScrollFactor(0);
  imageBiere2.setPosition(450, 20).setScrollFactor(0);
  imageBiere3.setPosition(460, 20).setScrollFactor(0);

  if (nombre_de_biere_remplie == 1) {
    imageBiere1.setVisible(true);
    imageBiere2.setVisible(false);
    imageBiere3.setVisible(false);
  } else if (nombre_de_biere_remplie == 2) {
    imageBiere1.setVisible(true);
    imageBiere2.setVisible(true);
    imageBiere3.setVisible(false);
  } else if (nombre_de_biere_remplie >= 3) {
    imageBiere1.setVisible(true);
    imageBiere2.setVisible(true);
    imageBiere3.setVisible(true);
  }else {
    imageBiere1.setVisible(false);
    imageBiere2.setVisible(false);
    imageBiere3.setVisible(false);
  }
}
function ramasserBiere_remplie(perso, biere_remplie) {
  nombre_de_biere_remplie++;
  biere_remplie.destroy();
}
function create() {
  // Création des éléments du jeu (personnages, obstacles, etc.)
  //perso = this.physics.add.image(-2200, 1000, 'perso');
  perso = this.physics.add.image(1104, 0, 'perso');
  perso.setSize(15, 60);
  plateforme1 = this.physics.add.staticGroup();
  plateforme2 = this.physics.add.staticGroup();
  plateforme3 = this.physics.add.staticGroup();
  plateforme4 = this.physics.add.staticGroup();
  plateforme5 = this.physics.add.staticGroup();
  biere = this.physics.add.staticGroup();
  biere_remplie = this.physics.add.staticGroup();
  fleche = this.physics.add.staticGroup();
  fleche_haut = this.physics.add.staticGroup();
  depart = this.physics.add.staticGroup();
  easter_egg1 = this.add.image(2860, 1386, 'easter_egg1');
  background_intro = this.add.image(0, 0, 'background_intro');
  background = this.add.image(0, 0, 'background');
  imageBiere1 = this.add.image(perso.x, perso.y, 'biere_remplie');
  imageBiere2 = this.add.image(perso.x, perso.y, 'biere_remplie');
  imageBiere3 = this.add.image(perso.x, perso.y, 'biere_remplie');
  //-------police------
var Ysabeau1 = { fontFamily: 'Ysabeau', fontSize: '24px', fill: '#ffffff' };
var Ysabeau2 = { fontFamily: 'Ysabeau', fontSize: '6px', fill: '#ffffff' };
//-------------------

  background.setScale(4); 
  background_intro.setScale(4); 
  easter_egg1.setScale(3);
  intro_text = this.add.text(20,140, 'En ce jour tres funeste, Jacki le satisfait essayait \nde rentrer chez lui', Ysabeau1).setScrollFactor(0).setResolution(4).setVisible(false); 
  chapitre1text = this.add.text(120,100, '          CHAPITRE 1 \n\n Mais qu est ce que je fous la ?', Ysabeau1).setScrollFactor(0).setResolution(4).setVisible(false); 
  timeText = this.add.text(200,140, 'Temps de jeu : 0', Ysabeau2).setScrollFactor(0).setResolution(4); 
  jumpText = this.add.text(200,150, 'Sauts : 0', Ysabeau2).setScrollFactor(0).setResolution(4);
  biereText = this.add.text(200,160, 'bieres : 0', Ysabeau2).setScrollFactor(0).setResolution(4);
  var fpsText = this.add.text(0, 0, '0', Ysabeau1).setScrollFactor(0).setResolution(4);
  this.events.on('postupdate', function () {
    fpsText.setText(Math.round(this.game.loop.actualFps));
  }, this);
  //------------musique---------------------
musique_intro = this.sound.add('musique_intro', { loop: true });
musique = this.sound.add('musique', { loop: true });
//--------------plateforme----------------------
  plateforme1.create(-2200, 1100, 'plateforme1');
  plateforme1.create(-2000, 1000, 'plateforme1');
  plateforme1.create(-1500, 1000, 'plateforme1');
  plateforme1.create(-1000, 1300, 'plateforme1');
  plateforme1.create(-633, 1400, 'plateforme1');
  plateforme1.create(-403, 1250, 'plateforme1');
  plateforme1.create(-79, 1159, 'plateforme1');
  plateforme1.create(380, 1297, 'plateforme1');
  plateforme2.create(604, 1147, 'plateforme2');
  plateforme2.create(966, 1226, 'plateforme2');
  plateforme2.create(1250, 1071, 'plateforme2');
  plateforme2.create(1431, 1251, 'plateforme2');
  plateforme3.create(1731, 1251, 'plateforme3');
  plateforme3.create(1569, 821, 'plateforme3');
  plateforme3.create(1446, 683, 'plateforme3');
  plateforme1.create(1872, 426, 'plateforme1');
  plateforme4.create(2158, 295, 'plateforme4');
  plateforme4.create(2103, 137, 'plateforme4');

  plateforme4.create(1927, 150, 'plateforme4');
  plateforme4.create(1400, 150, 'plateforme4');
  plateforme4.create(1678, 150, 'plateforme4');
  plateforme1.create(1104, 100, 'plateforme1');
  plateforme1.create(2806, 1476, 'plateforme1');
  plateforme1.create(2956, 1476, 'plateforme1');
  plateforme5.create(749, 15, 'plateforme5');
  plateforme5.create(606, 15, 'plateforme5');
  plateforme5.create(460, 15, 'plateforme5');
  plateforme5.create(280, 15, 'plateforme5');

  //---------plateforme rotative----------------
  plateforme_rotative = this.physics.add.image(1888, 1122, 'plateforme3');
  plateforme_rotative2 = this.physics.add.image(2128, 988, 'plateforme3');
  plateforme_rotative3 = this.physics.add.image(1903, 890, 'plateforme3');
  //--------plateforme piege--------------------
  plateforme_piege1 = this.physics.add.image(2017, 23, 'plateforme4');
  plateforme_piege2 = this.physics.add.image(2017, 23, 'plateforme4');
  plateforme_piege3 = this.physics.add.image(2017, 23, 'plateforme4');
  //----------------boule-----------------------
  boule1 = this.physics.add.image(1888, 1122, 'boule1');
  boule2 = this.physics.add.image(0, 0, 'boule1');
  //--------------fleche---------------------------
fleche.create(-2000, 900, 'fleche');
fleche.create(1435, 605, 'fleche_haut');
fleche.create(1435, 455, 'fleche');
depart.create(-2200, 1000, 'depart');
  //-------------biere----------------------------
create_biere();
//--------------profondeur-----------------------
background.setDepth(-1);//profondeur du background
background_intro.setDepth(-2);
fleche.setDepth(0);
plateforme1.setDepth(1);
plateforme_rotative.setDepth(2);
boule1.setDepth(2);
perso.setDepth(2);
imageBiere1.setDepth(3);
imageBiere2.setDepth(3);
imageBiere3.setDepth(3);
timeText.setDepth(2);
intro_text.setDepth(11);
chapitre1text.setDepth(12);
//-----------------------------------------------
  this.physics.add.collider(perso, plateforme1);
  this.physics.add.collider(perso, plateforme2);
  this.physics.add.collider(perso, plateforme3);
  this.physics.add.collider(perso, plateforme4);
  this.physics.add.collider(perso, plateforme5);
  this.physics.add.overlap(perso, biere, ramasserBiere, null, this);
  this.physics.add.overlap(perso, biere_remplie, ramasserBiere_remplie, null, this);
  this.physics.add.collider(perso, plateforme_rotative);
  this.physics.add.collider(perso, plateforme_rotative2);
  this.physics.add.collider(perso, plateforme_rotative3);
  this.physics.add.collider(perso, boule1);
  this.physics.add.collider(perso, boule2);
  this.physics.add.collider(perso, plateforme_piege1);
  this.physics.add.collider(perso, plateforme_piege2);
  this.physics.add.collider(perso, plateforme_piege3);
  background.setScale(10);//taille du background
  background_intro.setScale(10);//taille du background
  // Activer les contrôles du personnage
  cursors = this.input.keyboard.createCursorKeys();
  jumpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  pausekey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
  this.cameras.main.startFollow(perso);//camera
  if(intro_key == false){  background_intro.setVisible(true);
    background_intro.setDepth(10);
    musique_intro.play();
    console.log(musique_intro);
    perso.setVelocity(0, 0);
    intro_text.setVisible(true);
    setTimeout(() => {
      intro_text.setVisible(false);
chapitre1text.setVisible(true);
    }, 4000);
    setTimeout(() => {
      chapitre1text.setVisible(false);

      musique_intro.stop();
      musique.play();
      background_intro.setVisible(false);
      background_intro.setDepth(-2);
      chapitre1text.setDepth(-2);
      intro_text.setDepth(-2);
      intro_key = true;
    }, 9000);}
}


function game_over() {
  if(nombre_de_biere_remplie <= 0){
    perso.setX(-2200);
    perso.setY(1000);
    //detruire les bieres
        // Destruction de toutes les bières
        biere.getChildren().forEach((item) => {
          item.destroy();
        });
        biere_remplie.getChildren().forEach((item) => {
          item.destroy();
        });
    //reinitialiser les bieres
create_biere();
  }else{
    nombre_de_biere_remplie--;
    perso.setX(perso_sol_x);
    perso.setY(perso_sol_y-92);
  }
}
function update() {
  affichage_biere_remplie(perso, biere_remplie);
  if (Phaser.Input.Keyboard.JustDown(pausekey)) {
    if (escKeyPressed) {
      // La touche "ESCAPE" a été enfoncée lors de la mise à jour précédente, marquer comme relâchée
      escKeyPressed = false;
    } else {
      // La touche "ESCAPE" vient d'être enfoncée, marquer comme enfoncée et basculer l'état de la pause
      escKeyPressed = true;
      jeu_en_pause = !jeu_en_pause;
      console.log(jeu_en_pause ? "PAUSE" : "RESUME");
    }
  }
  if (jeu_en_pause) {
    this.cameras.main.setZoom(4);
    var tempsDeJeuEnMillisecondes = Date.now() - temps_debut_de_jeu;
    var secondes = Math.floor((tempsDeJeuEnMillisecondes / 1000) % 60);
    var minutes = Math.floor((tempsDeJeuEnMillisecondes / (1000 * 60)) % 60);
    var heures = Math.floor((tempsDeJeuEnMillisecondes / (1000 * 60 * 60)) % 24);
    
    // Formater les valeurs en ajoutant des zéros devant si nécessaire
    var tempsFormatte = heures.toString().padStart(2, '0') + ':' +minutes.toString().padStart(2, '0') + ':' +secondes.toString().padStart(2, '0');
    timeText.setText('Temps de jeu : ' + tempsFormatte);
    timeText.setVisible(true);
    jumpText.setText('Sauts : ' + nombre_de_saut);
    jumpText.setVisible(true);
    biereText.setText('Bieres : ' + nombre_de_biere);
    biereText.setVisible(true);
    jeu_en_pause = true;
    this.physics.pause();
    perso.setVelocityX(0);
    perso.setVelocityY(0);
  } else {
    this.physics.resume();
    this.cameras.main.setZoom(1);
    timeText.setVisible(false);
    jumpText.setVisible(false);
    biereText.setVisible(false);
    // Logique de mise à jour du jeu (déplacement, collisions, etc.)
    if (cursors.left.isDown) {
      perso.setVelocityX(-200); // Déplacer vers la gauche
      perso.setTexture('perso_gauche');
    } else if (cursors.right.isDown) {
      perso.setVelocityX(200); // Déplacer vers la droite
      perso.setTexture('perso');
    } else {
      perso.setVelocityX(0); // Arrêter le déplacement horizontal
    }

    if (jumpKey.isDown && perso.body.touching.down) {
      nombre_de_saut++;
      perso_sol_x = perso.x;
      perso_sol_y = perso.y;
      perso.setVelocityY(-400); // Sauter si le personnage est en contact avec le sol
    }  
      //----------------plateforme rotative------------
  i=i+0.01;
  j=j+0.03;
  plateforme_rotative.setVelocity(0,0);
  plateforme_rotative.setPosition(1888,1122);
  plateforme_rotative.setRotation(32+i);

  plateforme_rotative2.setVelocity(0,0);
  plateforme_rotative2.setPosition(2128, 988);
  plateforme_rotative2.setRotation(32+i);

  plateforme_rotative3.setVelocity(0,0);
  plateforme_rotative3.setPosition(1903, 890);
  plateforme_rotative3.setRotation(32+j);
  //-----------------boule---------------------------
  boule1_x=boule1_x+3;
  boule2_x=boule2_x+6;

  if(boule1_x >1000){
    boule1_x = 0;
  }
  boule1.setVelocity(0,0);
  boule1.setPosition(1305+boule1_x, 811);

  if(boule2_x >2000){
    boule2_x = 0;
  }
  boule2.setVelocity(0,0);
  boule2.setPosition(boule2_x, 593);

  if ((this.physics.overlap(perso, boule1)) ||(this.physics.overlap(perso, boule2))) {
    game_over();
  }
  console.log(perso.body.x, perso.body.y);
  }
  //---------------------plateforme piege------------------

if ((this.physics.overlap(perso, plateforme_piege1)) ||(this.physics.overlap(perso, plateforme_piege2)) ||(this.physics.overlap(perso, plateforme_piege3))) {
  pauseGame(3000);
  plateforme_piege1.setVelocity(0,0);
  perso.setPosition(perso.x, 203);
  plateforme_piege2.setVelocity(0,0);
  perso.setPosition(perso.x, 203);
  plateforme_piege3.setVelocity(0,0);
  perso.setPosition(perso.x, 203);

}else{
plateforme_piege1.setVelocity(0,0);
plateforme_piege2.setVelocity(0,0);
plateforme_piege3.setVelocity(0,0);
plateforme_piege1.setPosition(1814, 150);
plateforme_piege2.setPosition(1522, 150);
plateforme_piege3.setPosition(1222, 50);
}
//gameover limite
  if (perso.y > 1500) {
game_over();
  }
}
