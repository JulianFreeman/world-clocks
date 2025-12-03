# World Clock Web Application Specification

Please generate a modern, responsive "World Clock" web application based on the following detailed requirements.

## Core Features & Layout

1.  **Row-Based Layout**:
    *   The application should display a vertical list of cities.
    *   Each row represents one city and consists of two main sections: a **City Label** on the left and a **Time Timeline** on the right.

2.  **City Label**:
    *   Displayed on the left side of each row.
    *   **Format**: "Country, City UTC +Offset" (e.g., "China, Beijing UTC +0800").

3.  **Timeline Visualization**:
    *   The timeline should span approximately **3 days** (Yesterday, Today, Tomorrow).
    *   The current viewing time should be centered in the viewport.
    *   Clear markers for hours/days should be visible.

4.  **Vertical Time Indicator**:
    *   A distinct vertical line must run through the center of the screen, intersecting all city timelines.
    *   At the intersection point of the line and each timeline, display the specific **Date and Time** for that city corresponding to the pointer's position.

## Interactivity

5.  **Synchronized Time Scrubbing**:
    *   Users can click and drag the timeline area horizontally.
    *   Dragging should move **all** city timelines synchronously, allowing the user to simulate and view times in the past or future across all zones simultaneously.

6.  **"Back to Now" Control**:
    *   A button (e.g., "Current Time") to instantly reset the view and scroll the timelines back to the current real-time system clock.

7.  **Reordering**:
    *   Support **Drag-and-Drop** functionality for the rows, allowing users to manually reorder the list of cities.

## Customization & Persistence

8.  **City Management**:
    *   **Default**: On first load, automatically detect and display the user's local system time zone/city.
    *   **Add City**: A mechanism (e.g., modal or dropdown) to add new cities.
    *   **Data Source**: Provide a comprehensive list of common world cities.
    *   **Option Format**: The selection list should also follow the "Country, City UTC +Offset" format.

9.  **Local Storage**:
    *   Persist the user's selected cities and their sort order in the browser's `localStorage`.
    *   The app should restore this state upon reloading.

## Styling & Theme

10. **Theming**:
    *   Support both **Light** and **Dark** modes.
    *   Include a toggle switch or follow system preferences.

11. **Design Aesthetic**:
    *   The interface should be **modern, clean, and aesthetic**.
    *   Use smooth animations for scrolling and dragging interactions.
    *   Ensure good contrast and readability for the text overlaying the timelines.

## Tech Stack Context
*   **Framework**: Vue 3 (Composition API) + TypeScript + Vite.
*   **State Management**: Vue Reactive state (or Pinia if necessary).
*   **Styling**: CSS / SCSS / Tailwind (whichever fits the existing project best).
*   **Time Handling**: Use a robust library like `date-fns` or `dayjs` to handle time zone offsets and calculations accurately.
