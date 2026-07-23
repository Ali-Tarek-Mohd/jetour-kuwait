export const NAVIGATION_ACTIVITY_EVENT = "jetour:navigation-activity";

export function announceNavigationActivity(active: boolean) {
  window.dispatchEvent(
    new CustomEvent<{ active: boolean }>(NAVIGATION_ACTIVITY_EVENT, {
      detail: { active },
    }),
  );
}
