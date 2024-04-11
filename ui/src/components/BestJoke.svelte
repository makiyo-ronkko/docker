<script>
  import { onMount, beforeUpdate, afterUpdate, onDestroy } from 'svelte';
  const fetchJoke = async () => {
    const response = await fetch('https://simple-joke-api.deno.dev/random');
    return await response.json();
  };

  let joke;

  onMount(() => {
    joke = fetchJoke();
  });

  beforeUpdate(() => {
    console.log('About to update..');
  });

  afterUpdate(() => {
    console.log('Update done..');
  });

  onDestroy(() => {
    console.log(JSON.stringify(joke));
  });
</script>

<p>The best joke that I know is:</p>

{#if joke}
  {#await joke}
    <p>Thinking...</p>
  {:then joke}
    <p>{joke.setup} -- {joke.punchline}</p>
  {/await}
{/if}
