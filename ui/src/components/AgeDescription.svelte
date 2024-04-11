<script>
  let age = 0;
</script>

{#if age >= 18}
  <p>I am (legally) an adult (in Finland).</p>
{:else if age >= 4}
  <p>I am a child.</p>
{:else if age >= 1}
  <p>I am a toddler.</p>
{:else}
  <p>I am a baby.</p>
{/if}
