import { Game, GAME_STATE } from './game';
import { BLOCK_TYPE } from './map';

export class User {
    public game: Game;

    public biscuitsGettedCoords: any[];
    public pillsGettedCoords: any[];

    public biscuitsGetted: number;
    public pillsGetted: number;

    constructor(game: Game) {
        this.game = game;

        this.reset();
    }

    private reset() {
        this.biscuitsGettedCoords = [];
        this.pillsGettedCoords = [];
    };

    public setBiscuitGetted(i: number, j: number) {
        if (!this.biscuitIsGetted(i, j)) {
            this.biscuitsGettedCoords.push({ i, j });
            this.updateScores();
        }
    }

    public setPillGetted(i: number, j: number) {
        if (!this.pillIsGetted(i, j)) {
            this.pillsGettedCoords.push({ i, j });
            this.game.onPacGettedPill();
            this.updateScores();
        }
    }

    public biscuitIsGetted(i: number, j: number) {
        var exists = false;

        for (var coord of this.biscuitsGettedCoords) {
            if (coord.i === i && coord.j === j) {
                exists = true;
                break;
            }
        }

        return exists;
    }

    public pillIsGetted(i: number, j: number) {
        var exists = false;

        for (var coord of this.pillsGettedCoords) {
            if (coord.i === i && coord.j === j) {
                exists = true;
                break;
            }
        }

        return exists;
    }

    private createWindowElement(id: string) {
        let windowEl = document.createElement('div');
        windowEl.id = id;
        windowEl.className = 'suspended-window animated fadeIn';
        return windowEl;
    }

    private removeWindowElement(id: string) {
        let loseWindowEl = document.getElementById(id);
        if (loseWindowEl) {
            loseWindowEl.classList.remove('fadeIn');
            loseWindowEl.classList.add('fadeOut');
    
            setTimeout(() => loseWindowEl.remove(), 500);
        }
    }

    public showLooseWindow() {
        let loseWindowEl = this.createWindowElement('lose-window');
        loseWindowEl.innerHTML = 
        `
            <section class="animated flipInX">
                <h4>Você perdeu!</h4>

                <p>
                    Você não conseguiu pegar todas as coins<br/>
                    antes que os fantasmas lhe pegassem.
                </p>

                <button class="yellow">
                    Botões do jogo
                </button>

                <button>
                    Jogar novamente!
                </button>

                <button class="out-line">
                    Fechar
                </button>
            </section>
        `;

        document.body.prepend(loseWindowEl);
		Array.from(loseWindowEl.querySelectorAll('button')).forEach((btn, i) => {
			if (i === 0) {
				btn.onclick = this.showHowToPlayWindow.bind(this);
			}
			if (i === 1) {
				btn.onclick = this.game.restart.bind(this.game);
			}
			if (i === 2) {
				btn.onclick = () => {
					this.closeAllOpenedWindows();
					this.game.close();
				}
			}
		});
    }

    public closeLooseWindow() {
        this.removeWindowElement('lose-window');
    }

    public showStartGameWindow() {
        let startWindowEl = this.createWindowElement('start-game-window');
        startWindowEl.innerHTML = 
        `
            <section class="animated zoomIn">
                <p>
                    Fuja dos fantasmas e pegue todas as <i>coins</i><br/>
                    que encontrar pelo caminho.
                </p>

                <button>
                    Jogar
                </button>

                <button class="yellow">
                    Botões do jogo
                </button>

                <button class="out-line">
                    Fechar
                </button>
            </section>
        `;

        document.body.prepend(startWindowEl);
		Array.from(startWindowEl.querySelectorAll('button')).forEach((btn, i) => {
			if (i === 0) {
				btn.onclick = this.game.resume.bind(this.game);
			}
			if (i === 1) {
				btn.onclick = this.showHowToPlayWindow.bind(this);
			}
			if (i === 2) {
				btn.onclick = () => {
					this.closeAllOpenedWindows();
					this.game.close();
				}
			}
		});
    }

    public closeStartGameWindow() {
        this.removeWindowElement('start-game-window');
    }

    public showWinGameWindow() {
        let winWindowEl = this.createWindowElement('start-game-window');
        winWindowEl.innerHTML = 
        `
            <section class="animated flipInX">
                <h1>Você ganhou!!</h1>

                <p>
                    Parabéns! Você pegou todas as coins antes mesmo
                    que os fantasmas o pegassem.
                </p>

                <button>
                    Jogar novamente
                </button>

                <button class="out-line">
                    Fechar
                </button>
            </section>
        `;

        document.body.prepend(winWindowEl);
		Array.from(winWindowEl.querySelectorAll('button')).forEach((btn, i) => {
			if (i === 0) {
				btn.onclick = this.game.start.bind(this.game);
			}
			if (i === 1) {
				btn.onclick = () => {
					this.closeAllOpenedWindows();
					this.game.close();
				}
			}
		});
    }

    public closeWinGameWindow() {
        this.removeWindowElement('start-game-window');
    }

    public showHowToPlayWindow() {
        this.closeAllOpenedWindows();

        let howToPlayWindowEl = this.createWindowElement('how-to-play-window');

        let button = '';
        if (this.game.state === GAME_STATE.GHOST_FOUND_PAC)
            button = `
            <button>
                Jogar novamente
            </button>`;
        else
            button = `
            <button>
                Jogar
            </button>`;

        howToPlayWindowEl.innerHTML = 
        `
            <section class="animated zoomIn">
                <h4>Botões do jogo</h4>

                <ul>
                    <li>
                        <i class="key key-up"></i>
                        <span>Move para <strong>CIMA</strong></span>
                    </li>
                    <li>
                        <i class="key key-down"></i>
                        <span>Move para <strong>BAIXO</strong></span>
                    </li>
                    <li>
                        <i class="key key-left"></i>
                        <span>Move para <strong>ESQUERDA</strong></span>
                    </li>
                    <li>
                        <i class="key key-right"></i>
                        <span>Move para <strong>DIREITA</strong></span>
                    </li>
                </ul>

                ${button}

                <button class="out-line">
                    Fechar
                </button>
            </section>
        `;
		
        document.body.prepend(howToPlayWindowEl);
		Array.from(howToPlayWindowEl.querySelectorAll('button')).forEach((btn, i) => {
			if (i === 0) {
				btn.onclick = (this.game.state === GAME_STATE.GHOST_FOUND_PAC ? this.game.restart : this.game.resume).bind(this.game);
			}
			if (i === 1) {
				btn.onclick = () => {
					this.closeAllOpenedWindows();
					this.game.close();
				}
			}
		});
    }

    public closeHowToPlayWindow() {
        this.removeWindowElement('how-to-play-window');
    }

    public closeAllOpenedWindows() {
        this.closeLooseWindow();
        this.closeStartGameWindow();
        this.closeHowToPlayWindow();
    }

    private gettedAllBiscuitsAndPills() {
        let allBiscuits = this.game.map.matriz.map((item, index) => {
            return this.game.map.matriz[index].filter((x) => x === BLOCK_TYPE.BISCUIT).length;
        }).reduce((prev, curr) => prev + curr, 0);

        let allPills = this.game.map.matriz.map((item, index) => {
            return this.game.map.matriz[index].filter((x) => x === BLOCK_TYPE.PILL).length;
        }).reduce((prev, curr) => prev + curr, 0);

        return allBiscuits === this.biscuitsGetted && allPills === this.pillsGetted;
    }

    private updateScores() {
        this.biscuitsGetted = this.biscuitsGettedCoords.length;
        this.pillsGetted = this.pillsGettedCoords.length;

        if (this.gettedAllBiscuitsAndPills()) {
            this.game.stop();
            this.showWinGameWindow();
        }
    };
}