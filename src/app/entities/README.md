# 📦 entities - 핵심 비즈니스 개체

이 레이어는 프로젝트의 **핵심 데이터 단위(비즈니스 개체)** 를 정의합니다. 예를 들어 `User`, `Post`, `Product`, `Comment` 등이 여기에 해당합니다.

## 🎯 핵심 역할

* 애플리케이션의 중심이 되는 데이터의 구조와 관련 코드를 한 곳에 모아 관리합니다.
* 데이터를 표현하는 순수한 UI 컴포넌트(e.g., `UserAvatar`, `PostCard`)를 포함합니다.

## 📁 폴더 구조 (예시: `Post` 엔티티)

```bash
entities/
└── post/
    ├── api/          # Post 관련 API 요청 함수 (getPost, getPosts, ...)
    ├── model/        # Post 데이터 타입(interface/type), 상태 관리 로직(Zustand, Jotai)
    ├── ui/           # Post 데이터를 받아 순수하게 보여주는 UI 컴포넌트 (PostCard.tsx, PostAuthor.tsx)
    └── index.ts      # 외부로 노출할 모듈을 export (Public API)
```

## ✍️ 작성 규칙

* **독립성**: `entities`는 오직 `shared` 레이어에만 의존할 수 있습니다. `features`나 `widgets`를 import해서는 안 됩니다.
* **순수함**: `entities`의 UI 컴포넌트는 `props`로 받은 데이터를 화면에 보여주는 역할에만 집중해야 합니다. 자체적으로 상태를 가지거나 API를 호출하지 않습니다.
* **재사용성**: 여기서 만든 `PostCard`는 게시글 목록, 인기 게시글 위젯 등 다양한 곳에서 재사용될 수 있어야 합니다.

## ❌ 금지 사항

* 다른 엔티티를 직접 import하지 마세요. (e.g., `post` 엔티티가 `user` 엔티티를 직접 import 하는 것은 금지. ID를 통해 연결)
* 비즈니스 로직(e.g., '좋아요 누르기', '친구 추가하기')을 포함시키지 마세요. 이는 `features`의 역할입니다.