<script lang="ts">
  import ArrowBtn from '$lib/components/buttons/ArrowBtn.svelte';
  import BusinessCard from '$lib/components/pages/contact/BusinessCard.svelte';
  import { textShuffle } from '$lib/utils/textShuffle';

  let loading = $state(false);
  let formSent = $state(false);
  let formError = $state(false);

  async function handleSubmit(e: SubmitEvent) {
    loading = true;
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    //@ts-ignore
    const body = new URLSearchParams(formData).toString();

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body,
      });
      if (res.ok) {
        formSent = true;
        formError = false;
      } else {
        formError = true;
      }
    } catch (err) {
      console.error(err);
    } finally {
      loading = false;
    }
  }
</script>

<div class="page-wrapper container">
  <div class="cols-wrapper">
    <div class="form-col">
      <h1>Contato</h1>
      {#if loading}
        <div class="loader-wrapper">
          <div class="loader"></div>
        </div>
      {/if}

      {#if formSent}
        <p class="success-message" use:textShuffle={{ playOn: ['load'], duration: 1.5 }}>
          Obrigado! Vou responder assim que possível :)
        </p>
      {:else}
        <form name="contact" method="POST" onsubmit={handleSubmit} data-netlify="true" class:loading>
          <input type="text" name="name" placeholder="Nome" maxlength="50" />
          <input type="email" name="email" placeholder="Email" maxlength="50" />
          <textarea name="message" id="" minlength="10" placeholder="Mensagem" maxlength="1000"></textarea>
          <div class="btn-wrapper">
            <ArrowBtn text="Enviar" direction="right" type="submit" finalGap={36} />
            <span class="error-msg"
              >{#if formError}
                Oops, algo deu errado :(
              {/if}
            </span>
          </div>
        </form>
      {/if}
    </div>
    <div class="card-col">
      <BusinessCard />
    </div>
  </div>
</div>

<style>
  .loader-wrapper,
  .success-message {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  /* HTML: <div class="loader"></div> */
  .loader {
    width: 50px;
    aspect-ratio: 1.154;
    display: grid;
    color: #fff;
    background:
      linear-gradient(to bottom left, #fff0 calc(50% - 1px), currentColor 0 calc(50% + 1px), #fff0 0) right/50% 100%,
      linear-gradient(to bottom right, #fff0 calc(50% - 1px), currentColor 0 calc(50% + 1px), #fff0 0) left / 50% 100%,
      linear-gradient(currentColor 0 0) bottom/100% 2px;
    background-repeat: no-repeat;
    transform-origin: 50% 66%;
    animation: l5 4s infinite linear;
  }
  .loader::before,
  .loader::after {
    content: '';
    grid-area: 1/1;
    background: inherit;
    transform-origin: inherit;
    animation: inherit;
  }
  .loader::after {
    animation-duration: 2s;
  }
  @keyframes l5 {
    100% {
      transform: rotate(1turn);
    }
  }
  @keyframes l13 {
    100% {
      transform: rotate(1turn);
    }
  }
  @keyframes l10 {
    100% {
      transform: rotate(0.5turn);
    }
  }
  @keyframes l5 {
    100% {
      transform: rotate(1turn);
    }
  }
  @keyframes l11 {
    100% {
      transform: rotate(calc(var(--s, 1) * 1turn));
    }
  }
  .page-wrapper {
    min-height: calc(100dvh - var(--header-height));
    max-width: 1920px;
  }

  h1 {
    font-weight: 800;
    font-size: clamp(2rem, 5vw, 4rem);
    text-transform: uppercase;
    font-family: var(--overpass);
    text-align: center;
  }

  .cols-wrapper {
    display: flex;
    align-items: center;
    min-height: 90dvh;
    gap: 2rem;
  }

  .cols-wrapper > div {
    width: 100%;
    /* border: 1px solid red; */
  }

  .form-col {
    /* display: grid; */
    /* place-content: center; */
    min-height: 562px;
    position: relative;
  }
  form {
    display: grid;
    grid-template-columns: 1fr;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 600px;
    margin-inline: auto;
    /* margin-top: 3rem; */
  }

  form.loading {
    opacity: 0.2;
    pointer-events: none;
  }
  input,
  textarea {
    background: transparent;
    color: var(--cl-text);
    border: none;
    border-bottom: 1px solid var(--cl-text);
    padding: 0.5rem;
    font-family: var(--inter);
    font-size: 1rem;
  }

  input:focus,
  textarea:focus {
    outline: none;
  }

  textarea {
    /* border: 1px solid white; */
    min-height: 300px;
    /* margin-top: 2rem; */
    resize: none;
  }

  form .btn-wrapper {
    margin-top: 1rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: var(--overpass);
    flex-wrap: wrap;
  }

  .card-col {
    display: grid;
    place-items: center;
    width: 100%;
  }

  .success-message {
    font-family: var(--overpass);
    /* padding-block: 3rem; */
  }

  .error-msg {
    color: var(--cl-text-low);
    font-size: 0.8rem;
  }

  @media (max-width: 1100px) {
    .cols-wrapper {
      flex-direction: column;
    }

    .page-wrapper {
      padding-bottom: 3rem;
    }
  }

  @media (max-width: 400px) {
    .error-msg {
      width: 100%;
      padding-top: 1rem;
    }
  }
</style>
