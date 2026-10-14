interface HelpMenuOptions {
  onBack: () => void;
}

interface KeyBinding {
  key: string;
  description: string;
}

export class HelpMenu {
  readonly id = "help";
  readonly root: HTMLDivElement;

  constructor(private options: HelpMenuOptions) {
    this.root = document.createElement("div");
    this.root.className = "menu-screen help-menu";

    const title = document.createElement("h1");
    title.className = "menu-title";
    title.textContent = "조작과 도움말";
    this.root.appendChild(title);

    const content = document.createElement("div");
    content.className = "help-content";
    this.root.appendChild(content);

    const movement: KeyBinding[] = [
      { key: "W A S D", description: "이동" },
      { key: "↑ ↓ ← →", description: "이동 (방향키)" },
      { key: "Space", description: "점프 / 이단 점프" },
      { key: "C", description: "앉기" },
      { key: "Shift", description: "달리기" },
      { key: "W / S", description: "사다리 오르내리기" },
    ];

    const interaction: KeyBinding[] = [
      { key: "F", description: "상호작용 / 잡기" },
      { key: "LMB", description: "던지기 / 기본 동작" },
      { key: "E", description: "고도 올리기" },
      { key: "Q", description: "고도 내리기" },
    ];

    const cameraSystem: KeyBinding[] = [
      { key: "Mouse", description: "둘러보기" },
      { key: "Scroll", description: "카메라 확대·축소" },
      { key: "Escape", description: "일시 정지 메뉴" },
      { key: "`", description: "디버그 패널" },
      { key: "F1", description: "레벨 편집기" },
      { key: "F6", description: "그래픽 프로필 전환" },
    ];

    content.appendChild(this.createBindingSection("이동", movement));
    content.appendChild(this.createBindingSection("상호작용", interaction));
    content.appendChild(this.createBindingSection("카메라와 시스템", cameraSystem));

    const backBtn = document.createElement("button");
    backBtn.className = "menu-button";
    backBtn.textContent = "뒤로";
    backBtn.addEventListener("click", () => this.options.onBack());
    this.root.appendChild(backBtn);
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

  private createBindingSection(title: string, bindings: KeyBinding[]): HTMLDivElement {
    const section = document.createElement("div");
    section.className = "help-section";

    const header = document.createElement("h3");
    header.className = "menu-section-header";
    header.textContent = title;
    section.appendChild(header);

    const grid = document.createElement("div");
    grid.className = "help-bindings-grid";

    for (const binding of bindings) {
      const keyCell = document.createElement("div");
      keyCell.className = "help-key-cell";

      const keys = binding.key.split(" / ");
      for (let i = 0; i < keys.length; i++) {
        const kbd = document.createElement("kbd");
        kbd.className = "help-key";
        kbd.textContent = keys[i];
        keyCell.appendChild(kbd);
        if (i < keys.length - 1) {
          const sep = document.createTextNode(" / ");
          keyCell.appendChild(sep);
        }
      }

      const descCell = document.createElement("div");
      descCell.className = "help-desc-cell";
      descCell.textContent = binding.description;

      grid.appendChild(keyCell);
      grid.appendChild(descCell);
    }

    section.appendChild(grid);
    return section;
  }
}
