class intro extends Phaser.Scene {
    constructor(){
        super("scene_intro");
    }

    create(){
        this.add.text(20, 20, "loading");
        console.log("test1");
        this.scene.start("game");
        setTimeout(() => {
        }, 3000);
    }
}
