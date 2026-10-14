interface PauseMenuOptions {
  onResume: () => void;
  onSettings: () => void;
  onHelp: () => void;
  onMainMenu: () => void;
}

export class PauseMenu {
  readonly id = "pause";
  readonly root: HTMLDivElement;

  constructor(private options: PauseMenuOptions) {
    this.root = document.createElement("div");
    this.root.className = "menu-screen";

    const title = document.createElement("h1");
    title.className = "menu-title";
    title.textContent = "일시 정지";
    this.root.appendChild(title);

    const resumeBtn = this.createButton("계속하기", this.options.onResume);
    resumeBtn.classList.add("menu-button-primary");
    const settingsBtn = this.createButton("설정", this.options.onSettings);
    const helpBtn = this.createButton("도움말", this.options.onHelp);
    const mainMenuBtn = this.createButton("메인 메뉴", this.options.onMainMenu);

    this.root.appendChild(resumeBtn);
    this.root.appendChild(settingsBtn);
    this.root.appendChild(helpBtn);
    this.root.appendChild(mainMenuBtn);
  }

  show(): void {
    this.root.classList.add("active");
  }

  hide(): void {
    this.root.classList.remove("active");
  }

  dispose(): void {
    this.root.remove();
  }

  private createButton(label: string, onClick: () => void): HTMLButtonElement {
    const btn = document.createElement("button");
    btn.className = "menu-button";
    btn.textContent = label;
    btn.addEventListener("click", onClick);
    return btn;
  }
}
