// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import 'unplugin-icons/types/svelte';

declare global {
  namespace svelteHTML {
    interface HTMLAttributes<T> {
      onclick_outside?: CompositionEventHandler;
      ondirection?: CompositionEventHandler;
    }
  }
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
