"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var scenes;
(function (scenes) {
    var Play = /** @class */ (function (_super) {
        __extends(Play, _super);
        // private _ocean?: objects.Ocean;
        // private _plane?: objects.Plane;
        // private _island?: objects.Island;
        // private _cloudNumber:number;
        // private _clouds?: objects.Cloud[];
        // private _scoreBoard: managers.ScoreBoard;
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Play() {
            var _this = _super.call(this) || this;
            _this._labelColor = "#FFFF00";
            _this._maxNoOfEnemies = 3;
            _this._noOfEnemies = _this._maxNoOfEnemies;
            _this._bossBattle = false;
            _this._spawningBoss = false;
            _this._warningLabelPlaced = false;
            _this._warningLabelFlash = false;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        //initialize and instatiate
        Play.prototype.Start = function () {
            config.Game.CURRENT_SCENE = this;
            this._backgroundTheme = createjs.Sound.play("background_theme");
            this._backgroundTheme.loop = -1; // loop forever
            this._backgroundTheme.volume = 0.05; // 10% volume
            this._forest = new objects.Forest();
            this._player = new objects.Player();
            this._labelArea = this.DrawRectangle(0, 0, config.Game.SCREEN_WIDTH, 50, "#000000");
            this._labelArea.alpha = 0.5;
            this._lifeLabel = new objects.Label("Life: " + this._player.Life, "20px", "Consolas", this._labelColor, 0, 0, false);
            this._bombsLabel = new objects.Label("Bombs: " + this._player.BombCount, "20px", "Consolas", this._labelColor, 0, 25, false);
            this._scoreLabel = new objects.Label("Score: " + this._player.Score, "20px", "Consolas", this._labelColor, config.Game.SCREEN_WIDTH / 2, 0, false);
            this._enemies = new Array();
            var anEnemy = new objects.BabyDragon(config.Game.ASSETS.getResult("baby_dragon_green"), -100, -100);
            anEnemy.Speed = 0;
            this._enemies.push(anEnemy);
            for (var i = 0; i < this._maxNoOfEnemies; i++) {
                this._enemies.push(new objects.BabyDragon(config.Game.ASSETS.getResult("baby_dragon_green"), Math.floor(util.Mathf.RandomRange(500, 1200)), Math.floor(util.Mathf.RandomRange(50, 400))));
                this._noOfEnemies--;
            }
            this._explosions = new Array();
            // this._ocean = new objects.Ocean();
            // this._plane = new objects.Plane();
            // this._island = new objects.Island();
            // this._cloudNumber = config.Game.CLOUD_NUM;
            // this._clouds = new Array<objects.Cloud>();
            // // create an array of cloud objects
            // for (let index = 0; index < this._cloudNumber; index++) 
            // {
            //     this._clouds[index] = new objects.Cloud();             
            // }
            // this._scoreBoard = new managers.ScoreBoard();
            // config.Game.SCORE_BOARD = this._scoreBoard;
            this.Main();
        };
        Play.prototype.Update = function () {
            var _this = this;
            if (!this._spawningBoss) {
                if (!this._bossBattle) {
                    if (this._noOfEnemies == 0 && this._enemies.length == 1) {
                        this._bossBattle = true;
                        console.log('BOSS BATTLE');
                        this._backgroundTheme.stop();
                        this._backgroundTheme = createjs.Sound.play("boss_theme");
                        this._backgroundTheme.loop = -1;
                        this._backgroundTheme.volume = 0.05;
                        // spawn boss
                        this._boss = new objects.DragonBoss(config.Game.ASSETS.getResult("dragon_boss_idle1"), config.Game.SCREEN_WIDTH + 100, config.Game.SCREEN_HEIGHT / 2);
                        this._enemies.push(this._boss);
                        this.addChild(this._boss);
                        this._spawningBoss = true;
                    }
                }
                this._forest.Update();
                this._player.Update();
                if (this._boss != null) {
                    this._boss.Update();
                    //console.log("BOSS HP: " + this._boss.Life); 
                    // ALL BOSS ATTACK UPDATES HERE
                    // boss monster spawns
                    this._boss.Spawns.forEach(function (spawn) {
                        _this._enemies.push(spawn);
                        _this.addChild(spawn);
                        _this._boss.Spawns.splice(_this._boss.Spawns.indexOf(spawn), 1);
                    });
                    // boss fire balls
                }
                this._enemies.forEach(function (enemy) {
                    if (!_this._player.Invincible) {
                        managers.Collision.AABBCheck(_this._player, enemy);
                    }
                    _this._player.ThrowingStars.forEach(function (star) {
                        managers.Collision.AABBCheck(star, enemy);
                        if (enemy.isColliding) {
                            star.Impact();
                            enemy.isColliding = false;
                        }
                        if (star.alpha <= 0) {
                            _this.removeChild(star);
                            _this._player.ThrowingStars.splice(_this._player.ThrowingStars.indexOf(star), 1);
                        }
                    });
                    _this._player.Bombs.forEach(function (bomb) {
                        managers.Collision.AABBCheck(bomb, enemy);
                        if (bomb.Exploded) {
                            var explosion = new objects.Explosion(bomb.x, bomb.y, bomb.Damage);
                            _this._explosions.push(explosion);
                            _this.addChild(explosion);
                        }
                        if (bomb.alpha <= 0) {
                            _this.removeChild(bomb);
                            _this._player.Bombs.splice(_this._player.Bombs.indexOf(bomb), 1);
                        }
                    });
                    _this._explosions.forEach(function (explosion) {
                        managers.Collision.AABBCheck(explosion, enemy);
                    });
                    enemy.Update();
                    if (enemy.IsDead) {
                        _this._enemies.splice(_this._enemies.indexOf(enemy), 1);
                        _this.removeChild(enemy);
                        console.log(_this._enemies.length);
                        _this._player.Score += enemy.Points;
                    }
                    if (enemy.IsOffScreen()) {
                        _this._enemies.splice(_this._enemies.indexOf(enemy), 1);
                        _this.removeChild(enemy);
                        console.log(_this._enemies.length);
                    }
                });
                this._explosions.forEach(function (explosion) {
                    explosion.Update();
                    if (explosion.alpha <= 0) {
                        _this.removeChild(explosion);
                        _this._explosions.splice(_this._explosions.indexOf(explosion), 1);
                    }
                });
                if (this._explosions.length <= 0) {
                    this._enemies.forEach(function (enemy) {
                        enemy.HitByExplosion = false;
                    });
                }
                this.UpdateLabels();
            }
            else {
                // spawning boss
                if (this._boss.x >= config.Game.SCREEN_WIDTH - 105) {
                    if (!this._warningLabelPlaced) {
                        this._warningLabel = new objects.Label("WARNING!!!", "80px", "Consolas", "red", config.Game.SCREEN_WIDTH / 2, config.Game.SCREEN_HEIGHT / 2, true);
                        this.addChild(this._warningLabel);
                        this._warningLabelPlaced = true;
                    }
                    else {
                        this.removeChild(this._warningLabel);
                        if (!this._warningLabelFlash) {
                            this._warningLabel.alpha -= 0.1;
                        }
                        else {
                            this._warningLabel.alpha += 0.1;
                        }
                        if (this._warningLabel.alpha <= 0 || this._warningLabel.alpha >= 1) {
                            this._warningLabelFlash = !this._warningLabelFlash;
                        }
                        this.addChild(this._warningLabel);
                    }
                    this._boss.Update();
                    this._boss.position = new objects.Vector2(this._boss.x - 0.5, this._boss.y);
                }
                else {
                    this._spawningBoss = false;
                    this.removeChild(this._warningLabel);
                    this._boss.StartBattle = true;
                }
            }
        };
        Play.prototype.Main = function () {
            var _this = this;
            this.addChild(this._forest);
            this.addChild(this._player);
            this._enemies.forEach(function (enemy) {
                _this.addChild(enemy);
            });
            this.addChild(this._labelArea);
            this.addChild(this._lifeLabel);
            this.addChild(this._bombsLabel);
            // this.addChild(this._ocean);
            // this.addChild(this._island);
            // this.addChild(this._plane);
            // this._clouds.forEach(cloud => {
            //     this.addChild(cloud);
            // });
            // this.addChild(this._scoreBoard.LivesLabel);
            // this.addChild(this._scoreBoard.ScoreLabel);
        };
        Play.prototype.UpdateLabels = function () {
            this.removeChild(this._lifeLabel);
            this.removeChild(this._bombsLabel);
            this.removeChild(this._scoreLabel);
            this._lifeLabel = new objects.Label("Life: " + this._player.Life, "20px", "Consolas", this._labelColor, 0, 0, false);
            this._bombsLabel = new objects.Label("Bombs: " + this._player.BombCount, "20px", "Consolas", this._labelColor, 0, 25, false);
            this._scoreLabel = new objects.Label("Score: " + this._player.Score, "20px", "Consolas", this._labelColor, config.Game.SCREEN_WIDTH / 2, 0, false);
            this.addChild(this._lifeLabel);
            this.addChild(this._bombsLabel);
            this.addChild(this._scoreLabel);
        };
        Play.prototype.DrawRectangle = function (x, y, w, h, color) {
            var shape = new createjs.Shape();
            shape.graphics.beginFill(color);
            shape.graphics.drawRect(x, y, w, h);
            shape.graphics.endFill();
            return shape;
        };
        Play.prototype.Clean = function () {
            // this._plane.engineSound.stop();
            this.removeAllChildren();
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=Play.js.map