# Marvel Challenge

## Demo

Please, check the video below to see the app in action.

<iframe width="640" height="360" src="https://www.loom.com/embed/0f28fef2ae9a4da39d4d955de0708592?sid=41f0a205-6d7f-4c28-8f47-e47b2de308d6" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

## Architecture

The project is built with React, TypeScript, and Tailwind CSS.

It follows an hexagonal architecture, with a clear separation of concerns.

The main folder is `src`, which contains the following folders:

- `components`: Contains the UI components. The core components are:
  - [`app.icon.tsx`](src/components/ui/app.icon.tsx): Contains the app icon component to display the app icon (marvel or dragon ball).
  - [`character-favorite.button.tsx`](src/components/ui/character-favorite.button.tsx): Contains the character favorite button component to add or remove a character from the favorites list.
  - [`character.card.tsx`](src/components/ui/character.card.tsx): Contains the character card component to display a character inside the list.
  - [`character.list.tsx`](src/components/ui/character.list.tsx): Contains the character list component to display the list of characters. Uses css grid to display the characters.
  - [`favorites.icon.tsx`](src/components/ui/favorites.icon.tsx): Contains the favorites icon component to display the favorites icon in the header.
  - [`header.tsx`](src/components/ui/header.tsx): Contains the header component to display the header of the app. It contains the app icon, the favorites icon and the toggle mode button.
  - [`hover.tab.tsx`](src/components/ui/hover.tab.tsx): Contains the hover tab component to display the hover tab in the character card. Manages the transition when hovering the card.
- `contexts`: Contains the context providers.
  - `character`: Contains the character context.
    - `domain`: Contains the character domain logic.
      - [`character-api.context.ts`](src/contexts/character/domain/character-api.context.ts): Contains the character API context.
      - [`character-apperance.ts`](src/contexts/character/domain/character-apperance.ts): Contains the character appearance logic.
      - [`character.api.ts`](src/contexts/character/domain/character.api.ts): Contains the character API.
      - [`character.ts`](src/contexts/character/domain/character.ts): Contains the character domain logic.
      - [`mockApiContext.ts`](src/contexts/character/domain/mockApiContext.ts): Contains the mock API context to use for testings
      - [`use-character.api.context.ts`](src/contexts/character/domain/use-character.api.context.ts): Contains the use character API context.
    - `hooks`: Contains the character hooks. It contains the use cases for each context.
      - `characters`: Contains hooks related to character data.
        - [`useCharacters.ts`](src/contexts/character/hooks/characters/useCharacters.ts): Contains the logic for fetching and managing character data.
      - `favorites`: Contains hooks related to favorite characters.
        - [`favorites.context.tsx`](src/contexts/character/hooks/favorites/favorites.context.tsx): Provides the context for managing favorite characters.
        - [`favorites.provider.tsx`](src/contexts/character/hooks/favorites/favorites.provider.tsx): Provides the provider for the favorites context.
        - [`useFavorites.tsx`](src/contexts/character/hooks/favorites/useFavorites.tsx): Contains logic for managing favorite characters.
        - [`useFavoritesContext.tsx`](src/contexts/character/hooks/favorites/useFavoritesContext.tsx): Provides a hook to access the favorites context.
    - `infrastructure`: Contains the character infrastructure logic. It contains the API providers and hooks.
      - [`character-api.provider.tsx`](src/contexts/character/infrastructure/character-api.provider.tsx): Contains the character API provider.
      - [`dragon-ball-character.api.ts`](src/contexts/character/infrastructure/dragon-ball-character.api.ts): Contains the Dragon Ball character API.
      - [`marvel-character.api.ts`](src/contexts/character/infrastructure/marvel-character.api.ts): Contains the Marvel character API.
      - [`use-character.api.ts`](src/contexts/character/infrastructure/use-character.api.ts): Contains the character API hook.
- `screens`: Contains the screens of the app. All the screens use the [`screen component`](src/screens/screen.tsx) component. The screen component is a wrapper that contains the header and the content.
  - [`character.screen.tsx`](src/screens/character.screen.tsx): Use to display an individual character.
  - [`home.screen.tsx`](src/screens/home.screen.tsx): Use to display the home screen with the list of characters and the search bar.

## Setup and run
 - Install dependencies
```bash
yarn install
```

- Run the development server
```bash
yarn dev
```

- Run the tests
```bash
yarn test
```

- Run the production build
```bash
yarn build
```

