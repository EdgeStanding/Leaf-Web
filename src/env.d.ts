/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare interface Window {
  $message: import("naive-ui").MessageApi;
  $dialog: import("naive-ui").DialogApi;
  $notification: import("naive-ui").NotificationApi;
  $loadingBar: import("naive-ui").LoadingBarApi;
}

// export {};
