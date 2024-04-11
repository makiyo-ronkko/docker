<script>
  let locations = ["Helsinki", "Espoo", "Vantaa"];
</script>

<p>I have lived in:</p>
<ul>
  {#each locations as location}
    <li>{location}</li>
  {/each}
</ul>