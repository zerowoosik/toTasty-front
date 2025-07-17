# 🧩 widgets - 독립적인 UI 블록

이 레이어는 여러 `features`나 `entities`를 묶어 **의미 있는 하나의 독립적인 UI 블록**을 만듭니다. 여러 페이지에서 재사용될 수 있는 복합 컴포넌트 영역입니다.

## 🎯 핵심 역할

- 페이지의 구체적인 컨텍스트와는 독립적으로 작동하는 UI 영역을 캡슐화합니다. (e.g., Header, Footer, Sidebar, PostList)
- 여러 하위 레이어의 컴포넌트들을 조합하여 하나의 완성된 위젯을 제공합니다.

## 📁 폴더 구조 (예시: `Header` 위젯)

```bash
widgets/
    └── header/
        └── ui/           # Header 컴포넌트 (Header.tsx)
        └── index.ts      # 외부로 노출할 모듈을 export
```

## 폴더 및 파일명 규칙

- **폴더** : 폴더 이름은 kebab case로 작성한다.
- **파일** : 파일 이름은 .tsx 와 같은 컴포넌트 단위인 경우 Pascal case로 작성하고, .ts와 같은 기능 단위는 camel case로 작성한다.

## ✍️ 작성 규칙

- **조합과 배치**: `features`와 `entities`의 컴포넌트를 가져와 의미에 맞게 조합하고 배치하는 역할을 합니다.
  - **예시**: `Header` 위젯은 `Logo`(entity), `Navigation`(entity), `LoginButton`(feature), `SearchForm`(feature) 등을 조합하여 만들어집니다.
- **의존성**: `features`, `entities`, `shared` 레이어에 의존할 수 있습니다.
- **독립성**: 위젯은 어느 페이지에 갖다 놓아도 스스로 동작할 수 있어야 합니다.

## ❌ 금지 사항

- 다른 `widget`을 직접 import하지 마세요. 위젯 간의 조합은 상위 레이어인 `pages`에서 이루어져야 합니다.
- 페이지 전체의 레이아웃을 책임지지 않습니다. 위젯은 페이지의 '부품'일 뿐입니다.
