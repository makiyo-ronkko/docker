<script>
  let password = '';
  let disabled = true;
  let text = '';

  const onClick = () => {
    if (password === 'AW96B6') {
      text = 'Impossible!';
    } else if (password === 'Alohomora') {
      text = 'Opening up!';
    } else {
      text = '';
    }
    disabled = true;
  };

  const onChange = (e) => {
    const { value } = e.target;
    password = value;
    if (password === 'AW96B6' || password === 'Alohomora') {
      disabled = false;
    } else {
      disabled = true;
    }
  };
</script>

<label for="password">Enter the secret password:</label>
<input
  id="password"
  type="password"
  bind:value={password}
  on:input={onChange}
/>
<button {disabled} on:click={onClick}>Click</button>

{#if password === 'AW96B6' || password === 'Alohomora'}
  <p>{text}</p>
{/if}
