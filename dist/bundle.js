/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/index.ts","vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PIXI = __webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/index.js");
var gsap = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");
var TweenMax = gsap.TweenMax;
var width = 900;
var height = 600;
var app = new PIXI.Application({
    width: width,
    height: height,
    antialias: true,
});
var appContainer = document.getElementById("app_container");
appContainer.appendChild(app.view);
function loadAssets() {
    PIXI.loader
        .add("assets/buzz.png")
        .add("assets/bulldog.png")
        .load(run);
}
var Player = /** @class */ (function () {
    function Player(ticker) {
        var _this = this;
        this.sprite_scale = .06;
        this.jumping = false;
        this.axis = "y";
        this.direction = -1;
        this.gravity = 1;
        this.power = 24;
        this.createSprite = function () {
            var texture = PIXI.loader.resources["assets/buzz.png"].texture;
            texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
            var sprite = new PIXI.Sprite(texture);
            sprite.pivot.set(sprite.width / 2, sprite.height / 2);
            sprite.position.set(width / 6, height - (sprite.height * _this.sprite_scale) / 2);
            sprite.scale.set(_this.sprite_scale);
            app.stage.addChild(sprite);
            return sprite;
        };
        this.jump = function (event) {
            if ((event.code && event.code === "Space") || (event.pointerId && event.pointerId == 1)) {
                if (_this.jumping)
                    return;
                _this.jumping = true;
                var time_1 = 0;
                var tick_1 = function (deltaMs) {
                    var jumpHeight = (-_this.gravity / 2) * Math.pow(time_1, 2) + _this.power * time_1;
                    if (jumpHeight < 0) {
                        _this.jumping = false;
                        _this.ticker.remove(tick_1);
                        _this.sprite[_this.axis] = _this.jumpAt;
                        return;
                    }
                    _this.sprite[_this.axis] = _this.jumpAt + (jumpHeight * _this.direction);
                    time_1 += deltaMs;
                };
                _this.ticker.add(tick_1);
                _this.ticker.start();
            }
        };
        this.sprite = this.createSprite();
        this.ticker = ticker;
        this.jumpAt = this.sprite[this.axis];
    }
    return Player;
}());
var Obstacles = /** @class */ (function () {
    function Obstacles(player, ticker) {
        var _this = this;
        this.obstacles = Array();
        this.collisionDetector = function (obstacle) {
            var ob = obstacle.sprite;
            var p = _this.player.sprite;
            return (ob.x + ob.width > p.x &&
                ob.x < p.x + p.width &&
                ob.y + ob.height > p.y &&
                ob.y < p.y + p.height);
        };
        this.player = player;
        // Should probobstaclely keep track of time alive, and increase obstacle speed based on that
        // Probobstaclely want to have multiple obstacles
        var tick = function () {
            if (_this.obstacles.length == 0) {
                // Adds new obstacles
                var ob = new Obstacle(ticker);
                _this.obstacles.push(ob);
            }
            else {
                // Removes old obstacles
                var i = _this.obstacles.length;
                while (i--) {
                    if (_this.collisionDetector(_this.obstacles[i])) {
                        location.reload(); // Tests if there was a collision and ends the game, we should show the leaderboard at this point!
                        return;
                    }
                    else if (_this.obstacles[i].toDelete) {
                        _this.obstacles.splice(i, 1);
                    }
                }
            }
        };
        ticker.add(tick);
        ticker.start();
    }
    return Obstacles;
}());
var Obstacle = /** @class */ (function () {
    function Obstacle(ticker) {
        var _this = this;
        this.sprite_scale = .08;
        this.toDelete = false; // How we tell if we should delete the obstacle once it's off screen!
        this.createSprite = function () {
            var texture = PIXI.loader.resources["assets/bulldog.png"].texture;
            texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
            var sprite = new PIXI.Sprite(texture);
            sprite.pivot.set(sprite.width / 2, sprite.height / 2);
            sprite.position.set(width, height - (sprite.height * _this.sprite_scale) / 2);
            sprite.scale.set(_this.sprite_scale);
            app.stage.addChild(sprite);
            return sprite;
        };
        this.move = function () {
            var tick = function () {
                if (_this.sprite.position.x + (_this.sprite.width) < 0) {
                    _this.toDelete = true;
                    _this.ticker.remove(tick);
                    return;
                }
                else {
                    _this.sprite.position.x -= 2;
                }
            };
            _this.ticker.add(tick);
            _this.ticker.start();
        };
        this.sprite = this.createSprite();
        this.ticker = ticker;
        this.move();
    }
    return Obstacle;
}());
function run() {
    var ticker = new PIXI.ticker.Ticker();
    var player = new Player(ticker);
    var game_obstacles = new Obstacles(player, ticker);
    document.addEventListener('keydown', player.jump);
    app.view.addEventListener('click', player.jump);
}
loadAssets();


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLFFBQVEsb0JBQW9CO1FBQzVCO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsaUJBQWlCLDRCQUE0QjtRQUM3QztRQUNBO1FBQ0Esa0JBQWtCLDJCQUEyQjtRQUM3QztRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGdCQUFnQix1QkFBdUI7UUFDdkM7OztRQUdBO1FBQ0E7UUFDQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDdkphO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsV0FBVyxtQkFBTyxDQUFDLG9EQUFTO0FBQzVCLFdBQVcsbUJBQU8sQ0FBQywwQ0FBTTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwibWFpblwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFtcIi4vc3JjL2luZGV4LnRzXCIsXCJ2ZW5kb3Jzfm1haW5cIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgUElYSSA9IHJlcXVpcmUoXCJwaXhpLmpzXCIpO1xyXG52YXIgZ3NhcCA9IHJlcXVpcmUoXCJnc2FwXCIpO1xyXG52YXIgVHdlZW5NYXggPSBnc2FwLlR3ZWVuTWF4O1xyXG52YXIgd2lkdGggPSA5MDA7XHJcbnZhciBoZWlnaHQgPSA2MDA7XHJcbnZhciBhcHAgPSBuZXcgUElYSS5BcHBsaWNhdGlvbih7XHJcbiAgICB3aWR0aDogd2lkdGgsXHJcbiAgICBoZWlnaHQ6IGhlaWdodCxcclxuICAgIGFudGlhbGlhczogdHJ1ZSxcclxufSk7XHJcbnZhciBhcHBDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFwcF9jb250YWluZXJcIik7XHJcbmFwcENvbnRhaW5lci5hcHBlbmRDaGlsZChhcHAudmlldyk7XHJcbmZ1bmN0aW9uIGxvYWRBc3NldHMoKSB7XHJcbiAgICBQSVhJLmxvYWRlclxyXG4gICAgICAgIC5hZGQoXCJhc3NldHMvYnV6ei5wbmdcIilcclxuICAgICAgICAuYWRkKFwiYXNzZXRzL2J1bGxkb2cucG5nXCIpXHJcbiAgICAgICAgLmxvYWQocnVuKTtcclxufVxyXG52YXIgUGxheWVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gUGxheWVyKHRpY2tlcikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5zcHJpdGVfc2NhbGUgPSAuMDY7XHJcbiAgICAgICAgdGhpcy5qdW1waW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5heGlzID0gXCJ5XCI7XHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAtMTtcclxuICAgICAgICB0aGlzLmdyYXZpdHkgPSAxO1xyXG4gICAgICAgIHRoaXMucG93ZXIgPSAyNDtcclxuICAgICAgICB0aGlzLmNyZWF0ZVNwcml0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHRleHR1cmUgPSBQSVhJLmxvYWRlci5yZXNvdXJjZXNbXCJhc3NldHMvYnV6ei5wbmdcIl0udGV4dHVyZTtcclxuICAgICAgICAgICAgdGV4dHVyZS5iYXNlVGV4dHVyZS5zY2FsZU1vZGUgPSBQSVhJLlNDQUxFX01PREVTLk5FQVJFU1Q7XHJcbiAgICAgICAgICAgIHZhciBzcHJpdGUgPSBuZXcgUElYSS5TcHJpdGUodGV4dHVyZSk7XHJcbiAgICAgICAgICAgIHNwcml0ZS5waXZvdC5zZXQoc3ByaXRlLndpZHRoIC8gMiwgc3ByaXRlLmhlaWdodCAvIDIpO1xyXG4gICAgICAgICAgICBzcHJpdGUucG9zaXRpb24uc2V0KHdpZHRoIC8gNiwgaGVpZ2h0IC0gKHNwcml0ZS5oZWlnaHQgKiBfdGhpcy5zcHJpdGVfc2NhbGUpIC8gMik7XHJcbiAgICAgICAgICAgIHNwcml0ZS5zY2FsZS5zZXQoX3RoaXMuc3ByaXRlX3NjYWxlKTtcclxuICAgICAgICAgICAgYXBwLnN0YWdlLmFkZENoaWxkKHNwcml0ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBzcHJpdGU7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmp1bXAgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKChldmVudC5jb2RlICYmIGV2ZW50LmNvZGUgPT09IFwiU3BhY2VcIikgfHwgKGV2ZW50LnBvaW50ZXJJZCAmJiBldmVudC5wb2ludGVySWQgPT0gMSkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5qdW1waW5nKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIF90aGlzLmp1bXBpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRpbWVfMSA9IDA7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGlja18xID0gZnVuY3Rpb24gKGRlbHRhTXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIganVtcEhlaWdodCA9ICgtX3RoaXMuZ3Jhdml0eSAvIDIpICogTWF0aC5wb3codGltZV8xLCAyKSArIF90aGlzLnBvd2VyICogdGltZV8xO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChqdW1wSGVpZ2h0IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5qdW1waW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnRpY2tlci5yZW1vdmUodGlja18xKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuc3ByaXRlW190aGlzLmF4aXNdID0gX3RoaXMuanVtcEF0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNwcml0ZVtfdGhpcy5heGlzXSA9IF90aGlzLmp1bXBBdCArIChqdW1wSGVpZ2h0ICogX3RoaXMuZGlyZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB0aW1lXzEgKz0gZGVsdGFNcztcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBfdGhpcy50aWNrZXIuYWRkKHRpY2tfMSk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy50aWNrZXIuc3RhcnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zcHJpdGUgPSB0aGlzLmNyZWF0ZVNwcml0ZSgpO1xyXG4gICAgICAgIHRoaXMudGlja2VyID0gdGlja2VyO1xyXG4gICAgICAgIHRoaXMuanVtcEF0ID0gdGhpcy5zcHJpdGVbdGhpcy5heGlzXTtcclxuICAgIH1cclxuICAgIHJldHVybiBQbGF5ZXI7XHJcbn0oKSk7XHJcbnZhciBPYnN0YWNsZXMgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBPYnN0YWNsZXMocGxheWVyLCB0aWNrZXIpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMub2JzdGFjbGVzID0gQXJyYXkoKTtcclxuICAgICAgICB0aGlzLmNvbGxpc2lvbkRldGVjdG9yID0gZnVuY3Rpb24gKG9ic3RhY2xlKSB7XHJcbiAgICAgICAgICAgIHZhciBvYiA9IG9ic3RhY2xlLnNwcml0ZTtcclxuICAgICAgICAgICAgdmFyIHAgPSBfdGhpcy5wbGF5ZXIuc3ByaXRlO1xyXG4gICAgICAgICAgICByZXR1cm4gKG9iLnggKyBvYi53aWR0aCA+IHAueCAmJlxyXG4gICAgICAgICAgICAgICAgb2IueCA8IHAueCArIHAud2lkdGggJiZcclxuICAgICAgICAgICAgICAgIG9iLnkgKyBvYi5oZWlnaHQgPiBwLnkgJiZcclxuICAgICAgICAgICAgICAgIG9iLnkgPCBwLnkgKyBwLmhlaWdodCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnBsYXllciA9IHBsYXllcjtcclxuICAgICAgICAvLyBTaG91bGQgcHJvYm9ic3RhY2xlbHkga2VlcCB0cmFjayBvZiB0aW1lIGFsaXZlLCBhbmQgaW5jcmVhc2Ugb2JzdGFjbGUgc3BlZWQgYmFzZWQgb24gdGhhdFxyXG4gICAgICAgIC8vIFByb2JvYnN0YWNsZWx5IHdhbnQgdG8gaGF2ZSBtdWx0aXBsZSBvYnN0YWNsZXNcclxuICAgICAgICB2YXIgdGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKF90aGlzLm9ic3RhY2xlcy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgLy8gQWRkcyBuZXcgb2JzdGFjbGVzXHJcbiAgICAgICAgICAgICAgICB2YXIgb2IgPSBuZXcgT2JzdGFjbGUodGlja2VyKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLm9ic3RhY2xlcy5wdXNoKG9iKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIFJlbW92ZXMgb2xkIG9ic3RhY2xlc1xyXG4gICAgICAgICAgICAgICAgdmFyIGkgPSBfdGhpcy5vYnN0YWNsZXMubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKGktLSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5jb2xsaXNpb25EZXRlY3RvcihfdGhpcy5vYnN0YWNsZXNbaV0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpOyAvLyBUZXN0cyBpZiB0aGVyZSB3YXMgYSBjb2xsaXNpb24gYW5kIGVuZHMgdGhlIGdhbWUsIHdlIHNob3VsZCBzaG93IHRoZSBsZWFkZXJib2FyZCBhdCB0aGlzIHBvaW50IVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKF90aGlzLm9ic3RhY2xlc1tpXS50b0RlbGV0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vYnN0YWNsZXMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGlja2VyLmFkZCh0aWNrKTtcclxuICAgICAgICB0aWNrZXIuc3RhcnQoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBPYnN0YWNsZXM7XHJcbn0oKSk7XHJcbnZhciBPYnN0YWNsZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIE9ic3RhY2xlKHRpY2tlcikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5zcHJpdGVfc2NhbGUgPSAuMDg7XHJcbiAgICAgICAgdGhpcy50b0RlbGV0ZSA9IGZhbHNlOyAvLyBIb3cgd2UgdGVsbCBpZiB3ZSBzaG91bGQgZGVsZXRlIHRoZSBvYnN0YWNsZSBvbmNlIGl0J3Mgb2ZmIHNjcmVlbiFcclxuICAgICAgICB0aGlzLmNyZWF0ZVNwcml0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHRleHR1cmUgPSBQSVhJLmxvYWRlci5yZXNvdXJjZXNbXCJhc3NldHMvYnVsbGRvZy5wbmdcIl0udGV4dHVyZTtcclxuICAgICAgICAgICAgdGV4dHVyZS5iYXNlVGV4dHVyZS5zY2FsZU1vZGUgPSBQSVhJLlNDQUxFX01PREVTLk5FQVJFU1Q7XHJcbiAgICAgICAgICAgIHZhciBzcHJpdGUgPSBuZXcgUElYSS5TcHJpdGUodGV4dHVyZSk7XHJcbiAgICAgICAgICAgIHNwcml0ZS5waXZvdC5zZXQoc3ByaXRlLndpZHRoIC8gMiwgc3ByaXRlLmhlaWdodCAvIDIpO1xyXG4gICAgICAgICAgICBzcHJpdGUucG9zaXRpb24uc2V0KHdpZHRoLCBoZWlnaHQgLSAoc3ByaXRlLmhlaWdodCAqIF90aGlzLnNwcml0ZV9zY2FsZSkgLyAyKTtcclxuICAgICAgICAgICAgc3ByaXRlLnNjYWxlLnNldChfdGhpcy5zcHJpdGVfc2NhbGUpO1xyXG4gICAgICAgICAgICBhcHAuc3RhZ2UuYWRkQ2hpbGQoc3ByaXRlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHNwcml0ZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMubW92ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHRpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMuc3ByaXRlLnBvc2l0aW9uLnggKyAoX3RoaXMuc3ByaXRlLndpZHRoKSA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy50b0RlbGV0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMudGlja2VyLnJlbW92ZSh0aWNrKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zcHJpdGUucG9zaXRpb24ueCAtPSAyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBfdGhpcy50aWNrZXIuYWRkKHRpY2spO1xyXG4gICAgICAgICAgICBfdGhpcy50aWNrZXIuc3RhcnQoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc3ByaXRlID0gdGhpcy5jcmVhdGVTcHJpdGUoKTtcclxuICAgICAgICB0aGlzLnRpY2tlciA9IHRpY2tlcjtcclxuICAgICAgICB0aGlzLm1vdmUoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBPYnN0YWNsZTtcclxufSgpKTtcclxuZnVuY3Rpb24gcnVuKCkge1xyXG4gICAgdmFyIHRpY2tlciA9IG5ldyBQSVhJLnRpY2tlci5UaWNrZXIoKTtcclxuICAgIHZhciBwbGF5ZXIgPSBuZXcgUGxheWVyKHRpY2tlcik7XHJcbiAgICB2YXIgZ2FtZV9vYnN0YWNsZXMgPSBuZXcgT2JzdGFjbGVzKHBsYXllciwgdGlja2VyKTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBwbGF5ZXIuanVtcCk7XHJcbiAgICBhcHAudmlldy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYXllci5qdW1wKTtcclxufVxyXG5sb2FkQXNzZXRzKCk7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=